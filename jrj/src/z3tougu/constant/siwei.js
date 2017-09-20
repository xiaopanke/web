// x、y轴下拉框数据
const xSelectData = {
  'sw_indu_name': '行业',
  'chi_spel': '简称',
  'order': '排序',
  'mkt_idx.mktcap': '流通市值',
  'mkt_idx.div_rate': '股息率',
  'div_pct': '股息支付率',
  'staff_num': '员工数',
  'fin_idx.tot_revenue': '营收总收入',
  'fin_idx.sale': '营业收入',
  'fin_idx.eps_qua_rr': 'EPS增长率(季度环比)',
  'fcst_idx.real_eps_chng': 'EPS增长率(今年)',
  'fcst_idx.fir_fcst_eps_chng': 'EPS增长率(明年)',
  'fin_idx.eps_5year': 'EPS增长率(过去5年)',
  'fcst_idx.fcst_eps_chng_next3': 'EPS增长率(未来3年)',
  'fin_idx.sale_qua_rr': '销售额增长率(季度环比)',
  'fin_idx.sale_gr_5year': '销售额增长率(过去5年)',
  'mkt_idx.pe_ttm': '市盈率(TTM)',
  'mkt_idx.fir_fcst_pe': '预测市盈率',
  'mkt_idx.peg': 'PEG',
  'mkt_idx.ps': '市销率',
  'mkt_idx.pb': '市净率',
  'mkt_idx.pc': '市现率',
  'mkt_idx.price_cash': '股价/每股自由现金流',
  'fin_idx.roic': '投资回报率',
  'fin_idx.du_roe': '净资产收益率',
  'fin_idx.roa': '总资产收益率',
  'fin_idx.sel_rint': '毛利率',
  'fin_idx.tr_tp': '营业利润率',
  'fin_idx.sel_nint': '净利率',
  'fin_idx.current_ratio': '流动比率',
  'fin_idx.quick_ratio': '速动比率',
  'fin_idx.liab_equ': '长期负债/股东权益',
  'fin_idx.tot_liab_equ': '总负债/股东权益',
  'mkt_idx.cur_chng_pct': '涨跌幅',
  'mkt_idx.chng_pct_from_open': '涨跌幅(开盘)',
  'mkt_idx.gap': '缺口',
  'mkt_idx.volume': '成交量',
  'perf_idx.avg_vol_3month': '历史成交量',
  'mkt_idx.rela_volume': '相对成交量',
  'mkt_idx.chng_pct_week': '近1周涨跌幅',
  'perf_idx.chng_pct_month': '近1月涨跌幅',
  'perf_idx.chng_pct_3month': '近3月涨跌幅',
  'perf_idx.chng_pct_6month': '近6月涨跌幅',
  'perf_idx.chng_pct_year': '近1年涨跌幅',
  'perf_idx.chng_pct_year_sofar': '今年以来涨跌幅',
  'perf_idx.volat_week': '近1周波动率',
  'perf_idx.volat_mon': '近1月波动率',
  'perf_idx.volat_3mon': '近3月波动率',
  'perf_idx.volat_6mon': '近6月波动率',
  'perf_idx.volat_12mon': '近1年波动率',
  'perf_idx.beta': 'Beta值',
  'mkt_idx.rela_high_20day': '相对20日最高价',
  'mkt_idx.rela_low_30day': '相对20日最低价',
  'mkt_idx.rela_high_60day': '相对60日最高价',
  'mkt_idx.rela_low_120day': '相对60日最低价',
  'mkt_idx.rela_low_52week': '相对52周最低价',
  'mkt_idx.rela_high_52week': '相对52周最高价',
  'mkt_idx.rela_ma20': '相对MA20',
  'mkt_idx.rela_ma60': '相对MA60',
  'mkt_idx.rela_ma120': '相对MA120',
  'mkt_idx.rsi_14': 'RSI(14)',
  'in_chng_pct': '内部持股变动',
  'org_chng_pct': '机构持股变动',
  'in_hld_pct': '内部持股比例',
  'org_hld_pct': '机构持股比例',
  'fcst_idx.rating_syn': '分析师观点',
  'fcst_idx.expect_price_med': '目标价格'
}

