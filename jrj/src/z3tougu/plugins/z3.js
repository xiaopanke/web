import config from '../config'
export default{
  install(Vue, options) {
    // 1. 添加全局方法或属性
    // Vue.myGlobalMethod = function () {
    //   // 逻辑...
    // }
    // 2. 添加全局资源
    Vue.directive('z3-stock',{
      bind (el, binding, vnode, oldVnode) {
        let popup = binding.value.ref;
        let code = binding.value.code;
        let vm = vnode.context;
        let popupVm = vm.$refs[popup];

        el.addEventListener('mouseover' ,(event)=>{
          let scrollTop = window.pageYOffset || window.scrollY;
          let scrollleft = window.pageXOffset || window.scrollX;
          const winH = window.document.body.scrollHeight;
          let left = event.x + parseInt(scrollleft) + 40;
          let top = event.y + parseInt(scrollTop) - 20;
          if(winH - top < 300){
            top = winH-300;
          }
          popupVm.$props.left = left
          popupVm.$props.top = top
          popupVm.isShow = true;
          popupVm.$props.stockCode = code;
        });
        el.addEventListener('mouseout',(event)=>{
          popupVm.isShow = false;
          console.info('mouseout');
        })
      }
    });
    Vue.directive('z3-updowncolor',(el, binding, vnode, oldVnode)=>{
        var flag = binding.value;
        if(flag>0){
          el.style.color = config.upColor
        }else if(flag === 0){
          el.style.color = config.flatColor
        }else{
          el.style.color = config.downColor
        }
    })
    Vue.directive('drag',//自定义指令                                      JS
        {bind:function (el, binding) {
                let oDiv = el;   //当前元素
                let self = this;  //上下文
                var l;
                var num;
                oDiv.onmousedown = function (e) {
                 //鼠标按下，计算当前元素距离可视区的距离
                    let disX = e.clientX - oDiv.offsetLeft;
                    //let disY = e.clientY - oDiv.offsetTop;
                    e.preventDefault()
                    document.onmousemove = function (e) {
                      //通过事件委托，计算移动的距离
                       l = e.clientX - disX;
                        //let t = e.clientY - disY;
                      //移动当前元素
                      if(l<16){l=16}
                      if(l>274){l=274}
                        oDiv.style.left = l + 'px';
                        //oDiv.style.top = t + 'px';
                         //将此时的位置传出去
                         num=Math.round(((l-16)/28.66))
                        binding.value({x:e.pageX,num:num})
                    };
                    document.onmouseup = function (e) {

                         l=num*28.66+16
                        oDiv.style.left = l + 'px';
                        binding.value({x:e.pageX,num:num})
                        document.onmousemove = null;
                        document.onmouseup = null;
                     };
                };
            }
        }
    );
    // Vue.directive('z3-qrcode',(el, binding, vnode, oldVnode) => {
    //   let openQrcode = function(e){
    //     let div = "<div><canvas></canvas></div>"
    //   }
    //   el.addEventListener('click',(event) => {

    //   })
    // })
    // 3. 注入组件
    // Vue.mixin({
    //   created: function () {
    //     // 逻辑...
    //   }
    //   ...
    // })
    // // 4. 添加实例方法
    // Vue.prototype.$myMethod = function (methodOptions) {
    //   // 逻辑...
    // }
  }
}
