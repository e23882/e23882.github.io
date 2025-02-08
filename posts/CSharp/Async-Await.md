---
title: Async/Await
catalog: true
comments: true
tags:
  - C#
  - async
  - await
abbrlink: 42023
categories: uncategorized
date: 2020-08-24 18:17:08
---
## Async、Await、Task

```csharp
static void Main(string[] args)
{
    TestService sv = new TestService();
    sv.Function();
    Console.WriteLine("done");
    Console.Read();
}


public class TestService
{
    public TestService()
    {
        
    }

    public async Task Function()
    {
        Stopwatch st = new Stopwatch();
        st.Start();
        await Task.Delay(10000);
        st.Stop();
        Console.WriteLine(st.ElapsedMilliseconds/1000);
    }
}
```

## Task更新資料
```csharp
private async void CommonFlowClickCommandAction(object obj)
{
    await Task.Run(() => CommonFlow());
}
```