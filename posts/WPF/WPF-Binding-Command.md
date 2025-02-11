---
title: WPF Binding Command
catalog: true
tags:
  - C#
  - WPF
abbrlink: d1703590
categories: uncategorized
date: 2025-02-11 12:30:00
subtitle:
header-img:
---
#### 為什麼要用Command不用事件
- 改用Command取代掉事件可以避免記憶體洩漏
- 可以降低畫面跟程式的耦合性,可以更好釐清問題發生的地方
- 開發邏輯的人可以直接測試Command引發的動作
#### 定義一個Command
```csharp
//繼承ICommand interface並實做方法
public class RelayCommand : ICommand
{
    private readonly Action<object> _execute;
    public event EventHandler CanExecuteChanged;

    public bool CanExecute(object parameter)
    {
        return true;
    }

    public void Execute(object parameter)
    {
        _execute.Invoke(parameter);
    }

    public RelayCommand(Action<object> execute)
    {
        _execute = execute;
    }
}
```

#### 引用資源
nuget安裝 Microsoft.Xaml.Behaviors.Wpf

#### xaml加入Interactivity NameSpace
```xml
xmlns:behaviors="clr-namespace:Microsoft.Xaml.Behaviors;assembly=Microsoft.Xaml.Behaviors"
xmlns:i="http://schemas.microsoft.com/xaml/behaviors"
```
#### 元件Binding ViewModel中的Command屬性
```xml
<Button Content="Test">
    <i:Interaction.Triggers>
            <behaviors:EventTrigger EventName="Click">
                <behaviors:InvokeCommandAction Command="{Binding Pick15Command}" />
            </behaviors:EventTrigger>
        </i:Interaction.Triggers>
</Button>
```
```csharp
public class ViewModel
{
    //Command屬性
    public RelayCommand ButtonClickCommand { get; set; }

    public ViewModel()
    {
        ButtonClickCommand = new RelayCommand(ButtonClickCommandAction);
    } 

    public void ButtonClickCommandAction(object Parameter)
    {
        //do something
    }
}
```

#### 4.Command傳遞EventArgs
透過Command Parameter，RelativeSource可以將Parameter指向自己的元件，就不用再建立一個屬性
```xml
<ToggleButton
    Command="{Binding AutoReadCommand}"
    CommandParameter="{Binding IsChecked, RelativeSource={RelativeSource Self}}"
    Content="讀Log"/>
```