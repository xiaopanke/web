<style>
body {
    background-color: #000 !important;
    font-family: '微软雅黑';
}
</style>
<style lang="scss" scoped>
@import '../assets/css/reset.css';
.box {
    width: 100%;
}
.bg1 {
    background: url("../assets/images/sept-new-activity/sept-bg1.jpg") center 0 no-repeat;
    height: 500px;
}
.bg2 {
    background: url("../assets/images/sept-new-activity/sept-bg2.jpg") center 0 no-repeat;
    height: 500px;
}
.bg3 {
    background: url("../assets/images/sept-new-activity/sept-bg3.jpg") center 0 no-repeat;
    height: 500px;
}
.bg4 {
    background: url("../assets/images/sept-new-activity/sept-bg4.jpg") center 0 no-repeat;
    height: 611px;
}
.bg5 {
    background: url("../assets/images/sept-new-activity/sept-bg5.jpg") center 0 no-repeat;
    height: 811px;
}
.bg6 {
    background: url("../assets/images/sept-new-activity/sept-bg6.jpg") center 0 no-repeat;
    height: 796px;
}
.bg7 {
    background: url("../assets/images/sept-new-activity/sept-bg7.jpg") center 0 no-repeat;
    height: 1082px;
}
.box-con {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    height: 100%;
}
.con-left {
    width: 500px;
    float: left;
    height: 100%;
    position: relative;
}
.con-right {
    width: 500px;
    float: left;
    height: 100%;
    position: relative;
}
.con-left h2 {
    font-size: 38px;
    margin-top: 30px;
    float: left;
    width: 500px;
}
.color1 {
    color: #091e59;
}
.color2 {
    color: #300642;
}
.con-left-top {
    width: 453px;
    float: left;
    margin: 40px 0 0 17px;
}
.con-left-top img {
    width: 254px;
    height: 178px;
    border: 3px #fff solid;
    float: left;
}
.con-left-top div {
    float: left;
    width: 183px;
    height: 184px;
    float: right;
    text-align: right;
    position: relative;
}
.con-left-top div h3 {
    font-size: 39px;
}
.con-left-top div strong {
    font-size: 24px;
    font-weight: normal;
}
.con-left-top div p {
    font-size: 16px;
    margin: 10px 0;
}
.con-left-top div a {
    width: 183px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    background-color: #87a9f6;
    border-radius: 5px;
    display: block;
    margin-top: 15px;
    font-size: 22px;
    color: #091e59;
    position: absolute;
    bottom: 0;
    right: 0;
}
.zf {
    width: 451px;
    float: left;
    margin: 34px 0 0 17px;
}
.zf p {
    height: 41px;
    line-height: 41px;
}
.zf p em {
    width: 121px;
    height: 41px;
    background-color: #091e59;
    text-align: center;
    font-size: 24px;
    display: inline-block;
    margin-right: 13px;
}
.zf p span {
    font-size: 24px;
    font-weight: bold;
}
.zf div {
    font-size: 18px;
    width: 433px;
    min-height: 102px;
    padding: 3px 7px 8px 9px;
    background-color: #2253a5;
    border: 1px #ccc solid;
    border-radius: 5px;
    line-height: 30px;
    margin-top: 10px;
}
.ncLink {
    width: 291px;
    height: 58px;
    background: url("../assets/images/sept-new-activity/sept-btn.png") 0 0 no-repeat;
    position: absolute;
    bottom: 20px;
    left: 102px;
    color: #fff;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 58px;
}

.con-right h2 {
    font-size: 38px;
    margin-top: 70px;
    float: left;
    width: 500px;
    text-align: right;
}
.con-right .con-left-top {
    margin-left: 30px;
}
.con-right .zf {
    margin-left: 30px;
}
.con-right .ncLink {
    bottom: -20px;
}

.bg5 .con-right .zf p em {
    background-color: #300642;
}
.bg5 .con-right .zf div {
    background-color: #5e4c93;
}
.bg5 .con-right .con-left-top div a {
    background-color: #87a9f6;
}
.bg5 .con-left {
    color: #b0b4de !important;
}
.bg5 .con-right {
    color: #b0b4de !important;
}

.bg6 .con-left h2 {
    color: #451102;
    margin-top: 20px;
}
.bg6 .con-left .zf p em {
    background-color: #451102;
}
.bg6 .con-left .zf div {
    background-color: #9a452e;
}
.bg6 .con-right h2 {
    color: #0c1162;
    margin-top: 60px;
}
.bg6 .con-right .zf p em {
    background-color: #0d0e5f;
}
.bg6 .con-right .zf div {
    background-color: #3f3497;
}
.bg6 .con-left .con-left-top div a {
    background-color: #e46a48;
}
.bg6 .con-right .con-left-top div a {
    background-color: #87a9f6;
}
.bg6 .con-left {
    color: #edaf81 !important;
}
.bg6 .con-right {
    color: #b0b4de !important;
}

