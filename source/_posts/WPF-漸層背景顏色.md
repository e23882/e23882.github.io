---
title: WPF 漸層背景顏色
catalog: true
date: 2020-07-02 18:14:45
subtitle:
header-img:
tags:
- C#
- WPF
---
```Xml
<Style TargetType="{x:Type ToggleButton}" x:Key="TogCommon">
	<Setter Property="Template">
		<Setter.Value>
			<ControlTemplate TargetType="ToggleButton">
				<Border BorderBrush="{TemplateBinding BorderBrush}" Background="{TemplateBinding Background}"/>
			</ControlTemplate>
		</Setter.Value>
	</Setter>
	<Style.Triggers>
		<Trigger Property="IsChecked" Value="True">
			<Setter Property="Background" Value="Red" />
		</Trigger>
		<Trigger Property="IsChecked" Value="False">
			<Setter Property="Background" Value="Green" />
		</Trigger>
	</Style.Triggers>
	 <Style.Triggers>
		<Trigger Property="IsChecked" Value="True">
			<Setter Property="Background">
				<Setter.Value>
					<LinearGradientBrush  StartPoint="0,0" EndPoint="0,1">
						<GradientStop Color="#00A000" Offset="0"/>
						<GradientStop Color="#00AF00" Offset="0.445"/>
						<GradientStop Color="#00A000" Offset="0.53"/>
					</LinearGradientBrush>
				</Setter.Value>
			</Setter>
			<Setter Property="Foreground" Value="White"/>
			<Setter Property="Content" Value="以上"/>
		</Trigger>
		<Trigger Property="IsChecked" Value="False">
			<Setter Property="Background">
				<Setter.Value>
					<LinearGradientBrush  StartPoint="0,0" EndPoint="0,1">
						<GradientStop Color="#FF0000" Offset="0"/>
						<GradientStop Color="#EA0000" Offset="0.445"/>
						<GradientStop Color="#CE0000" Offset="0.53"/>
					</LinearGradientBrush>
				</Setter.Value>
			</Setter>
			<Setter Property="Foreground" Value="White"/>
			<Setter Property="Content" Value="以下"/>
		</Trigger>
	</Style.Triggers>
</Style>
```