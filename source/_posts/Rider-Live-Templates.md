---
title: Rider Live Templates
catalog: true
comments: true
tags:
  - jetbrains
  - rider
  - live templates
abbrlink: 39800
categories: uncategorized
date: 2020-08-21 13:42:03
---

## Live Templates
其實就是產生程式碼的範本，如果有一段常常要寫的程式碼要打很多次會浪費很多時間在做一樣的事情

### 怎麼用
在rider主視窗中按兩下shift，輸入live templates
![show](show.png)

可以在要寫的語言中設定常用的template，按圖片中右上角的圖案可以新增template<br>
Shortcut 是呼叫範本的代碼，在程式中輸入了代碼再按tab就會自動產生對應的程式碼範本
Refotmat 不要勾
![show](setting.png)

### 實際展示
我常寫的一段產生屬性的方法
```csharp
private string _Height;
public string Height
{
    get
    {
        return _Height;
    }
    set
    {
        _Height = value;
        OnPropertyChanged();
    }
}
```
在WPF開發時常常要寫很多屬性，這段code我真的寫了無數次

如果我們要用live templates來讓之後可以重複產生這段代碼，但是資料型態跟屬性名稱我希望可以照著我要使用的時候去設定可以這樣設定

![Demo](demo.png)

我先設定這組範本叫做ppt(ProPreTy)，再把資料型態sting 換成變數 \$Type\$，屬性名稱PropertyName換成變數\$PropertyName\$，最後再讓游標停留在\$END\$的位置<br>

在寫程式時只要打ppt再按tab就會產生出這段範本，但是我要輸入兩個變數 \$Type\$跟\$PropertyName\$

所以整個流程會是
```
ppt > tab > string > tab > Name > tab > 結束
```
