<style scoped>
.dadian-table{ margin:20px;}
table{border-collapse: collapse;width:100%}
table tr:nth-child(1){background: #ccc}
td{border:1px solid #919191;}
td,th{max-width: 50px;word-break:break-all}
td div{padding:5px;}
</style>
<template>
<div class="dadian-table">
  <table>
    <tr>
      <td v-for="(item,index) in tabledata.th">
        {{item}}
      </td>
    </tr>
      <tr v-for="(item,index) in tabledata.td">
        <td v-for="(item2,index2) in item"><div class="">
          {{item2}}
        </div></td>
      </tr>
  </table>

</div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      tabledata: {

      }
    }
  },
  props: ['tabledata'],
  computed: mapState({
  }),
  mounted () {
  },
  methods: {
  }
}
</script>
