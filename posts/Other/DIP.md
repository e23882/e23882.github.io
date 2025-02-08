---
title: DIP
catalog: true
comments: true
tags:
  - C#
  - SOLID
abbrlink: 47479
categories: uncategorized
date: 2020-08-14 15:13:20
---

## 反轉依賴原則(Dependency Inversion Principle)
### 解釋
    High-level modules should not depend on low-level modules. Both should depend on abstractions.
    Abstractions should not depend on details. Details should depend on abstractions.
### 目的
    解耦合
### 範例

```csharp
//Program類別 依賴 SendMail類別
class Program
{
    static void Main(string[] args)
    {
        SendMail instance = new SendMail();
        instance.Send();
    }
}


public class SendMail
{
    public string MailAddress { get; set; }
    public string SMTPAccount { get; set; }
    public string SMTPPassword { get; set; }

    public bool Send()
    {
        try
        {
            //do something if success return true else return false
            return true;
        }
        catch (Exception ie)
        {
            return false;
        }
    }
}
```
這樣的結果我們主要的類別Program就對SendMail類別產生依賴，，高階模組(Caller) 依賴低階模組(Callee)<br>
DIP原則說高階模組不應該依賴低階模組，應該要依賴抽象<br>
所以我們修正一下寫法<br>
為了讓Program執行寄信又要滿足依賴抽象，所以要先把SendMail類別中的方法跟屬性設計到介面中來實現這件事<br><br>
介面
```csharp
//定義原SendMail類別中的屬性和方法
public interface ISendMail
{
    public string MailAddress { get; set; }
    public string SMTPAccount { get; set; }
    public string SMTPPassword { get; set; }
    public bool Send();
}
```
實做方法
```csharp
//SendMail類別繼承介面、實做方法
public class SendMail : ISendMail
{
    public string MailAddress { get; set; }
    public string SMTPAccount { get; set; }
    public string SMTPPassword { get; set; }
    public bool Send()
    {
        return true;
    }
}
```
實際使用
```csharp
class Program
{
    static void Main(string[] args)
    {
        /*SendMail instance = new SendMail();
        instance.Send();*/
        ISendMail instance = new SendMail();
        instance.Send();
    }
}
```

### 單元測試
原本的例子中send方法會實際去執行寄信，但在測試時不應該真的執行寄信，實際寄信算是整合測試的範圍<br>
反而是要驗證寄信相關的邏輯是不是正確的，像是如果寄信失敗時要記錄失敗的原因<br>
可是如果實際寄信又需要相關的設定(smtp service、帳號、密碼....)，用這樣的設計就可以寫mock、stub物件去模擬寄信這種類型的動作
