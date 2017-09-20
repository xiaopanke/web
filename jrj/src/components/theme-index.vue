<style lang="scss">
    @import '../assets/css/base.css';
    .theme-index{
        background: #f2f2f2;
        color: #191919;
        width: 100%;
    }
    
</style>
<template> 
   <div class="theme-index">
       <ThemeList/>  
       <AllTopic />
       <Pagination/>
   </div>
       
</template>

<script>
 import ThemeList from './theme-list'
 import AllTopic from './theme-alltopic'
 export default {
   data () {
     return {}
   },
   components: {
     ThemeList,
     AllTopic
   }
 
 }
</script>