.bg7 .con-left h2 {
    color: #091e59;
    margin-top: 20px;
}
.bg7 .con-left .zf p em {
    background-color: #01385f;
}
.bg7 .con-left .zf div {
    background-color: #156ba6;
}
.bg7 .con-right h2 {
    color: #300642;
    margin-top: 60px;
}
.bg7 .con-right .zf p em {
    background-color: #3f0339;
}
.bg7 .con-right .zf div {
    background-color: #792168;
}
.bg7 .con-left .con-left-top div a {
    background-color: #87a9f6;
}
.bg7 .con-right .con-left-top div a {
    background-color: #d64276;
}
.bg7 .con-left {
    color: #b0b4de !important;
    height: 796px;
}
.bg7 .con-right {
    color: #f3c2cf !important;
    height: 793px;
}
.footer {
    width: 1000px;
    font-size: 20px;
    line-height: 30px;
    color: #9ab0e3;
    float: left;
    text-align: center;
    margin-top: 85px;
    border: 1px #9ab0e3 solid;
    border-radius: 5px;
    padding: 20px 0;
}
</style>

<template>
<div class="box">
    <div class="bg1">

    </div>
    <div class="bg2">
    </div>
    <div class="bg3">

    </div>
    <div class="bg4">

    </div>
    <div class="bg5">
        <div class="box-con" v-if="show">
            <div class="con-left">
                <h2 class="color1">{{dataList.dataList[0].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[0].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[0].name}}</h3>
                        <strong>{{dataList.dataList[0].type}}</strong>
                        <p>{{dataList.dataList[0].desc}}</p>
                        <a :href="dataList.dataList[0].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[0].zfTitle}}</span></p>
                    <div>{{dataList.dataList[0].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[0].case}}</div>
                </div>
                <a :href="dataList.dataList[0].ncUrl" class="ncLink">{{dataList.dataList[0].btnTxt}}</a>
            </div>
            <div class="con-right">
                <h2 class="color2">{{dataList.dataList[1].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[1].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[1].name}}</h3>
                        <strong>{{dataList.dataList[1].type}}</strong>
                        <p>{{dataList.dataList[1].desc}}</p>
                        <a :href="dataList.dataList[1].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[1].zfTitle}}</span></p>
                    <div>{{dataList.dataList[1].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[1].case}}</div>
                </div>
                <a :href="dataList.dataList[1].ncUrl" class="ncLink">{{dataList.dataList[1].btnTxt}}</a>
            </div>
        </div>
    </div>
    <div class="bg6">
        <div class="box-con" v-if="show">
            <div class="con-left">
                <h2 class="color1">{{dataList.dataList[2].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[2].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[2].name}}</h3>
                        <strong>{{dataList.dataList[2].type}}</strong>
                        <p>{{dataList.dataList[2].desc}}</p>
                        <a :href="dataList.dataList[2].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[2].zfTitle}}</span></p>
                    <div>{{dataList.dataList[2].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[2].case}}</div>
                </div>
                <a :href="dataList.dataList[2].ncUrl" class="ncLink">{{dataList.dataList[2].btnTxt}}</a>
            </div>
            <div class="con-right">
                <h2 class="color2">{{dataList.dataList[3].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[3].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[3].name}}</h3>
                        <strong>{{dataList.dataList[3].type}}</strong>
                        <p>{{dataList.dataList[3].desc}}</p>
                        <a :href="dataList.dataList[3].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[3].zfTitle}}</span></p>
                    <div>{{dataList.dataList[3].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[3].case}}</div>
                </div>
                <a :href="dataList.dataList[3].ncUrl" class="ncLink">{{dataList.dataList[3].btnTxt}}</a>
            </div>
        </div>
    </div>
    <div class="bg7">
        <div class="box-con" v-if="show">
            <div class="con-left">
                <h2 class="color1">{{dataList.dataList[4].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[4].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[4].name}}</h3>
                        <strong>{{dataList.dataList[4].type}}</strong>
                        <p>{{dataList.dataList[4].desc}}</p>
                        <a :href="dataList.dataList[4].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[4].zfTitle}}</span></p>
                    <div>{{dataList.dataList[4].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[4].case}}</div>
                </div>
                <a :href="dataList.dataList[4].ncUrl" class="ncLink">{{dataList.dataList[4].btnTxt}}</a>
            </div>
            <div class="con-right">
                <h2 class="color2">{{dataList.dataList[5].title}}</h2>
                <div class="con-left-top">
                    <img :src="dataList.dataList[5].headerImg" />
                    <div>
                        <h3>{{dataList.dataList[5].name}}</h3>
                        <strong>{{dataList.dataList[5].type}}</strong>
                        <p>{{dataList.dataList[5].desc}}</p>
                        <a :href="dataList.dataList[5].liveUrl">进入直播室交流</a>
                    </div>
                </div>
                <div class="zf">
                    <p><em>独创战法</em><span>{{dataList.dataList[5].zfTitle}}</span></p>
                    <div>{{dataList.dataList[5].zfText}}</div>
                </div>
                <div class="zf">
                    <p><em>实战案例</em><span></span></p>
                    <div>{{dataList.dataList[5].case}}</div>
                </div>
                <a :href="dataList.dataList[5].ncUrl" class="ncLink">{{dataList.dataList[5].btnTxt}}</a>
            </div>
            <p class="footer"> 在购买过程中如果有任何疑问，都可以拨打客服电话进行咨询，24小时在线！ <br />欢迎垂询：400-166-1188 转3</p>
        </div>
    </div>
</div>
</template>
<script>
import {
    mapState
} from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  computed: mapState({
    dataList: state => {
      return state.septNewActivity.dataList
    }
  }),
  components: {},
  methods: {},
  mounted () {
    document.title = '进阶股市高手速成攻略'
    this.$store.dispatch('septNewActivity/fetch')
    this.$watch('dataList', dataList => {
      this.show = true
    })
  }
}
</script>
