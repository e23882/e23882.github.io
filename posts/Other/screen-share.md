# 螢幕分享工具

純前端實作，使用 **WebRTC + BroadcastChannel API**，不需要伺服器，同一台電腦、同一個瀏覽器的兩個分頁即可互相分享螢幕畫面。

> **使用方式**
> 1. 在此頁面（或新分頁）選擇 **Host**，選擇螢幕後點「開始分享」
> 2. 另開一個分頁開啟同一工具，選擇 **Client**，等待自動連線
> 3. Client 端會即時顯示 Host 的螢幕畫面

<a href="/posts/Other/screen-share/index.html" target="_blank" style="display:inline-flex;align-items:center;gap:.4em;background:#0085a1;color:white;padding:.45em 1.1em;border-radius:6px;text-decoration:none;font-weight:600;font-size:.9rem">🔗 在新分頁中開啟工具</a>

<iframe src="/posts/Other/screen-share/index.html" width="100%" height="780px" style="border:none;border-radius:8px;display:block;margin-top:1rem" allow="display-capture"></iframe>
