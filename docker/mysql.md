### docker 安装

```
brew install docker
```

#### 一、环境说明

操作系统：window 10

工具：docker toolbox


#### 二、安装docker


#### 三、拉取mysql镜像

```
docker pull mysql
```

#### 四、启动mysql镜像
```
docker run -d -p 3306:3306 --name stbui-mysql -e MYSQL_ROOT_PASSWORD=root mysql
```

username: root

password: root

port:     3306

> 导入数据库文件
```
docker exec -i aae mysql -uroot -proot navigation < ./navigation.sql

```

#### 五、停止运行mysql镜像
```
docker stop mysql
```

#### mysql

```
mysql -uroot -proot
show databases;
create database navigation;
use navigation;
show tables;

mysql -uroot -p -e "CREATE DATABASE vcooline_ikcrm_development DEFAULT CHARSET utf8"
mysql -uroot -p -e "CREATE DATABASE ikcrm_cms_development DEFAULT CHARSET utf8"
mysql -uroot -p vcooline_ikcrm_development < t.sql
mysql -uroot -p ikcrm_cms_development < t.sql

```
#### other

```
docker cp navigation.sql aae:/tmp/

use navigation;
source /tmp/navigation.sql;



docker exec CONTAINER_ID  mysql -uroot -e "create database DATABASE_NAME"

service docker start

su -


  docker run -v /var/db:/var/db:Z rhel7 /bin/sh
```

---

```
mysql -uroot -p -e "CREATE DATABASE vcooline_ikcrm_development DEFAULT CHARSET utf8"
mysql -uroot -p -e "CREATE DATABASE ikcrm_cms_development DEFAULT CHARSET utf8"
mysql -uroot -p vcooline_ikcrm_development < t.sql
mysql -uroot -p ikcrm_cms_development < t.sql
```

http://beyondvincent.com/2016/09/10/2016-09-10-use-mysql-with-docker/

https://hsulei.com/2016/12/15/docker%E4%B9%8Bmysql%E9%95%9C%E5%83%8F%E4%BD%BF%E7%94%A8/

http://jeeinn.com/2016/08/128/

https://github.com/xiongjungit/docker-mysql
