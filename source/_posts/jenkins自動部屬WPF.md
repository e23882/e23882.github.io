---
title: jenkins自動部屬WPF
catalog: true
comments: true
tags:
  - CICD
  - WPF
  - Jenkins
abbrlink: 36138
categories: uncategorized
date: 2021-02-01 15:38:11
---

# 用Jenkins自動部屬WPF
## 環境
安裝就不寫了，google jenkins然後下載下一步下一步就裝完了

安裝完之後在網址列輸入localhost:8080應該會看到jenkin的歡迎畫面，如果沒有看到的話

![localhost](localhost.PNG)

可以在windows command 輸入
```batch
services.msc
```
檢查服務有沒有執行了，如果沒有執行的話按右鍵啟動Jenkins服務

![CheckServices](chkService.PNG)

登入之後會看到主畫面，如果已經有設定過的話會看到目前有的設定有哪些程式目前的狀態怎麼樣
![main](main.PNG)

## 新增作業
jenkin大部分時間在用的功能就是一直執行自己定義好的作業，像我是設定了編譯、執行測試、發布到指定位置

選主畫面的新增作業按紐，輸入這個作業的名稱之後，選建置Free-Style 軟體專案
![new-1](new1.PNG)

之後可以照著jenkins的項目去設定自己要執行的動作

像我的流程是: 
### 1.git pull 最新的程式
![step1](Step1.PNG)

在設定這個功能之前要先去
  首頁 > 管理Jenkins > Global Tool Configuration 設定電腦上git的路徑
  ![GlobalTool](globalTool.PNG)
  ![SetGit](setGit.PNG)
  
### 2.刪除目前的工作區
  ![step2](Step2.PNG)

### 3.編譯專案

要執行這一個工作項目會需要裝一個jenkins的plugin
  
按左上角Jenkins logo回到主畫面後，選 管理jenkins > 管理外掛程式
![manage](managePlugin.PNG)

應該是選可用的tab然後搜尋 MSBUID就會找到了，但因為我已經安裝完了，所以在可用的裡面找不到，而是在已安裝裡
![install](install.PNG)

安裝完plugin之後要去Global Tool Configuration 設定MSBuild路徑
![Set MSBuild](setMSBuild.PNG)

都設定完之後再去設定新的作業中執行編譯專案的工作項目
![step3](Step3.PNG)

### 4.執行測試
執行這一步因為我是在編譯完之後透過執行Windows batch的方式去執行測試所以不用裝什麼奇怪的plugin

但是要下載對應的單元測試執行程式，像我這裡是用NUnit3，所以要下載NUNIT3，透過圖片中的方式執行測試
https://nunit.org/download/

 ![step4](Step4.PNG)

### 5.輸出測試結果
要在jenkins上看到執行測試的結果要裝一個jekins NUnit的plugin，做法就像上面安裝MSBUID一樣，不過不用設定NUnit的路徑，主要目的是要在新增作業時有Publish NUnit test result report的項目可以選擇
 ![step5](Step5.PNG)

### 6.部屬到指定位置
正常來說應該是要選圖片中的工作項目，讓jenkins執行完測試自動部屬檔案到指定位置，但是我的jenkins每次在設定這個動作需要的參數時一直crash，所以我是透過執行單元測試的方式，透過windows batch執行複製編譯完的檔案到指定目錄中
![step5](Step5.PNG)

![Publish](publish.PNG)

因為之前有透過githook部屬程式，所以備份目前版本、停用服務、部屬、通知使用者...我幾乎都用windows batch完成了