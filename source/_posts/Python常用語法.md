---
title: Python常用語法
catalog: true
comments: true
tags:
  - Python
abbrlink: 44620
categories: uncategorized
date: 2020-08-07 18:33:23
---

# 語法
## 例外處理
```python
try:
	# do some thing
except Exception as e:
	print('error' + e.args[0])
```
## 程式進入點
```python
if __name__ == '__main__':
    # do something
```
## 字串處理
### substring
```python
Name = 'Leo1234567890'
result = Name[1:2]
print(result)
# result : e
```
### indexof
```python

Name = 'Leo1234567890'
index = Name.index('e')
print(index)
# result : 1

index = Name.index('Leo')
print(index)

# 如果找不到會有例外
index = Name.index('Lion')
```

## Class
```python
class Name(object):


    # constructor
    def __init__(self):
        print('hello')


    # MemberFunction
    def GetData(self):
        print('Do get data')
        self.CheckData()

    def CheckData(self):
        return 0
```
## 重複執行
```python
import time

while 1 == 1:
    try:
        # do something
        # sleep 60 seconds
        time.sleep(60)
    except Exception:
        # do something
```
## 取得時間
```python
datetime.now()
```

## 取得資料長度
```
data = '1234568'
result = len(data)
print(result)
#result : 7
```

## 字典
```python
dict = {
    0: 'Leo',
    1: 'Lion',
    2: 'Ben'
}
result = dict[0]
print(result)
# result : Leo

# 加入字典
dict.setdefault(3, 'Jack')
result = dict[3]
print(result)
# result : Jack
```

## Requests
### 用法
```python
headerlist = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
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
url = 'http://wsgg.sbj.cnipa.gov.cn:9080/tmann/annInfoView/annSearchDG.html'
user_agent = random.choice(headerlist)
headers = {'User-Agent': user_agent}
payload = {'page': 1, 'rows': totalRow, 'annNum': 1, 'agentName': ''}
r = requests.post(url, headers=headers, data=payload)
if r.status_code == 200:
    #do something
else:
    pass
```
### Json格式資料
```python
r = requests.post(url, headers=headers, data=payload)

if r.status_code == 200:
    result = r.json()
```
### 正規表示法檢查Json資料
```python
import re
data = 'json format data'
result = re.findall(r"\[.*\]", data)
if len(result) > 0 :
    for item in result:
        jsonData = json.loads(item)
        # do some thing
```
### Excel － openpyxl
```python
import openpyxml

# set excel file name
workbook = openpyxl.load_workbook('data.xlsx')

# Choose worksheet
worksheet = workbook['1']

for item in list(worksheet.rows):
    # print(item[2].coordinate)
    # print(item[2].value)
    for cell in item:
        print(cell.coordinate +' : '+ str(cell.value))

# Get data
print(worksheet['A1'].value)

# Set data
worksheet['A1'] = 340

# Save 
workbook.save('data.xlsx')

```

### BeautifulSoup
```
```

---
# import 
## no module named 'XXXX'
```pip
pip install LibraryName
```
## 常遇到的
### requests
```python
import requests
```
```pip
pip install requests
```
### mysql
```python
import mysql.connector
```
```pip
pip install mysql-connector-python
```

### BeautySoup
```python
from bs4 import BeautifulSoup as bs
```
```pip
pip install beautifulsoup4
```

### OpenCV
```python
import cv2
```
```pip
pip install opencv-python
```

### Tensorflow相關
我是參考這篇文章 [[機器學習 ML NOTE]YOLO!!!如何簡單使用YOLO訓練出自己的物件偵測!!! (Windows+Anaconda)](https://medium.com/%E9%9B%9E%E9%9B%9E%E8%88%87%E5%85%94%E5%85%94%E7%9A%84%E5%B7%A5%E7%A8%8B%E4%B8%96%E7%95%8C/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92-ml-note-yolo-%E5%88%A9%E7%94%A8%E5%BD%B1%E5%83%8F%E8%BE%A8%E8%AD%98%E5%81%9A%E7%89%A9%E4%BB%B6%E5%81%B5%E6%B8%AC-object-detection-%E7%9A%84%E6%8A%80%E8%A1%93-3ad34a4cac70)

tensorflow很麻煩python最高版本只能到3.7
python3.7還不能搭配太高的tensorflow，只能裝2.0.0以下的，因為2.0.0以上的版本刪掉了 tensorflow.contrib 這個函數庫

```python
# 1. 檢查是不是已經裝了tensorflow
pip list
# Package        Version
# -------------------------
# gast           0.3.3
# pip            20.1.1
# tensorflow     1.14.0
# ..........

# 1.1 可能會遇到的問題 : 如果不小心已經裝了比較高版本(2.0.0 > )的tensorflow要先移除掉
pip uninstall tensorflow

# 2. 安裝tensorflow，如果電腦裡有除了3.7以外的版本，要先檢查環境變數裡的pip是什麼版本的到目錄下
pip --version
# pip 20.1.1 from c:\users\UserName\appdata\local\programs\python\python37\lib\site-packages\pip (python 3.7)

# 3. C:\Users\UserName\AppData\Local\Programs\Python\Python37\Scripts
pip install tensorflow==1.14.0

# 4. run
# 用訓練好的模型檢查圖片
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe flow --model cfg/yolo.cfg --load bin/yolov2.weights --imgdir sample_img/
# 用訓練好的模型檢查攝影機
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe  flow --model cfg/yolo.cfg --load bin/yolov2.weights --demo camera --saveVideo

# 5.準備訓練模型環境(labelimg)
git clone https://github.com/tzutalin/labelImg
cd lableimg
pip install resources
pip install requests
pip install staty
pip install lxml
python lableimg.py
# 5.1 可能會遇到的問題 : No module named 'libs.resources'
# 執行下面指令，再把產生出來的resources.py複製到專案的labelImg\libs下
pyrcc5 -o resources.py resources.qrc

# 5.2 可能會遇到的問題 : pyrcc5 not found
pyrcc5.exe -o resources.py resources.qrc
C:\Users\UserName\AppData\Local\Programs\Python\Python37\Scripts\pyrcc5.exe -o resources.py resources.qrc

# 6.使用labelimg標記資料
C:\Users\UserName\AppData\Local\Programs\Python\Python37\python.exe D:\Backup\LeoYang\Desktop\Workspace\labelImg\labelImg.py

# 7.設定訓練模型相關資料
# 7-1 config 跟作者一樣使用 darkflow\cfg\tiny-yolo.cfg
#   7-1-1 [convolutional]
#   裡面應該只會有一行########，把####下的第二個[convolutional]中的filters改成 : 5*(5 + 標記資料時的label數量)
#   ex 我標記3個label，所以filter要改成 : 40 ( 5 * (5 + 3))
#   7-1-2 [classes]
#   裡面應該只會有一行########，把####下的[region]中的classes改成標記資料時的label數量
# 7-2 label.txt

# 8.開始訓練模型
#C:\Users\Leoyang\AppData\Local\Programs\Python\Python37\python flow --model [modelPath] --train --dataset [Labeling Image Path] --annotation [LabelImageResultPath]

C:\Users\Leoyang\AppData\Local\Programs\Python\Python37\python flow --model cfg/tiny-yolo.cfg --train --dataset D:\Backup\LeoYang\Desktop\image\traindata --annotation D:\Backup\LeoYang\Desktop\Workspace\labelImg\leodata

# 5.3 AssertionError: labels.txt and cfg/tiny-yolo.cfg indicate inconsistent class numbers
```