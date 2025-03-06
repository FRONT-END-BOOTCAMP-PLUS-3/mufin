import { env } from "@/config/env";

export async function fetchCurrentStockData(symbol: string) {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/stock/current_stock?symbol=${symbol}`);
      
      if (!response.ok) {
        throw new Error('API 요청 실패');
      }
  
      const data = await response.json();

      const output = data.output;

      return {
        stck_prpr: output.stck_prpr || "",
        prdy_vrss: output.prdy_vrss || "",
        prdy_ctrt: output.prdy_ctrt || "",
      };
    } catch (error) {
      console.error('주식 데이터 가져오기 실패:', error);
      throw error;
    }
  }
  