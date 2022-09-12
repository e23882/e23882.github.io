---
title: WPF AutoComplete textbox
catalog: true
comments: true
tags:
  - C#
  - WPF
  - Chart
abbrlink: 26840
categories: uncategorized
date: 2022-09-07 14:59:24
---

## AutoCompleteTextBox
### 使用時機
因為工作需要讀取一些有特定格式的文字資料，所以開發了一個介面去Parsing資料
但是因為資料量很大所以再程式裡有做一個搜尋的功能，可以去篩選需要的欄位跟資料出來
![Use](AutoComplete.png)

結果大概長這樣，搭配一些DynamicLinq用起來很方便，可以動態的去篩選資料集中的資料
![Result](AutoComplete2.png)

### 安裝套件
AutoCompleteTextBox
[github](https://github.com/quicoli/WPF-AutoComplete-TextBox) 
![AutoCompleteTextBox](AutoNuget.png)

### 如何使用
#### C#
在專案中加入一個 AutoCompleteProvider 類別，並繼承ISuggestionProvider
```csharp
public class AutoCompleteProvider: ISuggestionProvider
{
    private readonly List<string> AutoCompleteData = new List<string>();

    public AutoCompleteProvider()
    {
        AutoCompleteData.Add("BatchNumber");
        AutoCompleteData.Add("FirmNumber");
        AutoCompleteData.Add("ReceUnit");
        AutoCompleteData.Add("SeqNumber");
        AutoCompleteData.Add("TransType");
        AutoCompleteData.Add("TranStatus");
        AutoCompleteData.Add("AccountNumber");
        AutoCompleteData.Add("TranDate");
        AutoCompleteData.Add("DebitAmount");
        AutoCompleteData.Add("UnblockAmount");
        AutoCompleteData.Add("AccountCheck");
        AutoCompleteData.Add("AmountCheck");
        AutoCompleteData.Add("UnblockAcountCheck");
        AutoCompleteData.Add("CurrencyCode");
        AutoCompleteData.Add("ClientCode");

        AutoCompleteData.Add("ClientIdno");
        AutoCompleteData.Add("AECode");
        AutoCompleteData.Add("StockNo");
        AutoCompleteData.Add("StockName");
        AutoCompleteData.Add("OriginalBlockAmount");
        AutoCompleteData.Add("OriginalBlockDate");
        AutoCompleteData.Add("OriginalBlockSerial");
        AutoCompleteData.Add(@"in ("")");
        AutoCompleteData.Add(@"and");
        AutoCompleteData.Add(@"or");
    }

    public IEnumerable GetSuggestions(string filter)
    {
        var allWord = filter.Split(' ');
        string target = allWord.Last();
        return AutoCompleteData.Where(x=>x.Contains(target)).ToList();
    }
}
```
#### Xaml
1.xaml加入命名空間
```xml
<window x:Class="MainWindow"
.
.
.
xmlns:editors="http://wpfcontrols.com/"
.
.

>
```
2.引用靜態資源
```xml
.
.
.
<Window.Resources>
    <local:AutoCompleteProvider x:Key="AutoCompleteProvider" />
</Window.Resources>
.
.

>
```
3.加入元件
```xml
<editors:AutoCompleteTextBox
    Width="797" Margin="15,0,0,0"
    Text="{Binding LinqQuery}"
    Provider="{StaticResource ResourceKey=AutoCompleteProvider}"
    SelectedItem="{Binding SelectedNumber, Mode=TwoWay, UpdateSourceTrigger=PropertyChanged}"
    Watermark="Enter a filter query">         
    <editors:AutoCompleteTextBox.LoadingContent>
        <TextBlock Margin="5" FontSize="14" Text="Loading..." />            
    </editors:AutoCompleteTextBox.LoadingContent>
</editors:AutoCompleteTextBox>
```
做完輸入文字就會跑出你有設定好要自動完成的文字hen方便，如果不行的話作者github上也有提供sample code可以參考
![Result](AutoComplete2.png)