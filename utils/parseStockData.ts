import {
  REQUIRED_STOCK_FILED,
  STOCK_TRADE_MAPPING,
} from "@/constants/realTimeStockMapping";

/**
 * 📌 WebSocket 데이터 파싱 및 JSON 매핑 (여러 개 데이터 처리)
 * @param rawData - WebSocket에서 받은 원본 데이터 (문자열)
 * rawData 양식:
 * 0|H0STCNT0|004|005930^093354^71900^5^-100^-0.14^72023.83^72100^72400^71700^71900^71800^1^3052507^219853241700^5105^6937^1832^84.90^1366314^1159996^1^0.39^20.28^090020^5^-200^090820^5^-500^092619^2^200^20230612^20^N^65945^216924^1118750^2199206^0.05^2424142^125.92^0^^72100
 * @returns 변환된 JSON 문자열 (여러 JSON 객체가 배열 형태로 포함됨)
 */
export function parseStockData(rawData: string): string {
  // "|" 기호로 문자열을 분리하여 여러 부분(headers)으로 나눔
  const headers = rawData.split("|");

  if (headers.length < 4) {
    console.log(rawData);
  }

  // 데이터 배열 개수 확인
  const dataCount = parseInt(headers[2], 10);
  if (isNaN(dataCount) || dataCount < 1) {
    console.log(rawData);
  }

  // parts[3]는 caret(^) 구분자로 연결된 실제 주식 데이터 문자열
  const rawStockDataArray = headers[3].split("^");

  // REQUIRED_STOCK_FILED에 정의된 각 필드가
  // 전체 매핑(STOCK_TRADE_MAPPING)에서 몇 번째 인덱스에 위치하는지 계산
  const requiredIndices = REQUIRED_STOCK_FILED.map((field) =>
    STOCK_TRADE_MAPPING.indexOf(field)
  );
  console.log("필요 인덱스:", requiredIndices);

  // 결과 출력 배열 선언
  const parsedDataArray: Record<string, string>[] = [];

  // dataCount 만큼 반복하여 개별 데이터 매핑
  for (let i = 0; i < dataCount; i++) {
    const startIndex = i * REQUIRED_STOCK_FILED.length;
    const requiredData: Record<string, string> = {};

    requiredIndices.forEach((reqIndex, j) => {
      const value =
        reqIndex >= 0 ? rawStockDataArray[startIndex + reqIndex] || "" : "";
      requiredData[REQUIRED_STOCK_FILED[j]] = value;
    });

    parsedDataArray.push(requiredData);
  }

  // JSON 문자열로 변환하여 반환 (클라이언트에서 바로 파싱 가능)
  return JSON.stringify(parsedDataArray);
}
