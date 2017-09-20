<style  lang="scss" scoped>
    .page{
        width:720px;
        background: #fff;
        font-family: "Microsoft YaHei","微软雅黑";
        font-size: 14px;
        padding:40px 0;
        margin: 0 auto;
    }
    span{

        display: inline-block;
        height:30px;
        line-height: 30px;
        border:1px solid #ddd;
        padding:0 12px;
    }
    ul{
        display: inline-block;
        position: relative;
        top: 9px;
        left: -5px;
    }
    ul li{
        float:left;
        color: #666;
        border: 1px solid #ddd;
        border-right: none;
        background-color: #fff;
        width:34px;
        height:30px;
        line-height: 30px;
        text-align:center;
        cursor: pointer;
    }
    select{

        color: #999999;
        font-size: 14px;
        height:32px;
    }
    .totals{
        border:none;
        margin-right: 10px;
    }
    .nextPage{
        position:relative;
        left:-10px;
    }
    .active{
        background: #0088E1;
        color:#fff;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
        .page{
            width:7.2rem;
            background: #fff;
            font-family: "Microsoft YaHei","微软雅黑";
            font-size: 0.14rem;
            padding:0.2rem 0;
            margin:0 auto;
        }
        span{

            display: inline-block;
            height:0.3rem;
            line-height: 0.3rem;
            border:1px solid #ddd;
            padding:0 0.12rem;
        }
        ul{
            display: inline-block;
            position: relative;
            top: 0.9rem;
            left: -0.05rem;
        }
        ul li{
            float:left;
            color: #666;
            border: 1px solid #ddd;
            border-right: none;
            background-color: #fff;
            width:0.34rem;
            height:0.3rem;
            line-height: 0.3rem;
            text-align:center;
            cursor: pointer;
        }
        select{

            color: #999999;
            font-size: 0.14rem;
            height:0.32rem;
        }
        .totals{
            border:none;
            margin-right: 0.1rem;
        }
        .nextPage{
            position:relative;
            left:-0.1rem;
        }
    }
</style>
<template>
    <div class="page clearfix">
        <span @click="previousPage($event)">上一页</span>
        <ul class="pages clearfix" v-if="totalPage<=5">
            <li @click="getCurrentPage($event)" v-for="page in totalPage" :class="currentPage === page ? 'active' : ''">{{page}}</li>
        </ul>
        <ul class="pages clearfix" v-else-if="currentPage==1&&totalPage>5">
            <li @click="getCurrentPage($event)" v-for="page in 4" :class="currentPage === page ? 'active' : ''">{{page}}</li>
            <li>...</li>
            <li @click="getCurrentPage($event)" :class="currentPage === totalPage ? 'active' : ''">{{totalPage}}</li>
        </ul>
        <ul class="pages clearfix" v-else-if="currentPage==totalPage&&totalPage>5">
            <li @click="getCurrentPage($event)" :class="currentPage === 1 ? 'active' : ''">1</li>
            <li>...</li>
            <li  @click="getCurrentPage($event)" v-for="page in [3,2,1,0]" :class="currentPage === totalPage-page ? 'active' : ''">{{totalPage-page}}</li>
        </ul>
        <ul class="pages clearfix" v-else-if="currentPage<=3&&totalPage>5">
            <li @click="getCurrentPage($event)" v-for="page in 4" :class="currentPage === page ? 'active' : ''">{{page}}</li>
            <li>...</li>
            <li @click="getCurrentPage($event)" :class="currentPage === totalPage ? 'active' : ''">{{totalPage}}</li>
        </ul>

        <ul class="pages clearfix" v-else-if="currentPage==4&&totalPage>5">
            <li @click="getCurrentPage($event)" v-for="page in 5" :class="currentPage === page ? 'active' : ''">{{page}}</li>
            <li>...</li>
            <li @click="getCurrentPage($event)" :class="currentPage === totalPage ? 'active' : ''">{{totalPage}}</li>
        </ul>

        <ul class="pages clearfix" v-else-if="totalPage-3===currentPage&&totalPage>5">
            <li @click="getCurrentPage($event)" :class="currentPage === 1 ? 'active' : ''">1</li>
            <li>...</li>
            <li  @click="getCurrentPage($event)" v-for="page in [3,2,1,0]" :class="currentPage === totalPage-page ? 'active' : ''">{{totalPage-page}}</li>
        </ul>
        <ul class="pages clearfix" v-else-if="totalPage-currentPage<3&&totalPage>5">
            <li @click="getCurrentPage($event)" :class="currentPage === 1 ? 'active' : ''">1</li>
            <li>...</li>
            <li  @click="getCurrentPage($event)" v-for="page in [3,2,1,0]" :class="currentPage === totalPage-page ? 'active' : ''">{{totalPage-page}}</li>
        </ul>
        <ul class="pages clearfix" v-else>
            <li @click="getCurrentPage($event)" :class="currentPage === 1 ? 'active' : ''">1</li>
            <li>...</li>
            <li  @click="getCurrentPage($event)" v-for="page in [2,1,0,-1]" :class="currentPage === currentPage-page ? 'active' : ''">{{currentPage-page}}</li>
            <li>...</li>
            <li @click="getCurrentPage($event)" :class="currentPage === totalPage ? 'active' : ''">{{totalPage}}</li>
        </ul>
        <span class="nextPage" @click="nextPage($event)">下一页</span>
        <span class="totals">共{{totalPage}}页</span>
        <select @change="getCurrentSelectPage($event)" v-model="currentPage">
            <option v-for="page in totalPage" :value=page >{{page}}/{{totalPage}}</option>
        </select>

    </div>
</template>

<script>
    export default{
      props: ['totalPage', 'page'],
      data () {
        return {
          currentPage: this.page === undefined ? 1 : this.page
        }
      },
//      watch: {
//        'currentPage': function () {
//          const lis = document.getElementsByClassName('pages')[0].getElementsByTagName('li')
//          for (const item of lis) {
//            if (item.innerText === this.currentPage) {
//              item.setAttribute('class', 'active')
//            } else {
//              item.removeAttribute('class', 'active')
//            }
//          }
//        }
//      },
      watch: {
        'page': function () {
          this.currentPage = this.page
        }
      },
      methods: {
        getCurrentPage (e) {
          this.$emit('getPageFromChild', e.target.innerText)
          this.currentPage = parseInt(e.target.innerText)
        },
        getCurrentSelectPage (e) {
          this.$emit('getPageFromChild', e.target.value)
          this.currentPage = parseInt(e.target.value)
        },
        nextPage (e) {
          if (this.currentPage + 1 <= this.totalPage) {
            this.$emit('getPageFromChild', (this.currentPage + 1))
            this.currentPage = this.currentPage + 1
            e.target.style.cursor = 'pointer'
          } else {
            e.target.style.cursor = 'default'
          }
        },
        previousPage (e) {
          if (this.currentPage - 1 >= 1) {
            this.$emit('getPageFromChild', (this.currentPage - 1))
            this.currentPage = this.currentPage - 1
            e.target.style.cursor = 'pointer'
          } else {
            e.target.style.cursor = 'default'
          }
        },
        showActive (e) {
          if (this.currentPage === e.target.innerText) {
            e.target.addClass('active')
          } else {
            e.target.removeClass('active')
          }
        }
      },
      mounted () {
  }
    }
</script>
