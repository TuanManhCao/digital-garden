## Useful docker commands. 

(source:[[AmortizedCost|http://amortizedcost.net/list-of-useful-commands-for-docker-first-timers/]])

<br/>

### Check all running containers

```bash
docker ps -a
```
<br/>

### Check created networks

```bash
docker network ps
```
<br/>

### Show all images

```bash
docker images
```
<br/>

### Login into a container as a root user

```bash
docker exec -u 0 -it CONTAINER_ID /bin/bash
```
<br/>

### Execute a command on a container without logging in

```bash
docker exec -it CONTAINER_ID cat /etc/krb5.conf  
```
<br/>

### Copy a file to/from a container
The code below will copy hosts file from a container into a current directory on your local machine

```bash
docker cp CONTAINER_ID:/etc/hosts hosts
```