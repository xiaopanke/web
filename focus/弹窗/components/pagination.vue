<style lang="scss" scoped>

.pagination {
    width: 100%;
    margin: 0;
    & > a {
        vertical-align: bottom;
    }
}
.glyphicon {
    font-size: 12px;
    color: #000;
    display: inline-block;
    margin: 0 10px;
    &:hover {
        color: #ff4040;
        text-decoration: underline;
    }
}
.disabled.glyphicon {
    color: #999;
    cursor: not-allowed;
}
.curr-page {
    outline: 0;
    border: 0 none;
    width: 10px;
    padding: 5px 0;
    font-size: 12px;
    vertical-align: bottom;
    text-align: center;
    color: #ff4040;
    text-decoration: underline;
}
.disabled {}
</style>

<template>
<div class="pagination" :style="{textAlign:align||'right'}">
  <a href="javascript:;" title="第一页" @click="turn(1)" :class="'glyphicon glyphicon-step-backward' + (page === 1 ? ' disabled' : '')">首页</a>
  <a href="javascript:;" title="上一页" @click="prev($event)" :class="'glyphicon glyphicon-triangle-left' + (page === 1 ? ' disabled' : '')">上一页</a>
  <input @input="go($event)" class="curr-page" :value="page||1" />
  <a href="javascript:;" title="下一页" @click="next($event)" :class="'glyphicon glyphicon-triangle-right' + (page === totalPage ? ' disabled' : '')">下一页</a>
  <a href="javascript:;" title="最后一页" @click="turn(totalPage)" :class="'glyphicon glyphicon-step-forward' + (page === totalPage ? ' disabled' : '')">尾页</a>
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
