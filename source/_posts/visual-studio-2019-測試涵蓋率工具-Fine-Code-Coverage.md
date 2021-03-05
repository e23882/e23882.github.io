---
title: visual studio 2019 測試涵蓋率工具 - Fine Code Coverage
catalog: true
comments: true
tags:
  - UnitTest
  - Tool
abbrlink: 45773
categories: uncategorized
date: 2021-02-26 15:01:39
---

## Visual Studio 2019 測試涵蓋率工具 - Fine Code Coverage

之前有寫過可以用AxoCover看NUnit的測試涵蓋率，最近換到visual studio 2019發現2019已經沒有這個延伸模組可以下載了，所以就上網找了2019可以用的工具



### 安裝
一樣在visual studio 2019/延伸模組/管理延伸模組下載、安裝fine code coverage
![extension](EXTENSION.PNG)

### 使用
使用上真的很簡單，裝好之後直接開Test Explorer執行NUnit單元測試
![run test](RUNTEST.PNG)

執行完之後會跳出來測試專案執行的總覽，可以在這裡看到目前測試涵蓋率分布的結果大概怎麼樣，AXOCover有的Risk Hotspots分析Fine code coverage也有提供
![result](RESULT.PNG)

切換到對應的code上面會發現，fine code coverage已經自動幫你把執行過的地方畫上綠線了
![source](SOURCECODE.PNG)
