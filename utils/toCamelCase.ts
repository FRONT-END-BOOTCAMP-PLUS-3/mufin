/**
 * 📌 스네이크 케이스(Snake Case) → 카멜 케이스(Camel Case) 변환 함수
 * @param str 변환할 문자열 (예: STCK_PRPR → stckPrpr)
 * @returns 변환된 Camel Case 문자열
 */
export function toCamelCase(str: string): string {
    return str
      .toLowerCase() // 전체 소문자로 변환
      .replace(/_([a-z])/g, (_, char) => char.toUpperCase()); // _ 뒤의 문자를 대문자로 변환
  }
  