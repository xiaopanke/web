import Vue from 'vue'
import group from './App.vue'

new Vue({
  el: 'body',
  components: { group },

  ready() {
	  new IScroll('#group-content',{click:true,tap:true})
  }
})
