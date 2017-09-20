<style>
@import '../assets/css/base.css';
* {
  box-sizing: border-box;
}

.chart {
  width: 100%;
}

.map_legend {
  color: #fff;
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .25);
  position: absolute;
  top: 0px;
  right: 0px;
}

.map_legend .step {
  /*  width: 50px;*/
  height: 20px;
  line-height: 20px;
  cursor: default;
  display: inline-block;
  float: left;
  text-align: center;
  margin-left: 4px;
}

.playback {
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #2c2e31;
  color: #fff;
}

.chart_bottom {
  margin-top: 10px;
  position: relative;
  height: 25px;
}

.chart_bottom_enlarge {
  position: absolute;
  bottom: 0px;
  height: 41px;
  width: 100%;
}

.chart_bottom_enlarge .playback {
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 10px;
  padding-bottom: 8px;
}

.chart_bottom_enlarge .map_legend {
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 10px;
  padding-bottom: 8px;
}

.perday {
  width: 35px;
  height: 20px;
  line-height: 20px;
  cursor: default;
  display: inline-block;
  float: left;
  font-size: 12px;
  text-align: center;
  margin-left: 4px;
  background-color: #262626;
}

.playback_btn {
  margin-left: 0;
  width: 25px;
  cursor: pointer;
  line-height: 25px;
}

.playback_btn img {
  vertical-align: baseline;
}

.play_line {
  width: 2px;
  height: 20px;
  background: #e34842;
  position: absolute;
  top: 0px;
  left: 786px;
}

.chart_bottom_enlarge .play_line {
  top: 8px;
}

.enlarge {
  width: 250px;
  height: 25px;
  padding-top: 10px;
  box-sizing: border-box;
  position: absolute;
  top: -32px;
  right: 0px;
}

.enlarge span,
.narrow span {
  color: #bdbdbd;
  margin-right: 24px;
  position: relative;
  top: -3px;
}

.enlarge a,
.narrow a {
  cursor: pointer
}

.enlarge img {
  opacity: 0.6;
}

.narrow {
  position: fixed;
  top: 16px;
  right: 22px;
  z-index: 9999;
  width: 288px;
  height: 56px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  line-height: 56px;
}

.narrow-link {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  top: 15px;
}

.narrow span {
  margin-right: 20px;
}

.narrow img {
  width: 20px;
}

.currentTime {
  color: #fff;
}

.map_wrap {
  position: relative;
}

.legend-switch {
  margin-right: 5px;
  float: left;
  width: 16px;
  margin-top: 4px;
  cursor: pointer;
}

.enlarge-link {
  position: absolute;
  top: 10px;
  right: 0px;
}
</style>
<template>
<div class="map_wrap">
  <StockList :node="hoverNode" :parent="hoverNodeParent" :offsetX="offsetX" :offsetY="offsetY" :indexCode="code" @updateWrapHeight="changeWrapHeight" v-if="showHover"></StockList>
  <div class="enlarge" v-if="!isEnlarge">
    <a v-on:click="restoreMap"><span>100%比例</span></a>
    <span class="currentTime">{{currentTime}}</span>
    <a v-on:click="toFullScreen" class="enlarge-link"><img src="../assets/images/stock-map/enlarge.png" alt=""/></a>
  </div>
  <div class="narrow" v-if="isEnlarge">
    <a v-on:click="restoreMap"><span>100%比例</span></a>
    <span class="currentTime">{{currentTime}}</span>
    <a v-on:click="toNormal" class="narrow-link"><img src="../assets/images/stock-map/narrow.png"/></a>
  </div>
  <div class="chart" ref="treemap" :style="{height:mapHeight+'px',width:mapWidth+'px'}" v-on:mousemove="move($event)"></div>
  <div v-bind:class="{'chart_bottom':!isEnlarge,'chart_bottom_enlarge':isEnlarge}">
    <div class="clearfix playback">
      <div class="playback_btn perday" v-if="!isEnlarge || isPlaybackShow"><img :src="playBackSrc" alt="" v-on:click="startPlay()" ref="playBtn"></div>
      <div class="play_line" ref="playLine" :style="{left:playLineIndex*39+playLineLeft+'px'}" v-if="(!isEnlarge || isPlaybackShow) && playLineIndex>=0"></div>
      <div v-for="date of playBackDateShow" class="perday" v-if="!isEnlarge || isPlaybackShow">{{date}}</div>
      <img src="../assets/images/stock-map/you.png" alt="" class="legend-switch" v-if="isEnlarge && !isPlaybackShow" v-on:click="switchPlayback">
      <img src="../assets/images/stock-map/zuo.png" alt="" class="legend-switch" v-if="isEnlarge && isPlaybackShow" v-on:click="switchPlayback">
    </div>
    <div class="map_legend clearfix">
      <img src="../assets/images/stock-map/you.png" alt="" class="legend-switch" v-if="isEnlarge && isLegendShow" v-on:click="switchLegend">
      <img src="../assets/images/stock-map/zuo.png" alt="" class="legend-switch" v-if="isEnlarge && !isLegendShow" v-on:click="switchLegend">
      <div v-for="legend of legendList" class="step" :style="{background:legend.backgroundColor,width:legendWidth+'px'}" v-if="!isEnlarge || isLegendShow">{{legend.value}}</div>
    </div>
  </div>
