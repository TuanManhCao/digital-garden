---
title: "Ghost Blog Açma Rehberi"
description: "Bu yazıda Google Cloud Platofrm hesabı kullanarak ücretsiz olarak Ghost blog nasıl açılır onu yazacağım." 
canonical: "https://www.cbsofyalioglu.com/post/ghost-blog/"
cover: "https://www.cbsofyalioglu.com/content/images/size/w2000/2020/09/ucretsiz-ghost-blog.jpg"
---


Bu yazıda Google Cloud hesabı kullanarak Ghost blog nasıl açılır onu yazacağım. Yazının sonunda Google'ın yeni kullanıcılara verdiği 300$'lık Cloud kredisini kullanarak bir seneye yakın ücret ödemeden Ghost blog kullanmaya başlamış olacağız.

Google'ın bu 300$'lık kredisini kullanmak için daha önceden Google Cloud Platform (GCP) üyeliği açılmamış bir Gmail hesabına ihtiyacımız var. 

Eğer bugüne kadar GCP kullanmadıysanız halihazırdaki hesabınızla devam edebilirsiniz. Aksi takdirde yeni bir Google hesabı açmanız gerekecek.

Hesabınız hazırsa başlayalım

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/export_canvas_ghost-blog-gcp-200802_1744.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/export_canvas_ghost-blog-gcp-200802_1744.jpg)

<br/>

## 1 - Google Cloud Hesabı ile Bitnami Ghost Paketini Yüklemek

1) Şu [linkteki](https://cloud.google.com/free/docs/gcp-free-tier) sağ tarafta bulunan "Get started for free" butonuna tıklayarak Google Cloud Platformu için bir hesap oluşturmanız gerekli. 

Buradaki işlemler sıradan kayıt işlemleri olduğu için detayına girmiyorum. 

Üyeliğinizi tamamlamadan bir sonraki adıma geçmeyin lütfen.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/_0-get-started-for-free.png](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/_0-get-started-for-free.png)

2) Üyeliğinizi tamamladınız ve artık Home ekranındasınız. Sol taraftaki hamburger menü butonuna (3'lü yatay çizgi) tıklayarak GCP menüsünü açın ve Marketplace menüsüne tıklayın.

 

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/1-marketplace-sec.png](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/1-marketplace-sec.png)

3) Burada GCP altyapısını kullanarak size hizmet verebilen platform ve uygulamaların listesiyle karşılaşacaksınız. Yukarıdaki arama kutucuğuna Ghost yazın ve **Ghost Certified by Bitnami** seçeneğini seçin.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/2-ghost-bitnami-sec.png](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/2-ghost-bitnami-sec.png)

4) Açılan ekranda Bitnami'nin GCP için hazırladığı ve entegre edilmiş uygulamalar yığını hakkında bilgiler göreceksiniz. 

Aylık yaklaşık olarak 15$' a karşılık gelen bir maliyet ile  Ghost bloğumuzu açacağız. Bu maliyetin ilk senesi bize Google tarafından hediye edilmiş olacak. 

Açılan ekrandaki "Launch" butonuna tıklayarak yükleme işlemini başlatın. Bu işlem (deployment) bir kaç dakika sürebilir.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/3-Launch.png](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/3-Launch.png)

5) Yükleme işlemi bittikten sonra karşınıza şuna benzer bir ekran gelmesi lazım. Sağ tarafta Ghost bloğunuzun IP adreslerini ve ilk giriş için kullanacağınız kullanıcı adı ve parolasını bulacaksınız. 

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/4-panel.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/4-panel.jpg)

6) IP Adresleri arasından Admin URL'e tıklayın. Ardından açılan üye giriş paneline ise Admin user ve Admin password bilgilerinizi girin. Artık Ghost bloğunuzu aktif etmiş bulunmaktasınız. Admin şifresini ve bilgilerini değiştirmeyi de unutmayın. 

Ardından ister bir önceki ekranda bulunan Site address'e isterseniz de yeni açılan Ghost admin panelinin sol üstünde bulunan "View Site" butonuna tıklayarak Ghost bloğunuzun ana sayfasını görebilirsiniz.

