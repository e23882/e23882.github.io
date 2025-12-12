---
title: WPF-Textbox值發生改變時改變背景顏色
catalog: true
tags:
  - C#
  - WPF
  - Textbox
abbrlink: 961b0279
categories: uncategorized
date: 2020-07-02 17:28:15
subtitle:
header-img:
---
### 透過Style，當Textbox值異動時改變背景顏色提醒使用者
#### XAML
``` xml
<Style TargetType="TextBox">
	<Setter Property="Background" Value="Transparent" />
	<Style.Triggers>
		<EventTrigger RoutedEvent="TextBox.TextChanged">
			<BeginStoryboard>
				<Storyboard>
					<ColorAnimation
						Storyboard.TargetProperty="(TextBox.Background).(SolidColorBrush.Color)"
						From="OrangeRed"
						To="Transparent"
						Duration="0:0:1" />
				</Storyboard>
			</BeginStoryboard>
		</EventTrigger>
	</Style.Triggers>
</Style>
```