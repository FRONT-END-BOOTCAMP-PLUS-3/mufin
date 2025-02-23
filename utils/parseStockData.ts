/**
 * 📌 WebSocket 데이터 파싱 및 JSON 매핑 (여러 개 데이터 처리)
 * @param rawData - WebSocket에서 받은 원본 데이터 (문자열)
 * @param fieldMapping - 사용할 필드 매핑 (예: `STOCK_TRADE_MAPPING`)
 * @returns 변환된 JSON 객체 배열 (Record<string, string[]>[])
 */
export function parseStockData(
  rawData: string,
  fieldMapping: string[]
): Record<string, string[]>[] {
  const parts = rawData.split("|");
  if (parts.length < 4) {
    throw new Error("[parseStockData] 유효하지 않은 데이터 형식");
  }

  // 데이터 개수 확인
  const dataCount = parseInt(parts[2], 10);
  if (isNaN(dataCount) || dataCount < 1) {
    throw new Error("[parseStockData] 데이터 개수 파싱 오류");
  }

  // ✅ `^` 기준으로 데이터 세트 나누기 (여러 개 존재 가능)
  const rawStockDataArray = parts[3].split("^");

  // ✅ `data_count` 값만큼 데이터 처리 (배열로 저장)
  const parsedDataArray: Record<string, string[]>[] = [];

  for (let i = 0; i < dataCount; i++) {
    const startIndex = i * fieldMapping.length;
    const endIndex = startIndex + fieldMapping.length;
    const stockValues = rawStockDataArray.slice(startIndex, endIndex);

    // ✅ 개별 데이터 매핑
    const parsedData: Record<string, string[]> = {};
    fieldMapping.forEach((key, index) => {
      parsedData[key] = [stockValues[index] || ""]; // 데이터가 없으면 빈 문자열 할당
    });

    parsedDataArray.push(parsedData);
  }

  return parsedDataArray;
}
