<style>
.demo-detail {
  text-align: center;
  font-size: 1rem
}
</style>

<template>
<div class="demo-wrapper">
  <div class="demo-wrapper-inner">
    <div class="demo-detail">{{message}}</div>
  </div>
  <sass />
  <pug />
  <fetch />
  <store />
  <async-store />
</div>
</template>

<script>
import Sass from './sass'
import Pug from './pug'
import Fetch from './fetch'
import Store from './store'
import AsyncStore from './async-store'

export default {
  data () {
    return {
      message: 'Hello Vue'
    }
  },
  components: {
    Sass,
    Pug,
    Fetch,
    Store,
    AsyncStore
  },
  methods: {

  },
  mounted () {
    document.title = 'vue-demo'
  }
}
</script>