// 气泡大小轴下拉框数据
const bubbleSizeSelect = {
  '': '常规',
  'mkt_idx.tcap': '总市值',
  'mkt_idx.mktcap': '流通市值',
  'mkt_idx.volume': '成交量',
  'perf_idx.avg_vol_3month': '历史成交量',
  'mkt_idx.rela_volume': '相对成交量'
}

// 气泡颜色轴下拉框数据
const bubbleColorSelect = {
  '': '常规',
  'sw_indu_name': '行业',
  'mkt_idx.tcap': '总市值',
  'mkt_idx.mktcap': '流通市值',
  'mkt_idx.cur_chng_pct': '涨跌幅',
  'mkt_idx.chng_pct_week': '近1周涨跌幅',
  'perf_idx.chng_pct_month': '近1月涨跌幅',
  'perf_idx.chng_pct_3month': '近3月涨跌幅',
  'perf_idx.chng_pct_6month': '近6月涨跌幅',
  'perf_idx.chng_pct_year': '近1年涨跌幅',
  'perf_idx.chng_pct_year_sofar': '今年以来涨跌幅',
  'mkt_idx.volume': '成交量',
  'perf_idx.avg_vol_3month': '历史成交量',
  'mkt_idx.rela_volume': '相对成交量',
  'fcst_idx.rating_syn': '分析师观点'
}

// 股票范围——指数下拉框数据
const indexRange = {
  '': '全部',
  '000300.SH': '沪深300',
  '000001.SH': '上证指数',
  '399001.SZ': '深证成指',
  '399006.SZ': '创业板指',
  '399005.SZ': '中小板指',
  '000016.SH': '上证50',
  '000905.SH': '中证500',
  '000906.SH': '中证800',
  '000852.SH': '中证1000'
}

// 股票范围——行业下拉框数据
const industryRange = [
    { code: '', name: '全部' },
    { code: '210000', name: '采掘' },
    { code: '720000', name: '传媒' },
    { code: '630000', name: '电气设备' },
    { code: '270000', name: '电子' },
    { code: '430000', name: '房地产' },
    { code: '350000', name: '纺织服装' },
    { code: '490000', name: '非银金融' },
    { code: '230000', name: '钢铁' },
    { code: '410000', name: '公用事业' },
    { code: '650000', name: '国防军工' },
    { code: '220000', name: '化工' },
    { code: '640000', name: '机械设备' },
    { code: '710000', name: '计算机' },
    { code: '330000', name: '家用电器' },
    { code: '610000', name: '建筑材料' },
    { code: '620000', name: '建筑装饰' },
    { code: '420000', name: '交通运输' },
    { code: '110000', name: '农林牧渔' },
    { code: '280000', name: '汽车' },
    { code: '360000', name: '轻工制造' },
    { code: '450000', name: '商业贸易' },
    { code: '340000', name: '食品饮料' },
    { code: '730000', name: '通信' },
    { code: '460000', name: '休闲服务' },
    { code: '370000', name: '医药生物' },
    { code: '480000', name: '银行' },
    { code: '240000', name: '有色金属' },
    { code: '510000', name: '综合' }
]

// 股票范围——流通市值下拉框数据
const marketValueRange = {
  'gpltsz_all': '全部',
  'gpltsz_vsmall': '极小(<15亿)',
  'gpltsz_lsmall': '微小(15-30亿)',
  'gpltsz_small': '小(30-60亿)',
  'gpltsz_mid': '中(60-150亿)',
  'gpltsz_big': '大(≥150亿)',
  'gpltsz_avsmall': '≥15亿',
  'gpltsz_alsmall': '≥30亿',
  'gpltsz_asmall': '≥60亿',
  'gpltsz_sbig': '<150亿',
  'gpltsz_smid': '<60亿',
  'gpltsz_ssmall': '<30亿'
}

