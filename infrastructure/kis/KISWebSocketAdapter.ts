import WebSocket from "ws";

export type KISStockData = string[];

export class KISWebSocketAdapter {
  private ws: WebSocket | null = null;
  private onMessageCallback?: ((data: KISStockData) => void) | null = null;

  /**
   * Approval Key와 종목 코드를 받아 외부 KIS WebSocket에 연결하고 구독 요청을 보냅니다.
   */
  public async connect(stockCodes: string[], approvalKey: string): Promise<void> {
    this.ws = new WebSocket("ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0");

    this.ws.on("open", () => {
      console.log("[KISWebSocketAdapter] WebSocket 연결 성공");
      this.subscribe(stockCodes, approvalKey);
    });

    this.ws.on("message", (data: WebSocket.RawData) => {
      // 받아온 데이터는 caret(^) 구분 문자열로 가정
      const raw: string = data.toString();
      // 줄바꿈이 포함된 경우 모두 제거하고 공백 분리할 수 있음 (필요시 trim 추가)
      const fields: string[] = raw.split("^");
      console.log("[KISWebSocketAdapter] 실시간 데이터:", fields);
      if (this.onMessageCallback) {
        this.onMessageCallback(fields);
      }
    });

    this.ws.on("close", () => {
      console.log("[KISWebSocketAdapter] WebSocket 연결 종료");
    });

    this.ws.on("error", (error) => {
      console.error("[KISWebSocketAdapter] WebSocket 에러:", error);
    });
  }

  private subscribe(stockCodes: string[], approvalKey: string): void {
    if (!this.ws) return;
    const subscribeMsg = {
      type: "SUBSCRIBE",
      codes: stockCodes,
      approval_key: approvalKey
    };
    this.ws.send(JSON.stringify(subscribeMsg));
  }

  /**
   * 실시간 데이터 수신 이벤트 핸들러 등록
   */
  public onMessage(callback: (data: KISStockData) => void): void {
    this.onMessageCallback = callback;
  }
}
