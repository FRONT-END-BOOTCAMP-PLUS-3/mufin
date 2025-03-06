"use client";

import { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import StockModalContainer from '@/app/(anon)/stock/[symbol]/components/StockModalContainer';
import DraggableScrollContainer from '@/app/(anon)/stock/[symbol]/components/DraggableScrollContainer';
import { marketOpen } from '@/utils/getMarketOpen';
import { ChartImageContainer, ChartSection } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, TimeScale, CandlestickElement, Tooltip, Legend);

interface StockDataItem {
  stck_bsop_date: string;
  stck_cntg_hour : string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  stck_clpr: string;
  stck_prpr : string;
}

interface StockChartImageProps {
  symbol: string;
  activePeriod: string;
}

interface FinancialDataset {
  label: string;
  data: {
    x: Date;
    o: number;
    h: number;
    l: number;
    c: number;
  }[];
  barThickness?: number;
}

interface ChartData {
  datasets: FinancialDataset[];
}

const StockChartImage = ({ symbol, activePeriod }: StockChartImageProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;

        if (activePeriod === '1m') {
          response = await fetch(`/api/stock/min_chart?symbol=${symbol}`);  // 분봉 차트 API
        } else {
          response = await fetch(`/api/stock/stock_chart?symbol=${symbol}&activePeriod=${activePeriod}`);  // 기존 봉 차트 API
        }

        const data = await response.json();

        let candlestickData: { x: Date; o: number; h: number; l: number; c: number }[] = [];

        if (activePeriod === '1m') {
          // 분봉 차트의 경우 flatMap을 사용하여 output2를 합치기
          const combinedOutput2 = data.flatMap((item: { output2: StockDataItem[] }) => item.output2 || []);

          // 각 항목에서 필요한 데이터 포맷으로 변환
          candlestickData = combinedOutput2.map((item: StockDataItem) => {
            const dateStr = item.stck_bsop_date; 
            const timeStr = item.stck_cntg_hour; 

            let date: Date;

            // 분 봉 차트 처리
            if (dateStr && timeStr) {
              const year = parseInt(dateStr.substring(0, 4), 10);
              const month = parseInt(dateStr.substring(4, 6), 10) - 1;
              const day = parseInt(dateStr.substring(6, 8), 10);
              const hours = parseInt(timeStr.substring(0, 2), 10);
              const minutes = parseInt(timeStr.substring(2, 4), 10);
              const seconds = parseInt(timeStr.substring(4, 6), 10);
              date = new Date(year, month, day, hours, minutes, seconds);
            } else if (dateStr) {
              const year = parseInt(dateStr.substring(0, 4), 10);
              const month = parseInt(dateStr.substring(4, 6), 10) - 1;
              const day = parseInt(dateStr.substring(6, 8), 10);
              date = new Date(year, month, day);
            } else {
              console.warn("Neither dateStr nor timeStr is available:", item);
              return null;
            }

            return {
              x: date,
              o: Number(item.stck_oprc),
              h: Number(item.stck_hgpr),
              l: Number(item.stck_lwpr),
              c: Number(item.stck_prpr),
            };
          }).filter(Boolean); 
        } else {
          if (!data?.output2) {
            console.error('output2가 존재하지 않습니다.');
            return;
          }

          // 기존 봉 차트 처리 (date 값만으로 변환)
          candlestickData = data.output2.map((item: StockDataItem) => {
            const dateStr = item.stck_bsop_date;
            const date = new Date(parseInt(dateStr.substring(0, 4), 10), parseInt(dateStr.substring(4, 6), 10) - 1, parseInt(dateStr.substring(6, 8), 10));

            return {
              x: date,
              o: Number(item.stck_oprc),
              h: Number(item.stck_hgpr),
              l: Number(item.stck_lwpr),
              c: Number(item.stck_clpr),
            };
          });
        }

        setChartData({
          datasets: [
            {
              label: `${symbol} 봉 차트`,
              data: candlestickData,
              barThickness: 7,
            }
          ],
        });
      } catch (error) {
        console.error('차트 데이터 불러오기 오류:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();

    // 분봉 차트인 경우 1분마다 데이터 요청
    let interval: NodeJS.Timeout;
    if (activePeriod === '1m' && marketOpen() ) {
      interval = setInterval(() => {
        fetchChartData();
      }, 60000); 
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [symbol, activePeriod]);

  if (loading) return <div>차트 로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return <div>오늘은 휴장일입니다.</div>;

  return (
    <ChartImageContainer ref={containerRef}>
      <StockModalContainer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DraggableScrollContainer>
      <ChartSection>
        <Chart
          type="candlestick"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                enabled: true,
                position: 'average',
                yAlign: 'bottom',
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    const { o, h, l, c } = context.raw as { o: number, h: number, l: number, c: number };
                    return [`시가: ${o}`, `고가: ${h}`, `저가: ${l}`, `종가: ${c}`];
                  },
                },
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: false,
                },
                offset: false,
              },
              y: {
                position: 'right',
              },
            },
            interaction: {
              mode: 'point',
              intersect: false,
            },
          }}          
        />
      </ChartSection>
      </DraggableScrollContainer>
    </ChartImageContainer>
  );
};

export default StockChartImage;

