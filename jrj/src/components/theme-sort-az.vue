<style lang="scss" scoped>
    @import '../assets/css/base.css';
    *{
      text-align: justify;
    }
    em,i{
      font-style: normal;
    }
    
    .blue{
      color: #2388da;
      font-size: 12px;
    }
    .red{
      color:#e6363a !important;
    }
    .green {
      color:#48a854 !important;
    }
    
    span{
      color: #696969;
    }
    html,body{
        background: #f2f2f2;

    }
   .sortaz-wrap{
     /*  background: #f2f2f2;
      width: 100%;
      font-size: 12px;
      color: #696969; */
   }
   .az-main{

   }
   .sort-hot{
     
     /*  width: 100%;
      margin: 0 auto; */
   }
 /*   .hot-name{
    margin-left: 19px;
    display: inline-block;
   } */
   .every-topical-wrap{
     background: #ffff;
     padding-left: 11px;
     padding-right: 8px;
     height: 100%;
     width: 100%;
     box-sizing: border-box;
     min-height:50px;
     overflow-y: scroll;
   }
   .every-main{
     border-bottom:1px solid #e5e5e5;
     font-size: 12px;
     color: #696969;
     padding:7px 16px 9px 16px;
   }
   .letter{
     line-height: 20px;
     width: 5%;
   }
   .letter i{
    margin-left: 8px;
   }
   .every-name{
    width: 91%;
    padding-left: 2%;
   }
   .every-name .tname{
     /* padding: 0 10px; */
     width: 10%;
     line-height: 20px;
     color: #696969;
     display: inline-block;
     cursor: pointer;
   }
    .every-name a:hover{
       text-decoration: underline;
    }
    .block{
      color: #696969;
    }
</style>
<template>
   <div class="every-topical-wrap">
      <div class="every-main clearfix" v-for="key of sortList" >
         <div class="fl letter"><span >{{key}}</span><i>></i></div>
         <div class="fl every-name" v-if="routeName === 'themeindex'">
              <a v-for="g of groupTopics[key]" :value="g.topicCode" class="tname">
                  <router-link :to="{name:'topicDetail',params:{topicId:g.topicCode}}" :class="g.topicMarket!=null ? checkClass(g.topicMarket.chngPct):'block'" >
                  {{g.topicName}}</router-link>
              </a>
         </div>
         <div class="fl every-name" v-else>
                <a v-for="g of groupTopics[key]" :class="g.topicMarket!=null ? checkClass(g.topicMarket.chngPct):'block'" :value="g.topicCode" @click="getVal($event)" class="tname">{{g.topicName}}</a>
        </div>
      </div>
      
   </div>
    
</template>

<script>
 import { mapState } from 'vuex'
 
 export default {
   data () {
     return {
       routeName: this.$route.name
     }
   },
   computed: mapState({
     groupTopics: state => state.topic.groupTopics,
     sortList: state => {
       const groupData = state.topic.groupTopics
       // const arr = []
       // for (const key in groupData) {
       //   arr.push(key)
       // }
 
       return Object.keys(groupData).sort()
     }
 
     // groupTopics: state => state.topic.groupTopics

   }),
   components: {
 
   },
   methods: {
     changeTofixed (num) {
       return num > 0 ? '+' + parseFloat(num).toFixed(2) + '%' : parseFloat(num).toFixed(2) + '%'
     },
     checkClass (str) {
       if (str === null) {
         str = 'block'
       } else if (str > 0) {
         str = 'red'
       } else if (str === 0) {
         str = 'block'
       } else {
         str = 'green'
       }
       return str
     },
     getVal (e) {
       const text = e.target.innerHTML
       const val = e.target.getAttribute('value')
       this.$emit('getThemeValue', [val, text])
     }
   },
   watch: {
 
   },
   mounted () {
     this.$store.dispatch('topic/queryGroupTopics')
     this.$watch('groupTopics', function (groupTopics) {
       if (groupTopics) {
         this.$emit('groupTopicSuccess')
       }
     })
   }
 
 }
</script>
