<style>
</style>
<template>
<div>{{content}}</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  computed: mapState({
    content: state => state.sync.content
  })
}
</script>
