# 常用好用的樣式
## 浮水印textbox樣式
### 樣式
```xml
<Style x:Key="WatermarkWithTopLabelStyle" TargetType="TextBox">
    <Setter Property="Background" Value="White" />
    <Setter Property="BorderBrush" Value="#ABADB3" />
    <Setter Property="BorderThickness" Value="1" />
    <Setter Property="Padding" Value="5,3,5,3" />
    <Setter Property="VerticalContentAlignment" Value="Center" />
    <Setter Property="Template">
        <Setter.Value>
            <ControlTemplate TargetType="TextBox">
                <Grid>
                    <Border
                        x:Name="border"
                        Background="{TemplateBinding Background}"
                        BorderBrush="{TemplateBinding BorderBrush}"
                        BorderThickness="{TemplateBinding BorderThickness}"
                        SnapsToDevicePixels="True">
                        <ScrollViewer
                            x:Name="PART_ContentHost"
                            Focusable="false"
                            HorizontalScrollBarVisibility="Hidden"
                            VerticalScrollBarVisibility="Hidden" />
                    </Border>
                    <TextBlock
                        x:Name="Watermark"
                        Padding="{TemplateBinding Padding}"
                        HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}"
                        VerticalAlignment="{TemplateBinding VerticalContentAlignment}"
                        Foreground="LightGray"
                        IsHitTestVisible="False"
                        Text="{TemplateBinding Tag}"
                        Visibility="Collapsed" />
                    <TextBlock
                        x:Name="TopRightLabel"
                        Margin="0,2,5,0"
                        HorizontalAlignment="Right"
                        VerticalAlignment="Top"
                        FontSize="12"
                        Foreground="Gray"
                        Text="{TemplateBinding Tag}"
                        Visibility="Collapsed" />
                </Grid>
                <ControlTemplate.Triggers>
                    <MultiTrigger>
                        <MultiTrigger.Conditions>
                            <Condition Property="Text" Value="" />
                            <Condition Property="IsKeyboardFocused" Value="False" />
                        </MultiTrigger.Conditions>
                        <Setter TargetName="Watermark" Property="Visibility" Value="Visible" />
                    </MultiTrigger>
                    <DataTrigger Binding="{Binding Text, RelativeSource={RelativeSource Self}, Converter={StaticResource IsNullOrEmptyConverter}, ConverterParameter=Invert}" Value="True">
                        <Setter TargetName="TopRightLabel" Property="Visibility" Value="Visible" />
                    </DataTrigger>
                    <Trigger Property="IsMouseOver" Value="True">
                        <Setter TargetName="border" Property="BorderBrush" Value="#569DE5" />
                    </Trigger>
                    <Trigger Property="IsKeyboardFocused" Value="True">
                        <Setter TargetName="border" Property="BorderBrush" Value="#3C85D8" />
                    </Trigger>
                </ControlTemplate.Triggers>
            </ControlTemplate>
        </Setter.Value>
    </Setter>
</Style>
```
### 套用
```
 <TextBox Style="{StaticResource WatermarkWithTopLabelStyle}" Tag="欄位名稱" Text="{Binding StockNo, Mode=TwoWay, UpdateSourceTrigger=LostFocus}" />
```

---

