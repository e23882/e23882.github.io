---
title: WPF DataBinding
catalog: true
tags:
  - C#
  - WPF
  - DataBinding
abbrlink: 82450c4
categories: uncategorized
date: 2020-07-02 17:37:05
subtitle:
header-img:
---

## DataBinding 範例
### 1.定義會用到的視圖模型(ViewModel)
```csharp
//繼承INotifyPropertyChanged Interface，讓元件透過Binding訂閱ViewModel中的屬性，資料更新時UI會自己更新，很方便
class ViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;
    private bool _IsChecked = true;
    private string _Content = "Default Text";

    //屬性 - IsChecked
    public bool IsChecked
    {
        get
        {
            return _IsChecked;
        }
        set
        {
            _IsChecked = value;
            OnPropertyChanged();
        }
    }
    //屬性 - Content
    public string Content
    {
        get
        {
            return _Content;
        }
        set
        {
            _Content = value;
            OnPropertyChanged();
        }
    }

    //實作通知介面更新方法
    public void OnPropertyChanged([CallerMemberName]string propertyName = "")
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```
### 2.產生視圖模型實例
MainWindow.xaml.cs
```csharp
using System.Windows;

namespace WPFApp
{
    /// <summary>
    /// MainWindow.xaml 的互動邏輯
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            //產生ViewModel物件實例
            ViewModel main = new ViewModel();
            //設定MainWindow的ViewModel來源為ViewModel物件實例main
            this.DataContext = main;
        }
    }
}
```
### 3.設定元件屬性Binding ViewModel的屬性
MainWindow.xaml:
```xml
<Window x:Class="WPFApp.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WPFApp"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800">
    <StackPanel Orientation="Vertical">
        <!-- 元件TextBox Text屬性 Binding ViewModel中Content屬性 -->
        <TextBox Text="{Binding Content}"/>
        <!-- 元件CheckBox IsChecked屬性 Binding ViewModel中IsChecked屬性 -->
        <CheckBox IsChecked="{Binding IsChecked}"/>
    </StackPanel>
</Window>
```

**[範例程式](https://github.com/e23882/WPF-DataBinding-)**

***
## 不同的Binding方法
#### 一般的DataBinding
```xml
<Textblock Text={Binding Content}/>
```

#### Binding指定元件的指定屬性
```xml
<Textblock x:Name="tbContent" Text={Binding Content}/>
<!-- 第一種 -->
<Textblock Text={Binding Source={x:Reference tbContent}, Path=Text}/>
<!-- 第二種 -->
<Textblock Text={Binding Content, ElementName = tbContent}/>
<!-- 第三種 -->
<i:InvokeCommandAction Command="{Binding TabitemMouseDownCommand}" CommandParameter="{Binding ElementName=tcControl, Path=SelectedIndex}"/>
<!-- 更多 Binding -->
<!-- Coming Soon.... -->
```
***

## DataBinding很常遇到的例外 : 引動過程的目標傳回例外狀況
### **一般是發生在有使用StaticResource的情況發生的 :**

- 可能有元件屬性Binding在 布局容器的資源中先定義好ViewModel、Converter、Resource的實例(instance)但是後來拿掉了
- 或是被綁定的ViewModel實例初始化發生例外

如果是發生初始化，因為這種問題會報錯在宣告ViewModel產生實例的地方，不會在ViewModel中遇到例外的地方跳出來
類似下面這種地方
```xml
<Windows.Resources>
        <viewmodel:AAAViewModel x:Key="MainViewModel"/>
</Windows.Resources>
```
但其實例外是發生在AAAViewModel建構子中，在初始化時取得資料連線發生例外

### **解決方法**
寫測試，單元測試、整合測試，發生錯誤的時候執行測試快速找到問題發生的地方
***
## **補充**
### DataBinding失敗的預設值
- Text : null
- Brush : null
- 數值 : NAN

### DataBinding BindingMode的預設值
```xml
<!-- 這兩個在UI更新的時候，都會更新ViewModel中IsChecked屬性，因為CheckBox IsCheck屬性DataBinding的Mode屬性就是預設TwoWay，其他元件的屬性也會有自己的預設值 -->
<CheckBox IsChecked="{Binding Path=IsSelected, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"/>
<CheckBox IsChecked="{Binding Path=IsSelected}"/>
```