<style scoped>
.tiperror {
  z-index: 9999;
  width: 400px;
  line-height: 40px;
  background: rgba(0, 0, 0, .68);
  border-radius: 4px;
  color: #fff;
  font-size: `6px`;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -20px;
}
</style>
<template>
<div class="toast">
  <div v-if="toastshow" class="tiperror">{{msg}}</div>
</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  props: ['msg'],
  data () {
    return {
      toastshow: true
    }
  },
  computed: mapState({

  }),
  mounted () {}

}
</script>
