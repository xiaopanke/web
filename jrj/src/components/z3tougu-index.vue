<style>
    @import '../assets/css/base.css';
    *{box-sizing: border-box;font-family: '微软雅黑';font-size:12px;}
    p{margin: 0px;}
    html,body{height:100%;}
    .wrap{padding: 0px 8px 8px 8px;min-width: 1217px;min-height:704px;height:100%;}
    body{background-color: #ebecee}
    .news-wrap{height: 31%;padding-top: 10px;}
    .strategy-map{height:38%;padding-top:10px;}
</style>
<template>
    <div class="wrap">
        <div class="news-wrap clearfix">
            <ThemeHome :themeWidth="themeWidth" :themeHeight="themeHeight"></ThemeHome>
        </div>
        <StrategyListHome :strategyListHeight="strategyListHeight"></StrategyListHome>
        <div class="strategy-map clearfix">
            <RecommendStrategyHome :RecommendStrategyWidth="RecommendStrategyWidth"></RecommendStrategyHome>
            <MapHome :mapWidth="mapWidth" :mapHeight="mapHeight"></MapHome>
        </div>
    </div>
</template>
<script type="text/javascript">
    import StrategyListHome from 'components/strategy-list-home'
    import RecommendStrategyHome from 'components/recommed-strategy-home'
    import MapHome from 'components/map-home'
    import ThemeHome from 'components/theme-home'
    export default {
      data () {
        return {
          strategyListHeight: '31%',
          RecommendStrategyWidth: '60%',
          mapWidth: '39.7%',
          mapHeight: '100%',
          themeWidth: '39.7%',
          themeHeight: '100%'
        }
      },
      props: [''],
      components: {
        StrategyListHome,
        RecommendStrategyHome,
        MapHome,
        ThemeHome
      },
      methods: {
    
      },
      mounted () {

      }
    }
</script>
