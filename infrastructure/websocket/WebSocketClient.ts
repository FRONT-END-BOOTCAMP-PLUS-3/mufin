import WebSocket from "ws";

export class WebSocketClient {
    private ws: WebSocket;

    constructor(private url: string) {
        this.ws = new WebSocket(this.url);
    }
    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
          this.ws.on("open", () => {
            console.log("✅ WebSocket 연결 성공:", this.url);
            resolve();
          });
          this.ws.on("error", (err) => {
            console.error("❌ WebSocket 연결 에러:", err);
            reject(err);
          });
        });
      }

      sendMessage(sendData: object): void {
        if (this.ws.readyState === WebSocket.OPEN) {
          const jsonStr = JSON.stringify(sendData);
          this.ws.send(jsonStr);
          console.log("📨 메시지 전송:", jsonStr);
        } else {
          console.error("WebSocket이 열리지 않음, 메시지 전송 실패");
        }
      }

      onMessage(callback: (data: string) => void): void {
        this.ws.on("message", (data) => {
          try {
            const rawData = data.toString();
            // 받은 원시 데이터를 콜백으로 전달 (별도의 파싱 없이 그대로)
            callback(rawData);
          } catch (error) {
            console.error("❌ 데이터 처리 실패:", error);
          }
        });
      }

      subscribe(startMessage: object): void {
        this.sendMessage(startMessage);
      }
    
      // 구독 해제(종료) 메시지 전송 메서드
      unsubscribe(stopMessage: object): void {
        this.sendMessage(stopMessage);
      }

      disconnect(): void {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.close();
          console.log("❎ WebSocket 연결 종료");
        }
      }
    

}