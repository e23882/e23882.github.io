---
title: LoadMap
catalog: true
comments: true
abbrlink: 4994
categories: uncategorized
date: 2020-12-12 12:04:28
tags:
---
# 影響效能的關鍵
```
- Dispatch.invoke被大量呼叫
- 大量DataBinding更新
- ObservableCollection頻繁Add
- itemsControl沒使用虛擬化
- Template太複雜
```

# 減輕負擔
```
- Freeze Freezable
- 降低visual tree深度
- 使用DrawingVisual取代複雜元件
- Enable/Disable Virtualization
- 減少trigger/binding
```

# 高頻UI殺手
```
- 減少new物件
- 避免Linq連鎖產生垃圾
- 使用ArrayPool、ObjectPool
- 使用Struct
- 使用Span<T>
```

# 熟練
```
- VirtualizinStackPanel
- UI Virtualization vs. Data Virtualization?
- 自訂虛擬化元件
- 精簡DataTemplate
```

# Tool
```
- dotTrace					時間線做什麼事
- dotMemory					記憶體分配
- WPF Performance Suite		髒區分析
- PerfView (看gc.thread)		
```

# Tips
```
- 關鍵邏輯加profiling
- 自動化壓力測試
- Memory leak分析
- 專案template限制錯誤用法
```
