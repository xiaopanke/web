// 交易状态
const descrips = {
  'jyzt_all': '全部',
  'jyzt_zckf': '正常开放',
  'jyzt_rgq': '认购期',
  'jyzt_ztsg': '暂停申购',
  'jyzt_ztsh': '暂停赎回',
  'jyzt_ztjy': '暂停交易'
}
// 基金规模
const jjgm = {
  'jjgm_all': ' 全部',
  'jjgm_0to2': '0-2亿',
  'jjgm_2to10': ' 2-10亿',
  'jjgm_10to50': ' 10-50亿',
  'jjgm_50to100': ' 50-100亿',
  'jjgm_gt100': ' 100亿以上'
}
// 成立时间
const foundedTime = {
  'clsj_all': '全部',
  'clsj_0to1': '0-1年',
  'clsj_1to3': '1-3年',
  'clsj_3to5': '3-5年',
  'clsj_gt5': '5年以上'
}
// 大额限制
const bigLimit = {
  'dexz_all': '全部',
  'dexz_nolimit': '不限大额',
  'dexz_0to20': '0-20万',
  'dexz_20to50': '20-50万',
  'dexz_50to100': '50-100万',
  'dexz_gt100': '100万以上'
}
// 行业
const trades = [
  { value: 'all', name: '全部' },
  { value: 'hy_210000', name: '采掘' },
  { value: 'hy_720000', name: '传媒' },
  { value: 'hy_630000', name: '电气设备' },
  { value: 'hy_270000', name: '电子' },
  { value: 'hy_430000', name: '房地产' },
  { value: 'hy_350000', name: '纺织服装' },
  { value: 'hy_490000', name: '非银金融' },
  { value: 'hy_230000', name: '钢铁' },
  { value: 'hy_410000', name: '公用事业' },
  { value: 'hy_650000', name: '国防军工' },
  { value: 'hy_220000', name: '化工' },
  { value: 'hy_640000', name: '机械设备' },
  { value: 'hy_710000', name: '计算机' },
  { value: 'hy_330000', name: '家用电器' },
  { value: 'hy_610000', name: '建筑材料' },
  { value: 'hy_620000', name: '建筑装饰' },
  { value: 'hy_420000', name: '交通运输' },
  { value: 'hy_110000', name: '农林牧渔' },
  { value: 'hy_280000', name: '汽车' },
  { value: 'hy_360000', name: '轻工制造' },
  { value: 'hy_450000', name: '商业贸易' },
  { value: 'hy_340000', name: '食品饮料' },
  { value: 'hy_730000', name: '通信' },
  { value: 'hy_460000', name: '休闲服务' },
  { value: 'hy_370000', name: '医药生物' },
  { value: 'hy_480000', name: '银行' },
  { value: 'hy_240000', name: '有色金属' },
  { value: 'hy_510000', name: '综合' }
]

// 投资风格
const investmentStyle = {
  'tzfg_all': '全部',
  'tzfg_jzxh': '价值型/大盘',
  'tzfg_jzxm': '价值型/中盘',
  'tzfg_jzxs': '价值型/小盘',
  'tzfg_phxh': '平衡型/大盘',
  'tzfg_phxm': '平衡型/中盘',
  'tzfg_phxs': '平衡型/小盘',
  'tzfg_czxh': '成长型/大盘',
  'tzfg_czxm': '成长型/中盘',
  'tzfg_czxs': '成长型/小盘'
}
// 机会/风险期
const opportunity = {
  'jhfxq_all': '全部',
  'jhfxq_jh': '机会期基金',
  'jhfxq_fx': '风险期基金'
}
// 封闭期
const fbq = {
  'fbq_all': '全部',
  'fbq_7day': '7天',
  'fbq_14day': '14天',
  'fbq_21day': '21天',
  'fbq_28day': '28天',
  'fbq_1mon': '1个月',
  'fbq_2mon': '2个月',
  'fbq_3mon': '3个月',
  'fbq_6mon': '6个月'
}
export {
  descrips,
  jjgm,
  foundedTime,
  bigLimit,
  trades,
  investmentStyle,
  opportunity,
  fbq
}
