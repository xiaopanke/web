<style>
</style>
<template>
<div>{{content ? `async store: ${content}` : 'Loading...'}}</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  computed: mapState({
    content: state => state.async.content
  }),
  mounted () {
    this.$store.dispatch('async/fetch')
  }
}
</script>
