---
title: WPF 套用Metro樣式
catalog: true
tags:
  - C#
  - WPF
  - MahApps
  - Metro Style
abbrlink: c3a3a6d2
categories: uncategorized
date: 2020-07-02 19:16:16
subtitle:
header-img:
---

#### Nuget安裝MahApps相關套件
```xml
MahApps.Metro.IconPacks
MahApps.Metro.Metro
MahApps.Metro.Resources
```
### 主程式(MainWindow.xaml)套用MahApp樣式
#### Xaml
```xml
xmlns:Controls="clr-namespace:MahApps.Metro.Controls;assembly=MahApps.Metro"
```
#### CodeBehind
###### **WindowName:MetroWindow**
```csharp
using MahApps.Metro.Controls;

public partial class WindowName:MetroWindow
```
### 調整App.xaml
加入樣式
``` xml
<ResourceDictionary>
    <ResourceDictionary.MergedDictionaries>
        <ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Controls.xaml" />
        <<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Fonts.xaml" />
        <<<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Colors.xaml" />
        <<<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Accents/Blue.xaml" />
        <<<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Accents/BaseLight.xaml" />
    <</ResourceDictionary.MergedDictionaries>
</ResourceDictionary>
```
### 結果
![Mahapps](Mahapps.PNG)