// 股票范围——历史成交量下拉框数据
const historyValueRange = {
  'lscjl_all': '全部',
  'lscjl_vlow': '很低(<250万)',
  'lscjl_low': '低(250-500万)',
  'lscjl_mid': '中(500-1000万)',
  'lscjl_high': '高(1000-1500万)',
  'lscjl_vhigh': '很高(≥1500万)',
  'lscjl_avlow': '≥250万',
  'lscjl_alow': '≥500万',
  'lscjl_amid': '≥1000万',
  'lscjl_svhigh': '<1500万',
  'lscjl_shigh': '<1000万',
  'lscjl_smid': '<500万'
}

// 图例颜色
const industryColor = ['#FFD002', '#DF8307', '#DF3D42', '#8425AC', '#DF73E0', '#515AB8', '#329607']
const volumeColor = ['#3c404c', '#415379', '#3c649f', '#1f69c9', '#228cd4', '#3bb0d9', '#3dd2e8', '#1de1fe', '#00fcff']
const chgColor = ['#00d641', '#1aa448', '#0e6f2f', '#085421', '#424453', '#6d1414', '#961010', '#be0808', '#e41414']
const AnalystColor = ['#00d641', '#0e6f2f', '#424453', '#961010', '#e41414']

// 图例内容
const marketArr = [10, 30, 50, 70, 90, 110, 130, 150, 170]
const volumeArr = [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250]
const relaVolume = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8]
const quoteChange = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
const pointArr = ['卖出', '减持', '中性', '增持', '买入']

// 行业数据
const industryArr = ['采掘', '传媒', '电气设备', '电子', '房地产', '纺织服装', '非银金融', '钢铁', '公用事业', '国防军工', '化工', '建筑材料', '建筑装饰', '交通运输', '家用电器', '计算机', '机械设备', '农林牧渔', '汽车', '轻工制造', '商业贸易', '食品饮料', '通信', '休闲服务', '银行', '医药生物', '有色金属', '综合']

const groupArr = {
  'sw_indu_name': {
    condition: industryArr,
    color: industryColor
  },
  'mkt_idx.tcap': { // 总市值
    condition: marketArr,
    color: volumeColor
  },
  'mkt_idx.mktcap': { // 流通市值
    condition: marketArr,
    color: volumeColor
  },
  'mkt_idx.volume': { // 成交量
    condition: volumeArr,
    color: volumeColor
  },
  'perf_idx.avg_vol_3month': { // 历史成交量
    condition: volumeArr,
    color: volumeColor
  },
  'mkt_idx.rela_volume': { // 相对成交量
    condition: relaVolume,
    color: volumeColor
  },
  'mkt_idx.cur_chng_pct': {
    condition: quoteChange,
    color: chgColor,
    ratio: 1
  },
  'mkt_idx.chng_pct_week': {
    condition: quoteChange,
    color: chgColor,
    ratio: 2
  },
  'perf_idx.chng_pct_month': {
    condition: quoteChange,
    color: chgColor,
    ratio: 3
  },
  'perf_idx.chng_pct_3month': {
    condition: quoteChange,
    color: chgColor,
    ratio: 6
  },
  'perf_idx.chng_pct_6month': {
    condition: quoteChange,
    color: chgColor,
    ratio: 8
  },
  'perf_idx.chng_pct_year': {
    condition: quoteChange,
    color: chgColor,
    ratio: 9
  },
  'perf_idx.chng_pct_year_sofar': {
    condition: quoteChange,
    color: chgColor,
    ratio: 8
  },
  'fcst_idx.rating_syn': {
    condition: pointArr,
    color: AnalystColor
  }
}
export {
  xSelectData,
  bubbleSizeSelect,
  bubbleColorSelect,
  indexRange,
  industryRange,
  marketValueRange,
  historyValueRange,
  industryArr,
  chgColor,
  quoteChange,
  industryColor,
  volumeColor,
  AnalystColor,
  marketArr,
  volumeArr,
  relaVolume,
  pointArr,
  groupArr

}

