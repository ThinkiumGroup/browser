import { isNullOrEmpty } from '../utils/tools'


export default{
  /**
   * 读取或存入数据
   * @param type  local/session
   * @param route
   * @param value
   * @returns {null|any}
   */
  temp(type, route, value){

    let v = `temp-${route}`

    if(arguments.length === 2){
      let data
      if (type === 'local') {
        data = localStorage.getItem(v)
      } else if (type === 'session') {
        data = sessionStorage.getItem(v)
      }
      if (isNullOrEmpty(data)) {
        return null
      }
      return JSON.parse(data)
    } else if (arguments.length === 3) {
      if (type === 'local') {
        localStorage.setItem(v, JSON.stringify(value))
      } else if (type === 'session') {
        sessionStorage.setItem(v, JSON.stringify(value))
      }

    }
  }

}
