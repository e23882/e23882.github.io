---
title: WPF Binding Command
catalog: true
tags:
  - C#
  - WPF
abbrlink: d1703590
categories: uncategorized
date: 2020-07-02 20:45:58
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
專案加入參考(我visual studio 2017 community有找到,rider沒有找到)
```
System.Windows.Interactivity.dll
```
#### xaml加入Interactivity NameSpace
```xml
xmlns:i="clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity"
```
#### 元件Binding ViewModel中的Command屬性
```xml
<Button>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="MouseEnter">
            <i:InvokeCommandAction Command="{Binding ButtonClickCommand}"/>
            <!-- or  -->
            <i:InvokeCommandAction Command="{Binding ButtonClickCommand}" CommandParameter="{Binding SomeProperty}"/>
        </i:EventTrigger>
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

##### 4.1 安裝MVVMLight
nuget安裝MVVMLight
##### 4.2 xaml引用資源
```xml
xmlns:cmd="http://www.galasoft.ch/mvvmlight"
```
##### 4.3 Binding Command
```xml
<Button>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="MouseEnter">
            <!-- <i:InvokeCommandAction Command="{Binding UcChooseDataOnClosed}"/> -->
            <cmd:EventToCommand PassEventArgsToCommand="true" Command="{Binding OnKeyDown}"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</Button>
```
##### 4.4 ViewModel
```csharp
using GalaSoft.MvvmLight.CommandWpf;

public RelayCommand<object> OnKeyDown { get; set; }

public void InitCommand()
{
    OnKeyDown = new RelayCommand<object>(CommandAction);
}

public void CommandAction(object Parameter)
{
    //可以透過Parameter取得EvengArgs do something
}
```