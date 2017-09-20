<style lang="scss" scoped>
.article{
    width:100%;
    background: #fff;
    font-size:12px;
    margin-bottom: 35px;
}
.title{
    color:#191919;
    margin-bottom: 15px;
    font-size:12px;
    font-weight: bold;
}
    .content{
        color:#666;
    }
@media only screen and (min-device-width: 320px) and (max-device-width: 1217px) {
    .article{
        width:100%;
        background: #fff;
        font-size:0.28rem;
        margin-bottom: 0.2rem;
    }
    .title{
        color:#191919;
        margin-bottom: 0.15rem;
        font-size:0.28rem;
    }
}
</style>
<template>
    <div class="article">
        <div class="title">{{data.title}}</div>
        <div class="content">{{data.content}}</div>
    </div>
</template>
<script>
    export default{
      props: ['data']
    }

</script>
