---
title: C# 自訂事件
catalog: true
date: 2020-07-02 18:17:17
subtitle:
header-img:
tags:
- C#
---

### C# 自訂事件
##### 宣告
```csharp
//宣告委派
public delegate void TestEvent(object sender, EventArgs e);
//宣告事件、委派類型
public event TestEvent OnEyesWatch();
```
##### 使用方法
```csharp
//調用事件
public void TestFunction()
{
	OnEyesWatch?.Invoke(this, new EventArgs());
}

//委派事件
className.OnEyesWatch+= xxxxxxx;
```