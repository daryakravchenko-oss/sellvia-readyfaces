# sellvia-readyfaces

Лендинг **readyfaces** для Sellvia. За основу взят клон проверенной страницы
[premium-store-fashion](https://sellvia.com/premium-store-fashion) – та же вёрстка,
стили и скрипты, все пути переименованы под новую страницу `readyfaces`.

## Структура

```
sellvia-readyfaces/
├── index.html                              # страница (абсолютные пути, как на проде)
├── css-for-landings/readyfaces/styles.css  # стили (копия 1:1)
├── js-for-landings/readyfaces/main.js      # скрипты (анимации, слайдеры, FAQ, счётчик)
└── images-for-landings/readyfaces/img/     # все картинки и видео
    ├── logo-white.svg, logo-dark.svg
    ├── featured/                           # лого прессы (Forbes, Inc., Entrepreneur)
    ├── store/                              # мокапы витрины (hero-слайдер)
    ├── freebasic/                          # видео + карточка товара
    ├── bento-sec/                          # карточки продуктов
    ├── sienna-sec/                         # видео AI-креатора Sienna
    ├── test-sec/                           # фото отзывов
    └── final-sec/                          # фоны финального блока
```

## Локальный предпросмотр

`index.html` использует **абсолютные пути** (`/css-for-landings/...`), как на проде,
поэтому открывать файл напрямую (`file://`) нельзя – нужен статический сервер из корня репозитория:

```bash
node serve.js
# затем открыть http://localhost:8123
```

`serve.js` – крошечный статический сервер на чистом Node, без зависимостей.
Свой порт: `node serve.js 3000`. Останавливается по Ctrl+C.

## Что осталось внешним (ссылки на sellvia.com)

Намеренно не локализованы – это общие ресурсы темы и сторонние сервисы:

- **Шрифт** SF Pro Display – `https://sellvia.com/wp-content/themes/sellvia/fonts/...`
- **Google Tag Manager** (`GTM-PWCP7QD`) и виджет чата (`sellvia-chat`)

## Что нужно адаптировать под readyfaces

Контент пока «фэшн» – это шаблон-основа. При переделке под нишу readyfaces поменять:

- Тексты, заголовки, отзывы, FAQ в `index.html`
- Картинки/видео в `images-for-landings/readyfaces/img/`
- CTA-ссылки чекаута: `https://sellvia.com/checkout/?product=premium_store&type_custom=fashion`
  (`type_custom` → нужное значение)
- `<title>` и `<meta name="description">`

## Деплой

Папки `css-for-landings/`, `js-for-landings/`, `images-for-landings/` и `index.html`
кладутся в соответствующие пути в корне сайта Sellvia. `main.js` сам подставляет
`external_source` из пути страницы – отдельная настройка не нужна.
