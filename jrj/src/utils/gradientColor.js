function gradientColor (startColor, endColor, step) {
  function GradientColorfn (startColor, endColor, step) {
    step = step - 1
    var startRGB = this.colorRgb(startColor)// 转换为rgb数组模式
    var startR = startRGB[0]
    var startG = startRGB[1]
    var startB = startRGB[2]

    var endRGB = this.colorRgb(endColor)
    var endR = endRGB[0]
    var endG = endRGB[1]
    var endB = endRGB[2]

    var sR = (endR - startR) / step// 总差值
    var sG = (endG - startG) / step
    var sB = (endB - startB) / step

    var colorArr = []
    for (var i = 0; i < step; i++) {
      var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')')
      colorArr.push(hex)
    }
    colorArr.push('rgb(' + endRGB[0] + ',' + endRGB[1] + ',' + endRGB[2] + ')')
    return colorArr
  }

   // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  GradientColorfn.prototype.colorRgb = function (sColor2) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    var sColor = sColor2.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
           // 处理六位的颜色值
      var sColorChange = []
      for (var j = 1; j < 7; j += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(j, j + 2)))
      }
      return sColorChange
    } else {
      return sColor
    }
  }

   // 将rgb表示方式转换为hex表示方式
  GradientColorfn.prototype.colorHex = function (rgb) {
    var _this = rgb
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    if (/^(rgb|RGB)/.test(_this)) {
      var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, '').split(',')
      var strHex = '#'
      for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16)
        hex = hex < 10 ? 0 + '' + hex : hex// 保证每个rgb的值为2位
        if (hex === '0') {
          hex += hex
        }
        strHex += hex
      }
      if (strHex.length !== 7) {
        strHex = _this
      }
      return strHex
    } else if (reg.test(_this)) {
      var aNum = _this.replace(/#/, '').split('')
      if (aNum.length === 6) {
        return _this
      } else if (aNum.length === 3) {
        var numHex = '#'
        for (var b = 0; b < aNum.length; b += 1) {
          numHex += (aNum[b] + aNum[b])
        }
        return numHex
      }
    } else {
      return _this
    }
  }
  var colorarr = new GradientColorfn(startColor, endColor, step)
  return colorarr
}

export { gradientColor }
