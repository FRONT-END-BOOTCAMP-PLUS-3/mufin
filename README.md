<h1>Mufin</h1>

```
mufin
├─ app
│  ├─ (anon)
│  │  └─ stock
│  │     ├─ page.tsx
│  │     └─ [symbol]
│  │        ├─ components
│  │        │  ├─ DraggableScrollContainer.tsx
│  │        │  ├─ StockChart.tsx
│  │        │  ├─ StockChartImage.tsx
│  │        │  ├─ StockClient.tsx
│  │        │  ├─ StockDetailTabs.tsx
│  │        │  ├─ StockDetailTitle.tsx
│  │        │  ├─ StockInfo.tsx
│  │        │  ├─ StockModalContainer.tsx
│  │        │  └─ SymbolLink.tsx
│  │        ├─ page.tsx
│  │        └─ StockDetail.Styled.ts
│  ├─ api
│  │  ├─ approval_key
│  │  │  └─ route.ts
│  │  ├─ minChart
│  │  │  └─ route.ts
│  │  ├─ realtime_data
│  │  │  └─ route.ts
│  │  └─ stockChart
│  │     └─ route.ts
│  ├─ components
│  │  ├─ button
│  │  │  └─ Button.tsx
│  │  ├─ header
│  │  │  ├─ Header.Styled.ts
│  │  │  └─ Header.tsx
│  │  ├─ home
│  │  │  ├─ Home.Styled.ts
│  │  │  ├─ StockList.Styled.ts
│  │  │  └─ StockList.tsx
│  │  ├─ LayoutClient.tsx
│  │  ├─ modal
│  │  │  ├─ Modal.Styled.ts
│  │  │  └─ Modal.tsx
│  │  ├─ navbar
│  │  │  ├─ Navbar.Styled.ts
│  │  │  └─ Navbar.tsx
│  │  ├─ RootContainer.Styled.ts
│  │  └─ search
│  │     ├─ SearchBar.Styled.ts
│  │     └─ SearchBar.tsx
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
│  ├─ realTimeStockMapping.ts
│  └─ routeMap.ts
├─ domain
│  ├─ entities
│  └─ repositories
├─ eslint.config.mjs
├─ infrastructure
│  ├─ kis
│  │  ├─ index.ts
│  │  └─ KISAccessTokenAdapter.ts
│  ├─ repositories
│  └─ websocket
│     └─ WebSocketClient.ts
├─ lib
│  └─ StyledComponentsRegistry.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ prisma
├─ public
│  ├─ arrow_right.svg
│  ├─ character.svg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icon
│  ├─ Logo.svg
│  ├─ Logo2.svg
│  ├─ mufin1.svg
│  ├─ mufin2.svg
│  ├─ next.svg
│  ├─ searchIcon.svg
│  ├─ stock-logo
│  │  ├─ kakao.png
│  │  ├─ lg.png
│  │  ├─ samsung.png
│  │  └─ sk.png
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ stores
├─ styles
│  └─ globals.css
├─ tsconfig.json
├─ types
└─ utils
   ├─ fetchApprovalKey.ts
   ├─ getHeaderTitle.tsx
   ├─ getMarketStatus.ts
   └─ parseStockData.ts

```