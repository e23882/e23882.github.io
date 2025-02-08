---
title: DI注入依賴
catalog: true
comments: true
tags:
  - .Net Core
  - DI
abbrlink: 46301
categories: uncategorized
date: 2020-08-18 18:12:11
---

# 為啥要用DI
之前有寫一篇實現DIP原則，主要就是把類別的屬性、方法設計在介面中，然後讓一個類別去繼承這個介面實作出來，讓產生的實例依賴在介面上去符合DIP，使用的時候大概是長這樣
```csharp
class Program
{
    static void Main(string[] args)
    {

        ISendMail instance = new SendMail();
        instance.Send();
    }
}

public class SendMail : ISendMail
{
    //............
}

public interface ISendMail
{
    //.........
}
```
看起來是符合DIP了，程式也更有彈性，但是還是有一個new SendMail()的動作，看著還是跟SendMail類別聯繫在一起，所以就有注入依賴這個東西<br>


# 怎麼用
## 函數庫
nuget 安裝 Microsoft.Extensions.DependencyInjection
## 實際使用
我原本看網路上教學都這樣寫
```csharp
class Program
{
    static void Main(string[] args)
    {
        ServiceCollection collection = new ServiceCollection();
        collection.TryAddSingleton<ILog, Logger>();
        collection.BuildServiceProvider().GetService<ILog>().Log();
        // or 
        // ServiceCollection collection = new ServiceCollection();
        // collection.TryAddSingleton<Logger>();
        // collection.BuildServiceProvider().GetService<Logger>().Log();
    }
}

//繼承介面實做方法
public class Logger : ILog
{
    public void Log()
    {
        Console.WriteLine("do log");
    }
}

//介面中定義方法
public interface ILog
{
    public void Log();
}
```
把介面跟實做的方法注入到DI容器中，把new的動作改成每次在呼叫GetService()的時候產生實例，原本以為這樣已經很牛逼了，直到我看到了這個做法<br>

在MailServiceLogger類別中已經完全看不到實做ILog這個動作了，雖然還是跟ILog、Logger注入到同一個容器中，但這對我來說它真正的跟實做這件事情分開了
```csharp
//程式進入點
class Program
{
    static void Main(string[] args)
    {
        ServiceCollection collection = new ServiceCollection();
        collection.TryAddTransient<MailServiceLogger>();
        collection.TryAddTransient<ILog, Logger>();
        var mailserviceLogger = collection.BuildServiceProvider().GetService<MailServiceLogger>();
        mailserviceLogger.Log();

    }
}

public class MailServiceLogger
{
    private ILog _log;
    public MailServiceLogger(ILog log)
    {
        _log = log;
    }

    public void Log()
    {
        _log.Log();
    }
}

public class Logger : ILog
{
    public DateTime InstanceCreateTime { get; set; }
    public Logger()
    {
        this.InstanceCreateTime = DateTime.Now;
    }

    public string getCreateTime()
    {
        return this.InstanceCreateTime.ToString();
    }

    public void Log()
    {
        Console.WriteLine("do log");
    }
}

public interface ILog
{
    public void Log();
}
```
