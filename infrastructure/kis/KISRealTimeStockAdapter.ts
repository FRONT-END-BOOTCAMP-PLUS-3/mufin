import { parseStockData } from "../../utils/parseStockData.js";
import { STOCK_TRADE_MAPPING } from "../../constants/realTimeStockMapping.js";
import { KISWebSocketAdapter } from "./KISWebSocketAdapter.js";

// RealtimeStockAdapter는 싱글톤 패턴 없이 새 인스턴스로 생성해도 됩니다.

export class KISRealtimeStockAdapter {
  private kisWebSocketAdapter: KISWebSocketAdapter;

  // 삼성전자(005930) 단일 종목의 데이터를 배열로 저장합니다.
  private stockData: Record<string, Record<string, string[]>[]>;

  constructor() {
    this.kisWebSocketAdapter = new KISWebSocketAdapter();
    this.stockData = {}; 
  }

  /**
   * 단일 종목 실시간 WebSocket 연결
   * - 여기서는 삼성전자(005930)만 처리합니다.
   * @param approvalKey - WebSocket 연결에 필요한 Approval Key
   */
  public async connectSingleStock(stockCodes: string[],approvalKey: string): Promise<void> {
    console.log("[RealtimeStockAdapter] 단일 종목(005930) WebSocket 연결 시작...");
    await this.kisWebSocketAdapter.connect(stockCodes, approvalKey);
  }

  /**
   * WebSocket에서 받은 데이터를 파싱하여 저장합니다.
   * @param rawData - WebSocket에서 받은 원본 데이터
   */
  public processReceivedData(rawData: string): void {
    console.log("[RealtimeStockAdapter] 실시간 데이터 수신:", rawData);
    try {

      // 매핑 상수(STOCK_TRADE_MAPPING)를 사용해 데이터를 파싱합니다.
      const parsedDataArray = parseStockData(rawData, STOCK_TRADE_MAPPING);

      // 여러 건의 데이터가 올 수 있으므로 배열로 처리합니다.
      const stockCode = parsedDataArray[0]["MKSC_SHRN_ISCD"][0]; // 삼성전자 종목 코드

      // 삼성전자 데이터 배열 저장 (새로 들어온 데이터를 덮어쓰거나 추가)
      // 여기서는 최신 데이터만 저장하도록 덮어쓰겠습니다.
      this.stockData[stockCode] = parsedDataArray;
    } catch (error) {
      console.error("[RealtimeStockAdapter] 데이터 파싱 오류:", error);
    }
  }

  /**
   * 저장된 삼성전자 실시간 데이터를 반환합니다.
   * @returns 삼성전자 데이터 배열 또는 null
   */
  public getStockData(): Record<string, string[]>[] | null {
    return this.stockData["005930"] || null;
  }
}
