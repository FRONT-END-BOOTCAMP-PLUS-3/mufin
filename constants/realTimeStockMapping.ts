export const STOCK_TRADE_MAPPING: string[] = [
    "MKSC_SHRN_ISCD", "STCK_CNTG_HOUR", "STCK_PRPR", "PRDY_VRSS_SIGN", "PRDY_VRSS",
    "PRDY_CTRT", "WGHN_AVRG_STCK_PRC", "STCK_OPRC", "STCK_HGPR", "STCK_LWPR",
    "ASKP1", "BIDP1", "CNTG_VOL", "ACML_VOL", "ACML_TR_PBMN", "SELN_CNTG_CSNU",
    "SHNU_CNTG_CSNU", "NTBY_CNTG_CSNU", "CTTR", "SELN_CNTG_SMTN", "SHNU_CNTG_SMTN",
    "CCLD_DVSN", "SHNU_RATE", "PRDY_VOL_VRSS_ACML_VOL_RATE", "OPRC_HOUR", 
    "OPRC_VRSS_PRPR_SIGN", "OPRC_VRSS_PRPR", "HGPR_HOUR", "HGPR_VRSS_PRPR_SIGN",
    "HGPR_VRSS_PRPR", "LWPR_HOUR", "LWPR_VRSS_PRPR_SIGN", "LWPR_VRSS_PRPR",
    "BSOP_DATE", "NEW_MKOP_CLS_CODE", "TRHT_YN", "ASKP_RSQN1", "BIDP_RSQN1",
    "TOTAL_ASKP_RSQN", "TOTAL_BIDP_RSQN", "VOL_TNRT", "PRDY_SMNS_HOUR_ACML_VOL",
    "PRDY_SMNS_HOUR_ACML_VOL_RATE", "HOUR_CLS_CODE", "MRKT_TRTM_CLS_CODE",
    "VI_STND_PRC"
  ];

  export const REQUIRED_STOCK_FIELD: string[] = [
    "MKSC_SHRN_ISCD",
    "STCK_PRPR",
    "PRDY_VRSS_SIGN",
    "PRDY_VRSS",
    "PRDY_CTRT",
    "STCK_HGPR",
    "STCK_LWPR"
  ]

  export const STOCK_TRADE_ORDERBOOK_MAPPING: string[] = [
    "MKSC_SHRN_ISCD",    // 유가증권 단축 종목코드
    "BSOP_HOUR",         // 영업 시간
    "HOUR_CLS_CODE",     // 시간 구분 코드 (0: 장중, A: 장후예상, B: 장전예상, C: 9시 이후의 예상가, VI발동, D: 시간외 단일가 예상)
    "ASKP1",             // 매도호가1
    "ASKP2",             // 매도호가2
    "ASKP3",             // 매도호가3
    "ASKP4",             // 매도호가4
    "ASKP5",             // 매도호가5
    "ASKP6",             // 매도호가6
    "ASKP7",             // 매도호가7
    "ASKP8",             // 매도호가8
    "ASKP9",             // 매도호가9
    "ASKP10",            // 매도호가10
    "BIDP1",             // 매수호가1
    "BIDP2",             // 매수호가2
    "BIDP3",             // 매수호가3
    "BIDP4",             // 매수호가4
    "BIDP5",             // 매수호가5
    "BIDP6",             // 매수호가6
    "BIDP7",             // 매수호가7
    "BIDP8",             // 매수호가8
    "BIDP9",             // 매수호가9
    "BIDP10",            // 매수호가10
    "ASKP_RSQN1",        // 매도호가 잔량1
    "ASKP_RSQN2",        // 매도호가 잔량2
    "ASKP_RSQN3",        // 매도호가 잔량3
    "ASKP_RSQN4",        // 매도호가 잔량4
    "ASKP_RSQN5",        // 매도호가 잔량5
    "ASKP_RSQN6",        // 매도호가 잔량6
    "ASKP_RSQN7",        // 매도호가 잔량7
    "ASKP_RSQN8",        // 매도호가 잔량8
    "ASKP_RSQN9",        // 매도호가 잔량9
    "ASKP_RSQN10",       // 매도호가 잔량10
    "BIDP_RSQN1",        // 매수호가 잔량1
    "BIDP_RSQN2",        // 매수호가 잔량2
    "BIDP_RSQN3",        // 매수호가 잔량3
    "BIDP_RSQN4",        // 매수호가 잔량4
    "BIDP_RSQN5",        // 매수호가 잔량5
    "BIDP_RSQN6",        // 매수호가 잔량6
    "BIDP_RSQN7",        // 매수호가 잔량7
    "BIDP_RSQN8",        // 매수호가 잔량8
    "BIDP_RSQN9",        // 매수호가 잔량9
    "BIDP_RSQN10",       // 매수호가 잔량10
    "TOTAL_ASKP_RSQN",   // 총 매도호가 잔량
    "TOTAL_BIDP_RSQN",   // 총 매수호가 잔량
    "OVTM_TOTAL_ASKP_RSQN", // 시간외 총 매도호가 잔량
    "OVTM_TOTAL_BIDP_RSQN", // 시간외 총 매수호가 잔량
    "ANTC_CNPR",         // 예상 체결가 (동시호가 등 특정 조건하에서만 발생)
    "ANTC_CNQN",         // 예상 체결량 (동시호가 등 특정 조건하에서만 발생)
    "ANTC_VOL",          // 예상 거래량 (동시호가 등 특정 조건하에서만 발생)
    "ANTC_CNTG_VRSS",    // 예상 체결 대비 (동시호가 등 특정 조건하에서만 발생)
    "ANTC_CNTG_VRSS_SIGN", // 예상 체결 대비 부호 (1: 상한, 2: 상승, 3: 보합, 4: 하한, 5: 하락)
    "ANTC_CNTG_PRDY_CTRT", // 예상 체결 전일 대비율
    "ACML_VOL",          // 누적 거래량
    "TOTAL_ASKP_RSQN_ICDC", // 총 매도호가 잔량 증감
    "TOTAL_BIDP_RSQN_ICDC", // 총 매수호가 잔량 증감
    "OVTM_TOTAL_ASKP_ICDC",  // 시간외 총 매도호가 증감
    "OVTM_TOTAL_BIDP_ICDC",  // 시간외 총 매수호가 증감
  ];
  
  export const REQUIRED_STOCK_ORDERBOOK_FIELD: string[] = [
    "ASKP1",
    "ASKP3",
    "ASKP5",
    "ASKP7",
    "ASKP9",
    "ASKP10",
    "BIDP1",
    "BIDP3",
    "BIDP5",
    "BIDP7",
    "BIDP9",
    "BIDP10",
    "ASKP_RSQN1",
    "ASKP_RSQN3",
    "ASKP_RSQN5",
    "ASKP_RSQN7",
    "ASKP_RSQN9",
    "ASKP_RSQN10",
    "BIDP_RSQN1",
    "BIDP_RSQN3",
    "BIDP_RSQN5",
    "BIDP_RSQN7",
    "BIDP_RSQN9",
    "BIDP_RSQN10",
    "TOTAL_ASKP_RSQN",
    "TOTAL_BIDP_RSQN",
  ];
