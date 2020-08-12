---
title: mysql在docker中应用
date: 2017-02-17 09:47:28
categories: docker
tags: [mysql, docker]
---

### docker 安装

```
brew install docker
```

### mysql 安装

```
docker pull mysql
```

> 允行 mysql 容器

```
docker run -d -p 3306:3306 --name nav-mysql -e MYSQL_ROOT_PASSWORD=root mysql
```

> 进入容器
```
docker exec -it aae /bin/bash

docker exec -i aae mysql -uroot -proot navigation < ./navigation.sql
```

### mysql 命令
```
mysql -uroot -proot

show databases;

create database navigation;

use navigation;

show tables;

```

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
