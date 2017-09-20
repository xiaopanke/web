<style>
@import '../assets/animate.css';
html,
body,
ul,
li {
  margin: 0;
  padding: 0;
}

body {
  background-color: #dedede;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.app>* {
  text-align: center;
  position: absolute;
  top: 0;
  width: 100%;
  animation-duration: .2s;
  -webkit-animation-duration: .2s;
}
</style>

<template>
<div class="app">
  <transition :enter-active-class="`animated ${enter}`" :leave-active-class="`animated ${leave}`">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  data () {
    return {
      enter: 'fadeInRight',
      leave: 'fadeOutLeft',
      last: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.enter = this.last.path === to.path ? 'fadeInLeft' : 'fadeInRight'
      this.leave = this.last.path === to.path ? 'fadeOutRight' : 'fadeOutLeft'
      if (this.last.path !== to.path) {
        this.last = from
      }
    }
  }
}
</script>
