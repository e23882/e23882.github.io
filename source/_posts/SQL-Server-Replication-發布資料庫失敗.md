---
title: SQL Server Replication 發布資料庫失敗
catalog: true
comments: true
tags:
  - SQL
abbrlink: 62900
categories: uncategorized
date: 2020-12-10 15:13:30
---
## SQL Server Replication 發布資料庫失敗


### 環境 
Windows Server 2016 Standard
### 版本 
Microsoft SQL Server 2019 (RTM) - 15.0.2000.5 (X64)   Sep 24 2019 13:48:23   Copyright (C) 2019 Microsoft Corporation  Developer Edition (64-bit) on Windows Server 2016 Standard 10.0 <X64> (Build 14393: ) (Hypervisor) 

[我是參考這篇MSDN上的回答](https://docs.microsoft.com/zh-tw/archive/blogs/sqlserverfaq/snapshot-agent-fails-with-error-241-severity-16-state-1-conversion-failed-when-converting-date-andor-time-from-character-string)

---
### 錯誤訊息: 
```
Message: 資料查詢失敗
Stack:    at Microsoft.SqlServer.Replication.Snapshot.SqlServer.NativeBcpOutProvider.ThrowNativeBcpOutException(CConnection* pNativeConnectionWrapper)
   at Microsoft.SqlServer.Replication.Snapshot.SqlServer.NativeBcpOutProvider.BcpOut(String strBcpObjectName, String strBcpObjectOwner, String strBaseBcpObjectName, Boolean fUnicodeConversion, String strDataFile, String strLoadOrderingHint, String strWhereClause, Boolean useTableLockHint, Int32 bcpFileFormatVersion)
   at Microsoft.SqlServer.Replication.Snapshot.SqlServer.BcpOutThreadProvider.DoWork(WorkItem workItem)
   at Microsoft.SqlServer.Replication.WorkerThread.NonExceptionBasedAgentThreadProc()
   at Microsoft.SqlServer.Replication.AgentCore.BaseAgentThread.AgentThreadProcWrapper() (來源: MSSQLServer，錯誤號碼: 0)
取得說明: http://help/0
Message: Conversion failed when converting date and/or time from character string.
Stack:  (來源: MSSQLServer，錯誤號碼: 241)
取得說明: http://help/241
```
![Publish Fail](ReplicationQ.PNG)

只要在設定發布集的時候，設定條件
```SQL
where 1 = 1
```
![Solution](ReplicationSolution.PNG)
