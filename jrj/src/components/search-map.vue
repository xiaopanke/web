<style lang="scss" scoped>
    *{box-sizing: border-box;}
    .search_wrap{width: 200px;display: inline-block;position: relative;}
    .search_box{
        width: 200px;
        height: 23px;
        line-height: 23px;
        background: url(../assets/images/stock-map/icon_quick_search.png) no-repeat -12px 5px;
        background-color: #2c2e31;
        border: none;
        outline: none;
        color: #fefefe;
        font-size: 12px;
        padding-left: 25px;
        border-radius: 3px;
    }
    .bubSearchResult{
        width: 200px;
        position: absolute;
        left: 0px;
        top:20px;
        z-index:99999;
        color: #fff;
        background: #3f414b;
        padding: 0 10px;
    }
    .bubSearchResult li {
        line-height: 28px;
        border-bottom: 1px solid #262931;
    }
    .bubSearchResult li a{
        color: #929cb3;
        display: block;
        font-size: 10px;
        line-height: 19px;
        height: 20px;
        overflow: hidden;
    }
    .ticker{
        display: inline-block;
        width: 60px;
    }
    .bubSearchResult li span:first-child {
        margin-right: 10px;
    }
</style>
<template>
    <div class="search_wrap">
        <input type="text" @input="search($event)"  ref="keyword" class="search_box"  placeholder="输入代码/简称/简拼定位个股" autocomplete="off" v-model="message"/>
        <ul class="bubSearchResult" v-if="stockSelectList && stockSelectList.length > 0 && message!=''">
            <li v-for="stock in stockSelectList"  v-on:click="focusStock($event)">
                <a href="#">
                    <span class="ticker">{{stock.id}}</span>
                    <span class="company">{{stock.name}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    export default{
      data () {
        return {
          stockSelectList: [],
          message: ''
        }
      },
      props: [],
      watch: {},
      methods: {
        search (e) {
          e.preventDefault()
          let keyword = this.$refs.keyword.value
          keyword = keyword.toUpperCase()
          this.message = keyword
          this.filterStocks(keyword)
        },
        filterStocks: function (keyword) {
          const mapData = [].concat(this.$store.state.stockMap.industries)
          const _this = this
          this.stockSelectList = []
          mapData.forEach(function (industry) {
            industry.children.forEach(function (lel2) {
              lel2.children.forEach(function (stock) {
                const isSelected = stock.id.indexOf(keyword) === 0 || stock.name.toUpperCase().indexOf(keyword) === 0 || (stock.chiSpel != null && stock.chiSpel.indexOf(keyword.toUpperCase()) === 0)
                if (isSelected && _this.stockSelectList.length < 10) {
                  _this.stockSelectList.push({
                    id: stock.id,
                    name: stock.name
                  })
                }
              })
            })
          })
        },
        focusStock: function (e) {
          e.stopPropagation()
          const focusStockId = e.currentTarget.children[0].children[0].innerText
          const focusStockName = e.currentTarget.children[0].children[1].innerText
          this.$emit('focusStock', focusStockName)
          this.message = focusStockId
          this.stockSelectList = []
        }
        /* focusInput: function (e) {
          e.preventDefault()
          const keyword = this.$refs.keyword.value
          debugger
          this.message = keyword
        }*/
      },
      mounted () {
        const _this = this
        document.getElementsByTagName('body')[0].onclick = function (e) {
          _this.message = ''
          _this.stockSelectList = []
        }
      }
    }
</script>
