# WPF專案中使用OxyPlot

### 套件github

```
https://github.com/oxyplot/oxyplot
```
### 好用的地方
- 可以用滾輪放大圖表
- 按滑鼠左鍵移動到圖表上可以看到值
- 有很多種圖表，想的到的幾乎都有


### 安裝套件
```
OxyPlot.Core
OxyPlot.Wpf
OxyPlot.Wpf.Shared
```

### Xaml
naming space加入引用套件
```xml
xmlns:oxy="clr-namespace:OxyPlot.Wpf;assembly=OxyPlot.Wpf"
```
顯示圖表元件
```xml
<oxy:PlotView Name="Plot1" Model="{Binding ChartModel}" />
```

### ViewModel
定義一個ChartModel讓元件綁定資料
```csharp
public PlotModel ChartModel
{
    get
    {
        return _ChartModel;
    }
    set
    {
        _ChartModel = value;
        OnPropertyChanged();
    }
}
```
初始化資料

``` csharp
public void InitialModel() 
{
    
    var model = new PlotModel
    {
        Title = "XKCD style plot(Title)",
        Subtitle = "Install the 'Humor Sans' font for the best experience",
        RenderingDecorator = rc => new XkcdRenderingDecorator(rc)
    };
    model.Series.Add(new FunctionSeries(Math.Sin, 0, 10, 50, "sin(x)"));
    ChartModel = model;
}
```

如果要多幾條線的話
```csharp
var model = new PlotModel
{
    Title = "XKCD style plot(Title)",
    Subtitle = "Install the 'Humor Sans' font for the best experience",
    RenderingDecorator = rc => new XkcdRenderingDecorator(rc)
};
model.Series.Add(new FunctionSeries(Math.Sin, 0, 10, 50, "sin(x)"));
model.Series.Add(new FunctionSeries(Math.Cos, 0, 20, 40, "cos(x)"));
model.Series.Add(new FunctionSeries(Math.Tan, 0, 30, 30, "tan(x)"));
ChartModel = model;
```