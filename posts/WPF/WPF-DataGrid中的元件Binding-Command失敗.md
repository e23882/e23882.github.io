---
title: WPF DataGrid中的元件Binding Command失敗
catalog: true
tags:
  - C#
  - WPF
  - DataGrid
abbrlink: 49efdc8a
categories: uncategorized
date: 2020-07-02 17:57:07
subtitle:
header-img:
---
### WPF DataGrid中的元件Binding Command失敗
#### 原因
DataGrid因為ItemSource已經Binding ViewModel中的指定的集合屬性(DataSource)
它的xaml結構大概長這樣:
```xml
<DataGrid ItemsSource="{Binding DataSource}">
    <DataGridTemplateColumn Width="SizeToCells">
        <DataGridTemplateColumn.CellTemplate>
            <DataTemplate>
                <Button Command="{Binding ButtonClickCommand}"/>
            </DataTemplate>
        </DataGridTemplateColumn.CellTemplate>
    </DataGridTemplateColumn>
</DataGrid>
```
但是Button需要Binding ViewModel中的Command屬性，但是因為DataGrid的資料來源DataSource中沒有Command屬性，所以Bindind失敗，按按鈕才不會成功

#### 解決方式
讓Button Binding Command往外曾找這個屬性
RelativeSource Mode= FindAncestor : 找祖先
AncestorType={ x:Type Window}     : 祖先類型是Window 
因為我在CodeBehind是用 this.DataContext = viewModelO=Instance;)，所以從標籤是window中的DataContext中找要綁定的命令屬性

```xml
<DataGrid ItemsSource="{Binding DataSource}">
    <DataGridTemplateColumn Width="SizeToCells">
        <DataGridTemplateColumn.CellTemplate>
            <DataTemplate>
                <Button Command="{Binding RelativeSource={RelativeSource Mode= FindAncestor, AncestorType={ x:Type Window}}, Path=DataContext.ButtonClickCommand}"/>
            </DataTemplate>
        </DataGridTemplateColumn.CellTemplate>
    </DataGridTemplateColumn>
</DataGrid>

```