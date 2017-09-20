<style>
.red {
  color: red
}
</style>
<template>
<div>{{ !name ? 'Loading...' : `fetched name: ${name}` }}</div>
</template>

<script>
import 'whatwg-fetch'

export default {
  data () {
    return {}
  },
  props: ['name'],
  components: {},
  methods: {
    fetchData () {
      setTimeout(() => {
        fetch('/package.json').then((res) => {
          return res.json()
        }).then(body => {
          this.name = body.name
        })
      }, 1000)
    }
  },
  mounted () {
    document.title = 'vue-demo'
    this.fetchData()
  }
}
</script>
