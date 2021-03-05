---
title: 部屬.Net Core Webapi 到Linux
catalog: true
comments: true
tags:
  - Linux
  - .Net Core
  - Raspberry PI
abbrlink: 7561
categories: uncategorized
date: 2020-12-31 18:27:58
---
## 下載. Net Core SDK、.Net Core Runtime
其實只要下載.Net Core Runtime就可以了，SDK是讓你可以在linux上編譯.Net Core的程式
```bash
# .Net Core 3.1 SDK
wget https://download.visualstudio.microsoft.com/download/pr/349f13f0-400e-476c-ba10-fe284b35b932/44a5863469051c5cf103129f1423ddb8/dotnet-sdk-3.1.102-linux-arm.tar.gz
# .Net Core 3.1 Runtime
wget https://download.visualstudio.microsoft.com/download/pr/8ccacf09-e5eb-481b-a407-2398b08ac6ac/1cef921566cb9d1ca8c742c9c26a521c/aspnetcore-runtime-3.1.2-linux-arm.tar.gz
```
![Download](downlaod.PNG)

## 建立. Net Core Running time、SDK解壓縮目錄
```bash
sudo mkdir dotnet-arm32
```
![mkdir](mkdir.PNG)

## 解壓縮下載檔案到目錄
```bash
sudo tar zxf dotnet-sdk-3.1.102-linux-arm.tar.gz -C $HOME/dotnet-arm32
sudo tar zxf aspnetcore-runtime-3.1.2-linux-arm.tar.gz -C $HOME/dotnet-arm32
```
![Unzip](unzip.PNG)

## 設定環境變數
```bash
export DOTNET_ROOT=$HOME/dotnet-arm32
export PATH=$PATH:$HOME/dotnet-arm32
```
![Setpath](setPath.PNG)

## 建立發布位置、設定寫入讀取權限
```bash
 sudo mkdir DotnetRelease
 sudo chmod 777 DotnetRelease/
```
![chmod777](chmod777.PNG)

## 使用Filezilla上傳寫好的webapi
![Upload](upload.PNG)

## 執行
```bash
dotnet xxx.dll
```
![Run](run.PNG)