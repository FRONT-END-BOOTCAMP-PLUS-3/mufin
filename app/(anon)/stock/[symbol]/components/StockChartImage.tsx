import { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// chart.js 등록
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
  upColor: string;
  downColor: string;
  unchangedColor: string;
}

interface ChartData {
  datasets: FinancialDataset[];
}

const StockChartImage = ({ symbol, activePeriod }: StockChartImageProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // 스크롤 가능한 컨테이너에 ref를 할당합니다.
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        // 분봉 차트 API 호출
        if (activePeriod === '1m') {
          response = await fetch(`/api/minChart?symbol=${symbol}`);  // 분봉 차트 API
        } else {
          response = await fetch(`/api/stockChart?symbol=${symbol}&activePeriod=${activePeriod}`);  // 기존 봉 차트 API
        }

        const data = await response.json();

        const candlestickData = data.output2.map((item: StockDataItem) => {
            const dateStr = item.stck_bsop_date; // "20250225"
            const timeStr = item.stck_cntg_hour; // "123000"
          
            if (dateStr) {
              // 날짜만 있는 경우
              const year = parseInt(dateStr.substring(0, 4), 10);
              const month = parseInt(dateStr.substring(4, 6), 10) - 1;
              const day = parseInt(dateStr.substring(6, 8), 10);
          
              return {
                x: new Date(year, month, day), // 00:00:00 고정
                o: Number(item.stck_oprc),
                h: Number(item.stck_hgpr),
                l: Number(item.stck_lwpr),
                c: Number(item.stck_clpr),
              };
            } else if (timeStr) {
              // 시간만 있는 경우 (오늘 날짜 기준)
              const now = new Date();
              const hours = parseInt(timeStr.substring(0, 2), 10);
              const minutes = parseInt(timeStr.substring(2, 4), 10);
          
              return {
                x: new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0),
                o: Number(item.stck_oprc),
                h: Number(item.stck_hgpr),
                l: Number(item.stck_lwpr),
                c: Number(item.stck_prpr),
              };
            }
          
            console.warn("Neither dateStr nor timeStr is available:", item);
            return null;
          }).filter(Boolean);
          

        console.log('Candlestick Data:', candlestickData);

        setChartData({
          datasets: [
            {
              label: `${symbol} 봉 차트`,
              data: candlestickData,
              barThickness: 7, // 캔들 너비를 고정 (원하는 값으로 조정)
              upColor: 'rgba(0, 0, 255, 1)',
              downColor: 'rgb(255, 0, 0)',
              unchangedColor: '#999'
            }
          ]
        });
      } catch (error) {
        console.error('차트 데이터 불러오기 오류:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, activePeriod]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [chartData]);

  if (loading) return <div>차트 로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return <div>차트를 불러올 수 없습니다.</div>;

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px', overflowX: 'auto' }}>
      <div style={{ width: '1500px', height: '100%' }}>
        <Chart
          type="candlestick"
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: activePeriod === 'Y' ? 'year' : activePeriod === 'M' ? 'month' : activePeriod === 'W' ? 'week'  : activePeriod === 'D' ? 'day' : 'minute',
                },
                offset: false,
              },
              y: {
                position: 'right',
              },
            },
            plugins: {
                tooltip: {
                  enabled: true,
                  position: 'average',  // 툴팁을 데이터 중앙에 정렬
                  yAlign: 'bottom',     // 툴팁을 위쪽으로 배치
                  displayColors: false, // 색상 박스 제거 (더 깔끔하게)
                  callbacks: {
                    label: function (context) {
                      const { o, h, l, c } = context.raw as { o: number, h: number, l: number, c: number }; // 원본 데이터에서 값 가져오기
                      return [`시가: ${o}`, `고가: ${h}`, `저가: ${l}`, `종가: ${c}`];
                    },
                  },
                },
                legend: {
                    display: false,
                  },
                },
                interaction: {
                  mode: 'point',
                  intersect: false,
                },           
          }}
        />
      </div>
    </div>
  );
};

export default StockChartImage;
