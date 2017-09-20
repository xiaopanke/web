<template>
  <div class="coupon">
    <div class="mask-bg" @click="hideCoupon" v-if="coupons.showCoupon" transition="fade"></div>

    <div id="coupon-list" :class="{'move':coupons.showCoupon}">
      <ul>
        <li v-for="coupon in couponList" :class="{'selected':coupons.couponId==coupon.id}" @click="selectCoupon" data-id="{{coupon.id}}" data-price="{{coupon.price}}">
          <p><span v-text="(+coupon.price)"></span>元</p>
          <p>使用条件：<span v-text="coupon.limitType"></span></p>
          <p>有效期：<small v-text="coupon.startTime"></small> 至 <small v-text="coupon.endTime"></small></p>
          <b><i></i></b>
        </li>
      </ul>
      <div class="trigger" @click="hideCoupon"></div>
    </div>
   
  </div>
</template>


<script>
  function getParent(tag, el) {
    if(el.tagName.toLowerCase() == tag) return el
    var parent = el.parentNode;
    while( parent && parent.tagName && parent.tagName.toLowerCase() != tag ) {
      parent = parent.parentNode
    }
    return parent
  }

  export default {
    props: ['couponList', 'coupons'],
    methods:{
      selectCoupon(evt) {
        var li = getParent('li', evt.target), _this = this
        
        ghostClick(function(){ 
          _this.$set('coupons.couponId', _this.coupons.couponId==li.dataset.id?'':li.dataset.id)
          _this.$set('coupons.discount', _this.coupons.couponId?+li.dataset.price:0)
          _this.$set('coupons.showCoupon', false)
        })
      },

      hideCoupon() {
        var _this = this
        ghostClick( function(){ _this.$set('coupons.showCoupon', false) } )
      }
    },
    ready() {
      new IScroll('#coupon-list',{click:true,tap:true})
    }
  }
</script>
 

<style>

  .mask-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .5;
    z-index: 30;
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

  #coupon-list {
    position: fixed;
    left: 110%;
    top: 0; bottom: 0;
    width: 80%;
    background-color: #f5f5f5;
    z-index: 40;
    transition: left .5s;
  }

  #coupon-list.move {
    left: 20%
  }


  .trigger {
    position: absolute;
    top: 50%;
    left: -15px;
    margin-top: -20px;
    width: 15px;
    height: 40px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: #f5f5f5;
    z-index: 20;
  }

  .trigger:after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 3px;
    margin: auto;
    width: 8px;height: 8px;
    transform: rotate(135deg);
    border-style: solid;
    border-color: #999;
    border-width: 2px 0 0 2px
  }


  #coupon-list>ul {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
  }

  #coupon-list li {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    line-height: 22px;
    margin: 10px;
    padding: 10px;
    position: relative;
  }



  #coupon-list li>b {
    position: absolute;
    top: 10px; 
    right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 22px;
    height: 22px;
  }

  #coupon-list li>b>i {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    right: 6px;
    width: 7px;height: 15px;
    transform: rotate(45deg);
    border-style: solid;
    border-color: #ddd;
    border-width: 0 2px 2px 0 
  }

  #coupon-list li.selected {
    border-color: #f24439;
  }

  #coupon-list li.selected>b {
    background-color: #f24439;
    border-color: #f24439;
  }

  #coupon-list li.selected>b>i {
    border-color: #fff;
  }

  #coupon-list li>p:first-child {
    color: #ff7800
  }

</style>
