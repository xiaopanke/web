<style lang="scss" scoped>
.component-panel {
    margin: 10px;
    background: white;
    border-radius: 5px;
    padding: 5px;
}
.btns-panel {
    text-align: right;
}
.btn-detail {
    display: inline-block;
    padding: 4px 7px;
}
h2 {
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    padding: 4px 0;
    margin: 0;
    float: left;
    color: #3380ff;
}
.doc-block {
    text-align: left;
    border-bottom: 1px solid #efefef;
    padding: 20px 0 10px;
}
.doc-block-head {
    font-weight: bold;
}
.doc-item {
    color: #999;
    line-height: 30px;
    font-size: 14px;
}
.prop-name {
    color: #ff5d5d;
}
.component-desc {
    color: #999;
}
.prop-input {
    outline: 0;
    border: 1px solid #ccc;
    padding: 4px 7px;
    display: block;
    box-sizing: border-box;
    width: 100%;
}
</style>

<template>
<div class="component-panel">
  <slot></slot>
  <div v-if="showDetail === true" class="detail">
    <ul class="doc-block">
      <li class="doc-block-head">Props</li>
      <li class="doc-item" v-for="item of props">
        <span class="prop-name">{{item.name}}:</span> {{item.desc}}
        <input @input="setProp(item.name, $event)" class="prop-input" />
      </li>
    </ul>
    <ul class="doc-block">
      <li class="doc-block-head">Events</li>
      <li class="doc-item" v-for="item of events"><span class="prop-name">{{item.name}}:</span> {{item.desc}}</li>
    </ul>
    <ul class="doc-block">
      <li class="doc-block-head">Slots</li>
      <li class="doc-item" v-for="item of slots"><span class="prop-name">{{item.name}}:</span> {{item.desc}}</li>
    </ul>
  </div>
  <div class="btns-panel">
    <h2>{{name}} <span class="component-desc">{{desc}}</span></h2>
    <a class="btn-detail" href="javascript:;" @click.prevent="toggleDetail">{{showDetail ? '收起' : '查看详细'}}</a>
  </div>
</div>
</template>

<script>
import camelcase from 'camel-case'

export default {
  props: {
    name: String,
    desc: String,
    props: Array,
    events: Array,
    slots: Array
  },
  data () {
    return {
      showDetail: false
    }
  },
  components: {},
  methods: {
    toggleDetail () {
      this.showDetail = !this.showDetail
    },
    setProp (key, ev) {
      this.$children[0].$props[camelcase(key)] = ev.target.value
    }
  },
  mounted () {}
}
</script>
