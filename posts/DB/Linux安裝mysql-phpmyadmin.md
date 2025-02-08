---
title: Linux安裝mysql.phpmyadmin
catalog: true
comments: true
tags:
  - ubuntu
  - linux
  - mysql
  - phpmyadmin
abbrlink: 41907
categories: uncategorized
date: 2020-08-27 18:01:55
---


### 安裝mysql、測試
#### 安裝mysql
```
sudo apt-get install mysql-server
sudo apt install mysql-client
sudo apt install libmysqlclient-dev
```

#### 檢查服務是否啟動
```
sudo lsof -i :3306
telnet localhost 3306
```
#### 設定mysql允許遠端訪問
編輯mysqld.cnf
```
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
```
把bind-address = 127.0.0.1註解掉存檔
```python
#bind-address = 127.0.0.1
```
##### vi常用指令
```
插入 I
增加 A
離開編輯模式 ESC
存檔離開 
1. shift+: 
2. wq
```


---
### 登入mysql、啟用root帳號
#### 登入
```
不用密碼
sudo mysql -u root mysql
用密碼
sudo mysql -u root mysql -p
```
#### 啟用root帳號
```sql
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
```
#### 重新載入特權表
```sql
FLUSH PRIVILEGES;
```
#### 設定root密碼
```
sudo mysql_secure_installation	
```
---
### 安裝phpmyadmin
#### 下載phpmyadmin
他應該會跳出來設定環境的畫面，沒有也沒關係之後可以再設
```
sudo apt install phpmyadmin php-mbstring php-gettext
```
#### 重啟服務
重啟服務之後ip/phpmyadmin看看有沒有看到畫面，有的話就設定好了
```
sudo systemctl restart apache2
```

#### 重設phpmyadmin設定
如果顯示404 not found的話，但是我用了之後還是404就是了
```
sudo dpkg-reconfigure phpmyadmin
```
#### 我是執行下面指令
```
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin
sudo service apache2 reload
```
---
### MySQL常見問題
#### phpmyadmin匯入資料庫跳錯誤訊息
是因為phpmyadmin有一些檔案上傳設定啥的，我們直接用command匯入
```
//本機command匯入
mysql -u root -p DBName < C:\Users\桌面\BackupFile.sql
//還是有問題的話，可能是編碼問題導致匯入中斷
mysql -u root -p --default-character-set=utf8 DBName < C:\Users\桌面\BackupFile.sql

//匯入遠端主機
mysql -u root -p -h 123.123.123.123 DBName <backup.sql

//匯入的時候跳這個 : 'xxxx is not allowed to connect to this MySQL server'
//直接把備份的sql透過FileZilla送過去
sudo apt-get install openssh-server
```


#### host Is Not Allowed to Connect to This MySQL Server
```sql
//在mysql建立帳號
CREATE USER 'UserName'@'YourIP' IDENTIFIED BY 'YourPassword'
//設定權限
GRANT ALL PRIVILEGES ON *.* TO 'UserName'@'YourIP' WITH GRANT OPTION;
//Flush
FLUSH PRIVILEGES;
```

### 可能會用到的工具
```
sudo apt install -y git curl wget zip unzip
```