
# Redis常用語法

## 1.取得目前DB所有Key
```csharp
ConnectionMultiplexer Redis = ConnectionMultiplexer.Connect($"{Host}:{Port},password={Password}");
IServer Server = Redis.GetServer(Host, int.Parse(Port));
var result = Server.Keys(DBIndex, pattern: "*", pageSize: 100);
foreach (var key in result)
{
    Console.WriteLine(key);
}
```

```
123
124
125
126
.
.
.
```
## 2.取得目前連上Redis中所有的DB
```csharp
ConnectionMultiplexer Redis = ConnectionMultiplexer.Connect($"{Host}:{Port},password={Password}");
IServer Server = Redis.GetServer(Host, int.Parse(Port));
Console.WriteLine(Server.DatabaseCount);
```

```
30
```
## 3.依照DB Key取出Key中對應的Key Value
```csharp
ConnectionMultiplexer Redis = ConnectionMultiplexer.Connect($"{Host}:{Port},password={Password}");
IDatabase DB = redis.GetDatabase(DBIndex);
//這裡的Key是上面範例1的Value
HashEntry[] hashEntries = DB.HashGetAll(SelectedKey);
 

foreach (var item in hashEntries)
{
   Console.WriteLine($"item.Name.ToString(), item.Value.ToString()");
}

```
```
PropertyA   1
PropertyB   2
PropertyC   3
PropertyD   4 
.
.
.
```

## 4.訂閱指定DB
Redis的值異動的時候會觸發事件
```csharp
ConnectionMultiplexer Redis = ConnectionMultiplexer.Connect($"{Host}:{Port},password={Password}");
ISubscriber Subscriber = Redis.GetSubscriber();
// 訂閱頻道
Subscriber.Subscribe("FOLO.*", (channel, message) =>
{
    HandleRedisMessage(channel.ToString(), message);
});
```