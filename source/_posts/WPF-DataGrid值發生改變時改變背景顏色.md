---
title: WPF DataGrid值發生改變時改變背景顏色
catalog: true
date: 2020-07-02 17:28:15
subtitle:
header-img:
tags:
- C#
- WPF
- DataGrid
---

#### 透過Style，當DataGrid值異動時改變背景顏色提醒使用者
#####**NotifyOnTargetUpdated = True 要加**
``` xml
<Style TargetType="DataGridCell" x:Key="Cell">
	<Setter Property="Foreground" Value="Black"/>
	<Style.Triggers>
		<EventTrigger RoutedEvent="Binding.TargetUpdated">
			<BeginStoryboard>
				<Storyboard>
					<ColorAnimation Storyboard.TargetProperty="Background.Color" From="OrangeRed" 
					To="Transparent" Duration="0:0:1.5"/>
				</Storyboard>
			</BeginStoryboard>
		</EventTrigger>
	</Style.Triggers>
</Style>

<DataGrid ItemsSource="{Binding DataSource}" Grid.Row="1" AutoGenerateColumns="False" >
	<DataGrid.Columns>
		<DataGridTextColumn Header="ID" Binding="{Binding ID,NotifyOnTargetUpdated=True}"/>
		<DataGridTextColumn Header="Name" Binding="{Binding Name,NotifyOnTargetUpdated=True}"/>
		<DataGridTextColumn Header="Price" Binding="{Binding Price,NotifyOnTargetUpdated=True}" CellStyle="{StaticResource Cell}"/>
	</DataGrid.Columns>
</DataGrid>
```