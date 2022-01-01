## Task: TV Series Tracker

Projeyi forklayıp `SeriesTracker.js` dosyasındaki değişiklikleri yaptıktan sonra pushlamanız yeterli. Diğer dosyalarda değişiklik yapılması gerekli değil.

### Kurulum

Projeyi kopyaladıktan sonra `npm install` komutu ile yükleyip `npm run test` komutu ile testleri çalıştırabilirsiniz.

### Çalışma Şekli

Uygulama, listenize aldığınız dizilerin izlenmiş ya da o anda izleniyor olma durumlarını saklıyor.
Aynı anda tek dizi izlenebiliyor.
`mySeriesTracker.add()` methodu ile listeye yeni bir dizi eklenir.
`mySeriesTracker.finishSerie()` methodu ile mevcut dizi izlenmiş olarak kaydedilip sıradaki dizi izlenmeye başlanır.
`mySeriesTracker.printSeriesReport()` methodu konsola dizi izleme raporunu gösterir. Bu rapor:
son izlenen, şu anda izlenen ve sıradaki dizinin isimleri ile listedeki toplam, izlenen ve henüz izlenmemiş dizilerin sayısını konsola basar.

### Görev

`SeriesTracker.js` dosyası içindeki yorum satırlarına göre SeriesTracker fonksiyonunu çalışır hale getirerek konsolda aşağıdaki ekran görüntülerindeki değerlerin çıkmasını sağlayın.
Bunu yaparken `npm run test` komutu ile testleri çalıştırarak tüm testlerin geçtiğinden emin olun.
Not: `SeriesTracker.test.js` dosyasını okuyarak istenenleri daha detaylı görebilirsiniz.

Methodları çalıştırmak için şu komutları çalıştırın:
`node method-1.js` (`mySeriesTracker.add()` methodunu çalıştırır)
`node method-2.js` (`mySeriesTracker.finishSerie()` methodunu çalıştırır)

### Ekran Görüntüleri

Beklenen Konsol Çıktıları:
![img](./expected-console-output.png)

Beklenen Test Sonuçları:
![img](./ss-tests-passed.png)
