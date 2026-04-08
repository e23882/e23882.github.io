'use strict';

// ── 常數 ─────────────────────────────────────────────────
const CH_NAME    = 'screen-share-v1';
const MY_ID      = crypto.randomUUID();
const RTC_CFG    = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const CHECK_MS   = 3000;   // viewer 重試間隔

// ── 狀態 ─────────────────────────────────────────────────
const S = {
    view:      'home',
    role:      null,
    bc:        null,
    // host
    stream:    null,
    peers:     new Map(),   // viewerId -> { pc, iceBuf }
    isSharing: false,
    // viewer
    vpc:       null,
    vIceBuf:   [],          // 收到 offer 之前暫存的 ICE candidates
    retryTmr:  null,
};

// ── BroadcastChannel ──────────────────────────────────────
function openChannel() {
    S.bc = new BroadcastChannel(CH_NAME);
    S.bc.onmessage = ({ data }) => route(data);
}
function closeChannel() { S.bc?.close(); S.bc = null; }
function bc(data)        { S.bc?.postMessage(data); }

// ── 訊息路由 ──────────────────────────────────────────────
function route(msg) {
    if (S.role === 'host')   hostMsg(msg);
    if (S.role === 'viewer') viewerMsg(msg);
}

// ══════════════════════════════════════════════════════════
//  HOST 訊息
// ══════════════════════════════════════════════════════════
function hostMsg(msg) {
    switch (msg.type) {
        case 'viewer-check':
            bc({ type: 'host-status', sharing: S.isSharing });
            break;

        case 'viewer-join':
            if (S.isSharing) onViewerJoin(msg.from);
            break;

        case 'answer': {
            const entry = S.peers.get(msg.from);
            if (entry) onHostAnswer(entry, msg.sdp);
            break;
        }

        case 'ice': {
            if (msg.to !== 'host') break;
            const entry = S.peers.get(msg.from);
            if (!entry) break;
            // Fix #2: remoteDescription 尚未設定時先 buffer
            if (entry.pc.remoteDescription) {
                entry.pc.addIceCandidate(msg.candidate).catch(() => {});
            } else {
                entry.iceBuf.push(msg.candidate);
            }
            break;
        }
    }
}

// ══════════════════════════════════════════════════════════
//  VIEWER 訊息
// ══════════════════════════════════════════════════════════
function viewerMsg(msg) {
    switch (msg.type) {
        case 'host-status':
            stopRetry();
            if (msg.sharing) {
                onHostReady();
            } else {
                setWaitMsg('分享者已連線，等待開始分享...');
                startRetry();
            }
            break;

        case 'host-sharing':
            stopRetry();
            onHostReady();
            break;

        case 'host-stopped':
            closeVpc();
            setWaitMsg('分享者已暫停分享');
            showState('waiting');
            startRetry();
            break;

        case 'host-offline':
            closeVpc();
            setWaitMsg('尚未偵測到分享者，請稍候...');
            showState('waiting');
            startRetry();
            break;

        case 'offer':
            if (msg.to === MY_ID) onViewerOffer(msg.sdp);
            break;

        case 'ice':
            if (msg.to !== MY_ID) break;
            // Fix #2: remoteDescription 尚未設定時先 buffer
            if (S.vpc?.remoteDescription) {
                S.vpc.addIceCandidate(msg.candidate).catch(() => {});
            } else {
                S.vIceBuf.push(msg.candidate);
            }
            break;
    }
}

// ══════════════════════════════════════════════════════════
//  VIEW 切換
// ══════════════════════════════════════════════════════════
function showView(name) {
    S.view = name;
    document.querySelectorAll('.view').forEach(el =>
        el.classList.toggle('active', el.id === `view-${name}`)
    );
}

// ══════════════════════════════════════════════════════════
//  HOME
// ══════════════════════════════════════════════════════════
function goHome() {
    // Fix #4: 先通知再清狀態
    if (S.role === 'host' && S.isSharing) bc({ type: 'host-stopped' });
    if (S.role === 'host') bc({ type: 'host-offline' });

    stopStream();
    S.peers.forEach(({ pc }) => pc.close());
    S.peers.clear();
    S.isSharing = false;

    closeVpc();
    stopRetry();
    closeChannel();
    S.role = null;
    showView('home');
}

