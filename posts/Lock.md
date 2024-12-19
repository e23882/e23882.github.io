
```csharp
public static async Task<HttpResponseData> CallAPI(){}
```
專案中會有共用的async方法 如果因為特別的原因要限制他一次只允許一個執行續執行的話

```csharp
private static SemaphoreSlim semaphoreSlim = new SemaphoreSlim(1, 1);  // 最大允許1個執行緒進入

public static async Task<HttpResponseData> CallAPI()
{
    await semaphoreSlim.WaitAsync();
    //do something
    semaphoreSlim.Release();
}
```