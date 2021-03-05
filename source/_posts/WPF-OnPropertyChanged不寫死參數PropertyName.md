---
title: WPF OnPropertyChanged不寫死參數PropertyName
catalog: true
tags:
  - C#
  - WPF
abbrlink: e440dc75
categories: uncategorized
date: 2020-07-02 20:28:11
subtitle:
header-img:
---

#### [.net framework 4.5 ↑]使用CallerMemberName Attribute
##### 一般寫法
繼承INotifyPropertyChanged Interface
實做介面
```csharp
public void OnPropertyChanged(string parameter){}
```

##### CallerMemberName Attribute
這樣OnPropertyChanged("ProperyName")這樣的東西要寫很多次,沒什麼意義
.net framework4.5之後加入了CallerMemberNameAttribute
```csharp
public void functionName([CallerMeberName] string parameter=""){}

//以後都可以
private string _TestProperty = string.Empty;
public string TestProperty
{
    get
    {
        return _TestProperty;
    }
    set
    {
        _TestProperty = value;
        //不用寫參數很方便
        //OnPropertyChanged("TestProperty");
        OnPropertyChanged();
    }
}
```