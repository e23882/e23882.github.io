---
title: WPF TextBox浮水印
catalog: true
date: 2020-07-02 18:16:17
subtitle:
header-img:
tags:
- C#
- WPF
---
```xml
<TextBox>
	<TextBox.Style>
		<Style TargetType="TextBox" xmlns:sys="clr-namespace:System;assembly=mscorlib">
			<Style.Resources>
				<VisualBrush x:Key="CueBannerBrush" AlignmentX="Left" AlignmentY="Center" Stretch="None">
					<VisualBrush.Visual>
						<Label Content="浮水印顯示文字" Foreground="LightGray" />
					</VisualBrush.Visual>
				</VisualBrush>
			</Style.Resources>
			<Style.Triggers>
				<Trigger Property="Text" Value="{x:Static sys:String.Empty}">
					<Setter Property="Background" Value="{StaticResource CueBannerBrush}" />
				</Trigger>
				<Trigger Property="Text" Value="{x:Null}">
					<Setter Property="Background" Value="{StaticResource CueBannerBrush}" />
				</Trigger>
				<Trigger Property="IsKeyboardFocused" Value="True">
					<Setter Property="Background" Value="White" />
				</Trigger>
			</Style.Triggers>
		</Style>
	</TextBox.Style>
</TextBox>
```