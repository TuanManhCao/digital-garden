### Check Approach type
test ! -f "/opt/bitnami/common/bin/openssl" && echo "Approach A: Using system packages." || echo "Approach B: Self-contained installation."


### Step 1: Install The Lego Client
Note that you will need to replace the X.Y.Z placeholder with the actual version number of the downloaded archive:
```bash
d /tmp
curl -Ls https://api.github.com/repos/xenolf/lego/releases/latest | grep browser_download_url | grep linux_amd64 | cut -d '"' -f 4 | wget -i -
tar xf lego_vX.Y.Z_linux_amd64.tar.gz
sudo mkdir -p /opt/bitnami/letsencrypt
sudo mv lego /opt/bitnami/letsencrypt/lego
```

Turn off all Bitnami services:
sudo /opt/bitnami/ctlscript.sh stop


```bash
sudo /opt/bitnami/letsencrypt/lego --tls --email="cgr.koc@gmail.com" --domains="airporttransfer.ist" --domains="www.airporttransfer.ist" --path="/opt/bitnami/letsencrypt" run
```

Step 3: Configure The Web Server To Use The Let’s Encrypt Certificate
For NGINX under Approach B (Self-contained Bitnami installations):

```bash
sudo mv /opt/bitnami/nginx/conf/server.crt /opt/bitnami/nginx/conf/server.crt.old
sudo mv /opt/bitnami/nginx/conf/server.key /opt/bitnami/nginx/conf/server.key.old
sudo mv /opt/bitnami/nginx/conf/server.csr /opt/bitnami/nginx/conf/server.csr.old
sudo ln -sf /opt/bitnami/letsencrypt/certificates/DOMAIN.key /opt/bitnami/nginx/conf/server.key
sudo ln -sf /opt/bitnami/letsencrypt/certificates/DOMAIN.crt /opt/bitnami/nginx/conf/server.crt
sudo chown root:root /opt/bitnami/nginx/conf/server*
sudo chmod 600 /opt/bitnami/nginx/conf/server*
```