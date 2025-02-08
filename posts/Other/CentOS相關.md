---
title: CentOS相關
catalog: true
comments: true
tags: '-Linux -CentOS'
abbrlink: 52241
categories: uncategorized
date: 2023-02-17 13:08:56
---

# CentOS常用指令
## 安裝
 yum install 要裝的東西
 - 網路相關工具
 ```
 yum install net-tools
 ```
 - SSH Server
 ```
 yum install openssh openssh-server
 ```
 - SSH Client
 ```
 yum install openssh-clients
 ```
 ---

## 安裝可能會遇到的問題
### failed to download metadata for repo.....
因為CentOS8已經沒有維護了，要換一個下載套件的位置
```
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
```
### Errors during downloading metadata for repository 'appstream'.....:
更新SSL憑證
``` 
curl http://www.example.com/ca/cacert.pem -o /etc/pki/tls/certs/ca-bundle.crt
curl -v https://example.com
```
### Failed to download metadata for repo 'appstream': Cannot download repomd.xml: Curl error (77): Problem with the SSL CA cert (path? access rights?) for https://vault.centos.org/centos/8/AppStream/x86_64/os/repodata/repomd.xml .....
關閉sslverify
```
vi /etc/yum.conf
增加內容
sslverify=false
```
### System has not been booted with systemd as init system (PID 1). Can't operate.Failed to connect to bus: Host is down
1.系統尚未使用systemd作為初始化系統重新啟動系統，檢查systemd有沒有安裝(yum install systemd)
2.如果訊息還是出現的話，切換初始化系統從舊的SysVinit到systemd
```
systemctl enable systemd
```

---
## 檢查目前已經裝的東西
rpm -q 套件名稱
```
rpm -q openssh-server
```
---
## 啟動服務
- 啟動SSH SERVER
```
systemctl start sshd
```
---
## 開機啟動服務
- 啟動SSH SERVER
```
systemctl enable sshd
```
## 查目前IP
```
ip a
ip r
```
## clear screen
```
ctrl+L
```
## 列出目前有開的所有port
```
(需要安裝套件net-tools)yum install net-tools
netstat -tlnp
```
## 設定防火牆打開某個port
```
firewall-cmd --permanent --zone=public --add-port=22/tcp
```
## SSH連線到某台機器
```
ssh 帳號@ip
ssh root@123.456.789
```
## ping 某台機器確定是否可以連線
```
ping ip
ping 123.456.789
```
## sudo command not found
1.檢查sudoers.d是否存在
```
find /etc/suders.d
```
如果不存在的話安裝sudo
```
yum install sudo
```