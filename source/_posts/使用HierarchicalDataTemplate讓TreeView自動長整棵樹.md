---
title: 使用HierarchicalDataTemplate讓TreeView自動長整棵樹
catalog: true
tags:
  - C#
  - WPF
  - HierarchicalDataTemplate
  - TreeView
abbrlink: 55be9099
categories: uncategorized
date: 2020-07-02 16:40:52
subtitle:
header-img:
---
### 使用HierarchicalDataTemplate讓TreeView自動長整棵樹
#### xaml
1. ViewModel會在Resource裡面產生實例(instance)

2. TreeView DataContext透過static resource，透過key值mainViewModel找到xaml中ViewModel的實例(instance)，然後把ItemSource binding到ViewModel中的DataSource屬性上
	因為DataSource是ObservableCollection所以在資料發生異動的時候，他會通知有訂閱的UI去更新畫面
	
3. HierarchicalDataTemplate 的itemsource屬性binding在DataSource.Children屬性上，Children的資料型態是 ObservableCollection，
	HierarchicalDataTemplate會自己找出子層然後生出UI
```xml
<local:DataExplorer.Resources>
	<viewmodel:VmUcPrincipalExplorer x:Key="mainViewModel"/>
</local:DataExplorer.Resources>

<TreeView DataContext="{Binding Source={StaticResource mainViewModel}}" ItemsSource="{Binding DataSource}">
	<TreeView.ItemTemplate>
		<HierarchicalDataTemplate ItemsSource="{Binding Children}">
			<StackPanel Orientation="Horizontal">
				<TreeViewItem IsEnabled="{Binding Active}" Header="{Binding Name}" Tag="{Binding Tag}"/>
			</StackPanel>
		</HierarchicalDataTemplate>
	</TreeView.ItemTemplate>
	<TreeView.ItemContainerStyle>
		<Style TargetType="{x:Type TreeViewItem}">
			<Setter Property="IsExpanded" Value="True"/>
		</Style>
	</TreeView.ItemContainerStyle>
</TreeView>
```
#### ViewModel
##### ViewModel建構子(VmUcPrincipalExplorer)
```csharp
public VmUcPrincipalExplorer()
{
	
	var dt = CallAPIGetData();
	foreach (var item in dt)
	{
		if (DataSource.Any(x => x.RowNo == item.Parent))
		{
			var parentNode = DataSource.Where(x => x.RowNo == item.Parent).FirstOrDefault();
			parentNode.Children.Add(new Node()
			{
				Name = item.Name,
				Parent = item.Parent,
				RowNo = item.RowNo
			});
		}
		else
		{
			DataSource.Add(new Node()
			{
				Name = item.Name,
				Parent = item.Parent,
				RowNo = item.RowNo
			});
		}
		
	}

}
```
##### DataSource Property
``` csharp
private ObservableCollection _DataSource = new ObservableCollection();
public ObservableCollection DataSource
{
    get
    {
        return _DataSource;
    }
    private set
    {
        _DataSource = value;
    }
}
```
##### DataModel
```csharp
public class Node: Jepun.Services.Common.Contract.AppPrincipals
{

    private int _RowNo;
    private int _Parent;
    private string _Name;
    
    public int RowNo
    {
        get{...};set{...};
    }
    
    public int Parent
    {
        get{...};set{...};
    }
    
    public string Name
    {
        get{...};set{...};
    }
    

    private ObservableCollection _Children = new ObservableCollection();
    public ObservableCollection Children
    {
        get
        {
            return _Children;
        }
        set
        {
            _Children = value;
        }
    }
}
```
##### 結果
![Result](Result.PNG)