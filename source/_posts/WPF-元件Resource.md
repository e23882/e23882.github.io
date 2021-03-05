---
title: WPF Resource用法
catalog: true
tags:
  - C#
  - WPF
  - Resource
abbrlink: 16f5df77
categories: uncategorized
date: 2020-07-02 20:38:21
subtitle:
header-img:
---
## Resource類型
### Resource Property
#### Style
```xml
<Window>
	<!-- 定義checkbox樣式 CheckBoxStyle-->
	<Window.Resources>
		<Style TargetType="{x:Type CheckBox}" x:Key="CheckBoxStyle">
			<Setter Property="Background" Value="Red"/>
		</Style>
	</Window.Resources>
	<!-- 套用樣式CheckBoxStyle -->
	<CheckBox IsChecked="{Binding Path=Data.Result}" Style="{StaticResource CheckBoxStyle}"/>
</Window>
```
#### Template 
```xml
<Window>
	<Windows.Resource>
		<!-- 定義DataTemplate service -->
		<Datatemplate x:key="service">
			<Textbox Text="{Binding ServiceName}"/>
		</Datatemplate>
	</Windows.Resource>
	<!-- Listbox Itemtamplate屬性 套用 service datatemplate -->
	<ListBox ItemTemplate="{StaticResource Service}" itemsource="{binding DataSource}"/>
</Window>
```
#### 宣告靜態資源
```xml
<Window>
	<Windows.Resource>
		<!-- 在Resource 中宣告ViewModel Instance -->
		<local:ViewModel x:Key="MainData">
	</Windows.Resource>
	<Grid DataContext="{Binding Source={StaticResource MainData}}">
		<!-- .... -->
	</Grid>
</Window>
```
### Global Resource
#### App.Xaml
	把Resource寫到App.xaml,這樣專案下的所有元件都可以用

### Resource Dinctionary
#### Dictionary.xaml
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                    xmlns:local="clr-namespace:yourproject">
    
</ResourceDictionary>
```
### Resource Dictionary