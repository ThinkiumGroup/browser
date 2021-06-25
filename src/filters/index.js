import Vue from 'vue'
import { hideMoreText } from "../utils/tools";

//链的对应关系(0主链，1交易链，2pos发奖链，103电商链)
Vue.filter('transformChainState' , function(value) {
    return value = value === 0 ? "title.main_chain" : (value === 1 ? "title.trading_chain" : (value === 2 ? "title.pos_reward_chain" : "title.new_ecology_business_chain"))
})

//转换位数
Vue.filter('toDivideZero' , function(value) {
    if(isNaN((value/1000000000000000000).toFixed(4))) {
        return '--'
    }
    return  (value/1000000000000000000).toFixed(4) 
})


//转换位数
Vue.filter('$hideMoreText' , function(text, front, end) {
    return hideMoreText(text, front, end)
})


