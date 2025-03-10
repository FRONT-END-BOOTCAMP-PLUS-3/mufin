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

import ErrorScreen from '@/app/(anon)/stock/[symbol]/components/ErrorScreen';
import LoadingScreen from '@/app/(anon)/stock/[symbol]/components/LodingScreen';
import { StockChartDto } from '@/application/usecases/kis/dtos/StockChartDto';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, TimeScale, CandlestickElement, Tooltip, Legend);

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

const parseDate = (dateStr: string, timeStr?: string): Date => {
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  if (timeStr) {
    const hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2, 4), 10);
    const seconds = parseInt(timeStr.substring(4, 6), 10);
    return new Date(year, month, day, hours, minutes, seconds);
  }
  return new Date(year, month, day);
};

const createCandlestickItem = (item: StockChartDto, activePeriod: string) => {
  const date = parseDate(item.stckBsopDate, activePeriod === '1m' ? item.stckCntgHour : undefined);
  return {
    x: date,
    o: Number(item.stckOprc),
    h: Number(item.stckHgpr),
    l: Number(item.stckLwpr),
    c: Number(activePeriod === '1m' ? item.stckPrpr : item.stckClpr),
  };
};


const StockChartImage = ({ symbol, activePeriod }: StockChartImageProps) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);

      try {
          const response = await fetch(`/api/stock/${symbol}?activePeriod=${activePeriod}`);  // 분봉 차트 API   

        const data = await response.json();

        let candlestickData: { x: Date; o: number; h: number; l: number; c: number }[] = [];

        if (data) {
          candlestickData = data
            .map((item: StockChartDto) => createCandlestickItem(item, activePeriod))
            .filter(Boolean);
        } else {
          console.error('데이터가 없습니다.');
        }

        setChartData({
          datasets: [
            {
              label: `${symbol} 봉 차트`,
              data: candlestickData,
              barThickness: 7,
            },
          ],
        });
      } catch (error) {
        console.error('차트 데이터 불러오기 오류:', error);
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

  if (loading) return <LoadingScreen />; 
  if (!chartData) return <ErrorScreen />;

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

