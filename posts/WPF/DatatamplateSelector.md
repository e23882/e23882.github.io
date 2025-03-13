# DataTemplate、DataTemplateSelector
## 一般的DataTemplate用法
```xml
<Window.Resources>
    <DataTemplate x:Key="ListTemplate">
        <StackPanel>
            <TextBox Text="{Binding Name}" />
            <TextBox Text="{Binding ID}" />
            <Button
                Command="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorType={x:Type Window}}, Path=DataContext.ButtonClickCommand}"
                CommandParameter="{Binding ID}"
                Content="{Binding ButtonName}" />
        </StackPanel>
    </DataTemplate>
</Window.Resources>
.
.
.
<ListBox
    Grid.Column="0"
    ItemTemplate="{StaticResource ListTemplate}"
    ItemsSource="{Binding ListCollection}" />
```
## DataTemplateSelector
先定義要渲染的template長怎樣、有幾個，除此之外還宣告一個選擇器

### 定義Template
```xml
<Window.Resources>
    <DataTemplate x:Key="DetailTemplate1">
        <Border Padding="10" Background="LightGreen">
            <TextBlock Text="This is Template 1" />
        </Border>
    </DataTemplate>

    <DataTemplate x:Key="DetailTemplate2">
        <Border Padding="10" Background="LightCoral">
            <TextBlock Text="This is Template 2" />
        </Border>
    </DataTemplate>
    <local:TemplateSelector x:Key="DetailTemplateSelector" />
 </Window.Resources>
```

### 實作 DataTemplateSelector
```csharp
internal class TemplateSelector:DataTemplateSelector
{
    public override DataTemplate SelectTemplate(object item, DependencyObject container)
    {
        if (item is int type)
        {
            if (type == 1)
            {
                return (container as FrameworkElement).FindResource("DetailTemplate1") as DataTemplate;
            }
            else
            {
                return (container as FrameworkElement).FindResource("DetailTemplate2") as DataTemplate;
            }
        }

        return base.SelectTemplate(item, container);
    }
}
```

### 套用
```xml
<ContentControl Grid.Column="1" Content="{Binding CurrentDetailInformation.Type}" ContentTemplateSelector="{StaticResource DetailTemplateSelector}" />
```
