---
title: C# Selenium不指定Chromedriver位置
catalog: true
comments: true
tags:
  - C#
categories: uncategorized
abbrlink: 56496
date: 2022-09-07 14:36:15
subtitle:
header-img:
---

### 一般在C#中使用Selenium
一般我們要在C#中使用Selenium會從nuget上安裝Selenium.WebDriver這個套件
code會長這樣，在ChromeDriver裡指定ChromeDriver的路徑，如果Chrome更新的時候就要重新下載ChromeDriver到指定目錄下，很不方便
```csharp
var chromeOptions = new ChromeOptions();
chromeOptions.AddArguments("headless");
var driver = new ChromeDriver(chromeOptions);
var loginUrl = "https://emp.com/EIM/User/WallMain.aspx";
driver.Navigate().GoToUrl(loginUrl);
```

### 更方便的方法
其實只要再安裝 Selenium.WebDriver.ChromeDriver 就可以自動帶入對應版本的chromedriver