# Horse Racing

Bu proje, bir **At Yarışı Simülasyonu**'dur. Kullanıcılar, her sayfa yenilendiğinde rastgele olarak 20 atın oluşturulacağı bir yarış ortamına adım atar.

## Temel Özellikler

- **Yarışın Başlatılması**: Sayfa her yenilendiğinde 20 at rastgele belirlenir.
- **Program Oluşturma**: "Generate Program" butonuna tıklandığında, 6 farklı tur oluşturulur. Her bir turda yarışacak 10'ar at rastgele seçilir.
- **Yarışın Koşulması**: "Start Race" butonuna basıldığında, bir tur koşulur. Yarış sırasında, kullanıcı koşuyu durdurabilir.
- **At Hızı Hesaplama**: Yarış sırasında, atların hızları hem kondisyona hem de rastgele üretilen sayılara bağlı olarak hesaplanır ve mesafe kat edilir.

## Temel Özellikler

- **Yarışın Başlatılması**: Sayfa her yenilendiğinde 20 at rastgele belirlenir.
- **Program Oluşturma**: "Generate Program" butonuna tıklandığında, 6 farklı tur oluşturulur. Her bir turda yarışacak 10'ar at rastgele seçilir.
- **Yarışın Koşulması**: "Start Race" butonuna basıldığında, bir tur koşulur. Yarış sırasında, kullanıcı koşuyu durdurabilir.
- **At Hızı Hesaplama**: Yarış sırasında, atların hızları hem kondisyona hem de rastgele üretilen sayılara bağlı olarak hesaplanır ve mesafe kat edilir.

Proje, **Vuex**'i verileri yönetmek için kullanmasına rağmen, iki farklı Vue API stilinde yazılmıştır:

- **Composition API** kısmı için: [composition linki](./composition)
- **Option API** kısmı için: [option linki](./option)

## Ekstralar

- **Kondisyon Güncelleme**: Yarış sırasında her 100 metrede atların kondisyonları güncellenir.
- **Yarış Sonucu**: Yarışın sonucu, **SweetAlert** ile bir toast mesajı olarak üst köşede görüntülenir.
- **Mobil Responsive**: Proje, mobil cihazlara uyumlu hale getirilmiştir ve responsive tasarım güncellenmiştir.

## Testler

Projede iki farklı türde test bulunmaktadır:

- **E2E Testleri (End-to-End)**: Testler, Cypress ile yazılmıştır ve `cypress` klasöründe yer almaktadır. Testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:
    ```sh
    npm run test:e2e:dev
    ```

- **Unit Testleri**: Component'ler ve Vuex store'unun birim testleri `tests` klasöründe yer almaktadır. Bu testleri çalıştırmak için aşağıdaki komutu kullanabilirsiniz:
    ```sh
    npm run test:unit
    ```

## Proje Kurulumu

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Gerekli bağımlılıkları yüklemek için:
    ```sh
    npm install
    ```

2. Geliştirme modunda projeyi çalıştırmak için:
    ```sh
    npm run dev
    ```