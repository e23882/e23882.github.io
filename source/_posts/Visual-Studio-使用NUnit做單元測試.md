---
title: Visual Studio 使用NUnit做單元測試
catalog: true
date: 2020-07-02 17:04:43
subtitle:
header-img:
tags:
- C#
- NUnit
- UnitTest
- 單元測試
---

#### Visual Studio 使用NUnit執行單元測試
安裝NUnit2 test adapter
一定要裝，不然不能執行NUnit測試框架(Visual Studio 2017 Community)
**要先把MSTest卸載掉，不然Visual Studio會只執行MSTest**
![NUnit Adapter](Visual-Studio-使用NUnit做單元測試\nunittestadapter.PNG)



#### Visual Studio 使用NUnit執行單元測試，看測試涵蓋率、
安裝AXO Cover
![Axo Cover](Visual-Studio-使用NUnit做單元測試\axo.PNG)

沒裝
![NUnitResult](Visual-Studio-使用NUnit做單元測試\nunitResult.PNG)
  
有裝
![NUnitResult](Visual-Studio-使用NUnit做單元測試\axoResult.PNG)
  
B度不同，而且AXO Cover可以看
測試涵蓋率
![NUnitResult](Visual-Studio-使用NUnit做單元測試\axoCover.PNG)
![NUnitResult](Visual-Studio-使用NUnit做單元測試\cover.PNG)
  
還能輸出報表，知道自己程式哪邊寫得很爛(Scrap Score)  
![NUnitResult](Visual-Studio-使用NUnit做單元測試\Report.PNG)

#### 使用TestCase Attribute
如果客戶發生問題，可以針對他的情境去測試，不用額外再寫一個
![NUnitResult](Visual-Studio-使用NUnit做單元測試\attribute.PNG)
![NUnitResult](Visual-Studio-使用NUnit做單元測試\NUnitAttrNewResult.PNG)

