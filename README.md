# Design Index

Сайт-портфолио продуктового дизайнера на React, TypeScript и Vite. Визуальный язык взят у interfere.com: белый холст, Inter, hairline-границы, мягкое свечение Aurora Haze. Все тексты и данные лежат в `src/content.ts`, места с демонстрационным содержимым помечены `PLACEHOLDER`: имя, email, ссылки на LinkedIn, YouTube и DOU, три кейса, статьи, видео, отзывы и интересы. Форма обратной связи работает через `profile.formEndpoint` (например, Formspree). Пока он пуст, форма открывает почтовую программу посетителя с готовым письмом на `profile.email`. Тёмная тема переключается кнопкой в шапке или клавишей `D`: выбор запоминается, а при первом визите берётся из системных настроек. Токены обеих тем лежат в начале `src/styles.css` (`:root` и `:root[data-theme='dark']`). Первый экран и блок Toolkit играют Rive-анимацию персонажа из проекта character/character-studio: файл public/rive/office-character.riv и локальный рантайм public/rive/rive.js +
ive.wasm (версии совпадают, интернет не нужен). Шаги hero и клипы для групп Toolkit задаются в processSteps и
ive (src/content.ts) именами state machines из .riv: ThinkDemo, ScrollDemo, IdeaDemo, WinDemo, TypingDemo, NotificationPreview и др. Если анимация не загрузилась, показывается статичная иллюстрация. Заголовок вкладки и метаописание находятся в `index.html`. Страницы кейсов открываются по адресам `/cases/<slug>`, при деплое хостингу нужен fallback на `index.html`.

## Локальный запуск

Нужны Node.js 24 и pnpm 11.25.0. Команды установки запускаются в PowerShell из папки проекта.

```powershell
pnpm install --frozen-lockfile
pnpm test:browsers
```

Запустите `pnpm dev` для [сайта](http://127.0.0.1:5173) и `pnpm storybook` для [Storybook](http://127.0.0.1:6006) в отдельных терминалах. `pnpm build` собирает сайт в `dist/`, `pnpm build:storybook` собирает каталог компонентов в `storybook-static/`.

## Работа с компонентами

1. Для изменения дизайна откройте историю в Storybook и укажите её название или состояние. Например, `Portfolio → Project card → Mobile App`.
2. Интерфейс собран по уровням атомарного дизайна в `src/components/`: `atoms` → `molecules` → `organisms` → `blocks` (секции страницы: Header, Hero, Cases, Articles, Talks, Toolkit, Reviews, Contact, Footer), плюс `illustrations`. Страницы лежат в `src/pages/`, данные в `src/content/`, токены и тёмная тема в `src/styles/tokens.css`. Правила импортов проверяет ESLint, подробности в `src/components/README.md`. У каждого компонента своя папка с `.tsx`, `.css` и `*.stories.tsx`. Истории используют те же компоненты и CSS, что и сайт. Controls позволяют менять входные параметры, Accessibility показывает автоматические проверки, а `play` описывает действия пользователя. Пример `play`: `Organisms → CaseCard → LinksToCasePage`.
3. После изменений запустите `pnpm check`. Команда проверяет формат, правила кода, типы, истории и сайт. `pnpm format` исправляет форматирование. `pnpm test:stories` запускает истории через Vitest в Chromium. `pnpm test:e2e:ui` открывает интерфейс Playwright, а `pnpm exec playwright show-report` показывает последний отчёт.

Playwright сам поднимает отдельный сервер для тестов. Есть профили Chromium, Firefox, WebKit и мобильного WebKit. Тесты покрывают переход к работам, раскрытие заметок, навигацию с клавиатуры и автоматические проверки доступности через axe. В Chromium и Firefox тест проверяет порядок фокуса при нажатии Tab. В WebKit он ставит фокус на ссылку явно и проверяет её активацию клавишей Enter.

[Storybook для React и Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite) · [Storybook и Vitest](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) · [Доступность в Playwright](https://playwright.dev/docs/accessibility-testing)

## Границы текущего стека

React и React DOM — зависимости сайта. Сборка, линтер, Storybook и тесты используются при разработке. Для локального типизированного контента достаточно TypeScript. Zod пригодится при появлении внешних данных или формы с нетривиальной валидацией. React Router имеет смысл с отдельными адресами кейсов, а GSAP — с согласованными анимациями, которым нужны таймлайны или прокрутка. [Zod](https://zod.dev/packages/zod) · [React Router](https://reactrouter.com/) · [GSAP для React](https://gsap.com/resources/React/)

## Скиллы Codex

Скиллы лежат в `.agents/skills/` и доступны в новом чате Codex, открытом из папки проекта. Для дизайна можно вызвать `$design-engineering`, `$impeccable` или `$design-taste-frontend`, для проверки React — `$vercel-react-best-practices`, для GSAP — `$gsap-react`. Impeccable установлен как скилл без автоматического хука.

| Источник                                                              | Скиллы | Снимок    |
| --------------------------------------------------------------------- | -----: | --------- |
| [Design Engineering](https://github.com/agentsorg/design-engineering) |      1 | `dbbe43b` |
| [Emil Kowalski](https://github.com/emilkowalski/skills)               |     17 | `c8a7962` |
| [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)    |      9 | `1a2c79d` |
| [Impeccable](https://github.com/pbakaus/impeccable)                   |      1 | `c3bb418` |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill)                |      1 | `9b4bf93` |
| [GSAP Skills](https://github.com/greensock/gsap-skills)               |      8 | `aed9cfd` |
