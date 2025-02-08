---
title: WPF 引動過程的目標傳回例外狀況
catalog: true
comments: true
tags:
  - WPF
  - 引動過程的目標傳回例外狀況
  - DataBinding
abbrlink: 35839
categories: uncategorized
date: 2020-08-21 12:01:55
---
## 引動過程的目標傳回例外狀況
### 發生原因
在XAML中把元件的屬性 Binding在ViewModel中的屬性上，如果ViewModel在執行的過程中發生例外就會跳出來這個例外

---
### StaticResource
我們常常為了不要讓CodeBehind有程式碼，會把ViewModel的宣告拿到Xaml的Resource裡面<br>

如果在Resource產生ViewModel實例(instance)的時候發生例外，在visual studio、rider都會只跳出來一個例外訊息，不會移動到例外發生ViewModel程式碼的位置，在Resource中有很多ViewModel時就很難查問題<br>

---
### 解決方法
可以把ViewModel建立單元測試，或是把Resource中宣告ViewModel程式先註解掉排除問題發生的地方，或是在ViewModel中寫log，透過log知道問題發生的位置
```xml
<Windows>
    <Windows.Resources>
        <viewmodel:AAAViewModel x:Key="MainViewModel"/>
    </Windows.Resources>

    <Grid DataContext="{Binding Source={StaticResource MainViewModel}">
    </Grid>
</Windows>
```