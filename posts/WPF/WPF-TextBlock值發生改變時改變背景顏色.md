---
title: WPF-TextBlock值發生改變時改變背景顏色
catalog: true
tags:
  - C#
  - WPF
  - TextBlock
abbrlink: 961b0279
categories: uncategorized
date: 2020-07-02 17:28:15
subtitle:
header-img:
---
### 透過Style，當TextBlock值異動時改變背景顏色提醒使用者
#### XAML
``` xml
<Style x:Key="FlashingTextBlockStyle" TargetType="TextBlock">
	<Setter Property="Background">
		<Setter.Value>
			<SolidColorBrush Color="Transparent"/>
		</Setter.Value>
	</Setter>
	<Style.Triggers>
		<EventTrigger RoutedEvent="Binding.TargetUpdated">
			<BeginStoryboard>
				<Storyboard>
					<ColorAnimation Storyboard.TargetProperty="(TextBlock.Background).(SolidColorBrush.Color)"
							From="Orange"
							To="Transparent"
							Duration="0:0:1" />
				</Storyboard>
			</BeginStoryboard>
		</EventTrigger>
	</Style.Triggers>
</Style>
```