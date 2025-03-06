import { DraggableScrollWepper } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import React, { useRef, useState, useLayoutEffect } from 'react';

interface DraggableScrollContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const DraggableScrollContainer: React.FC<DraggableScrollContainerProps> = ({ children, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
    <DraggableScrollWepper
      ref={containerRef}
      $isDragging={isDragging}  // Pass isDragging to styled component
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      style={style}
    >
      {children}
    </DraggableScrollWepper>
    </>
  );
};

export default DraggableScrollContainer;
