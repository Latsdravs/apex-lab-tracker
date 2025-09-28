# APEX - Academic Project & Experiment X-tracker

APEX, bir araştırma laboratuvarındaki projeleri, deneyleri, kullanılan kaynakları ve çıkan yayınları yönetmek için tasarlanmış modern bir web uygulamasıdır. Bu proje, staj kapsamında baştan sona oluşturulmuştur.

##  Özellikler

- **Dashboard:** Laboratuvarın genel durumuna hızlı bir bakış (toplam proje, aktif projeler vb.).
- **Proje Yönetimi:** Projeleri oluşturma, listeleme, detay görme, düzenleme ve silme (CRUD).
- **Arama ve Filtreleme:** Projeler arasında metin ve durum bazlı arama yapabilme.
- **İnteraktif Grafikler:** Proje durum dağılımını gösteren pasta grafiği.
- **Karanlık Mod:** Göz yorgunluğunu azaltan, modern ve akıcı bir karanlık tema.
- **Duyarlı Tasarım:** Mobil, tablet ve masaüstü cihazlarda sorunsuz bir kullanıcı deneyimi.
- **Otomatik Testler:** Bileşenlerin doğruluğunu garanti eden birim testleri.
- **Canlı Bildirimler:** Başarılı/başarısız işlemler için "Toast" bildirimleri.

##  Kullanılan Teknolojiler

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Dil:** TypeScript
- **Stil:** TailwindCSS
- **State Management:** Zustand (Client State), TanStack Query (Server State)
- **Form Yönetimi:** React Hook Form & Zod
- **UI Kütüphaneleri:** Radix UI (Headless Bileşenler için), Lucide React (İkonlar)
- **Grafikler:** Recharts
- **Bildirimler:** Sonner
- **Test:** Jest & React Testing Library
- **Dokümantasyon:** Storybook

### Backend (Simülasyon)

- **API:** Next.js Route Handlers ile oluşturulmuş Mock API

##  Projeyi Yerel Makinede Çalıştırma

1. **Depoyu klonlayın:**
   ```bash
   git clone [...]
2. **Proje dizinine gidin:**
   ```bash
   cd apex-lab-tracker
3. ***Bağımlılıkları yükleyin***
   ```bash
   npm install
4. ***Geliştirme sunucusunu başlatın***
   ```bash
   npm run dev

Uygulama artık http://localhost:3000 adresinde çalışıyor olacaktır.

##  Gelecek Planı (Roadmap)

Bu projenin gelecekteki versiyonları için planlanan bazı özellikler şunlardır:

- [ ] **Gerçek Kimlik Doğrulama (Authentication):** `NextAuth.js` kullanılarak kullanıcı girişi, kaydı ve oturum yönetimi.
- [ ] **Veritabanı Entegrasyonu:** Mock API yerine, `PostgreSQL` ve `Prisma` ORM kullanılarak gerçek bir veritabanına geçiş.
- [ ] **Gelişmiş Yetkilendirme:** Projeleri sadece belirli kullanıcıların görebilmesi veya düzenleyebilmesi.
- [ ] **Dosya Yükleme:** Projelere ilgili dokümanların (PDF, resim vb.) yüklenebilmesi.
- [ ] **Detaylı Dashboard:** Tarih aralığına göre filtreleme ve daha fazla grafik çeşidi ekleme.
- [ ] **Uçtan Uca (E2E) Testler:** `Cypress` veya `Playwright` kullanarak kullanıcı akışlarının baştan sona test edilmesi.