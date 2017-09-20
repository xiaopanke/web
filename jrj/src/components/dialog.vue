<style lang="scss" scoped>
    @import '../assets/css/base.css';
    .masks{
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.5);
        position: absolute;
        z-index:999;
    }
    .dialog{
        width:754px;
        height:198px;
        border:1px solid #8C8C8C;
        z-index: 9999;
        background:#fff;
        font-size:12px;
        color:#000;
        position: absolute;
        left:50%;
        top:50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        -moz-transform: translate3d(-50%, -50%, 0);
        -ms-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
    }
    .header{
        height:28px;
        line-height: 28px;
        text-align: left;
        background: #F2F2F2;
        border:1px solid #CCCCCC;
        padding-left: 10px;
    }
    button{
        width:70px;
        height:30px;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        border:none;
        cursor: pointer;
    }
    .sureBtn{
        background:#0088E1;
        color:#fff;
    }
    .cancleBtn{
        background: #fff;
        border:1px solid #CCCCCC;
        color:#CCCCCC;
    }
    select,input{
        width:106px;
        height:20px;
        line-height: 20px;
        border-radius: 3px;
        margin-left: 5px;
        color:#999;
        border-color:#ccc;
    }
    input{
        border:1px solid #ccc;
        height:18px;
        padding-left:5px;
    }
    .dialogMain{
        padding:0 45px;
        text-align: center;
    }
    .dialogMain>span{
        float: left;
    }
    .closed{
        display: inline-block;
        width: 30px;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
        font-size: 27px;
        color:#999;
    }
    .footer{
        text-align: center;
    }

</style>
<template>
    <div class="masks">
        <div class="dialog">
        <div class="header clearfix">{{title}}<span class="fr closed" @click="hideDialog">×</span></div>

        <slot name="content"></slot>

        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
    </div>
</template>
<script>
    export default{
      props: ['title'],
      data () {
        return {

        }
      },
      methods: {
        hideDialog () {
          this.$emit('toHideDialog', false)
        }
      },
      mounted () {

  }
    }
</script>
