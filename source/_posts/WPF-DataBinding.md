---
title: WPF DataBinding
catalog: true
date: 2020-07-02 17:37:05
subtitle:
header-img:
tags:
- C#
- WPF
- DataBinding
---

###先定義會用到的ViewModel
```csharp
public class ViewModel : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler PropertyChanged;

    private string _Content = string.empty;
    public string Content
    {
        get
        {
            return _Content;
        }
        set
        {
            _Content = value;
            OnPropertyChanged();
        }
    }

    private bool _IsChecked = true;
    public bool IsChecked
    {
        get
        {
            return _IsChecked;
        }
        set
        {
            _IsChecked = value;
            OnPropertyChanged();
        }
    }



    public void OnPropertyChanged([CallerMemberName]string propertyName = "")
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

### 一般的DataBinding
```xml
<Textblock Text={Binding Content}/>
```

### Binding指定元件的指定屬性
```xml
<!-- 資料來源，tbContent透過CodeBehind this.DataContext = viewModelInstance; 取得ViewModel中Content屬性的資料 -->
<Textblock x:Name="tbContent" Text={Binding Content}/>
<!-- 第一種 -->
<Textblock Text={Binding Source={x:Reference tbContent}, Path=Text}/>
<!-- 第二種 -->
<Textblock Text={Binding Content, ElementName = tbContent}/>
```

### DataBinding常遇到的例外 : 引動過程的目標傳回例外狀況
一般是發生在有使用StaticResource的情況發生的

- 可能有元件屬性Binding在 布局容器的資源中先定義好ViewModel、Converter、Resource的實例(instance)但是後來拿掉了
- 或是被綁定的實例發生例外

### DataBinding失敗的預設值
- Text : null
- Brush : null
- 數值 : NAN

### DataBinding BindingMode的預設值
```xml
<CheckBox IsChecked="{Binding Path=IsSelected, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"/>
<CheckBox IsChecked="{Binding Path=IsSelected}"/>
這兩個在UI更新的時候，都會更新ViewModel中IsChecked屬性，因為CheckBox IsCheck屬性DataBinding的Mode屬性就是預設TwoWay，其他元件的屬性也會有自己的預設值
```