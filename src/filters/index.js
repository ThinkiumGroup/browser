import Vue from 'vue'
import { hideMoreText } from "../utils/tools";


Vue.filter('transformChainState' , function(value) {
    return value = value === 0 ? "title.main_chain" : (value === 1 ? "title.trading_chain" : (value === 2 ? "title.pos_reward_chain" : "title.new_ecology_business_chain"))
})


Vue.filter('toDivideZero' , function(value) {
    if(isNaN((value/1000000000000000000).toFixed(4))) {
        return '--'
    }
    return  (value/1000000000000000000).toFixed(4) 
})



Vue.filter('$hideMoreText' , function(text, front, end) {
    return hideMoreText(text, front, end)
})