Bloğumuz aktif oldu ve çalışıyor. Şu an için sadece belirtilen IP adresinden erişim sağlanabiliyor. Bir  sonraki bölümde kendi alan adımızı nasıl bu belirtilen IP adresine yönlendireceğimizi anlatacağım.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/5-admin-panel.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/5-admin-panel.jpg)

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/6-ghost-kuruldu.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/6-ghost-kuruldu.jpg)



<br/>


## 2 - Özel Alan Adınızı (Domain'inizi) GCP'ye Yönlendirme

1) Tekrardan [GCP ana sayfanıza](https://console.cloud.google.com/home/dashboard) dönün ve sol üstteki menüleri seçeceğimiz ekranı açan hamburger butonuna tıklayınız.

Açılan menülerden sırasıyla **NETWORKING** —> **VPC network** —>  **External IP addresses** 'i takip ederek **External IP addresses**'a tıklayın.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-1-External%20IP.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-1-External%20IP.jpg)

 

2) Açılan ekranda RESERVE STATIC ADDRESS seçeneğini tıklayarak Google'dan bize statik bir IP adresi tahsis etmesini isteyeceğiz. Statik IP adresimize bir isim verip daha önceden yüklemesini yaptığımız Ghost için ayrılan kaynağa atama (attached to ...) yapacağız. 

Böylelikle Ghost bloğumuzun IP adresi sabit kalmış olacağından özel alan adımızı bu IP adresine rahatlıkla yönlendirebileceğiz. Bu işlemi bitirdikten sonra statik IP adresimizi bir yere not edelim ya da yazılı olduğu ekranı kapatmayalım. Bir sonraki adımda bu statik IP adresini kullanacağız.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-2-statik-isim.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-2-statik-isim.jpg)

3) Alan adımızı satın aldığımız firmanın sitesine gidip alan adımızın DNS ayarlarını yönetebileceğimiz sayfayı seçelim. 

Eğer alan adınızı GoDaddy'den almışsanız GoDaddy'e gidin lütfen. Ben alan adımı Wix üzerinden almıştım o yüzden Wix üzerinden bir gösterim yapacağım. 

Daha önce bu alan adımı Wix üzerinden kullanıyordum. Wix apex-domain ile alan adını kullanmaya izin vermediği için, yani yalnızca www ile başlayan şekilde kullanıma izin verdiği için yönlendirmesini yapacağım ana alan adım da www ile başlayan alan adım olacak.  

Yani bu işlemin ardından www.canburaks.com alan adını Ghost bloğun olduğu IP adresine yönlendireceğim. (Diğer seçenek ise başında www olmayan seçenek)

Aşağıda görüleceği üzere, alan adı sağlayıcınızın DNS ayarları kısmına gidip bir **A Kaydı** ve bir **CNAME kaydı** oluşturmanız gerekecek. 

A kaydınızın Host kısmı apex domaininiz olacak şekilde (yani canburaks.com ya da izin vermiyorsa @.canburaks.com ya da @canburaks.com gibi seçenekleri deneyebilirsiniz) girin. Değer (Value) kısmına da bir önceki adımda kaydettiğimiz statik IP adresini girmelisiniz.

CNAME kaydınızın Host kısmını www ile başlayan alan adınız, Değer kısmını da www'suz alan adınız olacak şekilde girin ve ayarlarınızı kaydedin. DNS ayarlarınızın yayılması 48 saati bulabilir dense de yarım saate hızlı bir şekilde yayılması muhtemel. 

Sadece başka bir browser ile denemenizi ya da ön belleği boşalttıktan sonra tekrar kontrol etmenizi tavsiye edebilirim. Bir sonraki adıma geçmek için DNS yayılmasını beklememize gerek yok. Şimdi gerekli bir kaç ayarı yapıp ayrıca HTTPS bağlatısını zorunlu kılacağız ki bloğumuz her daim güvenli bir bağlantı üzerinden çalışsın.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-3-wix-a-kayd%C4%B1.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-3-wix-a-kayd%C4%B1.jpg)

## 3 - Ghost Blog ve Gelişmiş Ayarlar

