<h1>Mufin</h1>

```
Mufin
┣ .vscode
┃ ┗ settings.json
┣ app
┃ ┣ api
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

┣ components  // 공통 컴포넌트
┃ ┗ common  // 최소단위 UI 컴포넌트(header, footer 등)

┣ constants  // 공통 상수

┣ domain
┃ ┣ entities   // database의 entity type 정의
┃ ┗ repositories // repository에서 사용하는 type 정의

┣ infrastructure
┃ ┗ repositories

┣ public // 이미지 관리
┣ prisma
┣ styles
┣ types // 공통 타입
┣ utils
```
