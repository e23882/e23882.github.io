不把要異動的值寫死在xaml中

定義UI，啟動、關閉動畫的ToggleButton，ToggleButton更改的時候Border寬度會改變
## UI
```xml
<ToggleButton
	Width="200"
	IsChecked="{Binding ToggleOn}"
    Style="{StaticResource ToggleButtonStyle}" />
<ListBox ItemContainerStyle="{StaticResource ListBoxItemStyle}" ItemsSource="{Binding Data}" />
<Border
	x:Name="AnimatedPanel"
    Width="50"
    Height="50"
    Margin="10"
    Background="SkyBlue" />
```
## EventArgs
定義ViewModel要傳送到UI的事件屬性(起始寬度、結束寬度)
```csharp
public class PanelAnimationEventArgs : EventArgs
{
    public double From { get; }
    public double To { get; }

    public PanelAnimationEventArgs(double from, double to)
    {
        From = from;
        To = to;
    }
}
```


## ViewModel
UI binding的ViewModel，當toggleOn屬性改變時觸發事件，讓寬度從50變100，或從100變50
```csharp
public event EventHandler<PanelAnimationEventArgs> OnToggleChange;

 public bool ToggleOn
 {
     get
     {
         return _ToggleOn;
     }
     set
     {
         _ToggleOn = value;
         OnPropertyChanged();
         if(_ToggleOn)
             OnToggleChange.Invoke(this, new PanelAnimationEventArgs(50,100)); 
         else
             OnToggleChange.Invoke(this, new PanelAnimationEventArgs(100, 50));
     }
 }
```

## xaml.cs
在MainWindow建構子裡面hook更新事件，收到事件時才取得Border寬度要從多少變成多少，比寫死在Xaml有彈性一點點，也不會增加太多Code，Xaml的難度大幅降低
```csharp
 public MainWindow()
 {
     InitializeComponent();
     MainViewModel main = new MainViewModel();
     main.OnToggleChange += Main_OnToggleChange;
     this.DataContext = main;
 }

 private void Main_OnToggleChange(object sender, PanelAnimationEventArgs e)
{
    var animation = new DoubleAnimation
    {
        From = e.From,
        To = e.To,
        Duration = new Duration(TimeSpan.FromMilliseconds(300)),
        FillBehavior = FillBehavior.HoldEnd
    };

    AnimatedPanel.BeginAnimation(WidthProperty, animation);
}
```