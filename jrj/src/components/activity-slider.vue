<style lang="scss" scoped>
@import '../assets/css/reset.css';
@import '../assets/css/swiper.min.css';
</style>

<template>
<!-- Swiper -->
    <div class="swiper-container" :style="{width:listData.conWidth,height:listData.conHeight,padding:listData.conPadding}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in listData.list" :style="{backgroundImage:'url('+item.imgUrl+')',backgroundSize:'100% 100%'}"></div>
        </div>

        <!-- Add Pagination -->
        <div class="swiper-pagination" v-if="listData.pagShow" style="bottom:0;"></div>

        <!-- Add Arrows -->
        <div class="swiper-button-prev" v-if="listData.arrowShow" :style="{backgroundImage:'url('+listData.prev.imgUrl+')',width: listData.prev.width,height:listData.prev.height,backgroundSize:'100% 100%',marginTop:listData.prev.marginTop}"></div>
        <div class="swiper-button-next" v-if="listData.arrowShow" :style="{backgroundImage:'url('+listData.next.imgUrl+')',width: listData.next.width,height:listData.next.height,backgroundSize:'100% 100%',marginTop:listData.next.marginTop}"></div>
    </div>
</template>
<script>
import Swiper from '../assets/plugins/activity-slider/swiper.min.js'
window.Swiper = Swiper
export default {
  data () {
    return {
    //   listData: {
    //     conWidth: '500px',
    //     conHeight: '500px',
    //     conPadding: '50px',
    //     pagShow: false,
    //     arrowShow: true,
    //     loop: false,
    //     list: [
    //       {
    //         imgUrl: require('assets/images/activity-slider/fade1.jpg'),
    //         link: ''
    //       },
    //       {
    //         imgUrl: require('assets/images/activity-slider/fade2.jpg'),
    //         link: ''
    //       },
    //       {
    //         imgUrl: require('assets/images/activity-slider/fade3.jpg'),
    //         link: ''
    //       }
    //     ]
    //   }
    }
  },
  props: ['listData'],
  methods: {
    closeChapterDialog () {
      this.addChapterShow = false
      this.fixBgShow = false
    }
  },
  mounted () {
    var _this = this
    window.Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      effect: 'fade',
      grabCursor: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      loop: _this.listData.loop,
      paginationClickable: _this.listData.paginationClickable,
      autoplay: _this.listData.autoplay,
      autoplayDisableOnInteraction: _this.listData.autoplayDisableOnInteraction
    })
  }
}
</script>