## 浮水印Combobox
### 樣式
```xml
 <Style x:Key="ComboBoxWithPlaceholderStyle" TargetType="{x:Type ComboBox}">
     <Setter Property="Background" Value="Transparent" />
     <Setter Property="BorderBrush" Value="#666666" />
     <Setter Property="BorderThickness" Value="1" />
     <Setter Property="FontSize" Value="16" />
     <Setter Property="Padding" Value="5,8" />
     <Setter Property="Foreground" Value="Black" />
     <Setter Property="HorizontalContentAlignment" Value="Left" />
     <Setter Property="VerticalContentAlignment" Value="Center" />
     <Setter Property="Template">
         <Setter.Value>
             <ControlTemplate TargetType="{x:Type ComboBox}">
                 <Grid>
                     <ToggleButton
                         x:Name="ToggleButton"
                         Padding="{TemplateBinding Padding}"
                         Background="{TemplateBinding Background}"
                         BorderBrush="{TemplateBinding BorderBrush}"
                         BorderThickness="{TemplateBinding BorderThickness}"
                         ClickMode="Press"
                         IsChecked="{Binding Path=IsDropDownOpen, Mode=TwoWay, RelativeSource={RelativeSource TemplatedParent}}">
                         <ToggleButton.Template>
                             <ControlTemplate TargetType="ToggleButton">
                                 <Grid>
                                     <Border
                                         x:Name="Border"
                                         Background="{TemplateBinding Background}"
                                         BorderBrush="LightGray"
                                         BorderThickness="{TemplateBinding BorderThickness}"
                                         CornerRadius="0" />

                                     <Path
                                         x:Name="Arrow"
                                         Margin="0,0,8,0"
                                         HorizontalAlignment="Right"
                                         VerticalAlignment="Center"
                                         Data="M 0 0 L 4 4 L 8 0 Z"
                                         Fill="{Binding Path=Foreground, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}" />

                                     <ContentPresenter
                                         x:Name="ContentSite"
                                         Margin="{TemplateBinding Padding}"
                                         HorizontalAlignment="{Binding Path=HorizontalContentAlignment, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         VerticalAlignment="{Binding Path=VerticalContentAlignment, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         Content="{Binding Path=SelectionBoxItem, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         ContentTemplate="{Binding Path=SelectionBoxItemTemplate, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         IsHitTestVisible="False" />

                                     <TextBlock
                                         x:Name="Placeholder"
                                         Margin="{TemplateBinding Padding}"
                                         HorizontalAlignment="{Binding Path=HorizontalContentAlignment, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         VerticalAlignment="{Binding Path=VerticalContentAlignment, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         FontSize="16"
                                         Foreground="Gray"
                                         IsHitTestVisible="False"
                                         Text="{Binding Path=Tag, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}"
                                         Visibility="Collapsed" />
                                 </Grid>
                                 <ControlTemplate.Triggers>
                                     <Trigger Property="IsMouseOver" Value="True">
                                         <Setter TargetName="Border" Property="BorderBrush" Value="#007ACC" />
                                     </Trigger>
                                     <Trigger Property="IsEnabled" Value="False">
                                         <Setter TargetName="Border" Property="Background" Value="#E0E0E0" />
                                         <Setter TargetName="Border" Property="BorderBrush" Value="#A0A0A0" />
                                         <Setter Property="Foreground" Value="#888888" />
                                         <Setter TargetName="Arrow" Property="Fill" Value="#888888" />
                                     </Trigger>
                                     <DataTrigger Binding="{Binding Path=SelectedItem, RelativeSource={RelativeSource AncestorType={x:Type ComboBox}}}" Value="{x:Null}">
                                         <Setter TargetName="Placeholder" Property="Visibility" Value="Visible" />
                                     </DataTrigger>
                                 </ControlTemplate.Triggers>
                             </ControlTemplate>
                         </ToggleButton.Template>
                     </ToggleButton>
                     <Popup
                         x:Name="Popup"
                         AllowsTransparency="True"
                         Focusable="False"
                         IsOpen="{TemplateBinding IsDropDownOpen}"
                         Placement="Bottom"
                         PopupAnimation="Slide">
                         <Grid
                             x:Name="DropDown"
                             MinWidth="{TemplateBinding ActualWidth}"
                             MaxHeight="{TemplateBinding MaxDropDownHeight}"
                             SnapsToDevicePixels="True">
                             <Border
                                 x:Name="DropDownBorder"
                                 Background="White"
                                 BorderBrush="#888888"
                                 BorderThickness="1" />
                             <ScrollViewer Margin="4,6,4,6" SnapsToDevicePixels="True">
                                 <StackPanel IsItemsHost="True" />
                             </ScrollViewer>
                         </Grid>
                     </Popup>
                 </Grid>
                 <ControlTemplate.Triggers />
             </ControlTemplate>
         </Setter.Value>
     </Setter>
 </Style>

```

---

### 套用
```xml
 <ComboBox Style="{StaticResource ComboBoxWithPlaceholderStyle}" Tag="欄位名稱" />
```