---
title: Python Selenium - 解決requests沒辦法解決的問題
catalog: true
tags:
  - Python
abbrlink: a88eb325
categories: uncategorized
date: 2020-07-02 16:02:36
subtitle:
header-img:
---

# Python Selenium - 解決requests沒辦法解決的問題

#### 安裝Selenium
```Python
pip install selenium
```
#### 安裝Driver
###### 以chrome為例子
```
下載 https://chromedriver.chromium.org/downloads
```

#### 簡單範例:
```Python
# 引用資源
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 設定chrome不顯示
chrome_options =Options()
chrome_options.add_argument('--headless')

driver = webdriver.Chrome(options=chrome_options)

# 設定網址
url = 'https://www.ip2.sg/RPS/WP/CM/SearchFastP.aspx'
driver.get(url)

# 取得指定Name屬性的標籤
keyWord = driver.find_element_by_name("ctl00$PlaceHolderMain$uclSimpleSearch$txtSearchText")
# 清除標籤內容
keyWord.clear()
# 輸入資料
keyWord.send_keys("nike")

# 取得對瀏覽器使用動作????
action = ActionChains(driver)
# 取得指定ID的標籤
idTarget = driver.find_element_by_id("slide-to-unlock-old")
# 按住標籤
action.click_and_hold(idTarget).perform()
# 移動
action.move_by_offset(50,0)
# 放開
action.release().perform()
```