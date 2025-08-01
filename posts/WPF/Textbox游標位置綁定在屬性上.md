
# Textbox游標位置綁定在屬性上

會用到這個需求是因為要做一個設定時間的元件像是: 11:20:13
在時間的時、分、秒按上下要讓時間加一

## 1.建立Textbox behavior
TextBoxIndexBehavior.cs
```csharp
public class TextBoxCaretIndexBehavior : Behavior<TextBox>
{
    public static readonly DependencyProperty CaretIndexProperty =
        DependencyProperty.Register(
            "CaretIndex",
            typeof(int),
            typeof(TextBoxCaretIndexBehavior),
            new FrameworkPropertyMetadata(0,
            FrameworkPropertyMetadataOptions.BindsTwoWayByDefault, OnCaretIndexChanged));

    public int CaretIndex
    {
        get { return (int)GetValue(CaretIndexProperty); }
        set { SetValue(CaretIndexProperty, value); }
    }

    private static void OnCaretIndexChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        var behavior = (TextBoxCaretIndexBehavior)d;
        if (behavior.AssociatedObject != null)
        {
            var textBox = behavior.AssociatedObject;
            var newIndex = (int)e.NewValue;

            if (textBox.CaretIndex != newIndex)
                textBox.CaretIndex = newIndex;
        }
    }

    protected override void OnAttached()
    {
        base.OnAttached();
        if (AssociatedObject != null)
            AssociatedObject.SelectionChanged += OnSelectionChanged;
    }

    protected override void OnDetaching()
    {
        if (AssociatedObject != null)
            AssociatedObject.SelectionChanged -= OnSelectionChanged;

        base.OnDetaching();
    }

    private void OnSelectionChanged(object sender, RoutedEventArgs e)
    {
        var textBox = (TextBox)sender;
        if (CaretIndex != textBox.CaretIndex)
            CaretIndex = textBox.CaretIndex;
    }
}
```

## 2.Xaml
把textbox游標位置屬性透過behavior綁定到ViewModel中的屬性上
```xml
xmlns:i="clr-namespace:System.Windows.Interactivity;assembly=System.Windows.Interactivity"
xmlns:localBehaviors="clr-namespace:ProjectName.Utility"
<TextBox
    Text="{Binding LastOrderTime}">
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="KeyUp">
            <i:InvokeCommandAction Command="{Binding LastOrderKeyUpCommand}" />
        </i:EventTrigger>
    </i:Interaction.Triggers>
    <i:Interaction.Behaviors>
        <localBehaviors:TextBoxCaretIndexBehavior CaretIndex="{Binding LastOrderTimeIndex, Mode=TwoWay}" />
    </i:Interaction.Behaviors>
</TextBox>
```
## 3.ViewModel
```csharp
private int _LastOrderTimeIndex;
public int LastOrderTimeIndex
{
    get { return _LastOrderTimeIndex; }
    set { SetProperty(ref _LastOrderTimeIndex, value); }
}
```

## 4.要注意
設定完textbox的text，index會變成0的位置，所以更新前要先記錄起來，更新完之後再設定回去
```
public void AddTime()
{
    //更新前先記錄原本游標index
    var beforeUpdateIndex = EndTimeIndex;

    //更新屬性 通知介面更新
    _EndTimeInstance = AdjustTime(_EndTimeInstance, EndTimeIndex, 1, false);
    OnPropertyChanged(nameof(EndTime));

    //在把index設定回原本的位置
    EndTimeIndex = beforeUpdateIndex;
}
```