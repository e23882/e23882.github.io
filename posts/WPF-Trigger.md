---
title: WPF Trigger
catalog: true
comments: true
tags:
  - WPF
abbrlink: 36678
categories: uncategorized
date: 2021-02-17 14:33:04
---
## Trigger

### DataTrigger
```xml
<TextBlock x:Name="tbText"/>
<StackPanel Background="Black">
    <StackPanel.Style>
        <Style>
            <Style.Triggers>
                <DataTrigger Binding={Binding ElementName=tbText, Path = Text} Value="Yes"/>
                    <Setter Property="Background" Value="Red"/>
                </DataTrigger>
                <DataTrigger Binding={Binding ElementName=tbText, Path = Text} Value="No"/>
                    <Setter Property="Background" Value="Blue"/>
                </DataTrigger>
            </Style.Triggers>
        </Style>
    </StackPanel.Style>
    <Button Content="123"/>
</StackPanel>
```
### EventTrigger
```xml
<StackPanel Background="Black">
    <StackPanel.Style>
        <Style>
            <Style.Triggers>
                <EventTrigger RoutedEvent="Mouse.Enter">
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
    <Button Content="123"/>
</StackPanel>
```
### Trigger
```xml
 <TextBlock Text="Hello, styled world!" FontSize="28" HorizontalAlignment="Center" VerticalAlignment="Center">
    <TextBlock.Style>
        <Style TargetType="TextBlock">
            <Setter Property="Foreground" Value="Blue"></Setter>
            <Style.Triggers>
                <Trigger Property="IsMouseOver" Value="True">
                    <Setter Property="Foreground" Value="Red" />
                    <Setter Property="TextDecorations" Value="Underline" />
                </Trigger>
            </Style.Triggers>
        </Style>
    </TextBlock.Style>
</TextBlock>
```