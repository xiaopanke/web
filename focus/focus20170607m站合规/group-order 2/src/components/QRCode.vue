<style>
    .pay-qrcode{position:absolute;width: 100%;height: 100%;z-index: 100;background: rgba(0, 0, 0, 0.8);z-index:100;opacity:0;visibility: hidden;}
    .pay-qrcode > div {/*background: url(../../img/qrcode.png) no-repeat;*/ background-size:18.75rem 26.03125rem; width: 18.75rem;height: 26.03125rem;position: fixed;top: 50%;left:50%;margin-top: -13.015625rem;margin-left:-9.375rem;text-align:center; color:#fff;font-size:1.5rem;transition: all .5s ease-out;opacity:0;display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex;justify-content: center;align-items:center; }
    /*.pay-qrcode img { width:11.0625rem;height:11.0625rem;margin:2.3125rem auto 0 auto;display:block;border:0; }*/
    .pay-qrcode img { width:100%;height:100%;position:absolute;top:0;left:0; }
    .pay-qrcode canvas { width:100%;height:100%;position:absolute;top:0;left:0;display:none; }
    .pay-qrcode-show { opacity: 1;visibility: visible; }
    .pay-qrcode-show > div { opacity: 1;}
</style>

<template>
    
    <div :class="{'pay-qrcode':true, 'pay-qrcode-show':showQRCode}" @click="showQRCode=false">
        <div @click.stop="">
            <!--<img :src="qrcodeData" alt="">-->
            <div v-if="qrcodeData == ''">加载中...</div>
            <img id="imgQrcode" src="" alt="" v-else/>
            <canvas id="qrcodeCanvas"></canvas>
            <img id="imgQrcodeBG" src="../../img/qrcode.png" alt="" style="display:none;">
        </div>
    </div>

</template>

<script>
    export default {
        props: ['showQRCode','qrcodeData','orderId'],
        data: function() {
            return {
                
            }
        },
        ready(){
            var vm = this;
            this.$on('qrcodeReady', function(){
                var _data = this.qrcodeData;
                var canvas = document.getElementById('qrcodeCanvas');
                var ctx = canvas.getContext('2d');
                var wrap = $('.pay-qrcode > div');
                canvas.width = wrap.width() * 2;
                canvas.height = wrap.height() * 2;
                canvas.style.width = wrap.width();
                canvas.style.height = wrap.height();
                ctx.scale(2,2);
                var image = new Image();
                image.onload = function() {
                    ctx.drawImage(image, 0, 0, canvas.width/2, canvas.height/2);
                    var img = new Image();
                    img.onload = function(){
                        ctx.drawImage(img, canvas.width * 0.205 / 2, canvas.width * 0.123 / 2, canvas.width * 0.59 / 2, canvas.width * 0.59 / 2);
                        $('#imgQrcode').attr({src:ctx.canvas.toDataURL()});
                    };
                    img.src = _data;
                };
                image.src = $('#imgQrcodeBG').attr('src');

            })

        },
        components: {
            
        },
        methods: {
            
        }
    };
</script>