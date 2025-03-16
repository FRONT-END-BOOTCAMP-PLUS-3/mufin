# 📖 Mufin: 한입에 쏙 배우는 모의투자 어플
[Mufin 이용하기](http://mufin.newlecture.com)

## 📌 프로젝트 개요
"계좌 개설 없이도 가능한 모의투자 시스템"  
코로나 팬데믹 이후 주식에 대한 관심이 급증했고, 조기 금융 교육의 필요성이 대두되었습니다.  
금융 교육의 부족과 복잡한 용어로 인해 주식 입문이 어려운 분들을 위해,  
모의 투자와 주식 기초 학습을 한 곳에서 제공하는 어플리케이션입니다.

## ✨ 주요 기능

### 1️⃣ 주식 기본 지식 학습 📝
- **일일 퀴즈 제공:**  
  매일 주식 관련 퀴즈를 통해 정답과 해설로 기본 지식을 쌓습니다.

### 2️⃣ 인기 주식 및 맞춤 정보 검색 📊
- **인기 종목 검색:**  
  카테고리별 인기 종목과 사용자가 원하는 주식 정보를 손쉽게 검색할 수 있습니다.

### 3️⃣ 모의 투자 체험 🤝
- **실시간 데이터 제공:**  
  현재가와 호가창의 유동성을 시각화한 그래프로 한눈에 확인합니다.
- **매수/매도 시스템:**  
  실시간 가격 정보를 반영하여 실제 투자와 유사한 거래 환경을 제공합니다.
- **거래 내역 관리:**  
  사용자가 매수/매도한 거래 이력을 통해 보유 주식 정보와 손익을 확인할 수 있습니다.

## 🛠️ 기술 스택
- **프레임워크 및 라이브러리:** Next.js 15, Typescript, React, Styled-Components  
- **개발 언어:** Javascript, HTML, CSS  
- **데이터베이스:** Prisma ORM, PostgreSQL  
- **API:** 한국투자증권 API  
- **인증:** JWT  
- **배포:** 리눅스, git actions  
- **아키텍처:** 클린 아키텍처 (DTO, Usecase, Repository 패턴 적용)

## 📂 폴더 구조
```plaintext
📦 프로젝트 루트
├── 📂 app             # Next.js 15의 App Router 구조 (페이지 & API 핸들러)
├── 📂 application     # UseCase, DTO 등 비즈니스 로직 담당
├── 📂 components      # 공통 컴포넌트
├── 📂 config          # 환경변수 및 설정 파일들
├── 📂 constants       # 프로젝트 상수 정의
├── 📂 domain          # 데이터 영역 담당 계층
├── 📂 infrastructure  # Prisma, Repository, 외부 API 담당 계층
├── 📂 prisma          # Prisma ORM 설정 및 마이그레이션 파일
├── 📂 public          # 정적 파일 (이미지, 아이콘 등)
├── 📂 utils           # 공통 유틸리티 함수
└── 📜 README.md       # 프로젝트 설명
```
## 🧑‍🧑‍🧒 프로젝트 구성원
| [권영우(T)](https://github.com/kwonup)| [김태민](https://github.com/Taemin1) | [이보윤](https://github.com/BoyunLee) | [전세계](https://github.com/JunSeGue) |

## 📺 기능 영상
### 1️⃣ 회원가입 & 로그인

### 2️⃣ 메인 페이지 

### 3️⃣ 카테고리별 주식 리스트 및 주식 종목 검색

### 4️⃣ 상세 주식 일, 주, 월, 년 에 따른 상세 그래프

### 5️⃣ 상세 주식 호가창

### 6️⃣ 주식 매수, 매도 기능

### 7️⃣ 봉유 주식 및 보유 자산 기능

### 8️⃣ 일일 퀴즈 기능

## 설치 가이드
1. 저장소 클론: `git clone https://github.com/FRONT-END-BOOTCAMP-PLUS-3/mufin.git`
2. 의존성 설치: `npm install`
3. 실행: `npm run dev`

## 변경 이력
- **2025-03-14:** 최초 버전 릴리즈

- ## 문의하기
질문이나 피드백은 [이메일](seogu080@naver.com)로 연락해 주세요.
