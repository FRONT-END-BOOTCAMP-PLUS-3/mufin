import { env } from "@/config/env";

export const KIS_API_KEYS = {
  currentPrice: [
    {
        name: "KIS_APP_KEY_1",
        appKey: env.KIS_APP_KEY_1,
        secretKey: env.KIS_APP_SECRET_1,
    },
    {
        name: "KIS_APP_KEY_2",
        appKey: env.KIS_APP_KEY_2,
        secretKey: env.KIS_APP_SECRET_2,
    },
  ],
  orderBook: [
    {
        name: "ORDER_BOOK_KIS_API_KEY_1",
        appKey: env.ORDER_BOOK_KIS_API_KEY_1,
        secretKey: env.ORDER_BOOK_KIS_SECRET_1,
    },
    {
        name: "ORDER_BOOK_KIS_API_KEY_2",
        appKey: env.ORDER_BOOK_KIS_API_KEY_2,
        secretKey: env.ORDER_BOOK_KIS_SECRET_2,
    },
  ],
};