1) Tekrar GCP ana sayfamıza dönelim. Sol tarafta Resources (Kaynaklar) başlığı altındaki Compute Engine seçeneğine tıklayın. Daha sonra açılan sayfadaki ghost-bloğun olduğu makineyi seçin.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-3.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-3.jpg)

2) Yeni açılan sayfadaki SSH butonu olması lazım. Bu buton bize Ghost blogun yüklü olduğu ve onu çalıştıran makineye uzaktan bağlanabilmemizi sağlayacak buton. SSH tuşuna basın ve yeni açılacak pencerenin yüklenmesini bekleyin. Şekildeki ekranla karşılaştığınızda Ghost'un olduğu bilgisayara uzaktan erişim sağlamış bulunmaktasınız demektir. Sonraki adımlarda bu kabuk (shell) üzerinden işleteceğimiz bir kaç komut olacak.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-4-ssh-screen.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-4-ssh-screen.jpg)

3) Bu adımda alan adımızı Ghost'a tanıtacağız. Daha önceden www ile başlayan alan adımı kullanacağımı belirtmiştim. SSH ile bağlandığımız ekranda aşağıdaki komutu ve kullanmak istediğiniz alan adını giriniz.

```bash
sudo /opt/bitnami/apps/ghost/bnconfig --machine_hostname www.cbsofyalioglu.com
```

4) Daha sonra bu ayar ekranını bir başka isim altında kaydedeceğiz ki, yeniden başlatıldığında ayarlarımız değişmesin.

```bash
sudo mv /opt/bitnami/apps/ghost/bnconfig /opt/bitnami/apps/ghost/bnconfig.back
```

5) Aşağıdaki komutu girdikten sonra açılan ekrandaki "url" kısmının karşısındaki adreste bazı değişiklikler yapacağız. Öncelikle http olan adresi http**s** yapacağız ki güvenli bağlantı üzerinden blogumuzu işletelim. Ardından da gene adres kısmında olan 80'i kaldıracağız. 

Daha sonra CTRL+X'e basarak ardından da Y'ye basarak değişiklikleri kaydedin. 

Son "url" değerinin aşağıdaki fotoğraftaki gibi olmasına dikkat ediniz.

```bash
sudo nano /opt/bitnami/apps/ghost/htdocs/config.production.json
```

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-5.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-5.jpg)

6) Tekrardan SSH ile bağlantı ekranına döndüğümüze göre, şimdi otomatik olarak yüklü gelen Bitnami bannerını kaldıracağız. Aşağıdaki komutları sırasıyla girip Bitnami bannerını kaldırın.

```bash
sudo /opt/bitnami/bnhelper-tool 
```


Daha sonra →Remove the Bitnami Banner'ı seçip enter →Daha sonra ESC ve QUIT + ENTER

7) Şimdi ise Bitnami tarafından diğer alan adı ayarlarının yapımını sağlayacağız. Aşağıdaki komutu girdikten sonra  **Set up Let's Encrypt** seçeneğini seçin ve karşınıza çıkan sorulara cevap vererek SSL sertifikanızı onaylatın. Bu adımların sırasında hangi alan adını hangi şekliyle kullanacağınız da dahil olmak üzere önemli seçenekleri dolduracaksınız. Tüm bunları tamamlayın.

![https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-6-SSL-activate.jpg](https://cbsofyalioglucom.imfast.io/ghost-blog-gcp/DNS-6-SSL-activate.jpg)



8) Tüm bu işlemleri yaptıktan sonra aşağıdaki komut ile Apache serverınızı, MySQL veritabanınızı ve Ghost blogunuzu yeniden başlatacaksınız.

sudo /opt/bitnami/ctlscript.sh restart

9) Blogunuz artık kullanıma hazır. Son bir meta etiketi eklemesi yapılmasını gerekli görüyorum. Bu meta etiketi http bağlantıları https'e zorunlu olarak yükseltmeye yarayacak. Ghost admin panelinizi açın ve sol alt taraftaki Code Injection kısmına tıklayın.  

Site Header kısmına şu aşağıdaki kodu ekleyin:

<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">



Bir sene boyunca ücret ödemeden kullanabileceğiniz Ghost blogunuz artık hazır. Güle güle kullanmanızı dilerim.





