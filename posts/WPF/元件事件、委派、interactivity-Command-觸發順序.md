---
title: 元件事件、委派、interactivity(Command)觸發順序
catalog: true
tags:
  - C#
  - WPF
abbrlink: 7580ca9d
categories: uncategorized
date: 2020-07-02 20:33:41
subtitle:
header-img:
---
#### 情境
主視窗某動作new了一個物件(ex : 視窗)的實例(instance)，在實例產生時把事件委派回主視窗
但被產生的實例本身也有寫被委派的事件,在xaml還有用Interactivity 將事件binding 到特定Command上

#### 被委派的事件(DelegatedMainWindowEvent)
```csharp
SubWindow sb = new SubWindow();
sb.close += DelegatedMainWindowEvent;
```

#### 事件
```csharp
public void Closed(object sender, EventArgs e)
{
	
}
```

#### Command
```xml
xmlns:i="clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity"
Closed="UcChooseData_OnClosed">
<i:Interactivity.Triggers>
  <i:EventTrigger EventName="Closed">
	<i:InvokeCommandAction Command="{Binding UcChooseDataOnClosed}"/>
  </i:EventTrigger>
</i:Interactivity.Triggers>
```

#### 觸發順序
1. 元件本身事件
2. 元件委派事件
3. Command