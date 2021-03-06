# rancheros 安装

### 实现环境

- VMware® Workstation 12 Pro 12.5.6 build-5528349
- rancheros-1.0.4-docker-17.03.1-ce-Linux-4.9.40

### VMware

修改 root 密码

```
sudo bash
passwd rancher
```

### ssh 连接

ssh rancher@192.168.1.22

添加 _cloud-config_ 文件

```
vi cloud-config.yml
```

添加内容：

```

hostname: rancheros-stbui

ssh_authorized_keys:
  - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDXi7gAB95U3Wjrh9OzToqIzKTFISipLJylAHCzpm4KlV25dDheGSL+RuonDTK0uSDbqMiw0Kg85pdkcDfdmZ+bX8LCRbwazSwM9C/xHTgoa0DRhy/VDb7SmZQ10aSwOTQPelyL3rN71e3oXdFZ35KVJTWXtKoLNSU0A856jPCVR4fiIZUK7iMDGl6XKJKiG63lYBrswzTnfMiC9EDuU1n3gHJk1jToO/Q46sif2pgc0ZQmeUmkngM/vvLyYYChXd6z7JTm9o3vZAmCuyHlAma1m3qDElQF4EMYNgvxx45xVzx5UitQQcq0ujYXhb7KzsGmLWsdm29onqwT0T7Jd2ed stbui@stbui.com
```

```
sudo ros install -c cloud-config.yml -d /dev/sda
```

### ssh 秘钥生成

```
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pud
```
