
## 專案結構
```
              reference                  reference
BaseControl -------------->   Control  -------------->  StartUp
Project                      Project                    Project
```

## 問題
在.net framework 4.8中可以正常看到元件，但升級到.net8之後元件都沒有正常顯示

只看的到元件的名稱，但元件套用的樣式都沒有顯示出來


## 解決方式

在BaseProject中的某個元件的code behinde中加入
```c sharp
[assembly: ThemeInfo(
    ResourceDictionaryLocation.None,
    ResourceDictionaryLocation.SourceAssembly
)]
```

## 範例

### Before
```c sharp
using System;
using System.Linq;

namespace Project.Controls
{
    public class ControlName:System.Windows.Controls.Control
    {
        public Style InnerStyle{.....}
        .
        .
        .

    }
}
```


### After

在內容中加入assembly: ThemeInfo

```c sharp
using System;
using System.Linq;


[assembly: ThemeInfo(
    ResourceDictionaryLocation.None,
    ResourceDictionaryLocation.SourceAssembly
)]

namespace Project.Controls
{
    public class ControlName:System.Windows.Controls.Control
    {
        public Style InnerStyle{.....}
        .
        .
        .

    }
}
```