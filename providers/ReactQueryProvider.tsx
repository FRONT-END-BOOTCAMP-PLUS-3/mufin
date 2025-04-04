    "use client";

    import React, { useEffect, useState } from 'react';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
        const [devtools, setDevtools] = useState<null | React.ReactNode>(null);

        useEffect(() => {
          if (process.env.NODE_ENV === "development") {
            import("@tanstack/react-query-devtools").then((mod) => {
              setDevtools(<mod.ReactQueryDevtools initialIsOpen={true} />);
            });
          }
        }, []);
        return (
            <QueryClientProvider client={queryClient}>
                {children}
                {devtools}
            </QueryClientProvider>
        );
    }
    export default ReactQueryProvider;