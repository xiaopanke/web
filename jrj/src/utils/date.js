
/**/

/**
 *
 * format yyyy-MM-dd hh:mm 得到2017-05-03 11:20
 * format yyyy-MM-dd 得到2017-05-03
 */
function formatDate (date, format) {
  date = new Date(date)
  var paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  // 指定格式字符
  var cfg = {
    yyyy: date.getFullYear(), // 年 : 4位
    yy: date.getFullYear().toString().substring(2), // 年 : 2位
    M: date.getMonth() + 1,  // 月 : 如果1位的时候不补0
    MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
    d: date.getDate(),   // 日 : 如果1位的时候不补0
    dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
    h: date.getHours(),  // 时
    hh: paddNum(date.getHours()),  // 时:如果1位的时候补0
    m: date.getMinutes(), // 分
    mm: paddNum(date.getMinutes()), // 分:如果1位的时候补0
    ss: date.getSeconds() // 秒
  }
  format || (format = 'yyyy-MM-dd')
  return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m] })
}
/**
 * 传入一定格式的时间字符串，输出指定格式的时间格式字符串
 */
function formatDateStr (datestr, fromFormatter, toFormatter) {
  if (!fromFormatter) {
    return datestr
  }
  const yIndex = fromFormatter.indexOf('yyyy')
  const MIndex = fromFormatter.indexOf('MM')
  const dIndex = fromFormatter.indexOf('dd')
  const hIndex = fromFormatter.indexOf('hh')
  const mIndex = fromFormatter.indexOf('mm')
  const sIndex = fromFormatter.indexOf('ss')
  const cfg = {
    yyyy: yIndex !== -1 ? datestr.substring(yIndex, yIndex + 4) : '',
    MM: MIndex !== -1 ? datestr.substring(MIndex, MIndex + 2) : '',
    dd: dIndex !== -1 ? datestr.substring(dIndex, dIndex + 2) : '',
    hh: hIndex !== -1 ? datestr.substring(hIndex, hIndex + 2) : '',
    mm: mIndex !== -1 ? datestr.substring(mIndex, mIndex + 2) : '',
    ss: sIndex !== -1 ? datestr.substring(sIndex, sIndex + 2) : ''
  }
  toFormatter || (toFormatter = 'yyyy-MM-dd')
  return toFormatter.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m] })
}
function cutString (str, len) {
                 // length属性读出来的汉字长度为1
  if (str.length * 2 <= len) {
    return str
  }
  var strlen = 0
  var s = ''
  for (var i = 0; i < str.length; i++) {
    s = s + str.charAt(i)
    if (str.charCodeAt(i) > 128) {
      strlen = strlen + 2
      if (strlen >= len) {
        return s.substring(0, s.length - 1) + '...'
      }
    } else {
      strlen = strlen + 1
      if (strlen >= len) {
        return s.substring(0, s.length - 2) + '...'
      }
    }
  }
  return s
}
export { formatDate, cutString, formatDateStr }
