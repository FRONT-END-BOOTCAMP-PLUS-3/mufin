"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: { 
        queries: {
            staleTime: 1000 * 30 , // 30초
            refetchOnMount: false,
            refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 재요청
            refetchInterval: 1000 * 60, // 60초마다 데이터 자동 재요청
            retry: 1,
        },
    },
});

interface ProviderProps {
    children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}
export default ReactQueryProvider;