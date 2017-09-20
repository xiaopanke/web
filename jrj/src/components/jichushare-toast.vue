<style scoped>
.tiperror {
  z-index: 9999;
  width: 5.2rem;
  line-height: 1rem;
  background: rgba(0, 0, 0, .68);
  border-radius: 4px;
  color: #fff;
  font-size: .32rem;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -2.6rem;
  margin-top: -.5rem;
  display: none;
}
</style>
<template>
<div class="jichushare-toast">
  <div :style="{display:errs.length > 0 ? 'block' : 'none'}" class="tiperror">{{errs.length > 0 ? errs[errs.length-1].message : ''}}</div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {}
  },
  beforeUpdate () {
    clearTimeout(this._timer)
    if (this.errs.length > 0) {
      this._timer = setTimeout(() => {
        this.$store.commit('error/pop')
      }, 2000)
    }
  },
  computed: mapState({
    errs: state => state.error.errs
  }),
  mounted () {}

}
</script>
