---
title: Command、dotnet
catalog: true
tags:
  - C#
  - .net core
  - Command
abbrlink: f90a7c66
categories: uncategorized
date: 2020-07-02 20:20:45
subtitle:
header-img:
---

### .net core
```batch
:: 檢查是否安裝.net core
	dotnet
:: 建立方案
	dotnet new sln -n 方案名稱
:: 查看目前.net core 版本
	dotnet --version 方案名稱
:: 列出所有SDK
	dotnet --list-sdks
:: 切換SDK?
	不用切換他會自動用最新的
```
### command
```batch
:: 刪除檔案
	del /f 檔案名稱
:: 清除畫面
	cls
```