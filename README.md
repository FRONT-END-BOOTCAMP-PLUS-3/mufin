<h1>Mufin</h1>

```
Mufin
┣ .vscode
┃ ┗ settings.json
┣ app
┃ ┣ api
┃ ┣ components  // 공통 컴포넌트
┃ ┣ (anon)
┃ ┃ ┗ login
┃ ┣ user
┃ ┃ ┣ <page명>
┃ ┃ ┃ ┣ components // 페이지에서만 사용하는 컴포넌트
┃ ┃ ┃ ┗ page.tsx
┃ ┃ ┣ layout.tsx
┃ ┃ ┗ page.tsx
┃ ┣ layout.tsx
┃ ┣ page.tsx

┣ application
┃ ┗ usecases
┃ ┃ ┗ <page명>
┃ ┃ ┃ ┗ dtos

┣ constants  // 공통 상수

┣ domain
┃ ┣ entities   // database의 entity type 정의
┃ ┗ repositories // repository에서 사용하는 type 정의

┣ infrastructure
┃ ┗ repositories

┣ public // 이미지 관리
┣ prisma
┣ stores
┣ styles
┣ types // 공통 타입
┣ utils
```

```
mufin
├─ app
│  ├─ (anon)
│  │  └─ stock
│  │     ├─ page.tsx
│  │     └─ [symbol]
│  │        ├─ components
│  │        │  ├─ StockChart.tsx
│  │        │  ├─ StockDetailTabs.tsx
│  │        │  ├─ StockDetailTitle.tsx
│  │        │  ├─ StockInfo.tsx
│  │        │  └─ SymbolLink.tsx
│  │        ├─ page.tsx
│  │        └─ StockDetail.Styled.ts
│  ├─ api
│  ├─ components
│  │  ├─ Button.tsx
│  │  ├─ Header.Styled.ts
│  │  ├─ Header.tsx
│  │  ├─ LayoutClient.tsx
│  │  ├─ Modal.Styled.ts
│  │  ├─ Modal.tsx
│  │  ├─ navbar
│  │  │  ├─ Navbar.Styled.ts
│  │  │  └─ Navbar.tsx
│  │  └─ RootContainer.Styled.ts
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ user
│     └─ page.tsx
├─ application
│  └─ usecases
│     ├─ stock
│     │  └─ dtos
│     └─ stock_detail
│        └─ dtos
├─ config
│  └─ env.ts
├─ constants
│  └─ routeMap.ts
├─ domain
│  ├─ entities
│  └─ repositories
├─ eslint.config.mjs
├─ infrastructure
│  └─ repositories
├─ lib
│  └─ StyledComponentsRegistry.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ prisma
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ Logo.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ stores
├─ styles
│  └─ globals.css
├─ tsconfig.json
├─ types
└─ utils
   └─ getHeaderTitle.tsx

```