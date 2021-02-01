---
title: WPF Property、Dependency Property
catalog: true
tags:
  - WPF
  - C#
  - xaml
abbrlink: 84f61cd3
categories: uncategorized
date: 2020-07-02 16:47:45
subtitle:
header-img:
---
##### Dependency Property(依賴屬性)
主要用在xaml，在其他畫面xaml使用元件的時候可以透過DP存取資料
在CodeBehind打 **Propdp**再按兩下Tab，visual studio會自動產生Dependency Property的範本，再把依賴屬性的資料型態、名稱、預設值改成自己要的，就可以有一個自己的依賴屬性，依賴屬性常用在自己做的元件上，原生的元件沒有自己需要的屬性，所以自己做一個

- 資料型態 : int
- 名稱 : MyProperty
- 預設值 : PropertyMetadata(0)

```CSharp
public int MyProperty
{
    get { return (int)GetValue(MyPropertyProperty); }
    set { SetValue(MyPropertyProperty, value); }
}

// Using a DependencyProperty as the backing store for MyProperty.  This enables animation, styling, binding, etc...
public static readonly DependencyProperty MyPropertyProperty =
    DependencyProperty.Register("MyProperty", typeof(int), typeof(ownerclass), new PropertyMetadata(0));
```
##### Property(屬性)
主要用在CodeBehind，xaml沒辦法用自訂的屬性Property
```CSharp
private bool _DefaultPropertyName;
public bool DefaultPropertyName
{
    get
    {
        return _DefaultPropertyName;
    }
    set
    {
        _DefaultPropertyName = value;
        OnPropertyChanged();
    }
}
```
##### Property跟Dependency Property之間溝通
``` csharp
//取得資料 : 
var data = (DataType)GetValue(DependencyPropertyName);
//設定資料 : 
SetValue(DependencyPropertyName, value);
```