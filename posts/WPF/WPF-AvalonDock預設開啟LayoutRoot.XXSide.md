# avalondock讓BottomSide預設打開
Xaml中結構長這樣
```
DockingManager
		LayoutRoot
			LayoutPanel
				LayoutAnchorablePane
					LayoutAnchorable
		LayoutRoot.BottomSide
			LayoutAnchorSide
				LayoutAnchorGroup
					LayoutAnchorable x:Name="element"
```
BottomSide中的 LayoutAnchorable 要設定屬性 
```csharp
IsSelected="True"
```
並且呼叫方法觸發UI更新
element.ToggleAutoHide();