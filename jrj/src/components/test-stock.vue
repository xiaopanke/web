<template>
  <div class="test-stock">
      <input v-model="stockCode"/>
      <div class="stock-chart">
          <StockKline :stockCode="stockCode"></StockKline>
      </div>
  </div>
</template>
<script>
    import StockKline from 'components/stock-kline'
    export default{
      data () {
        return {
          stockCode: '600030.SH'
        }
      },
      components: {
        StockKline
      }
    }
</script>
<style>
    .test-stock .stock-chart{
        width:500px;
        height:300px;
        margin:10px auto;
    }
</style>
