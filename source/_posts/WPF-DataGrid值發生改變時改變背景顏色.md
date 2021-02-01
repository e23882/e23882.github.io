---
title: WPF DataGrid值發生改變時改變背景顏色
catalog: true
tags:
  - C#
  - WPF
  - DataGrid
abbrlink: 961b0279
categories: uncategorized
date: 2020-07-02 17:28:15
subtitle:
header-img:
---
### 透過Style，當DataGrid值異動時改變背景顏色提醒使用者
#### XAML
``` xml
<Style TargetType="DataGridCell" x:Key="Cell">
	<Setter Property="Foreground" Value="Black"/>
	<Style.Triggers>
		<EventTrigger RoutedEvent="Binding.TargetUpdated">
			<BeginStoryboard>
				<Storyboard>
					<ColorAnimation Storyboard.TargetProperty="Background.Color"From="OrangeRed" To="Transparent" Duration="0:0:1.5"/>
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
#### ViewModel
```csharp
// DataSource
private List<DataModel.Data> _DataCollection = new List<DataModel.Data>();
public List<DataModel.Data> DataCollection
{
	get
	{
		return _DataCollection;
	}
	set
	{
		_DataCollection = value;
		OnPropertyChanged();
	}
}
```
#### DataModel
```csharp
class Data:INotifyPropertyChanged
{

	private int _Price;
	private int _Qty;
	private int _ID;

	public int Price
	{
		get
		{
			return _Price;
		}
		set
		{
			_Price = value;
			OnPropertyChanged();
		}
	}

	public int Qty
	{
		get
		{
			return _Qty;
		}
		set
		{
			_Qty = value;
			OnPropertyChanged();
		}
	}

	public int ID
	{
		get
		{
			return _ID;
		}
		set
		{
			_ID = value;
			OnPropertyChanged();
		}
	}

	public event PropertyChangedEventHandler PropertyChanged;

	public void OnPropertyChanged([CallerMemberName] string propertyName = "")
	{
		PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
	}
}
```

### 為什麼ObservableCollection<T>會更新訂閱的介面，但是都沒有觸發界面更新
```csharp

ObservableCollection<T>在集合發生異動的時候資料會自動更新訂閱的介面，但是只有在"集合"更新時，集合新增或移除資料的時候才會更新介面
ex:
	//Adding data and triggering UI updates
	main.ObservableDataCollection.Add(new DataModel.CommonData() { ID = 11, Price = 20, Qty = 30 });

	//Remove data and trigger a UI update
	main.ObservableDataCollection.RemoveAt(0);

	//****ObservableCollection did not trigger a UI updat****//
	//Modified data but did not trigger a UI update
	main.ObservableDataCollection[0].Qty = 9999;

所以上面例子裡的DataModel有繼承INotifyPropertyChanged Interface，讓訂閱ObservableCollection<T>資料集的介面，在資料集合中的"資料"異動時通知訂閱的界面更新
```

### List\<T>、ObservableCollection\<T>差異
```xml
ObservableDataCollection<T>
	資料集合在新增、移除時會發出通知，異動資料不會發出通知

List<T>
	除非T有通知的機制，不然新增、修改、刪除都不會發出通知
	所以就算用T有繼承的機制了，List<T>也只有在資料異動的時候會更新介面，但是資料集新增、刪除資料介面還是不會更新
```