</div>
</template>
<script>
import playBackSrc from '../assets/images/stock-map/playback.png'
import playStopSrc from '../assets/images/stock-map/playstop.png'
import echarts from 'echarts'
// import treemapHelper from 'echarts/lib/chart/treemap/helper'
import StockList from 'components/stock-list-map'
import {
  ctx
} from '../z3tougu/config'
const colorsList1 = ['#f63538', '#ee373a', '#e6393b', '#df3a3d', '#d73c3f', '#ce3d41', '#c73e43', '#bf4045', '#b64146', '#ae4248', '#a5424a', '#9d434b', '#94444d', '#8b444e', '#824450', '#784551', '#6f4552', '#644553', '#5a4554', '#4f4554', '#414554', '#3f4c53', '#3d5451', '#3b5a50', '#3a614f', '#38694f', '#366f4e', '#35764e', '#347d4e', '#32844e', '#31894e', '#31904e', '#30974f', '#2f9e4f', '#2fa450', '#2faa51', '#2fb152', '#2fb854', '#30be56', '#30c558', '#30cc5a']
const colorsList2 = ['#3d4251', '#3d4250', '#3d4250', '#3e4251', '#3e4251', '#3d4350', '#3d4350', '#3d4350', '#3e4351', '#3e4350', '#3d4351', '#3d4352', '#3f4353', '#3f4353', '#3f4453', '#3f4554', '#3e4354', '#3e4354', '#3f4454', '#3f4454', '#3f4454', '#3f4454', '#3f4454', '#3f4555', '#3f4556', '#3f4457', '#3f4457', '#3f4457', '#3f4557', '#3f4657', '#3f4657', '#3f4657', '#3f4557', '#3e4557', '#3e4558', '#3f465a', '#3f4659', '#3f4759', '#3f4759', '#3f475a', '#3f4759', '#3f465a', '#3f465a', '#3f4759', '#3f475b', '#40475b', '#40475b', '#40465b', '#40465c', '#40465d', '#40485d', '#40485c', '#40475c', '#40465c', '#40465c', '#40465c', '#40485d', '#40485d', '#40485e', '#40485f', '#40495e', '#40495e', '#40485e', '#40485f', '#40495e', '#40485e', '#40485f', '#404960', '#404960', '#404860', '#404861', '#404a62', '#404962', '#404962', '#404a62', '#404a62', '#404861', '#404961', '#404a63', '#404a64', '#404a65', '#404b64', '#404b64', '#404a65', '#404a65', '#404a65', '#404a65', '#404b65', '#404b65', '#414c65', '#424c65', '#424b65', '#414b66', '#414b67', '#414b67', '#414c67', '#424b67', '#424c67', '#414c67', '#414b67', '#414c67', '#414c67', '#414c69', '#414c6a', '#414c6a', '#414c6a', '#414d6a', '#424e6a', '#414d6a', '#414d6a', '#414d6a', '#414d6a', '#414d6a', '#414d6b', '#414d6c', '#414e6c', '#414f6c', '#414e6c', '#414d6c', '#414d6c', '#414e6c', '#424e6d', '#424e6d', '#414f6d', '#424f6f', '#414e6f', '#414e6f', '#424f70', '#414f6f', '#414f6f', '#414f6f', '#414e6f', '#414e6f', '#414f6f', '#414f6f', '#414f71', '#414f72', '#425073', '#425173', '#415072', '#425173', '#425173', '#425173', '#415072', '#415072', '#415172', '#415173', '#415174', '#415174', '#415074', '#415074', '#415174', '#415074', '#415074', '#415074', '#415175', '#415275', '#425276', '#425277', '#415177', '#415177', '#425278', '#425378', '#415277', '#415378', '#415378', '#415277', '#415378', '#42537a', '#42537c', '#42537b', '#41537a', '#41527a', '#41537a', '#41547a', '#42547b', '#41547a', '#41547a', '#41547c', '#41547c', '#41557c', '#41557c', '#41557c', '#41557c', '#41557d', '#41547d', '#41547c', '#42557d', '#41557d', '#41557d', '#41557f', '#415580', '#41567f', '#41567f', '#415580', '#41567f', '#415580', '#415580', '#41557f', '#415680', '#415680', '#415680', '#415681', '#415681', '#415781', '#415781', '#415681', '#415781', '#415781', '#415781', '#415782', '#415784', '#415784', '#425885', '#425885', '#415784', '#415784', '#415784', '#415784', '#425885', '#425885', '#415885', '#415885', '#425987', '#415887', '#415887', '#415987', '#415887', '#425988', '#425988', '#415887', '#415987', '#415988', '#415988', '#415988', '#415989', '#415989', '#415989', '#415989', '#415989', '#415989', '#41598a', '#405a8b', '#405a8c', '#405b8c', '#405b8c', '#405b8c', '#405a8c', '#405a8c', '#405a8c', '#405a8c', '#405b8c', '#415c8d', '#415c8e', '#405b8e', '#415c90', '#405b8f', '#405c8f', '#415d90', '#405b8f', '#405c8f', '#405c8f', '#405b8f', '#405c8f', '#405c90', '#405c91', '#405c91', '#405c91', '#405d91', '#405e91', '#405d91', '#415e91', '#405e91', '#415e91', '#415e92', '#3f5d94', '#3f5d93', '#3f5d93', '#3f5e94', '#405e94', '#3f5d94', '#3f5d94', '#3f5d94', '#3f5e94', '#3f5e95', '#3f5e96', '#3f5e96', '#3f5e96', '#405f97', '#405f97', '#3f5e96', '#3f5e97', '#3f5f97', '#3f6097', '#3f5f97', '#3f6097', '#3f5f98', '#3f5f99', '#3e5f99', '#3e6199', '#3e6099', '#3e5f99', '#3e5f99', '#3e5f98', '#3e6099', '#3d609a', '#3d6099', '#3e609b', '#3e619c', '#3e619c', '#3e619c', '#3e609b', '#3e609c', '#3e609c', '#3e619b', '#3e629c', '#3e629c', '#3e619c', '#3d619d', '#3d639f', '#3d629f', '#3d629f', '#3d639f', '#3d629f', '#3c619e', '#3c619e', '#3d629f', '#3d62a0', '#3d63a0', '#3d63a0', '#3d62a0', '#3d63a1', '#3d62a0', '#3d63a0', '#3d64a1', '#3d63a0', '#3c63a0', '#3b63a2', '#3c64a3', '#3c65a3', '#3b63a3', '#3b63a3', '#3b63a3', '#3b63a3', '#3c63a3', '#3c65a3', '#3c65a3', '#3b64a4', '#3a65a5', '#3b66a6', '#3c65a6', '#3a65a5', '#3a64a5', '#3a64a5', '#3b65a5', '#3a65a5', '#3a66a6', '#3b66a6', '#3b66a6', '#3a66a8', '#3a67a8', '#3b67a8', '#3b66a8', '#3b66a8', '#3b66a8', '#3b67a8', '#3a66a8', '#3966a9', '#3967a9', '#3a67aa', '#3a67ab', '#3967ab', '#3a68ab', '#3a68ab', '#3968ab', '#3966aa', '#3966aa', '#3968ab', '#3968ab', '#3867ac', '#3867ac', '#3868ac', '#3869ad', '#3969ad', '#3968ad', '#3868ac', '#3868ac', '#3869ae', '#3868ad', '#3868ad', '#3769af', '#3869b0', '#3769af', '#3769af', '#386ab0', '#386ab0', '#376aaf', '#376aaf', '#376ab0', '#366ab1', '#366ab2', '#366ab2', '#366ab2', '#366ab3', '#366bb3', '#366ab2', '#3669b2', '#366ab2', '#366ab2', '#366ab2', '#356bb3', '#346bb4', '#356cb4', '#356cb4', '#346bb4', '#356cb4', '#356cb5', '#356cb5', '#356cb5', '#346cb5', '#346cb5', '#346cb6', '#336db7', '#326cb7', '#326db7', '#336db7', '#336cb7', '#326bb6', '#326cb6', '#326db7', '#326db8', '#316dba', '#316eb9', '#316eb9', '#326eba', '#316eba', '#316db9', '#316db9', '#316eb9', '#306eba', '#306dba', '#306dba', '#306ebb', '#306dbb', '#306dbc', '#306fbc', '#306fbc', '#306ebb', '#306eba', '#306fbc', '#2f6fbd', '#2d6ebe', '#2d6ebe', '#2d6fbe', '#2e70be', '#2e70be', '#2e6fbe', '#2e6fbe', '#2e6fbe', '#2c6fc0', '#2d70c0', '#2d70c0', '#2b70c1', '#2b70c1', '#2c70c1', '#2c70c1', '#2b71c1', '#2c70c1', '#2c70c1', '#2c71c1', '#2c71c1', '#2a72c3', '#2971c3', '#2a71c2', '#2972c3', '#2a71c3', '#2a71c3', '#2972c3', '#2972c3', '#2972c3', '#2872c5', '#2872c6', '#2872c5', '#2773c6', '#2773c6', '#2772c6', '#2772c5', '#2672c5', '#2673c5', '#2673c5', '#2673c7', '#2472c8', '#2473c8', '#2474c8', '#2573c9', '#2573c9', '#2573c9', '#2573c9', '#2474c8', '#2374c9', '#2374c9', '#2374c9', '#2375c9', '#2374c9', '#2374c9', '#2475c9', '#2575ca', '#2476ca', '#2476ca', '#2476ca', '#2575cb', '#2577ca', '#2577ca', '#2576ca', '#2577ca', '#2577ca', '#2577ca', '#2677ca', '#2678ca', '#2678cb', '#2778cb', '#2778cb', '#2679cb', '#2779cb', '#2779cb', '#2779cb', '#2779cb', '#2879cb', '#287acb', '#287acb', '#2879cb', '#287acb', '#287bcb', '#287acb', '#287acb', '#287bcc', '#287bcc', '#297bcc', '#297bcc', '#297bcc', '#297bcc', '#297ccc', '#297ccc', '#297dcc', '#297dcc', '#2a7dcc', '#2a7dcc', '#2a7ecd', '#2a7ecd', '#2a7ecc', '#2a7ecc', '#2b7ecd', '#2c7ecd', '#2c7fcd', '#2c7fcd', '#2b7ecc', '#2b7ecc', '#2c7fcd', '#2c7fcd', '#2c7fcd', '#2c7fcd', '#2b7fcd', '#2b80cd', '#2c80ce', '#2d80ce', '#2d80ce', '#2c81cd', '#2d82ce', '#2d82ce', '#2d81ce', '#2d82ce', '#2d82ce', '#2d82cd', '#2e82cd', '#2e83ce', '#2e82ce', '#2d82cd', '#2d83cd', '#2e83cf', '#2e84cf', '#2e84cf', '#2e83ce', '#2e83ce', '#3084cf', '#3085cf', '#2f85ce', '#3085cf', '#2f86ce', '#2f86ce', '#2f86cf', '#2f85cf', '#2f86ce', '#2f86cf', '#2f86cf', '#2f87cf', '#2f86d0', '#2f86d0', '#2f86d0', '#3087cf', '#3088d0', '#3088d0', '#3087cf', '#3088cf', '#3188d0', '#3188d1', '#3088d0', '#3089d0', '#3089d0', '#3088d0', '#3188d0', '#3189d0', '#3289d0', '#3289d0', '#328ad1', '#328ad1', '#318ad0', '#318ad0', '#318ad0', '#328bd1', '#328ad1', '#328ad1', '#338bd2', '#338bd2', '#338cd1', '#338cd1', '#338cd2', '#338cd2', '#338dd1', '#338dd1', '#338dd2', '#338dd1', '#338ed2', '#338ed2', '#338ed2', '#348ed2', '#348ed2', '#348ed2', '#348fd2', '#348fd2', '#348fd2', '#348fd2', '#348fd2', '#348fd2', '#3390d2', '#3391d2', '#3491d3', '#3490d3', '#3491d3', '#3491d3', '#3591d3', '#3591d3', '#3691d4', '#3690d4', '#3590d3', '#3592d3', '#3592d4', '#3592d4', '#3592d3', '#3593d3', '#3592d4', '#3592d4', '#3592d4', '#3593d4', '#3694d4', '#3695d4', '#3694d4', '#3693d4', '#3693d4', '#3695d4', '#3695d4', '#3695d4', '#3796d4', '#3796d4', '#3695d4', '#3695d5', '#3696d5', '#3696d5', '#3696d5', '#3695d4', '#3696d4', '#3797d5', '#3796d5', '#3797d5', '#3898d5', '#3898d5', '#3797d5', '#3798d5', '#3899d5', '#3899d5', '#3899d6', '#3799d6', '#3799d6', '#3799d6', '#389ad6', '#389ad6', '#3799d5', '#3799d5', '#3799d6', '#379ad6', '#379ad6', '#399ad6', '#399ad6', '#389bd5', '#389bd5', '#389bd6', '#389bd6', '#399cd7', '#399bd7', '#399cd7', '#399dd7', '#389cd7', '#389cd6', '#389dd6', '#399ed7', '#389dd6', '#389dd6', '#389fd6', '#399fd7', '#399ed6', '#399ed6', '#399fd7', '#399fd7', '#399fd7', '#3aa0d8', '#3aa0d8', '#3a9fd8', '#3a9fd8', '#3a9fd8', '#3aa0d8', '#3aa1d8', '#3aa1d8', '#3aa1d8', '#3aa1d8', '#3aa1d8', '#3aa2d9', '#3aa1d9', '#3aa1d8', '#39a2d8', '#3aa2d9', '#3aa3d9', '#3ba3d9', '#3ba3d9', '#3ba2d8', '#3aa2d8', '#3aa4d8', '#3ba4d9', '#3aa3d8', '#3aa3d9', '#3ba5da', '#3ba5d9', '#3ba4d9', '#3ba4d9', '#3ba4d9', '#3aa5d9', '#3ba5da', '#3ba6da', '#3ba6da', '#3ba6da', '#3ba6d9', '#3ba6d9', '#3ba6da', '#3aa5da', '#3ba6da', '#3ca7da', '#3ca7da', '#3ba7da', '#3ba6da', '#3ca7da', '#3ca8da', '#3ca8da', '#3ca8da', '#3ca9db', '#3ca9db', '#3ca9da', '#3ca8db', '#3ba8db', '#3baadb', '#3caadb', '#3ca9db', '#3caadb', '#3caadb', '#3ca9db', '#3ca9db', '#3ca9db', '#3cabdb', '#3cabdc', '#3caadb', '#3cabdb', '#3cacdc', '#3cacdc', '#3cacdc', '#3caddc', '#3caddc', '#3caddc', '#3caedc', '#3caddd', '#3caddd', '#3caedc', '#3eaedd', '#3eaddd', '#3daddc', '#3daedc', '#3daedc', '#3dafdd', '#3dafdd', '#3daedd', '#3dafdd', '#3dafdd', '#3dafdd', '#3db0dd', '#3db0dd', '#3db0dc', '#3db0dc', '#3db1dd', '#3db1dd', '#3db0dd', '#3db0dd', '#3db1dd', '#3db1de', '#3db1de', '#3db1de', '#3db2de', '#3db2de', '#3db2dd', '#3db2dd', '#3db3dd', '#3db2de', '#3db3de', '#3db4de', '#3db3dd', '#3db4de', '#3db4de', '#3db4de', '#3db5df', '#3db5df', '#3db4df', '#3db4df', '#3db5df', '#3db5de', '#3db5de', '#3db5de', '#3db6df', '#3db6df', '#3db6de', '#3db6de', '#3db7df', '#3db7e0', '#3db8e0', '#3db8e0', '#3db7e0', '#3db7df', '#3db7df', '#3eb7df', '#3eb8df', '#3eb8df', '#3eb9e0', '#3eb9e0', '#3eb8df', '#3eb9df', '#3fb9df', '#3fb9e0', '#3ebae1', '#3ebae0', '#3ebae0', '#3ebae0', '#3eb9e0', '#3fbae1', '#3fbbe1', '#3ebae0', '#3ebbe1', '#3ebae0', '#3ebbe0', '#3ebce1', '#3fbce1', '#3ebce0', '#3ebce2', '#3ebce2', '#3ebde2', '#3fbde2', '#3fbde2', '#3ebde1', '#3ebee1', '#3ebde2', '#3fbde2', '#3fbde2', '#3ebee1', '#3ebfe1', '#3ebfe1', '#3ebfe1', '#3fbfe2', '#3ebfe1', '#3ebee1', '#3ebee2', '#3ebfe2', '#3ebfe2', '#3ebfe2', '#3ec0e2', '#3ec1e2', '#3fc0e3', '#3fc0e3', '#3ec0e2', '#3ec1e2', '#3ec2e2', '#3ec2e2', '#3ec2e2', '#3ec3e3', '#3ec3e3', '#3ec3e3', '#3ec2e3', '#3ec2e3', '#3fc3e3', '#3fc4e3', '#3ec4e3', '#3ec3e3', '#3ec3e3', '#3ec5e4', '#3fc5e4', '#3fc5e3', '#3fc4e4', '#3fc5e4', '#3ec6e4', '#3ec5e4', '#3ec4e4', '#3ec5e4', '#3ec6e4', '#3ec6e4', '#3ec6e4', '#3ec6e4', '#3ec6e4', '#3ec7e4', '#3ec6e4', '#3ec6e4', '#3ec6e4', '#3ec7e4', '#3dc8e4', '#3dc8e4', '#3dc7e5', '#3dc7e5', '#3dc8e5', '#3dc8e4', '#3dc8e4', '#3dc9e5', '#3dc9e5', '#3dc9e5', '#3dc9e5', '#3dc9e5', '#3dc9e4', '#3dc9e5', '#3dcae6', '#3dcbe6', '#3dcae6', '#3dcae6', '#3dcae6', '#3dcbe6', '#3dcce6', '#3ecce6', '#3ecce6', '#3dcbe6', '#3dcce6', '#3dcce6', '#3dcce6', '#3dcce5', '#3dcce5', '#3dcce6', '#3dcde7', '#3dcde7', '#3dcde7', '#3dcfe7', '#3dcfe7', '#3dcfe7', '#3dcee7', '#3dcee6', '#3dcee6', '#3dcfe7', '#3dcfe7', '#3dcfe6', '#3dcfe6', '#3dd0e8', '#3ed1e8', '#3ed1e7', '#3dd0e7', '#3dd0e8', '#3dd0e7', '#3dd1e7', '#3dd1e7', '#3dd0e7', '#3cd1e8', '#3cd2e8', '#3cd1e8', '#3cd1e7', '#3cd1e7', '#3cd2e8', '#3cd3e9', '#3cd2e8', '#3cd2e9', '#3cd2e9', '#3cd3e8', '#3cd4e8', '#3cd3e8', '#3cd3e8']
const colorsList3 = ['#20A29A ', '#BA5297']
const valueRange1d = [-4, -3, -2, -1, 0, 1, 2, 3, 4] // 图例1日涨跌幅数值
const valueRangeRelvol = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8] // 图例相对成交量数值
const valueRangeGX = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6] // 股息率
const valueRangeSJ = [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6] // 股息率
const valueRangeEd = ['业绩公布前', '业绩公布后'] // 业绩公布日
let pid
export default {
  props: ['rangeCode', 'condition', 'focusStockName'], // 从父组件传下来
  components: {
    StockList
  },
  data () {
    return {
      code: this.rangeCode || '',
      isContinue: 1,
      offsetX: 0,
      offsetY: 0,
      colors: {
        'mkt_idx.cur_chng_pct': colorsList1.slice().reverse(), // 涨跌幅 绿-红
        'mkt_idx.chng_pct_week': colorsList1.slice().reverse(), // 近1周涨跌幅
        'perf_idx.chng_pct_month': colorsList1.slice().reverse(), // 近1月涨跌幅
        'perf_idx.chng_pct_3month': colorsList1.slice().reverse(), // 近3月涨跌幅
        'perf_idx.chng_pct_6month': colorsList1.slice().reverse(), // 近6月涨跌幅
        'perf_idx.chng_pct_year': colorsList1.slice().reverse(), // 近1年涨跌幅
        'perf_idx.chng_pct_year_sofar': colorsList1.slice().reverse(), // 今年以来涨跌幅
        'mkt_idx.rela_volume': colorsList2, // 相对成交量
        'mkt_idx.peg': colorsList1, // PEG
        'mkt_idx.ps': colorsList1, // 市销率
        'mkt_idx.pb': colorsList1, // 市净率
        'mkt_idx.div_rate': colorsList1.slice().reverse().slice(20), // 股息率
        'mkt_idx.pe_ttm': colorsList1, // 市盈率(TTM)
        'mkt_idx.fir_fcst_pe': colorsList1, // 预测市盈率
        'fin_idx.eps_5year': colorsList1.slice().reverse(), // EPS增长率(过去5年)
        'act_date': colorsList3 // 业绩公布日
      },
      rangeValues: {
        'mkt_idx.cur_chng_pct': valueRange1d, // 涨跌幅
        'mkt_idx.chng_pct_week': this.fmtraneValue(valueRange1d, 2), // 近1周涨跌幅
        'perf_idx.chng_pct_month': this.fmtraneValue(valueRange1d, 3), // 近1月涨跌幅
        'perf_idx.chng_pct_3month': this.fmtraneValue(valueRange1d, 6), // 近3月涨跌幅
        'perf_idx.chng_pct_6month': this.fmtraneValue(valueRange1d, 8), // 近6月涨跌幅
        'perf_idx.chng_pct_year': this.fmtraneValue(valueRange1d, 9), // 近1年涨跌幅
        'perf_idx.chng_pct_year_sofar': this.fmtraneValue(valueRange1d, 8), // 今年以来涨跌幅
        'mkt_idx.rela_volume': valueRangeRelvol, // 相对成交量
        'mkt_idx.peg': this.fmtraneValue(valueRangeGX, 2.5), // PEG
        'mkt_idx.ps': this.fmtraneValue(valueRangeGX, 10), // 市销率
        'mkt_idx.pb': valueRangeSJ, // 市净率
        'mkt_idx.div_rate': valueRangeGX, // 股息率
        'mkt_idx.pe_ttm': this.fmtraneValue(valueRangeGX, 75), // 市盈率(TTM)
        'mkt_idx.fir_fcst_pe': this.fmtraneValue(valueRangeGX, 75), // 预测市盈率
        'fin_idx.eps_5year': this.fmtraneValue(valueRange1d, 9), // EPS增长率(过去5年)
        'act_date': valueRangeEd // 业绩公布日
      },
      isUnit: {
        'mkt_idx.cur_chng_pct': '%', // 涨跌幅 绿-红
        'mkt_idx.chng_pct_week': '%', // 近1周涨跌幅
        'perf_idx.chng_pct_month': '%', // 近1月涨跌幅
        'perf_idx.chng_pct_3month': '%', // 近3月涨跌幅
        'perf_idx.chng_pct_6month': '%', // 近6月涨跌幅
        'perf_idx.chng_pct_year': '%', // 近1年涨跌幅
        'perf_idx.chng_pct_year_sofar': '%', // 今年以来涨跌幅
        'mkt_idx.rela_volume': '', // 相对成交量
        'mkt_idx.peg': '', // PEG
        'mkt_idx.ps': '', // 市销率
        'mkt_idx.pb': '', // 市净率
        'mkt_idx.div_rate': '%', // 股息率
        'mkt_idx.pe_ttm': '', // 市盈率(TTM)
        'mkt_idx.fir_fcst_pe': '', // 预测市盈率
        'fin_idx.eps_5year': '%', // EPS增长率(过去5年)
        'act_date': '' // 业绩公布日
      },
      legendList: [],
      playBackDate: [],
      playBackDateShow: [],
      playBackIndex: 19,
      playBackState: false, // 默认是停止不回放
      playBackSrc: playStopSrc,
      mapHeight: this.$route.fullPath === ctx + '/map/fullScreen' ? window.innerHeight : window.innerHeight - 63,
      mapWidth: this.$route.fullPath === ctx + '/map/fullScreen' ? window.innerWidth : window.innerWidth - 40,
      showHover: false,
      hoverNode: null,
      legendWidth: 36,
      isEnlarge: false,
      isLegendShow: true,
      isPlaybackShow: true,
      intervalTime: 10,
      updateDataPid: null,
      updateTimePid: null,
      currentTime: '',
      playLineIndex: 19,
      playLineLeft: this.$route.fullPath === ctx + '/map/fullScreen' ? 54.5 : 46.5,
      isStopPlayback: false,
      wrapHeight: 0,
      clientX: 0,
      clientY: 0
    }
  },
  watch: {
    rangeCode () {
      this.updateMap()
      this.playBackIndex = 19
      this.playLineIndex = 19
    },
    condition () {
      this.updateData()
    },
    focusStockName () {
      this.focusStock()
    }
  },
  computed: {
    mapData: function () {
      const map = [].concat(this.$store.state.stockMap.industries)
      map.forEach(function (industry) {
        industry.value = industry.scale
        industry.children && industry.children.forEach(function (lvl2) {
          lvl2.value = lvl2.scale
          lvl2.children && lvl2.children.sort((a, b) => (b.scale - a.scale)) && lvl2.children.forEach(function (stock) {
            stock.value = stock.scale
            stock.parent = lvl2.id
          })
        })
      })
      return map
    },
    stockData: function () {
      const map = this.mapData
      const stockData = this.$store.state.stockMap.stockData
      const _this = this
      map.forEach(function (industry) {
        industry.children && industry.children.forEach(function (lvl2) {
          lvl2.children && lvl2.children.forEach(function (stock) {
            if (stockData) {
              if (_this.condition === 'act_date') {
                stock.perf = stockData[stock.name]
                if (stock.perf !== null && typeof (stock.perf) !== 'undefined') {
                  const pbDate = new Date(stock.perf)
                  const nowDate = new Date()
                  stock.perfText = _this.dateFormatUtil(pbDate)
                  stock.itemStyle = {
                    normal: {
                      color: nowDate < pbDate ? '#20A29A' : '#BA5297' || '#2f323d'
                    }
                  }
                  stock.actDateFlag = nowDate < pbDate ? 0 : 1 // 业绩公布日前0:业绩公布日后1
                } else {
                  stock.perfText = '--'
                  stock.itemStyle = {
                    normal: {
                      color: '#2f323d'
                    }
                  }
                  stock.actDateFlag = -1
                }
              } else {
                stock.perf = stockData[stock.id] || stockData[stock.name]
                if (stock.perf !== null && typeof (stock.perf) !== 'undefined') {
                  if (_this.isUnit[_this.condition] === '%') {
                    if (_this.condition !== 'mkt_idx.div_rate') {
                      if (stock.perf >= 0) {
                        stock.perfText = '+' + parseFloat(stock.perf).toFixed(2) + '%'
                      } else {
                        stock.perfText = parseFloat(stock.perf).toFixed(2) + '%'
                      }
                    } else {
                      stock.perfText = parseFloat(stock.perf).toFixed(2) + '%'
                    }
                  } else {
                    stock.perfText = parseFloat(stock.perf).toFixed(2)
                  }
                } else {
                  stock.perfText = '--'
                }
                stock.itemStyle = {
                  normal: {
                    color: _this.showColor(_this.colors[_this.condition], _this.rangeValues[_this.condition], stock.perf) || '#2f323d'
                  }
                }
              }
            } else {
              stock.perfText = '--'
              stock.itemStyle = {
                normal: {
                  color: '#2f323d'
                }
              }
            }
          })
        })
      })
      map.forEach(function (industry) {
        industry.children.forEach(function (lvl2) {
          if (stockData) {
            if (_this.condition === 'act_date') {
              let actDateBefore = 0
              let acrDateAfter = 0
              lvl2.children.forEach(function (stock) {
                if (stock.actDateFlag === 0) { // 业绩公布日前
                  actDateBefore += stock.value * 1
                } else if (stock.actDateFlag === 1) { // 业绩公布日后
                  acrDateAfter += stock.value * 1
                }
              })
              if (actDateBefore >= acrDateAfter) {
                lvl2.itemStyle = {
                  normal: {
                    borderColor: '#20A29A'
                  }
                }
              } else {
                lvl2.itemStyle = {
                  normal: {
                    borderColor: '#BA5297'
                  }
                }
              }
            } else {
              let totalPerf = 0
              let totalScale = 0
              lvl2.children.forEach(function (stock) {
                if (stock.perf) {
                  totalPerf += stock.value * stock.perf
                }
                totalScale += stock.value
              })
              lvl2.perf = totalPerf / totalScale
              lvl2.itemStyle = {
                normal: {
                  borderColor: _this.showColor(_this.colors[_this.condition], _this.rangeValues[_this.condition], lvl2.perf) || '#2f323d'
                }
              }
            }
          } else {
            lvl2.itemStyle = {
              normal: {
                borderColor: '#2f323d'
              }
            }
          }
        })
      })
      return map
    },
    hoverNodeParent: function () {
      let parentNode = null
      if (this.hoverNode) {
        const parentId = this.hoverNode.parent
        this.mapData.forEach(function (industry) {
          industry.children && industry.children.forEach(function (lvl2) {
            if (parentId === lvl2.id) {
              parentNode = lvl2
            }
          })
        })
      }
      return parentNode
    }
  },
  methods: {
    initMap: function () {
      this.chart = echarts.init(this.$refs.treemap)
      const _this = this
      this.$store.dispatch('stockMap/queryRangeByCode', {
        code: this.rangeCode
      })
        .then(() => {
          this.chart.setOption({
            hoverLayerThreshold: 10000,
            progressive: 1000,
            squareRatio: 0.5,
            tooltip: {
              triggerOn: 'none'
            },
            series: [{
              name: '',
              type: 'treemap',
              visibleMin: -1,
              childrenVisibleMin: 20,
              width: '100%',
              height: '100%',
              label: {
                normal: {
                  distance: 0,
                  ellipsis: false,
                  show: true,
                  formatter: (params) => {
                    const node = this.getNode(params)
                    const nodeLayout = node.getLayout()
                    let formatterText = ''
                    if (nodeLayout.width > 52 && nodeLayout.height >= 18) {
                      formatterText += params.name
                    }
                    if (nodeLayout.width > 52 && nodeLayout.height > 36 && typeof (params.data.perf) !== 'undefined' && params.data.perf !== null) {
                      formatterText += '\n' + params.data.perfText
                    }
                    return formatterText
                    // if (typeof (params.data.perf) !== 'undefined' && params.data.perf !== null) {
                    //   return params.name + '\n' + params.data.perfText
                    // }
                  },
                  textStyle: {
                    fontSize: 12
                  }
                }
              },
              upperLabel: {
                normal: {
                  show: true,
                  formatter: (params) => {
                    const node = this.getNode(params)
                    const nodeLayout = node.getLayout()
                    let formatterText = ''
                    if (nodeLayout.width > 48 && nodeLayout.height > 20) {
                      formatterText += params.name
                    }
                    return formatterText
                    // if (typeof (params.data.perf) !== 'undefined' && params.data.perf !== null) {
                    //   return params.name + '\n' + params.data.perfText
                    // }
                  },
                  height: 20
                }
              },
              itemStyle: {
                normal: {}
              },
              breadcrumb: {
                show: false
              },
              nodeClick: false,
              roam: true,
              levels: this.getLevelOption(),
              data: this.mapData
            }]
          })
          this.chart.hideLoading()
          this.chart.on('mouseover', (params) => {
            if (params.treePathInfo.length <= 2) {
              return
            }
            this.showHover = true
            // this.updateMapData()
            if (params.treePathInfo.length === 3) {
              this.hoverNode = params.data.children[0]
            } else if (params.treePathInfo.length === 4) {
              this.hoverNode = params.data
            }
            this.hoverNode.titleName = params.treePathInfo[1].name
          })
          this.chart.on('mouseout', (params) => {
            if (params.treePathInfo.length <= 2) {
              return
            } else {
              this.showHover = false
            }
          })
          this.chart.on('dblclick', (params) => {
            if (params.treePathInfo.length <= 2) {
              return
            } else {
              // this.$router.push({ path: 'stock/' + params.data.id })
              window.open('stock/' + params.data.id)
            }
          })
        }).then(() => {
          this.$store.dispatch('stockMap/updateData', {
            isContinue: this.isContinue,
            condition: this.condition,
            code: this.rangeCode
          }).then(() => {
            this.chart.setOption({
              series: [{
                data: this.stockData
              }]
            })
            this.chart.hideLoading()
          }).then(() => {
            this.$store.dispatch('stockMap/queryCalendarsData').then(() => {
              this.playBackDate = this.$store.state.stockMap.calendarsData
              this.playBackDateShow = this.timeFormat(this.playBackDate)
            })
          })
        })
      this.chart.showLoading()
      this.getLegendColor()
      window.onresize = function () {
        if (_this.$route.fullPath === ctx + '/map/fullScreen') {
          _this.mapHeight = window.innerHeight
          _this.mapWidth = window.innerWidth
        } else {
          _this.mapHeight = window.innerHeight - 63
          _this.mapWidth = window.innerWidth - 40
        }
        _this.chart.resize({
          height: _this.mapHeight,
          width: _this.mapWidth
        })
      }
      this.autoUpdateData()
      this.updateTime()
    },
    updateMap: function () {
      /* if (this.rangeCode !== '') { this.rangeCode = 'auth/' + this.rangeCode }*/
      this.$store.dispatch('stockMap/queryRangeByCode', {
        code: this.rangeCode
      }).then(() => {
        this.chart && this.chart.setOption({
          series: [{
            data: this.mapData
          }]
        })
      })
      this.$store.dispatch('stockMap/updateData', {
        isContinue: this.isContinue,
        condition: this.condition,
        code: this.rangeCode
      }).then(() => {
        this.chart && this.chart.setOption({
          series: [{
            data: this.stockData
          }]
        })
      })
    },
    updateData: function () {
      this.getLegendColor()
      this.$store.dispatch('stockMap/updateData', {
        isContinue: this.isContinue,
        condition: this.condition,
        code: this.rangeCode
      }).then(() => {
        if (this.playLineIndex >= 18) {
          this.playLineIndex = 19
        }
        this.updateMapData()
      })
    },
    updateMapData: function () {
      this.chart.setOption({
        series: [{
          data: this.stockData
        }]
      })
    },
    autoUpdateData: function () {
      const _this = this
      if (this.updateDataPid) {
        clearInterval(this.updateDataPid)
      } else {
        this.updateDataPid = setInterval(function () {
          _this.updateData()
        }, 1000 * _this.intervalTime)
      }
    },
    focusStock: function () {
      const _this = this
      // const focusStockData = this.stockData
      const chartView = this.chart._chartsViews[0]
      const treeRoot = chartView.seriesModel._viewRoot
      treeRoot.children.forEach(function (industry) {
        industry.children.forEach(function (lvl2) {
          lvl2.children.forEach(function (stock) {
            if (stock.name === _this.focusStockName) {
              // stock.itemStyle.normal.borderColor = '#ffd614'
              // stock.itemStyle.normal.borderWidth = 2
              // lvl2.itemStyle.normal.borderColor = '#ffd614'
              chartView._zoomToNode({
                node: stock
              })
              // treemapHelper.retrieveTargetInfo({type:'treemapZoomToNode',targetId:});
            }
          })
        })
      })
      // focusStockData.forEach(function (industry) {
      //   industry.children.forEach(function (lvl2) {
      //     lvl2.children.forEach(function (stock) {
      //       if (stock.id === _this.focusStockName) {
      //         stock.itemStyle.normal.borderColor = '#ffd614'
      //         stock.itemStyle.normal.borderWidth = 2
      //         lvl2.itemStyle.normal.borderColor = '#ffd614'
      //         debugger
      //     // treemapHelper.retrieveTargetInfo({type:'treemapZoomToNode',targetId:});
      //       }
      //     })
      //   })
      // })
      // this.chart.setOption({ series: [{ data: focusStockData }] })
    },
    getLevelOption: function () {
      return [{ // 第一层外
        itemStyle: {
          normal: {
            borderColor: '#000', // 第一层矩形间隔线颜色
            borderWidth: 0,
            color: '#000',
            gapWidth: 2 // 第一层块间隔距离
          }
        },
        upperLabel: {
          normal: {
            show: false
          }
        },
        silent: true
      },
      { // 第一层
        itemStyle: {
          normal: {
            borderColor: '#000', // 第一层背景色也就是第二层矩形间隔颜色
            color: '#000',
            borderWidth: 1, // 第一层矩形间距
            gapWidth: 1 // 第二层矩形间距
          },
          emphasis: {

          }
        },
        silent: true,
        upperLabel: {
          normal: {
            offset: [3, 0]
          },
          emphasis: {
            offset: [3, 0]
          }
        }
      },
      { // 第二层
        itemStyle: {
          normal: {
            borderWidth: 0,
            gapWidth: 0,
            borderColor: '#000'
          },
          emphasis: {
            borderColor: '#ffd614'
          }
        },
        upperLabel: {
          normal: {
            offset: [5, 0]
          },
          emphasis: {
            offset: [5, 0],
            textStyle: {
              color: '#333'
            }
          }
        },
        silent: true
      },
      { // 第3层
        itemStyle: {
          normal: {
            borderWidth: 0.5,
            borderColor: '#000',
            color: '#2f323d'
          },
          emphasis: {
            borderWidth: 2,
            borderColor: '#ffd614'
          }
        },
        silent: true
      }
      ]
    },
    isFullScreen: function () {
      if (this.$route.fullPath === ctx + '/map/fullScreen') {
        this.isEnlarge = true // 全屏
        this.mapHeight = window.innerHeight
        this.mapWidth = window.innerWidth
        this.$emit('isEnlarge', this.isEnlarge)
      } else if (this.$route.fullPath === ctx + '/map/normal') {
        this.isEnlarge = false // 非全屏
        this.mapHeight = window.innerHeight - 63
        this.mapWidth = window.innerWidth - 40
        this.$emit('isEnlarge', this.isEnlarge)
      }
    },
    showColor: function (colorArr, valueArr, value) {
      if (value == null) {
        return colorArr.nullColor
      }
      if (value <= (valueArr[0] + valueArr[1]) / 2) {
        return colorArr[0]
      } else if (value > (valueArr[valueArr.length - 1] + valueArr[valueArr.length - 2]) / 2) {
        return colorArr[colorArr.length - 1]
      } else {
        var index = Math.round((value - valueArr[0]) / (valueArr[valueArr.length - 1] - valueArr[0]) * colorArr.length)
        return colorArr[index]
      }
    },
    getLegendColor: function () {
      this.legendList = []
      if (this.condition === 'act_date') {
        this.legendWidth = 70
        this.legendList.push({
          value: '业绩公布前',
          backgroundColor: '#20A29A'
        })
        this.legendList.push({
          value: '业绩公布后',
          backgroundColor: '#BA5297'
        })
      } else {
        this.legendWidth = 36
        for (var i = 0; i < this.rangeValues[this.condition].length; i++) {
          this.legendList.push({
            value: this.rangeValues[this.condition][i] + this.isUnit[this.condition],
            backgroundColor: this.showColor(this.colors[this.condition], this.rangeValues[this.condition], this.rangeValues[this.condition][i])
          })
        }
      }
    },
    startPlay: function () {
      clearInterval(this.updateDataPid)
      this.updateDataPid = null
      if (this.playBackState) { // 播放中点击暂停
        this.playBackState = false
        clearInterval(pid)
        this.playBackSrc = playStopSrc
        this.isStopPlayback = false
        this.$emit('isStopPlayback', this.isStopPlayback)
      } else { // 未播放点击开始播放
        if (this.condition !== 'mkt_idx.cur_chng_pct') {
          this.condition = 'mkt_idx.cur_chng_pct'
          this.$emit('toZdfCondition', this.condition)
          this.playBackIndex = 19
          this.playLineIndex = 19
        }
        this.playBackState = true
        this.playBackSrc = playBackSrc
        this.isStopPlayback = true
        this.$emit('isStopPlayback', this.isStopPlayback)
        if (this.playBackIndex >= this.playBackDate.length - 1) {
          this.playBackIndex = 0
        }
        if (this.playLineIndex >= this.playBackDate.length - 1) {
          this.playLineIndex = -1
        }
        pid = setInterval(() => {
          if (this.playBackIndex >= this.playBackDate.length - 1) {
            this.playBackIndex = this.playBackDate.length - 1
            this.playBackState = false
            this.playBackSrc = playStopSrc
            clearInterval(pid)
            this.isStopPlayback = false
            this.$emit('isStopPlayback', this.isStopPlayback)
            this.updateData()
            /*  setTimeout(() => {
                this.playLineIndex++
              }, 280)*/
            this.autoUpdateData()
          }
          if (this.playLineIndex >= this.playBackDate.length - 1) {
            this.playLineIndex = this.playBackDate.length - 1
          }
          const playBackDate = this.playBackDate[this.playBackIndex]
          if (this.playBackIndex < 19) {
            this.$store.dispatch('stockMap/updateDataByDate', {
              date: playBackDate
            }).then(() => {
              this.updateMapData()
              this.playLineIndex++ // 为了让请求的回放数据先返回过来并渲染完矩形图 再让回放的竖线往后移动一个格 所以定义playBackIndex(为请求数据用的)和playLineIndex两个变量
              this.playBackIndex++
            })
          }
        }, 250)
      }
    },
    fmtraneValue: function (arr, n) {
      var getArr = []
      for (var i in arr) {
        getArr.push(arr[i] * n)
      }
      return getArr
    },
    timeFormat: function (arr) {
      const getArr = []
      for (const i in arr) {
        const toTime = arr[i].toString()
        let m
        if (toTime.substring(4, 5) === '0') {
          m = toTime.substring(5, 6)
        } else {
          m = toTime.substring(4, 6)
        }
        getArr.push(m + '.' + toTime.substring(6))
      }
      return getArr
    },
    changeWrapHeight: function (wrapHeight) {
      this.wrapHeight = wrapHeight
      if (this.wrapHeight > 52) {
        this.move()
      }
    },
    move: function (event) {
      if (event) {
        this.clientX = event.clientX + 50
        this.clientY = event.clientY + 50
        this.offsetX = event.clientX + 50
        this.offsetY = event.clientY + 50
      }
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      if (document.getElementsByClassName('hover-wrapper').length > 0) {
        const wrapWidth = document.getElementsByClassName('hover-wrapper')[0].offsetWidth
        // const wrapHeight = document.getElementsByClassName('hover-wrapper')[0].offsetHeight
        const wrapHeight = this.wrapHeight
        if (windowWidth - this.clientX <= wrapWidth) {
          this.offsetX = this.clientX - wrapWidth - 100
        }
        if (windowHeight - 17 - this.clientY <= wrapHeight) {
          this.offsetY = windowHeight - wrapHeight - 17
        }
        if (this.offsetY < 0) {
          this.offsetY = 0
        }
      }
    },
    dateFormatUtil: function (date) {
      var dateTypeDate = ''
      dateTypeDate += date.getFullYear() // 年
      dateTypeDate += '-' + this.getMonth(date) // 月
      dateTypeDate += '-' + this.getDay(date) // 日
      return dateTypeDate
    },
    getMonth: function (date) {
      let month = ''
      month = date.getMonth() + 1 // getMonth()得到的月份是0-11
      if (month < 10) {
        month = '0' + month
      }
      return month
    },
    getDay: function (date) {
      let day = ''
      day = date.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return day
    },
    /* enlargeMap: function () {
       if (this.isEnlarge) {
         this.isEnlarge = false// 非全屏
         this.mapHeight = window.innerHeight - 80
         this.chart.resize({
           height: window.innerHeight - 80,
           width: window.innerWidth - 40
         })
       } else {
         this.isEnlarge = true// 全屏
         this.mapHeight = window.innerHeight
         this.chart.resize({
           height: window.innerHeight,
           width: window.innerWidth
         })
       }
       this.$emit('isEnlarge', this.isEnlarge)
     },*/
    switchLegend: function () {
      if (this.isLegendShow) {
        this.isLegendShow = false
      } else {
        this.isLegendShow = true
      }
    },
    switchPlayback: function () {
      if (this.isPlaybackShow) {
        this.isPlaybackShow = false
      } else {
        this.isPlaybackShow = true
      }
    },
    restoreMap: function () {
      this.chart.resize({
        height: this.$refs.treemap.offsetHeight,
        width: this.$refs.treemap.offsetWidth
      })
    },
    getTime: function () {
      const date = new Date()
      const seperator2 = ':'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let strHour = date.getHours()
      let strMin = date.getMinutes()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      if (strHour >= 0 && strHour <= 9) {
        strHour = '0' + strHour
      }
      if (strMin >= 0 && strMin <= 9) {
        strMin = '0' + strMin
      }
      const currentDate = date.getFullYear() + '-' + month + '-' + strDate + ' ' +
        strHour + seperator2 + strMin
      return currentDate
    },
    updateTime: function () {
      const _this = this
      if (this.updateTimePid) {
        clearInterval(this.updateTimePid)
      } else {
        this.updateTimePid = setInterval(function () {
          _this.currentTime = _this.getTime()
        }, 1000)
      }
    },
    toFullScreen: function () {
      window.open(ctx + '/map/fullScreen')
    },
    toNormal: function () {
      window.open(ctx + '/map/normal')
    },
    getNode: function (params) {
      const chartView = this.chart._chartsViews[0]
      const treeRoot = chartView.seriesModel._viewRoot
      return treeRoot.hostTree._nodes[params.dataIndex]
    }
  },
  mounted () {
    this.isFullScreen()
    this.initMap()
  }
}
</script>
