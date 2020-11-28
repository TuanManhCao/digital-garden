## Başlangıç Uygulamalarını Listele
```bash
systemctl -t service --state=active
```

## Tüm Uygulamaları Listele
```bash
systemctl -at service
```

## Uygulama Başlangıç Durumunu Aç/Kapa
```bash
sudo systemctl enable {service}
sudo systemctl enable confluence.service

sudo systemctl disable {service}
sudo systemctl disable nginx.service
```

### List All Ports with Apps

```bash
sudo netstat -peanut
```

```bash
sudo netstat -lp
```

```bash
netstat -tulpn | grep :6379
```

```bash
#Get the PID of the process
ps -u my_account -o pid,rss,command | grep redis
# then kill
sudo kill -9 the_pid
```

## Stop Redis
```bash
 /etc/init.d/redis-server stop
```

<br/>


#linux-code
