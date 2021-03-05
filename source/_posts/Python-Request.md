---
title: Python-Request
catalog: true
comments: true
tags:
  - Python
  - Request
abbrlink: 10923
categories: uncategorized
date: 2020-08-27 17:56:30
---

#Requests

### using library
安裝
```python
pip install requests
```
引用
```python
import requests
```
### 基本用法
```python
requests.get('url')
requests.post('url', data={'key':'value'})
```
#### 常遇到問題－Encoding
看到奇怪的字
```python
# \xe7
result.encoding = 'utf-8'
print(result.text)
#print(result.content) 會沒有用
```
---
#### Demo - Requests.Post
```python
result = requests.post("http://...", headers = localHeader, params = localParams, cookies=localCookie)
```
##### headers
動態換header<br>
```python
# import random
headerlist = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.991",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36 OPR/42.0.2393.94",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36 OPR/47.0.2631.39",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
        "Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0",
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko"]
user_agent = random.choice(headerlist)
headers = {'User-Agent': user_agent}
resp = requests.get(url, headers=headers, data=payload)
```

##### params
params是post類型的參數，會依照Header中的 Content-Type 來決定
```
Content-Type : application/x-www-form-urlencoded
```
主要會分成下面幾種
- 寫在網址後面
- Body中
  - none
  - form-data
  - x-www-form-urlencoded
  - raw
  - binary
  - GraphQL
  - 

就是要用x-www-form-urlencoded類型去送get的參數

#### cookies
取得上一個request的cookie，有些網頁會一直用同一個cookie
```python
result = requests.post(....)
cookie = r.cookies.get_dict()
```
---
#### Demo - Requests.Get
```python
requests = requests.get(url, headers=headers, data=payload)
```
##### requests參數 data
data是get的參數

