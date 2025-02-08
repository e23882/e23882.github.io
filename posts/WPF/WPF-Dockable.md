---
title: WPF Dockable
catalog: true
tags:
  - C#
  - WPF
  - Dockable
abbrlink: d62fa86b
categories: uncategorized
date: 2020-07-02 19:13:32
subtitle:
header-img:
---

### 讓WPF有Dockable的功能
![Dockable](avalondock.png)

### 使用
##### Nuget安裝Wpf Toolkit
nuget搜尋WPF Toolkit，有一個作者是Xceed的就是了
![Nuget](nuget.PNG)
##### xaml加入引用資源
```xml
xmlns:avalondock="http://schemas.xceed.com/wpf/xaml/avalondock"
```
##### 實際使用

![Result](result.PNG)
```xml
<Grid>      
  <avalondock:DockingManager x:Name="mtTab" Grid.Row="0" Visibility="{Binding Render}">
    <!-- 設定Dockable元件樣式 -->
    <avalondock:DockingManager.Theme>
    <avalondock:VS2010Theme/>
    </avalondock:DockingManager.Theme>

    <!-- LayoutRoot : 在LayoutRoot中的所有元素可以互相停靠 -->
    <avalondock:LayoutRoot>
      <!-- Left side -->
      <avalondock:LayoutRoot.LeftSide>
        <avalondock:LayoutAnchorSide>
          <avalondock:LayoutAnchorGroup>
            <avalondock:LayoutAnchorable Title="Left1">
              <TextBox Text="123"/>
            </avalondock:LayoutAnchorable>
            <avalondock:LayoutAnchorable Title="Left2">
              <TextBox Text="123"/>
            </avalondock:LayoutAnchorable>
            </avalondock:LayoutAnchorGroup>
        </avalondock:LayoutAnchorSide>
      </avalondock:LayoutRoot.LeftSide>

      <!-- Right Side -->
      <avalondock:LayoutRoot.RightSide>
        <avalondock:LayoutAnchorSide>
          <avalondock:LayoutAnchorGroup>
            <avalondock:LayoutAnchorable Title="Right1">
             <TextBox Text="123"/>
            </avalondock:LayoutAnchorable>
            <avalondock:LayoutAnchorable Title="Right2">
             <TextBox Text="123"/>
            </avalondock:LayoutAnchorable>
          </avalondock:LayoutAnchorGroup>
        </avalondock:LayoutAnchorSide>
      </avalondock:LayoutRoot.RightSide>

      <!-- Center -->
      <avalondock:LayoutPanel>
        <avalondock:LayoutDocumentPane>
          <avalondock:LayoutDocument Title="Main1" >
            <TextBox Text="123"/>
          </avalondock:LayoutDocument>
          <avalondock:LayoutDocument Title="Main2" >
            <TextBox Text="123"/>
          </avalondock:LayoutDocument>
        </avalondock:LayoutDocumentPane>
      </avalondock:LayoutPanel>
    </avalondock:LayoutRoot>
  </avalondock:DockingManager>
</Grid>
```
### tips

avalondock外層的結構基本上都是
```
DockingManager
  LayoutRoot
    LayoutPanel
    LayoutRoot.XXXXSide
```
在LayoutRoot裡面的LayoutAnchorable、LayoutDocument可以停靠在LayoutRoot中的其他容器裡面

在LayoutRoot裡面可以配置上、下、左、右、中間的布局
基本的就是這幾種
```xml
<!-- 不是主要Panel類型 -->
LayoutRoot.TopSide(LayoutRoot.LeftSide、LayoutRoot.RightSide、LayoutRoot.BottomSide)
  LayoutAnchorSide
    LayoutAnchorGroup
      LayoutAnchorable Title="Type1"
        Grid
<!-- 主要Panel類型 -->
LayoutPanel
  LayoutDocumentPane
    LayoutDocument Title="Type2"
```

### 改變DockingManager裡面Tabitem的顏色
```xml
<avalondock:DockingManager.Resources>
  <Style TargetType="{x:Type avalondock:LayoutDocumentTabItem}">
    <Setter Property="Background" Value="#2D2D2F"/>
    <Setter Property="Foreground" Value="White"/>
  </Style>
  <Style TargetType="{x:Type avalondock:DockingManager}">
    <Setter Property="Background" Value="#2D2D2F"/>
  </Style>
</avalondock:DockingManager.Resources>
```
***
#### LayoutAnchorable、LayoutDocument重要屬性
```xml
<!-- 可否按X關閉(隱藏) -->
CanHide="False"
<!-- 點選TabItem打開時的預設高度 -->
AutoHideHeight="300"
```