// ══════════════════════════════════════════════════════════
//  HOST
// ══════════════════════════════════════════════════════════
function goHost() {
    S.role = 'host';
    openChannel();
    showView('host');
    setHostStatus('已就緒，請選擇要分享的螢幕', 'connected');
    $('btn-select-screen').disabled = false;
    bc({ type: 'host-status', sharing: false });
}

async function selectScreen() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: 30, max: 60 }, cursor: 'always' },
            audio: true,
        });
        stopStream();
        S.stream = stream;

        $('host-preview').srcObject = stream;
        show('host-preview-wrap');
        hide('host-placeholder');
        $('btn-select-screen').textContent = '重新選擇';
        $('btn-start-share').disabled = false;
        setHostStatus('螢幕已選定，點擊「開始分享」', 'connected');

        stream.getVideoTracks()[0].addEventListener('ended', stopSharing);
    } catch (err) {
        if (err.name !== 'NotAllowedError') showToast(`無法取得螢幕：${err.message}`);
    }
}

function startSharing() {
    if (!S.stream || S.isSharing) return;
    S.isSharing = true;
    $('btn-start-share').disabled   = true;
    $('btn-stop-share').disabled    = false;
    $('btn-select-screen').disabled = true;
    setHostStatus('分享中，等待觀看者加入...', 'sharing');
    bc({ type: 'host-sharing' });
}

function stopSharing() {
    if (!S.isSharing && !S.stream) return;
    const wasSharing = S.isSharing;
    S.isSharing = false;

    stopStream();
    S.peers.forEach(({ pc }) => pc.close());
    S.peers.clear();

    hide('host-preview-wrap');
    show('host-placeholder');
    $('btn-select-screen').disabled = false;
    $('btn-select-screen').textContent = '選擇螢幕';
    $('btn-start-share').disabled   = true;
    $('btn-stop-share').disabled    = true;

    setHostStatus('已停止分享', 'connected');
    updateViewerNum(0);
    if (wasSharing) bc({ type: 'host-stopped' });
}

function stopStream() {
    S.stream?.getTracks().forEach(t => t.stop());
    S.stream = null;
    const p = $('host-preview');
    if (p) p.srcObject = null;
}

async function onViewerJoin(viewerId) {
    if (!S.stream) return;

    const pc = new RTCPeerConnection(RTC_CFG);
    const entry = { pc, iceBuf: [] };
    S.peers.set(viewerId, entry);

    S.stream.getTracks().forEach(t => pc.addTrack(t, S.stream));

    // Fix #1: toJSON() 確保可被 structured clone
    pc.onicecandidate = ({ candidate }) => {
        if (candidate) bc({ type: 'ice', to: viewerId, from: 'host', candidate: candidate.toJSON() });
    };

    pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
            pc.close();
            S.peers.delete(viewerId);
            updateViewerNum(S.peers.size);
        }
    };

    try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        bc({ type: 'offer', to: viewerId, sdp: { type: offer.type, sdp: offer.sdp } });
        updateViewerNum(S.peers.size);
    } catch (err) {
        pc.close();
        S.peers.delete(viewerId);
    }
}

async function onHostAnswer(entry, sdp) {
    try {
        await entry.pc.setRemoteDescription(sdp);
        // Fix #2: remote desc 設好後把 buffer 裡的 ICE 補進去
        for (const c of entry.iceBuf) {
            await entry.pc.addIceCandidate(c).catch(() => {});
        }
        entry.iceBuf = [];
    } catch (_) { /* ignore */ }
}

function setHostStatus(text, mode) {
    $('host-status-bar').className = `status-bar ${mode}`;
    $('host-status-text').textContent = text;
}
function updateViewerNum(n) { const el = $('viewer-num'); if (el) el.textContent = n; }

// ══════════════════════════════════════════════════════════
//  VIEWER
// ══════════════════════════════════════════════════════════
function goViewer() {
    S.role = 'viewer';
    openChannel();
    showView('viewer');
    setWaitMsg('正在偵測分享者...');
    showState('waiting');
    sendCheck();
    startRetry();   // Fix #5: 定期重試，直到連上為止
}

function sendCheck() { bc({ type: 'viewer-check' }); }

function startRetry() {
    stopRetry();
    S.retryTmr = setInterval(sendCheck, CHECK_MS);
}
function stopRetry() { clearInterval(S.retryTmr); S.retryTmr = null; }

