"use client";

import { useState, useRef } from 'react';

import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

import StockModalContainer from '@/app/(anon)/stock/[symbol]/components/StockModalContainer';
import DraggableScrollContainer from '@/app/(anon)/stock/[symbol]/components/DraggableScrollContainer';
import { ChartImageContainer, ChartSection } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';

import ErrorScreen from '@/app/(anon)/stock/[symbol]/components/ErrorScreen';
import LoadingScreen from '@/app/(anon)/stock/[symbol]/components/LodingScreen';
import { useStockChart } from '@/hooks/useStockChart';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, TimeScale, CandlestickElement, Tooltip, Legend);

interface StockChartImageProps {
  symbol: string;
  activePeriod: string;
}

const StockChartImage = ({ symbol, activePeriod }: StockChartImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: chartData, isLoading, error } = useStockChart(symbol, activePeriod)

  if (isLoading) return <LoadingScreen />; 
  if (error || !chartData) return <ErrorScreen />;

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

