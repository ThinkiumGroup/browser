
/**
 * @param item
 * 判断数据是否为空
 */
export function isNullOrEmpty (item) {
  return (!item || item === 'null' || item === 'undefined') && item !== 0 && item !== false
}

/**
 * 判断对象是否为空
 * @param obj
 */
export function isEmptyObject (obj) {
  for (let key in obj) {
    if(obj.hasOwnProperty(key)){
      return false
    }
  }
  return true
}

export function getURLParam (name) {
  let href = window.location.href
  if (href.indexOf('?') === -1) { return null }
  let search = href.split('?')[1]
  search = search.split('&')
  let nameReset = name || ''
  let resule = null
  // 获取全部参数及其值
  search = search.map((item) => {
    let info = item.split('=')
    let obj = {}
    obj[info[0]] = decodeURI(info[1])
    return obj
  })

  // 如果传入一个参数名称，就匹配其值
  if (nameReset) {
    for (let i = 0; i < search.length; i++) {
      for (const key in search[i]) {
        if (key == nameReset) {
          resule = search[i][key]
        }
      }
    }
  } else {
    resule = search
  }
  // 返回结果
  return resule
}

/**
 * 冻结对象及其子对象属性
 * @param obj
 */
export function freezeObj (obj) {
  Object.freeze(obj)
  Object.keys(obj).forEach((key) => {
    let child = obj[key]
    if(typeof(child) === 'object'){
      freezeObj(child)
    }
  })
}

/**
 * 将数据转为FormData形式
 * @param obj
 * @returns {FormData}
 */
export function transformDataToFormData(obj) {
  let format = new FormData();
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      format.append(i, obj[i]);
      if (obj[i] instanceof Array) {
        for (let j in obj[i]) {
          if (obj[i][j] instanceof File || obj[i][j] instanceof Blob) {
            let random = new Date().getTime();
            format.append(i, obj[i][j], random + "");
          }
        }
      }
    }
  }
  return format;
}

/**
 * 获得uuid
 * @returns {string}
 */
export function getUuid(){
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}


export function hideMoreText (text, front, end = 0){
  if(!text){
    return '';
  }
  text = text.trim();
  if(text.length <= front + end ) {
    return text
  } else {
    return text.substr(0, front) + "..." + text.substr(text.length - end);
  }
}

