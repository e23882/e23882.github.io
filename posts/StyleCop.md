---
title: StyleCop
catalog: true
tags:
  - C#
  - StyleCop
abbrlink: 1a072bcd
categories: uncategorized
date: 2020-07-08 11:02:58
subtitle:
header-img:
---
## 透過StyleCop檢查Coding StyleStyleCop
### 1. 安裝VisualStudioExtension
![extension](StyleCop/extension.PNG)

### 2. 檢查專案
### 2.1 CodingStyle

可以檢查那些檔案沒有符合團隊的CodingStyle，不用每次都要人工檢查
![run](StyleCop/run.PNG)

執行結果:
![result](StyleCop/result.PNG)
***
### 2.2 檢查程式碼度量
可以量化程式的可維護性、複雜度、繼承深度、類別結合程度，看程式哪邊的耦合性太強，跟AXOCover測試結果報表的垃圾分數(CrapScore)有點像，可以透過這個數值去優化程式
![run](StyleCop/run2.PNG)

結果
![result](StyleCop/result2.PNG)