
export default {
    /**
     * *点击开始时不同耳旁的提示信息
     * @param  {[type]}   th       [this vue]
     * @param  {[String]}   ear      [current ear]
     * @param  {Function} callback [function]
     * @return {[type]}            [description]
     */
    earTips(th,ear,callback) {
        console.log(ear)
        const getFirstEar = ear,
            oneear = getFirstEar == 'L'?'左':'右',
            twoear = getFirstEar == 'R'?'左':'右';
        const h = th.$createElement;
        th.$msgbox({
            title:'重要提示',
            message: h('p', {style:'font-size:18px'}, [
                h('div', { class: 'seconddiv' }, [
                    h('span',null,'请'),
                    h('strong',{style:'font-weight:700'},'打开'+oneear+'耳'),
                    h('span',null,'助听设备，同时'),
                    h('strong',{style:'font-weight:700'},'关闭'+twoear+'耳'),
                    h('span',null,'设备或'),
                    h('strong',{style:'font-weight:700'},'掩蔽'+twoear+'耳'),
                    h('span',null,'耳道')
                    ])
              ]),
            customClass:'msgboxClass',
            confirmButtonText: '继续',
            closeOnClickModal:false,
            closeOnPressEscape:false,
            showCancelButton:true,
            cancelButtonText: '取消',
        }).then((btn) => {
            if(btn === "confirm"){
                callback();
            }
        }).catch((err) => {
            console.log(err)
        });
    },
    toStart(th){
        console.log("开始")
        const send_instructions = ()=>{
            // 测试的组数
            th.currentIndex = 0 ;
            th.showTable(0);
            // 禁止列表切换
            th.toggle = false;
            // 禁用开始按钮
            th.start = !th.start;
            th.pauseFalse = false;
            // 向被控端发送参数
            th.toSendParams();
        }
        if(th.currentear !== "A"){
            this.earTips(th,th.currentear,send_instructions);
        }else{
            send_instructions();
        }
    },
};
