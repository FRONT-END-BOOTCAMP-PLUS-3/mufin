const MARKET_OPEN_MINUTES = 9 * 60; // 9:00을 분으로 환산
const MARKET_CLOSE_MINUTES = 15 * 60 + 30; // 15:30을 분으로 환산

export function getMarketTimeStatus(): boolean {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return currentMinutes >= MARKET_OPEN_MINUTES && currentMinutes <= MARKET_CLOSE_MINUTES;
}
