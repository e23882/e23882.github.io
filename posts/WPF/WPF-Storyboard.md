---
title: WPF Storyboard
catalog: true
comments: true
tags:
  - WPF
abbrlink: 62239
categories: uncategorized
date: 2021-02-17 13:49:59
---

## WFP Storyboard

平常我們可以透過綁定事件的方式在觸發指定事件的時候，透過ViewModel中的屬性去異動畫面
```xml
<StackPanel Background="{Binding BackgroundColor}">
     <i:Interaction.Triggers>
        <i:EventTrigger EventName="MouseEnter">
            <i:InvokeCommandAction Command="{Binding UpdateColorCommand}"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</StackPanel>
```
```C sharp
public void UpdateColorCommandAction()
{
    BackgroundColor = Brushes.Black;
}
```

可是這個方法在畫面的更新是很生硬的，就是透明馬上變黑色

如果我們需要做一些慢慢變色這樣的效果這時候就可以使用StoryBoard
### StoryBoard
```xml
<StackPanel Background="Black" Grid.Row="1" Grid.Column="0" >
    <StackPanel.Style>
        <Style>
            <Style.Triggers>
                <EventTrigger RoutedEvent="Mouse.MouseEnter">
                    <BeginStoryboard>
                        <Storyboard>
                            <ColorAnimation Storyboard.TargetProperty="Background.Color" From="Black" To="Transparent" Duration="0:0:1"/>
                        </Storyboard>
                    </BeginStoryboard>
                </EventTrigger>
                <EventTrigger RoutedEvent="Mouse.MouseLeave">
                    <BeginStoryboard>
                        <Storyboard>
                            <ColorAnimation Storyboard.TargetProperty="Background.Color" From="Transparent" To="Black" Duration="0:0:1"/>
                        </Storyboard>
                    </BeginStoryboard>
                </EventTrigger>
            </Style.Triggers>
        </Style>
    </StackPanel.Style>
</StackPanel>
```

### EventTrigger
上面StoryBoard中用到的EventTrigger不是指StackPanel的事件，而是指觸發事件的行為 **Mouse.MouseEnter**
因為在IDE中，你輸入 
``` xml
<EventTrigger RoutedEvent=""> 
```
他不會自動填入有哪些Event可以選，很麻煩<br><br>

所以這裡舉幾個我個人很常用到的行為

如果你知道有其他方法可以用選的去設定RoutedEvent的值的話請告訴我，感謝
``` xml
Mouse
    Mouse.MouseEnter
    Mouse.MouseLeave

Button
    Button.Click

Binding
    Binding.TargetUpdated
```