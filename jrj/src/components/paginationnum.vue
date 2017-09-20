<style lang="scss" scoped>

.pagination {
    width: 100%;
    margin: 0;
    & > a {
        vertical-align: bottom;
    }
}
.glyphicon {
    font-size: 20px;
    color: #00e2d4;
    &:hover {
        color: darken(#00e2d4,5%);
    }
}
.disabled.glyphicon {
    color: #ccc;
    cursor: not-allowed;
}
.curr-page {
  outline: 0;
border: 0 none;
width: 58px;
padding: 2px 0;
font-size: 20px;
/* vertical-align: bottom; */
text-align: center;
color: #999;
border: 1px solid #999;
}
.disabled {}
</style>

<template>
<div class="pagination" :style="{textAlign:align||'center'}">
  <a href="javascript:;" title="第一页"><i @click="turn(1)" :class="'glyphicon glyphicon-step-backward' + (page === 1 ? ' disabled' : '')"></i></a>
  <a href="javascript:;" title="上一页"><i @click="prev($event)" :class="'glyphicon glyphicon-triangle-left' + (page === 1 ? ' disabled' : '')"></i></a>
  <input @input="go($event)" class="curr-page" :value="page||1" />
  <a href="javascript:;" title="下一页"><i @click="next($event)" :class="'glyphicon glyphicon-triangle-right' + (page === totalPage ? ' disabled' : '')"></i></a>
  <a href="javascript:;" title="最后一页"><i @click="turn(totalPage)" :class="'glyphicon glyphicon-step-forward' + (page === totalPage ? ' disabled' : '')"></i></a>
</div>
</template>

<script>
export default {
  props: ['page', 'size', 'total', 'align'],
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.size)
    }
  },
  components: {},
  methods: {
    prev (ev) {
      if (this.page === 1) return
      this.$emit('change', this.page - 1)
    },
    next (ev) {
      if (this.page === this.totalPage) return
      this.$emit('change', this.page + 1)
    },
    go (ev) {
      clearTimeout(this._inputTimer)
      this._inputTimer = setTimeout(() => {
        const page = ev.target.value
        this.turn(page)
      }, 200)
    },
    turn (page) {
      page = Math.min(this.totalPage, page)
      page = Math.max(1, page)
      this.$emit('change', page)
    }
  },
  mounted () {}
}
</script>
