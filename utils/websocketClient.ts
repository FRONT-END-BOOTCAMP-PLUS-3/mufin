import { marketOpen } from "@/utils/getMarketOpen";

export const createMessage = (
  approvalKey: string,
  trType: "1" | "2",
  trId: string, 
  trKey: string,
): object => ({
  header: {
    approval_key: approvalKey,
    custtype: "P",
    tr_type: trType,
    "content-type": "utf-8",
  },
  body: {
    input: {
      tr_id: trId,
      tr_key: trKey,
    },
  },
});

/**
 * 지정한 URL로 WebSocket 연결을 생성합니다.
 * @param path WebSocket 서버의 path (예: '/tryitout/H0STCNT0')
 * @returns 연결된 WebSocket 인스턴스를 Promise로 반환
 */
export const connectWs = (url: string): Promise<WebSocket|null> => {
  if (!marketOpen()) {  
    console.log("❌ 마켓이 닫혀 있어서 WebSocket 연결을 시도하지 않습니다.");
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("✅ WebSocket 연결 성공:", url);
      resolve(ws);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket 연결 에러:", err);
      reject(err);
    };
  });
};

/**
 * WebSocket이 OPEN 상태일 때 메시지를 전송합니다.
 * @param ws WebSocket 인스턴스
 * @param message 전송할 메시지 객체
 */
export const sendWsMessage = (ws: WebSocket, message: object): void => {
  if (!ws) {
    console.log("❌ WebSocket 인스턴스가 없습니다.");
    return;
  }
  
  if (ws.readyState === WebSocket.OPEN) {
    const jsonStr = JSON.stringify(message);
    ws.send(jsonStr);
    console.log("📨 메시지 전송:", jsonStr);
  } else {
    console.log("WebSocket이 열리지 않음, 메시지 전송 실패");
  }
};

/**
 * 수신된 메시지를 기본 처리 로직과 함께 커스텀 핸들러로 전달합니다.
 * @param data 수신된 메시지 문자열
 * @param customHandler 추가 처리 로직 (선택)
 */
export const handleWsMessage = (
  data: string,
  customHandler?: (data: string) => void
): void => {
  try {
    // JSON 형식의 구독 확인 메시지 무시 처리
    if (data.startsWith("{")) {
      const jsonData = JSON.parse(data);
      if (jsonData.body?.msg1 === "SUBSCRIBE SUCCESS") {
        console.log("✅ 구독 성공");
        return;
      }
    }
    
    if (customHandler) {
      customHandler(data);
    }
  } catch (error) {
    console.error("❌ 데이터 처리 실패:", error);
  }
};

/**
 * WebSocket의 onmessage 이벤트에 메시지 처리 로직을 등록합니다.
 * @param ws WebSocket 인스턴스
 * @param customHandler 추가 처리 로직 (선택)
 */
export const onWsMessage = (
  ws: WebSocket,
  customHandler?: (data: string) => void
): void => {
  ws.onmessage = (event: MessageEvent) => {
    // MessageEvent의 data 프로퍼티를 사용합니다.
    handleWsMessage(event.data, customHandler);
  };
};

/**
 * WebSocket 연결을 종료합니다.
 * @param ws WebSocket 인스턴스
 */
export const disconnectWs = (ws: WebSocket): void => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.close();
    console.log("❎ WebSocket 연결 종료");
  }
};
