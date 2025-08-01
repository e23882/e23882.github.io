# WPF子視窗
A視窗中需要顯示B視窗讓使用者輸入值或是設定

## 結構
Window A
 WindowaAViewModel
Window B
 WindowBViewModel

## 作法
```csharp
WindowaAViewModel.ShowSubWindow()
{
    WindowB window = new WindowB();
    window.ShowDialog();
}
```

## 原因
如果用show需要hook close事件、檢查視窗是不是已經開啟....要建立很多屬性、事件來控管
ShowDialog在關閉前他都會卡在這個地方，不會讓視窗再顯示一個，方便