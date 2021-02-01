---
title: MS-SQL Temp Table
catalog: true
tags:
  - SQL
abbrlink: d825a7ba
categories: uncategorized
date: 2020-07-02 15:54:53
subtitle:
header-img:
---
# MS-SQL  Temp Table
##### #TempTable
資料表真的會存在資料庫裡面,要完要記得Drop掉
```SQL
CREATE TABLE #temp
(
	Pno			int,
	Sno			int,
	Qty			decimal(19,5),
	Cost			decimal(19,5),
	[Date]			date,
	Profit			decimal(19,5),
	ClosePrice		decimal(19,5)
)

-- do something

drop table #temp
```
##### @TempTable
在預存程序裡面,用完之後過15秒就會自己drop掉了,很方便
```SQL
DECLARE  @temp AS TABLE
(
    ID BIGINT,
    [NAME] NVARCHAR(20)
)
```