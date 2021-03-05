---
title: WPF 綁定自訂元件屬性
catalog: true
comments: true
tags:
  - WPF
  - DataBinding
  - UserControl
  - DependencyProperty
abbrlink: 40650
categories: uncategorized
date: 2021-02-19 16:03:40
---

## 綁定自訂元件屬性

這個問題是發生在有一次我要把公司舊的程式改成MVVM的設計，在將ViewModel綁定到一個我們自己做的元件上的依賴屬性上時發現綁定成功了，但是ViewModel值發生異動時，那個自訂的元件的畫面卻沒有更新


### 自訂元件
那顆自訂元件大概長這樣，我們先叫他LeoBlock，LeoBlock有一個TextBlcok跟一個按鈕，主要功能是在按按鈕的時候TextBlcok會顯示最新的值

##### Xaml
```XML
<UserControl x:Class="WPFPractice0219.LeoBlock"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:WPFPractice0219"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800" x:Name="ucMain">
    <StackPanel Orientation="Horizontal">
        <TextBlock x:Name="tb" Text="{Binding LeoText, ElementName=ucMain}"/>
        <Button Content="Test" Click="Button_Click"/>
    </StackPanel>
</UserControl>
```

##### Code Behind
LeoBlock裡面有一個依賴屬性 - LeoText，這個屬性當初是設計來給其他地方存取的
```c sharp
public partial class LeoBlock : UserControl
{
    public LeoBlock()
    {
        InitializeComponent();
        this.DataContext = new LeoBlockViewModel();
    }


    public string LeoText
    {
        get { return (string)GetValue(LeoTextProperty); }
        set { SetValue(LeoTextProperty, value); }
    }

    DependencyProperty.Register("LeoText", typeof(string), typeof(LeoBlock), new PropertyMetadata("Default"));

    private void Button_Click(object sender, RoutedEventArgs e)
    {
        
    }
}
```
### 主視窗(MainWindow)
LeoBlcok被用在MainWindow中，其中的LeoText屬性被綁定在ViewModel中的ContentText屬性上

原本我以為這樣LeoBlock的LeoText這樣就會綁定成功了，沒想到不是像我想的一樣

LeoBlock顯示的是依賴屬性LeoText的預設值(Default)，而不是主視窗中ViewModel的ContentText屬性(ViewModel Default Value)
##### MainWindow
```xml
<Window x:Class="WPFPractice0219.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:WPFPractice0219"
        xmlns:i="clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity"
        xmlns:jwb="clr-namespace:Jepun.Win.Base;assembly=Jepun.Win.Base"
        mc:Ignorable="d"
        Title="MainWindow" Height="450" Width="800" x:Name="mainWindow">
    <StackPanel Orientation="Vertical">
        <Button Content="Update" Command="{Binding ButtonClickCommand}"/>
        <local:LeoBlock LeoText="{Binding ContentText"/>
    </StackPanel>
</Window>
```

##### MainWindow.xaml.cs
```csharp
public partial class MainWindow : Window
{
    INotifyPropertyChanged main = null;
    public MainWindow()
    {
        InitializeComponent();
        IKernel Container = new StandardKernel();
        Container.Bind<INotifyPropertyChanged>().To<MainViewModel>();
        main = Container.Get<MainViewModel>();
        this.DataContext = main;
    }

    private void DatePicker_DateChanged(object sender, System.EventArgs e)
    {
        
    }
}
```

##### MainViewModel
``` c sharp
public class MainViewModel:ViewModelBase
{
    private string _ContentText = "ViewModel Default Value";
    
    public string ContentText
    {
        get
        {
            return _ContentText;
        }
        set
        {
            _ContentText = value;
            OnPropertyChanged();
        }
    }
}
```

### 解決方法
在主視窗綁定依賴屬性(LeoText)到ViewModel時改成這樣寫 : Binding DataContext.ContentText
``` xml
<StackPanel Orientation="Vertical">
    <Button Content="Update" Command="{Binding ButtonClickCommand}"/>
    <local:LeoBlock LeoText="{Binding DataContext.ContentText, ElementName=mainWindow}"/>
</StackPanel>
```