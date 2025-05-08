# Otel Rezervasyon Sistemi

Otel Rezervasyon Sistemi, kullanıcıların otel odalarını görüntülemesine, rezervasyon yapmasına ve adminlerin oda ve rezervasyonları yönetmesine olanak tanıyan bir web uygulamasıdır. Sistem, basit ve kullanıcı dostu bir arayüzle, hem müşteriler hem de otel yöneticileri için işlevsel bir deneyim sunar.

## Özellikler
- **Kullanıcı İşlevleri**:
  - Oda listesini görüntüleme ve tarih bazlı filtreleme.
  - Seçilen odalar için rezervasyon yapma.
  - Kullanıcı girişi ve kayıt olma.
  - Kendi rezervasyonlarını görüntüleme ve iptal etme.
- **Admin İşlevleri**:
  - Oda ekleme, düzenleme ve silme (rezervasyon kontrolü olmadan).
  - Tüm rezervasyonları görüntüleme, onaylama veya reddetme.
  - Mevcut oda bilgilerini düzenleme sırasında net bir şekilde görüntüleme.
- **Diğer Özellikler**:
  - `localStorage` ile veri saklama (kullanıcılar, odalar, rezervasyonlar).
  - Responsive tasarım ve modern renk paleti.
  - Logo boyutu büyütülerek daha belirgin hale getirildi.

## Kullanılan Teknolojiler
- **HTML5**: Yapısal içerik.
- **JavaScript**: Dinamik işlevler ve veri yönetimi.
- **Tailwind CSS**: Stil ve responsive tasarım.
- **Live Server**: Yerel geliştirme ve test ortamı.

## Kurulum
1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/kullanici-adi/otel-rezervasyon.git
   ```
2. **Proje Klasörüne Gidin**:
   ```bash
   cd otel-rezervasyon
   ```
3. **Gerekli Dosyaları Kontrol Edin**:
   - `index.html`, `rooms.html`, `booking.html`, `login.html`, `my-bookings.html`, `admin.html`
   - `scripts.js`, `style.css`
   - `images/` klasöründe: `logo.png`, `room1.jpg`, `room2.jpg`, `room3.jpg`, `room4.jpg`, `default_room.jpg`
4. **Live Server ile Çalıştırın**:
   - VS Code’da projeyi açın.
   - `index.html` dosyasına sağ tıklayın ve **Open with Live Server** seçeneğini seçin.
   - Tarayıcıda `http://localhost:5500/index.html` adresine gidin.
5. **Test Kullanıcıları**:
   - Admin hesabı için tarayıcı konsolunda şu komutu çalıştırın:
     ```javascript
     localStorage.setItem('users', JSON.stringify([{ id: 1, name: 'Admin', email: 'admin@example.com', password: '123', role: 'admin' }]));
     localStorage.setItem('currentUser', JSON.stringify({ id: 1, name: 'Admin', email: 'admin@example.com', password: '123', role: 'admin' }));
     ```
   - Müşteri hesabı oluşturmak için `login.html`’deki kayıt formunu kullanabilirsiniz.

## Kullanım
1. **Ana Sayfa (`index.html`)**:
   - Otel tanıtımı ve rezervasyon yapma seçeneği.
2. **Odalar (`rooms.html`)**:
   - Tüm odaları görüntüleyin, tarih seçerek müsait odaları filtreleyin.
   - Adminler, odaları düzenleyebilir veya silebilir.
3. **Rezervasyon (`booking.html`)**:
   - Giriş/çıkış tarihleri, kişi sayısı ve oda seçimi ile rezervasyon yapın.
4. **Giriş/Kayıt (`login.html`)**:
   - Mevcut kullanıcıyla giriş yapın veya yeni hesap oluşturun.
5. **Rezervasyonlarım (`my-bookings.html`)**:
   - Kullanıcılar, kendi rezervasyonlarını görür ve iptal edebilir.
6. **Yönetim Paneli (`admin.html`)**:
   - Adminler, odaları ekler/düzenler/siler ve rezervasyonları yönetir.
   - Düzenleme modunda, mevcut oda bilgileri ayrı bir bölümde gösterilir.
   - Logo, daha büyük boyutta görüntülenir.

## Dosya Yapısı
```
otel-rezervasyon/
├── images/
│   ├── logo.png
│   ├── room1.jpg
│   ├── room2.jpg
│   ├── room3.jpg
│   ├── room4.jpg
│   ├── default_room.jpg
├── index.html
├── rooms.html
├── booking.html
├── login.html
├── my-bookings.html
├── admin.html
├── scripts.js
├── style.css
├── README.md
```
- **`images/`**: Logo ve oda görselleri.
- **`index.html`**: Ana sayfa.
- **`rooms.html`**: Oda listesi ve filtreleme.
- **`booking.html`**: Rezervasyon formu.
- **`login.html`**: Giriş ve kayıt formu.
- **`my-bookings.html`**: Kullanıcı rezervasyonları.
- **`admin.html`**: Admin paneli.
- **`scripts.js`**: Tüm işlevsellik (veri yönetimi, olaylar).
- **`style.css`**: Özel stiller (Tailwind ile birlikte).

## Renk Paleti
- **Arka Plan**: `#e8e1cf` (Açık bej)
- **Birincil Renk**: `#a3646c` (Koyu kırmızı)
- **İkincil Renk**: `#916367` (Kırmızı tonu)
- **Tehlike Rengi**: `#7f6363` (Koyu kırmızı)
- **Metin/Detay**: `#6e635f` (Koyu gri-kahve)
