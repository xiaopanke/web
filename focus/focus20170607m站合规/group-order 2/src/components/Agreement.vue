<template>

  <p class="agreement">
      <b @click="isAgreed=isAgreed?false:true" :class="{'checked': isAgreed}"></b>
      <!-- <span @click="isAgreed=isAgreed?false:true">我已阅读并同意</span><a href="{{msg.agreeURL}}">《新兰德付费/免费服务使用协议》</a><span v-if="msg.orgId">和<a href="{{msg.agreeURL}}?type={{msg.orgId}}" v-text="'《'+msg.agreementName+'》'"></a></span> -->
      <span @click="isAgreed=isAgreed?false:true">我已阅读并同意</span><i @click="showAgreement">《服务使用协议和风险揭示书》</i><span v-if="msg.orgId">和<i @click="showAgreement(evt, msg.orgId)" v-text="'《'+msg.agreementName+'》'"></i></span>
  </p>

</template>


<script>
export default {
  props: ['msg', 'isAgreed', 'showAgree', 'agreeType'],
  methods: {
    showAgreement(evt,type) {
      this.$set('showAgree', true)
      this.$set('agreeType', type)
    }
  }
}
</script>


<style>
  .agreement {
    position: relative;
    margin: 0 12px;
    line-height: 20px;
    padding: 0 0 32px 24px;
  }

  .agreement>b {
    position: absolute;
    top: 2px; left: 0;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1px solid #999;
  }

  .agreement>b.checked {
    background-color: #f24439;
    border: 1px solid #f24439;
  }
  .agreement>b.checked:before {
    content: '';
    position: absolute;
    top: 1px;
    right: 0; left: 0;
    margin: auto;
    width: 5px; height: 10px;
    transform: rotate(45deg);
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0
  }

  .agreement i {
    font-style: normal;
    color: #f24439;
  }
</style>
