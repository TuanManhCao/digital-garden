__title__: TiddlyWiki: Pek Maharetli Bir Not Alma Uygulaması
__description__: Bu yazıda sıradışı olduğu kadar pek de maharetli bir not alma uygulaması olan TiddlyWiki'den bahsedeceğim.
__canonical__: https://www.cbsofyalioglu.com/post/not-alma-uygulamasi-tiddlywiki/

![Cover](https://www.cbsofyalioglu.com/content/images/size/w2000/2020/10/tiddly-wiki-uygulamasi.jpg)


---

Dijital Not tutma uygulamları pazar büyüklüğünün 2026 yılında 1.35 Milyar $ olacağı ön görülüyor[(1)](#references) ve her gün neredeyse yeni bir uygulama çıkıyor.

Bu yazıda sıradışı olduğu kadar pek de maharetli bir not alma uygulaması olan TiddlyWiki'den bahsedeceğim. Herkese hitap etmeyen ama hedef kitlesine girdiğinizde de çıkması kolay olmayacak bir not alma uygulaması bu.

2004 yılında ilk defa Jeremy Ruston tarafından açık-kaynak olarak dağıtılıyor. Yalnızca tek bir HTML dosyasından ibaret.

Tek bir dosya oluşu sizi yanılgıya düşürmesin. TiddlyWiki aslında kişisel bilgi yönetiminizi tamamen üzerine kurabileceğiniz, kompleks bilgi (JSON, CSV) yapılarını kullanabileceğiniz çok gelişmiş bir modüler not tutma uygulaması.

Asıl mahareti meta-programlama olan bu yazılım ile bizzat yazılımın kendisini ciddi ölçüde değiştirmeniz mümkün.


![Tek bir dosyadan oluşan TiddlyWiki'yi herhangi bir tarayıcıda kullanabilirsiniz.](https://www.cbsofyalioglu.com/content/images/size/w1000/2020/10/digital-garden.jpg)

<br/>

### **😥TiddlyWiki'nin Olumsuz Özellikleri:**
Herhangi bir program bu seviyede über-yetenekler barındırdığında genelde kullanımı kolay olmuyor. TW'de başlangıç açısından ciddi zorluklar barındırmakta. Yeni kullanıcılar ve teknik olmayan kişiler için ciddi zorluklar barındırabiliyor.

Hiç özelleştirilmemiş TiddyWiki dosyası görsel anlamda hiç de çekici değil. Tasarımı fonksiyona tercih eden kişiler için ilk başta tercih sebebi olmayacaktır.

TiddlyWiki'nin mimarisinden kaynaklanan bir sorunu var: Bir web sayfası olarak çalıştığı için yaptığınız değişiklikleri kaydederken her defasında dosyanın bulunduğu konuma seçip kaydettikten sonra tarayıcı ekranınızı tekrar yenilemeniz gerekiyor. Bunun için alternatif çözümler bulunmuş olsa da hala tüm sistemler için geçerli olabilecek bir çözüm mevcut değil. Mobil cihazınızda kullandığınız yöntem masaüstünüzde geçerli olmayacaktır. Ancak her ortam için de çözüm var diyebilirim.

<br/>

### **😍TiddlyWiki'nin Olumlu Özellikleri**
Açık kaynak ve ücretsiz olması
Büyük bir kullanıcı topluluğuna sahip olması: Yıllardır bu programı kullanan ciddi bir profesyonel-teknik kullanıcı grubu var. Karşılaştığınız problemler konusunda yardımcı olacak çok fazla kişiye ulaşmanız çok kolay.

Özelleştirmeler konusunda çok fazla alternatife sahipsiniz. Kullanıcı toplulukları çok fazla tema, makro ve plugini bir arada toplamaya çalışıyorlar. Bu kaynakları yazının sonunda paylaşacağım.

Tek bir dosya olduğundan taşınması ve transferi çok kolay oluyor.
GitHub'ınız ile senkronize edebilirsiniz.

Bir Not Alma Uygulamasından Çok Daha Fazlası
Bu program için not alma uygulaması demek pek ala onun özelliklerini göz ardı etmek demek aslında. Çünkü TiddlyWiki'yi en bilinen şekillerde:

* Not-tutma uygulaması
* Kişisel Wiki
* Yazı arşivi / bilgi-tabanı (knowledgebase)
* Database
* Sunum arşivi
* Kişisel blog gibi amaçlarla kullanabilirsiniz

<br/>

Örneğin ben bir Digital Garden olarak kullanıyorum. Eğer TiddlyWiki'nin Drift temasıyla yapılmış olan  Digital Garden'ımı incelemek isterseniz [buraya tıklayabilirsiniz](https://wiki.cbsofyalioglu.com/).

<br/>

## **TiddlyWiki'ye Giriş**

Öncelikle uygulamamızın bulunduğu sayfanın linkini paylaşayım. Pek de göze hitap etmediğini hemen fark edeceksiniz.
[TiddlyWiki](https://tiddlywiki.com/)

**1) Bilgisayarımıza İndirme**

Açılış sayfasında biraz aşağıya indiğinizde "Getting Started" başlığının altında farklı platformlar için seçeneklerin bulunduğu kısmı bulacaksınız. Biz en basit hali olan boş TW dosyasını indireceğiz.

Mavi kutu içerisinde yer alan "Download Empty" yazılı butona tıklayarak boş TiddlyWiki dosyasını bilgisayarınızda istediğiniz klasöre indirin.

![TiddlyWiki Açılış](https://www.cbsofyalioglu.com/content/images/size/w1000/2020/10/0-empty.jpg)

<br/>

**2) İlk İzlenim**

İndirdiğiniz empty.html dosyasına çift tıklayarak tarayıcınızla açabilirsiniz. Eminim ki bir çok uygulamada yaşadığınız o "sihirli an"lardan biri değil bu. Bizi karşılayan ekran içi neredeyse boş ve sizin doldurmanızı bekleyen bir TiddlyWiki ekranı.

![TiddlyWiki Açılış](https://www.cbsofyalioglu.com/content/images/size/w1000/2020/10/1-tiddlywiki-acilis-ekrani.jpg)

<br/>
<html>
<h4 style="font-weight: bold; font-size: 16px;margin-top:32px;" id="references">Referanslar: </h4>
<ul>
    <li style="font-size: 14px;">
        Global Note Taking Management Software Market By Type, By Application, By Geographic Scope, Competitive Landscape And Forecast. 
        <a rel="nofollow noopener" target="_blank" href="https://www.verifiedmarketresearch.com/product/note-making-management-software-market">
            (kaynak)
        </a>
    </li>
</ul>
</html>

Tags: #tiddlywiki, #zettelkasten-app, #tutorial, #app-review   