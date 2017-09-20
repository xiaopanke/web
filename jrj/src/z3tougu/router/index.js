import Search from 'components/search'
import Map from 'components/z3tougu-map'
import SearchBox from 'components/search-box'
import DetailPages from 'components/detail-pages'
import ThemeList from 'components/theme-list'
import ThemeIndex from 'components/theme-index'
import Siwei from 'components/siwei'
import ThemeInformat from 'components/theme-informat-list'
import TopicDetail from 'components/topic-detail'
import GoldStrategy from 'components/gold-strategy'
import GoldStrategyH5 from 'components/gold-strategy-h5'
import BacktestDetailH5 from 'components/backtest-detail-h5'
import foundpoollist from 'components/foundpoollist'
import foundpooldetail from 'components/foundpooldetail'
import ownstrategylist from 'components/ownstrategylist'
import editstrategy from 'components/editstrategy'
import runstatestrategy from 'components/runstatestrategy'
import Filter from 'components/filter/filter'
import BacktestFilter from 'components/backtest-filter'
import BacktestFilterH5 from 'components/backtest-filter-h5'
import BacktestTime from 'components/backtest-time'
import BacktestTimeH5 from 'components/backtest-time-h5'
import FundChart from 'components/fund-chart'
import FundFile from 'components/fund-file'
import z3TouguIndex from 'components/z3touguhome/z3tougu-index'
import NewsList from 'components/z3touguhome/newslist'
import NewsDetails from 'components/z3touguhome/news-details'
import SmartPoolList from 'components/smartPool/smartPoolList'
import SmartPoolListDetails from 'components/smartPool/smartPoolListDetails'
import FundArchives from 'components/fund-archives/fund-archives'
import FundRecommend from 'components/fund-recommend'
import StrategyList from 'components/z3touguhome/strategy-list'
import { ctx } from '../config'

export default [
    { path: ctx, component: z3TouguIndex },
    { path: ctx + '/', name: 'homeRoot', component: z3TouguIndex },
    { path: ctx + '/home', name: 'home', component: z3TouguIndex },
    { path: ctx + '/search-box', name: 'search-box', component: SearchBox },
    { path: ctx + '/search/:linkText/:keyword', name: 'search', component: Search },
    { path: ctx + '/detail-pages/:detailType/:id', name: 'detailPages', component: DetailPages },
    { path: ctx + '/map', name: 'map', component: Map },
    { path: ctx + '/map/fullScreen', name: 'bigmap', component: Map },
    { path: ctx + '/map/normal', name: 'normalmap', component: Map },
    { path: ctx + '/themeList', name: 'themelist', component: ThemeList },
    { path: ctx + '/themeIndex', name: 'themeindex', component: ThemeIndex },
    { path: ctx + '/siwei', name: 'bubbles', component: Siwei },
    { path: ctx + '/informatList/:inforId', name: 'themeInformat', component: ThemeInformat },
    { path: ctx + '/topic/:topicId', name: 'topicDetail', component: TopicDetail },
    { path: ctx + '/gold-strategy/:strategyId', name: 'goldStrategy', component: GoldStrategy },
    { path: ctx + '/gold-strategy/:strategyId/:showType', name: 'goldStrategyType', component: GoldStrategy },
    { path: ctx + '/gold-strategy-h5/:strategyId', name: 'goldStrategyH5', component: GoldStrategyH5 },
    { path: ctx + '/backtest-detail-h5/:strategyId/:backtestId', name: 'BacktestDetailH5', component: BacktestDetailH5 },
    { path: ctx + '/foundpoollist', name: 'foundpoollist', component: foundpoollist },
    { path: ctx + '/foundpooldetail/:id', name: 'foundpooldetail', component: foundpooldetail },
    { path: ctx + '/ownstrategylist', name: 'ownstrategylist', component: ownstrategylist },
    { path: ctx + '/editstrategy', name: 'editstrategy', component: editstrategy },
    { path: ctx + '/runstatestrategy', name: 'runstatestrategy', component: runstatestrategy },
    { path: ctx + '/z3touguIndex', name: 'z3touguIndex', component: z3TouguIndex },
    { path: ctx + '/filter', name: 'filter', component: Filter },
    { path: ctx + '/backtestFilter/:strategyId', name: 'backtestfilter', component: BacktestFilter },
    { path: ctx + '/backtestFilterH5/:strategyId', name: 'backtestfilterh5', component: BacktestFilterH5 },
    { path: ctx + '/backtestTime/:strategyId', name: 'backtesttime', component: BacktestTime },
    { path: ctx + '/backtestTimeH5/:strategyId', name: 'backtesttimeh5', component: BacktestTimeH5 },
    { path: ctx + '/fundRecommend', name: 'fundrecommend', component: FundRecommend },
    // { path: ctx+'/intellCombList', name: 'intellcomblist', component: IntellCombList },
    { path: ctx + '/fund-chart', name: 'fundchart', component: FundChart },
    { path: ctx + '/fund-file', name: 'fundfile', component: FundFile },
    { path: ctx + '/home/:newsType', name: 'newslist', component: NewsList },
    { path: ctx + '/home/:newsType/newsDetail/:newsId', name: 'newsdetails', component: NewsDetails },
    { path: ctx + '/smartPool', name: 'smartPoolList', component: SmartPoolList },
    { path: ctx + '/smartPoolListDetails/:id', name: 'smartPoolListDetails', component: SmartPoolListDetails },
    { path: ctx + '/fundArchives', name: 'fundArchives', component: FundArchives },
    { path: ctx + '/strategyList', name: 'strategyList', component: StrategyList }

]
