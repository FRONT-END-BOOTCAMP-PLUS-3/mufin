<h1>Mufin</h1>

mufin
├─ app
│ ├─ (anon)
│ │ ├─ login
│ │ │ ├─ components
│ │ │ │ └─ loginPage.Styled.ts
│ │ │ └─ page.tsx
│ │ ├─ myinfo
│ │ │ ├─ components
│ │ │ │ └─ page.styled.ts
│ │ │ └─ page.tsx
│ │ ├─ signup
│ │ │ ├─ components
│ │ │ │ └─ signupPage.Styled.ts
│ │ │ └─ page.tsx
│ │ └─ stock
│ │ ├─ page.tsx
│ │ └─ [symbol]
│ │ ├─ components
│ │ │ ├─ DraggableScrollContainer.tsx
│ │ │ ├─ ErrorScreen.tsx
│ │ │ ├─ LodingScreen.tsx
│ │ │ ├─ StockChart.tsx
│ │ │ ├─ StockChartImage.tsx
│ │ │ ├─ StockClient.tsx
│ │ │ ├─ StockDataComponent.tsx
│ │ │ ├─ StockDetail.Styled.ts
│ │ │ ├─ StockDetailTabs.tsx
│ │ │ ├─ StockDetailTitle.tsx
│ │ │ ├─ StockInfo.tsx
│ │ │ ├─ StockModalContainer.tsx
│ │ │ └─ StockOrderBook.tsx
│ │ └─ page.tsx
│ ├─ api
│ │ ├─ approval_key
│ │ │ └─ route.ts
│ │ ├─ delete-user
│ │ │ └─ route.ts
│ │ ├─ kis_access_token
│ │ │ └─ route.ts
│ │ ├─ login
│ │ │ └─ route.ts
│ │ ├─ logout
│ │ │ └─ route.ts
│ │ ├─ myinfo
│ │ │ └─ route.ts
│ │ ├─ signup
│ │ │ ├─ email_auth
│ │ │ │ └─ route.ts
│ │ │ ├─ email_verify
│ │ │ │ └─ route.ts
│ │ │ └─ route.ts
│ │ ├─ stock
│ │ │ ├─ current_stock
│ │ │ │ └─ route.ts
│ │ │ ├─ min_chart
│ │ │ │ └─ route.ts
│ │ │ ├─ stock_chart
│ │ │ │ └─ route.ts
│ │ │ └─ stock_info
│ │ │ └─ route.ts
│ │ ├─ tradeaction
│ │ │ ├─ buy
│ │ │ │ └─ route.ts
│ │ │ └─ sell
│ │ │ └─ route.ts
│ │ └─ user
│ │ ├─ asset
│ │ │ └─ route.ts
│ │ └─ quiz
│ │ ├─ result
│ │ │ └─ route.ts
│ │ └─ route.ts
│ ├─ components
│ │ ├─ button
│ │ │ └─ Button.tsx
│ │ ├─ header
│ │ │ ├─ Header.Styled.ts
│ │ │ └─ Header.tsx
│ │ ├─ home
│ │ │ ├─ Home.Styled.ts
│ │ │ ├─ StockCategory.Styled.ts
│ │ │ ├─ StockCategory.tsx
│ │ │ ├─ StockList.Styled.ts
│ │ │ └─ StockList.tsx
│ │ ├─ LayoutClient.tsx
│ │ ├─ modal
│ │ │ ├─ Modal.Styled.ts
│ │ │ └─ Modal.tsx
│ │ ├─ navbar
│ │ │ ├─ Navbar.Styled.ts
│ │ │ └─ Navbar.tsx
│ │ ├─ RootContainer.Styled.ts
│ │ └─ search
│ │ ├─ SearchBar.Styled.ts
│ │ └─ SearchBar.tsx
│ ├─ favicon.ico
│ ├─ layout.tsx
│ ├─ page.tsx
│ ├─ test
│ │ └─ page.tsx
│ └─ user
│ ├─ asset
│ │ ├─ components
│ │ │ ├─ Asset.Styled.ts
│ │ │ ├─ Holdings.tsx
│ │ │ └─ InvestmentAmount.tsx
│ │ └─ page.tsx
│ ├─ page.tsx
│ ├─ quiz
│ │ ├─ components
│ │ │ ├─ BaseButton.Styled.ts
│ │ │ ├─ BaseButton.tsx
│ │ │ ├─ BaseModal.Styled.ts
│ │ │ ├─ BaseModal.tsx
│ │ │ ├─ index.ts
│ │ │ ├─ OptionButtons.tsx
│ │ │ ├─ OXButtons.tsx
│ │ │ ├─ ProgressBar.Styled.ts
│ │ │ ├─ ProgressBar.tsx
│ │ │ ├─ Quiz.Styled.ts
│ │ │ └─ Quiz.tsx
│ │ ├─ page.tsx
│ │ └─ result
│ │ ├─ components
│ │ │ ├─ Firework.Style.ts
│ │ │ ├─ Firwork.tsx
│ │ │ ├─ QuizResult.Styled.ts
│ │ │ ├─ QuizResult.tsx
│ │ │ └─ useCountUp.ts
│ │ └─ page.tsx
│ └─ tradeaction
│ ├─ components
│ │ ├─ OrderDetailsModalContent.tsx
│ │ ├─ TradeActionClient.tsx
│ │ └─ Trandeaction.Styled.ts
│ └─ page.tsx
├─ application
│ └─ usecases
│ ├─ attempt
│ │ ├─ CheckTodayAttemptUseCase.ts
│ │ ├─ interfaces
│ │ │ ├─ ICheckTodayAttmptUseCase.ts
│ │ │ └─ ISaveAttemptUseCase.ts
│ │ └─ SaveAttemptUseCase.ts
│ ├─ quiz
│ │ ├─ dtos
│ │ │ ├─ ChoiceDto.ts
│ │ │ └─ ResponseQuizDto.ts
│ │ ├─ GetQuestionUseCase.ts
│ │ ├─ interfaces
│ │ │ ├─ IGetRandomQuestionUseCase.ts
│ │ │ └─ ISubmitQuizAnswerUseCase.ts
│ │ └─ SubmitQuizAnswerUseCase.ts
│ ├─ stock
│ │ ├─ dtos
│ │ │ ├─ StockDto.ts
│ │ │ └─ StockInfoDto.ts
│ │ └─ StockInfoUseCase.ts
│ ├─ trade
│ │ ├─ BuyUseCase.ts
│ │ ├─ dtos
│ │ │ ├─ BuyDto.ts
│ │ │ └─ SellDto.ts
│ │ └─ SellUseCase.ts
│ └─ user
│ ├─ DeleteUserUseCase.ts
│ ├─ dtos
│ │ └─ userDto.ts
│ ├─ GetUserAssetUseCase.ts
│ ├─ GetUserInfoUseCase.ts
│ ├─ LoginUseCase.ts
│ ├─ RefreshAccessTokenUseCase.ts
│ ├─ SendEmailAuthUseCase.ts
│ ├─ SignUpUseCase.ts
│ └─ VerifyEmailAuthUseCase.ts
├─ config
│ ├─ env.ts
│ └─ prismaClient.ts
├─ constants
│ ├─ realTimeStockMapping.ts
│ └─ routeMap.ts
├─ domain
│ ├─ entities
│ │ └─ Question.ts
│ └─ repositories
│ ├─ IAttemptRepository.ts
│ ├─ IChoiceRepository.ts
│ ├─ IHistoryRepository.ts
│ ├─ IPortfolioRepository.ts
│ ├─ IQuestionRepository.ts
│ ├─ IRecordRepository.ts
│ ├─ IRedisRepository.ts
│ ├─ IStockRepository.ts
│ ├─ IUserRepository.ts
│ └─ IWalletRepository.ts
├─ eslint.config.mjs
├─ infrastructure
│ ├─ redis
│ │ └─ redisClient.ts
│ └─ repositories
│ ├─ PgAttempRepository.ts
│ ├─ PgChoiceRepository.ts
│ ├─ PgHistoryRepository.ts
│ ├─ PgPortfolioRepository.ts
│ ├─ PgQuestionRepositroy.ts
│ ├─ PgRecordRepository.ts
│ ├─ PgStockRepository.ts
│ ├─ PgUserRepository.ts
│ ├─ PgWalletRepository.ts
│ ├─ PrStockRepository.ts
│ └─ RedisRepository.ts
├─ lib
│ └─ StyledComponentsRegistry.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ prisma
│ └─ schema.prisma
├─ public
│ ├─ arrow_right.svg
│ ├─ character.svg
│ ├─ icon
│ ├─ Logo.svg
│ ├─ Logo2.svg
│ ├─ mufin1.svg
│ ├─ mufin2.svg
│ ├─ searchIcon.svg
│ ├─ stock
│ │ ├─ CELLTRION.png
│ │ ├─ CJ.png
│ │ ├─ COSMO.png
│ │ ├─ CROWN.png
│ │ ├─ DB.png
│ │ ├─ DONGSUH.png
│ │ ├─ GC.png
│ │ ├─ HANKOOKTIRE.png
│ │ ├─ HANMI.png
│ │ ├─ HANMIPHARM.png
│ │ ├─ HANWHA.png
│ │ ├─ HYUNDAI.png
│ │ ├─ KAKAO.png
│ │ ├─ KB.png
│ │ ├─ KIA.png
│ │ ├─ KTG.png
│ │ ├─ LG.png
│ │ ├─ LOTTE.png
│ │ ├─ NAVER.png
│ │ ├─ NONGSHIM.png
│ │ ├─ POSCO.png
│ │ ├─ SAMSUNG.png
│ │ ├─ SAMYANG.png
│ │ ├─ SK.png
│ │ ├─ SOIL.png
│ │ └─ YOUNGPOONG.png
│ ├─ stock-category
│ │ ├─ automobile.svg
│ │ ├─ entertainment.svg
│ │ ├─ food.svg
│ │ ├─ pharmaceutical.svg
│ │ ├─ semiconductor.svg
│ │ └─ smartphone.svg
│ ├─ stock-logo
│ │ ├─ kakao.png
│ │ ├─ lg.png
│ │ ├─ samsung.png
│ │ └─ sk.png
│ └─ user_profile.png
├─ README.md
├─ stores
├─ styles
│ └─ globals.css
├─ tsconfig.json
├─ types
└─ utils
├─ fetchApprovalKey.ts
├─ fetchCurrentStockData.ts
├─ fetchKISAccessToken.ts
├─ getDecodedUserId.ts
├─ getHeaderTitle.ts
├─ getMarketOpen.ts
├─ parseStockData.ts
├─ toCamelCase.ts
└─ websocketClient.ts

```

```