function onHostReady() {
    stopRetry();
    showState('connecting');
    bc({ type: 'viewer-join', from: MY_ID });
}

// Fix #7: 先關舊連線
async function onViewerOffer(sdp) {
    closeVpc();
    S.vIceBuf = [];

    const pc = new RTCPeerConnection(RTC_CFG);
    S.vpc = pc;

    // Fix #3: 用 MediaStream 累積 track，playing 事件後才切畫面
    const remoteStream = new MediaStream();
    const video = $('viewer-video');
    video.srcObject = remoteStream;

    pc.ontrack = ({ track }) => remoteStream.addTrack(track);

    // Fix #1: toJSON()
    pc.onicecandidate = ({ candidate }) => {
        if (candidate) bc({ type: 'ice', to: 'host', from: MY_ID, candidate: candidate.toJSON() });
    };

    pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
            closeVpc();
            setWaitMsg('連線已中斷，等待重新分享...');
            showState('waiting');
            startRetry();
        }
    };

    try {
        await pc.setRemoteDescription(sdp);

        // Fix #2: 補 buffer 裡的 ICE
        for (const c of S.vIceBuf) {
            await pc.addIceCandidate(c).catch(() => {});
        }
        S.vIceBuf = [];

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        bc({ type: 'answer', sdp: { type: answer.type, sdp: answer.sdp }, from: MY_ID });
    } catch (err) {
        showToast('連線失敗，請重試');
        showState('waiting');
        startRetry();
    }
}

// Fix #3: playing 事件確保有畫面再切換
function initVideoHandlers() {
    const video = $('viewer-video');
    if (!video) return;
    video.addEventListener('playing', () => {
        if (S.vpc) showState('streaming');
    });
}

function closeVpc() {
    S.vpc?.close();
    S.vpc = null;
    const vid = $('viewer-video');
    if (vid) vid.srcObject = null;
    S.vIceBuf = [];
}

function showState(state) {
    toggle('viewer-waiting',    state === 'waiting');
    toggle('viewer-connecting', state === 'connecting');
    toggle('viewer-video-wrap', state === 'streaming');
    $('btn-fullscreen').classList.toggle('hidden', state !== 'streaming');
}
function setWaitMsg(text) { const el = $('viewer-wait-msg'); if (el) el.textContent = text; }

function toggleFullscreen() {
    const wrap = $('viewer-video-wrap');
    if (!document.fullscreenElement) wrap?.requestFullscreen();
    else document.exitFullscreen();
}

// ══════════════════════════════════════════════════════════
//  工具
// ══════════════════════════════════════════════════════════
const $      = id => document.getElementById(id);
const show   = id => $(id)?.classList.remove('hidden');
const hide   = id => $(id)?.classList.add('hidden');
const toggle = (id, visible) => $(id)?.classList.toggle('hidden', !visible);

function showToast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

// ══════════════════════════════════════════════════════════
//  初始化
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // 在 iframe 內時隱藏 site-nav（避免 Docsify 頁面出現雙重選單）
    if (window.self !== window.top) {
        const nav = document.getElementById('site-nav');
        if (nav) nav.style.display = 'none';
        document.documentElement.style.setProperty('--site-nav-h', '0px');
    }

    initVideoHandlers();

    $('btn-goto-host')?.addEventListener('click', goHost);
    $('btn-goto-viewer')?.addEventListener('click', goViewer);
    $('btn-host-back')?.addEventListener('click', goHome);
    $('btn-select-screen')?.addEventListener('click', selectScreen);
    $('btn-start-share')?.addEventListener('click', startSharing);
    $('btn-stop-share')?.addEventListener('click', stopSharing);
    $('btn-viewer-back')?.addEventListener('click', goHome);
    $('btn-viewer-back-wait')?.addEventListener('click', goHome);
    $('btn-fullscreen')?.addEventListener('click', toggleFullscreen);

    document.addEventListener('fullscreenchange', () => {
        const btn = $('btn-fullscreen');
        if (btn) btn.title = document.fullscreenElement ? '退出全螢幕' : '全螢幕';
    });

    window.addEventListener('beforeunload', () => {
        if (S.role === 'host') {
            if (S.isSharing) bc({ type: 'host-stopped' });
            bc({ type: 'host-offline' });
        }
    });
});
