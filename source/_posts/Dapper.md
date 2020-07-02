---
title: Dapper
catalog: true
date: 2020-07-02 16:15:02
subtitle:
header-img:
tags:
- C#
- Nuget
---

### 使用Dapper，不要自己刻ORM

##### nuget搜尋、安裝Dapper
##### using Dapper
```csharp
public IEnumerable<dynamic> ExecQuery(string query)
{
	try
	{
		ConnectionString = $"Data Source = {server}; Initial Catalog = {DB}; User ID = {userID}; Password ={password}";
		conn.Open();
		result = conn.Query(query);
		return result;
	}
	catch (Exception ie)
	{
		//do nothing,make AOP exceptions everywhere.
	}
	finally
	{
		conn.Close();
	}
	return null;
}
```
