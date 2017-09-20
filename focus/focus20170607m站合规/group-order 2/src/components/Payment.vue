<template>
  <div>
    <p class="payment-comp-title">选择支付方式</p>
    <section class="payment-comp">
      <p @click="payment=pm" v-for="pm in payTypeList"><i :class="'p'+pm"></i>{{pm==4?'支付宝':pm==2?'微信支付':'财付通'}}<b :class="{'checked': payment==pm}"></b></p>
      <!-- <p @click="payment=4">支付宝<b :class="{'checked': payment==4}"></b></p> -->
      <!-- <p @click="payment=1"><i class="i-1"></i>财付通<b :class="{'checked': payment==1}"></b></p> -->
    </section>
  </div>

</template>


<script>
export default {
  props: ['payment', 'payTypeList'],
  ready(){
    if($('.payment-comp p b.checked').length == 0){
      $('.payment-comp p b:first').addClass('checked');
      this.payment = this.payTypeList[0];
    }
  }
}
</script>
 

<style>
  .payment-comp-title {
    padding: 0 12px;
  }
  .payment-comp {
    padding: 5px 0;
    margin-top: 5px;
  }
  .payment-comp>p {
    font-size: 16px;
    padding: 18px 12px 18px 50px;
    position: relative;
  }
  .payment-comp>p:first-child {
    border-top: 0;
  }
  .payment-comp>p>b {
    position: absolute;
    top: 0; bottom: 0;
    right: 12px;
    margin: auto;
    width: 21px;height: 21px;
    background-color: #f0f0f0;
    border-radius: 50%;
  }

  .payment-comp>p>b:before {
    content: '';
    position: absolute;
    top: 3px;
    right: 0; left: 0;
    margin: auto;
    width: 7px; height: 12px;
    transform: rotate(45deg);
    border-style: solid;
    border-color: #fff;
    border-width: 0 2px 2px 0;
  }

  .payment-comp>p>b.checked {
    background-color: #f24439;
  }
  .payment-comp>p>i {
    position: absolute;
    left: 12px;
    top: 50%;
    margin-top: -16px;
    width: 35px;
    height: 35px;
    background: url(../../img/payicon.png);
    background-size: cover;
  }

  .payment-comp>p>i.p1 { /*财付通*/
    background-position: center 50%;
  }
  .payment-comp>p>i.p2 { /*微信*/
    margin-top: -14px;
    background-position: center 100%;
  }
  .payment-comp>p>i.p4 { /*支付宝*/
    background-position: center 0;
  }
</style>
