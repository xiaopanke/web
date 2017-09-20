<style lang="scss" scoped>
@import '../assets/css/reset.css';
.projects-dashboard {
    padding: 20px;
}
</style>
<template>
<div class="projects-dashboard">
  <ProjectsList :nickname="nickname" :finish="finish" />
</div>
</template>

<script>
import {
  mapState
} from 'vuex'

import ProjectsList from './projects-list'

export default {
  data () {
    return {}
  },
  computed: {
    nickname () {
      return this.$route.params.nickname
    },
    finish () {
      return location.search.indexOf('finish=1') !== -1
    },
    ...mapState({

    })
  },
  components: {
    ProjectsList
  },
  methods: {

  },
  mounted () {

  },
  beforeRouteEnter (to, from, next) {
    if (to.params.nickname) {
      document.title = `${to.params.nickname}的项目进度`
    } else {
      document.title = '当前项目进度'
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.nickname) {
      document.title = `${to.params.nickname}的项目进度`
    } else {
      document.title = '当前项目进度'
    }
    next()
  }
}
</script>
