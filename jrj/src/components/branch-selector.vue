<style scoped>

</style>
<template>
<div class="branch-selector">
  <input ref="branch"></input>
  <button @click="setCookie">切换分支</button>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'
import cookie from 'component-cookie'

export default {
  data () {
    return {

    }
  },
  computed: mapState({}),
  mounted () {

  },
  methods: {
    setCookie () {
      cookie('__branch', this.$refs.branch.value, {
        maxage: 1000 * 3600 * 24 * 30
      })
    }
  }
}
</script>
