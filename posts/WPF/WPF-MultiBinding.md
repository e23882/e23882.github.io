---
title: WPF MultiBinding
catalog: true
comments: true
tags:
  - WPF
  - DataBinding
abbrlink: 42547
categories: uncategorized
date: 2020-08-31 18:56:05
---

## MultiBinding
有時候會要寫什麼值等於多少<br>
可以用兩個元件來解決，但是這樣就要多寫一個元件，不是很聰明
```xml
<TextBlock Text="資料筆數 ">
<TextBlock Text="{Binding Count}">
```
<br>
或是在ViewModel裡面處裡掉，可是這樣這個屬性就沒有辦法跟其它屬性共用
```csharp
private string _Count = string.Empty;
public string Count
{
    get
    {
        return $"資料筆數 {_Count}";
    }
    set{.....}
}
```

### MultiBinding 優雅解決問題

```xml
<TextBlock>
    <TextBlock.Text>
        <MultiBinding StringFormat="{}資料筆數 {0}">
            <Binding Path="Count"/>
        </MultiBinding>
    </TextBlock.Text>
</TextBlock>
```