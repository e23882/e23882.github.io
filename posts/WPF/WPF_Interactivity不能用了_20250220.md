# WPF Interactivity已經不支援了

## 問題
以前在nuget還可以抓到函數庫來用，現在已經不能下載了

## 解決方案
改用nuget上的
```
Microsoft.Xaml.Behaviors.Wpf
```

## XAML
在要使用的Xaml命名空間前加下面兩行引用載入函數庫
```xml
xmlns:behaviors="clr-namespace:Microsoft.Xaml.Behaviors;assembly=Microsoft.Xaml.Behaviors"
xmlns:i="http://schemas.microsoft.com/xaml/behaviors"
```

實際上要用的地方改成類似這樣，這樣就可以繼續把奇怪的是件綁定在Command上了
```xml
<Button Content="Test">
    <i:Interaction.Triggers>
        <behaviors:EventTrigger EventName="Click">
            <behaviors:InvokeCommandAction Command="{Binding Pick15Command}" />
        </behaviors:EventTrigger>
    </i:Interaction.Triggers>
</Button>
```