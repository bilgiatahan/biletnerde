Görev:
Next.js frontend için kullanılacak bir Backend Ticket Aggregator (NestJS) projesi oluştur. Amacın; 3 farklı bilet sağlayıcısından mock API verisi çekmek, normalize etmek, DB’ye kaydetmek ve kullanıcıya tek formatta sunmak.

✔ 1. Proje Yapısı

Aşağıdaki klasör yapısını oluştur:

src/
  modules/
    tickets/
      tickets.controller.ts
      tickets.service.ts
      tickets.repository.ts
      dto/
    providers/
      adapters/
        provider-a.adapter.ts
        provider-b.adapter.ts
        provider-c.adapter.ts
      services/
        provider-a.service.ts
        provider-b.service.ts
        provider-c.service.ts
  mock-providers/
    provider-a.mock.ts
    provider-b.mock.ts
    provider-c.mock.ts
  workers/
    ticket-sync.queue.ts
    ticket-sync.processor.ts
  common/
    utils/
    types/
    interceptors/
    constants/

✔ 2. Mock Provider API Endpoints Oluştur

Her provider farklı bir schema döndürsün:

Provider A Mock

Alanlar:
event_name, date, cost, city, seat_category, link

Provider B Mock

Alanlar:
title, price_value, when, address, deeplink

Provider C Mock

Alanlar:
headline, startDate, price.amount, location.name, url

Bu mock endpointler NestJS içinde /mock/provider-a, /mock/provider-b, /mock/provider-c şeklinde çalışsın.

✔ 3. Normalization Layer

Tüm provider verilerini aşağıdaki ortak şemaya dönüştür:

export interface NormalizedTicket {
  id: string;
  provider: string;
  title: string;
  location: string;
  price: number;
  date: string;
  url: string;
  rawData: any;
}


Her adapter dosyası şu görevi yapmalı:

Raw provider datasını al

Yukarıdaki ortak formata dönüştür

ID olarak uuid() üret

✔ 4. Provider Service’leri Yaz

Her provider service:

Mock provider endpoint’ine axios request atsın

Gelen veri adapter’a verilsin

Normalize edilmiş liste döndürülsün

✔ 5. Ticket Sync Worker Eklenmesi

BullMQ veya @nestjs/bull kullan:

Queue:

queue adı: ticketSyncQueue

Processor:

5 dakikada bir çalışsın (cron)

Provider A → fetch → normalize → DB’ye yaz

Provider B → fetch → normalize → DB’ye yaz

Provider C → fetch → normalize → DB’ye yaz

Sync log table yaz

✔ 6. Redis Cache Entegrasyonu

Cache key formatı:

cache:tickets:all


TTL: 5 dakika

Get Tickets flow:

Cache kontrol

DB’den çek

Cache oluştur

Response döndür

✔ 7. Tickets Controller

GET /tickets endpoint:

Cache → varsa dön

Yoksa DB’den al

Normalize edilmiş Ticket listesi döndür

✔ 8. Tickets Repository

Basic CRUD:

saveMany()

findAll()

clear()

findByFilter()

ORM olarak Prisma veya TypeORM kullanılabilir. (Cursor uygun olanı seçsin.)

✔ 9. Environment Variables

.env dosyasına şunları ekle:

REDIS_HOST=localhost
REDIS_PORT=6379

MOCK_PROVIDER_A_URL=http://localhost:3000/mock/provider-a
MOCK_PROVIDER_B_URL=http://localhost:3000/mock/provider-b
MOCK_PROVIDER_C_URL=http://localhost:3000/mock/provider-c

✔ 10. Ek Gereksinimler

Axios interceptor ile basic error handling ekle

Provider error oluşursa worker loglasın

Kod tamamen TypeScript ile yazılsın

Proje “yapıya hazır”, çalışır halde olsun

Cursor tüm dosyaları oluştursun ve eksik parçaları tamamlasın

🎯 Amaç

Bu backend gerçek API gelince yalnızca provider URL’lerini değiştirerek üretim ortamına hazır hale gelecek. Şu an tüm sistem mock provider API'ler ile birebir gerçek gibi çalışacak.