import util from './../common/util.js'
export default {
    hasCal_data (state) {
	    let obj = state.initial_value;
	    // 如果为空
	    if(!obj){return 'null'};
	    const maxDb = {};
	    let key = [],
            val = [];
        const voiceDataDb = {};
	    for(let key in obj){
	        let everyMaXDb = parseInt(obj[key]);
	        everyMaXDb -=(everyMaXDb % 5);
            voiceDataDb[key] = everyMaXDb-5;
	        if(everyMaXDb-5 > 120){//判断是否超过表格最大值
	        	everyMaXDb = 125;
	        }
	        maxDb[key] = everyMaXDb-5;
	        if(maxDb["1000"] <= 40){
	            return 'error';
	            break;
	        }
	    };
        for(let obj in maxDb){
            key.push(obj);
            val.push(maxDb[obj])
        };
        // state.maxDbList = val;
        state.voiceData = voiceDataDb;
        state.hz = key;
	    state.zhutingData = maxDb;
	    return false;
    },
    // 获取时间
    getTime(state){
        return util.dateToggle('年','月','日',state.canvasMarks.updatetime);
    },
    // 获取声音类型、
    tonetype(state){
        if(state.canvasMarks){
        	if(state.canvasMarks['tonetype']){
                const type = state.canvasMarks['tonetype'];
        		return (type === 'zhuan' || type === '啭音') ? "啭音" : "纯音";
        	}else{
        		return (state.currenttonetype['tonetype'] === 'zhuan' || state.currenttonetype['tonetype'] === '啭音') ? "啭音" : "纯音";
        	}
    	}
    }
}
