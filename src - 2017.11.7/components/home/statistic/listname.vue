<template>
    <div class="n-l-name my-d-h">
        <el-dialog  v-model="noTestNameLists" :close-on-click-modal="false">
            <h3 class="n-l-t"><em>本{{time}}</em>—{{currType.key}}—未测名单</h3>
            <div class="table-content" v-loading.body="loading">
                <el-table
                    ref="table"
                    :data="tableData"
                    border
                    height="320"
                    style="width: 100%"
                    :stripe="false"
                    :highlight-current-row="true"
                    @selection-change="handleSelectionChange"
                    @row-click="infoList"
                    >
                    <el-table-column
                      type="index"
                      label="序号"
                      width="40"
                      class-name="index-td">
                    </el-table-column>
                    <el-table-column
                      type="selection"
                      width="30">
                    </el-table-column>
                    <el-table-column
                      prop="user_name"
                      label="姓名"
                      align="center"
                      width="100">
                    </el-table-column>

                    <el-table-column
                      prop="gender"
                      align="center"
                      label="性别"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="age"
                      label="年龄"
                      align="center"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="class_name"
                      label="班级"
                      align="center"
                      width="auto">
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="最后评估日期"
                      align="center"
                      width="130">
                    </el-table-column>
                    <el-table-column
                      prop="now"
                      label="距今累计(天)"
                      align="center"
                      width="120">
                    </el-table-column>
                </el-table>
            </div>
            <button @click="submit" class="btn fr">添加到待测名单</button>
        </el-dialog>
    </div>
</template>
    
<script>

import util from '../../../common/util'
import {mapMutations,mapState} from 'vuex'
export default {
    // 注册组件
    components:{
        
    },
    data (){
        return {
            noTestNameLists:false,
            loading:false,
            checkedNameList:[],
            tableData:[],
        }
    },
    props:{
        currType:null,
        time:null,
        name:null,
        typeObject:Array
    },
    created (){
    },
    watch :{
        name:function(){
            const name = this.name;
            const nameList = []
            for(let key in name){
                if(key === "data"){
                    for(let a in name[key]){
                        nameList.push(name[key][a])
                    }
                }
            }
            this.tableData = nameList;
            // console.log(nameList)
        }
    },
    methods : {
        handleSelectionChange(selection) {//多选状态下的id值
            // console.log(selection)
            this.checkedNameList = selection
        }, 
        infoList(rows, event, column){
            // console.log(rows);
            if (column.type == "selection" || column.type == "index") {
            } else {
                // this.$refs.table.clearSelection();
            }
            this.$refs.table.toggleRowSelection(rows);
        },
        submit(){
            if(this.checkedNameList.length === 0){
                msgTipsErr(this,'您没有选择任何信息！')
                return;
            }else{
                let typeObject = this.typeObject;
                // 获取本地的待测名单
                let getLocalStorage = JSON.parse(localStorage.getItem("noTestNames"));
                // 先查看本地有没有待测名单
                if(!getLocalStorage){
                    // 没有待测名单，则创建名单
                    let nameLists = [];
                    for (var i = 0; i < typeObject.length; i++) {
                        let data = {
                            testType:typeObject[i].value,
                            nameList:[]
                        }
                        nameLists.push(data)
                    }
                    getLocalStorage = nameLists;
                }else{
                }
                // 添加当前测试类型的未测名单
                for (let i = 0; i < getLocalStorage.length; i++) {
                    if(getLocalStorage[i].testType === this.currType.value){
                        //如果有待测名单，先合并再去重
                        let localStorageName = getLocalStorage[i].nameList;
                        let a = localStorageName.concat(this.checkedNameList);
                        //  去重
                        let res = [];
                        let json = {};
                        for(let j = 0; j < a.length; j++){
                            if(!json[a[j].user_id]){
                                res.push(a[j]);
                                json[a[j].user_id] = 1;
                            }
                        }
                        getLocalStorage[i].nameList = res;
                    }
                }
                // console.log(JSON.stringify(getLocalStorage))
                localStorage.setItem("noTestNames",JSON.stringify(getLocalStorage))
                msgTipsSuccess(this,'已添加到待测名单！')
                this.noTestNameLists = false;
            }
        }
    }
}
</script>
<style  lang="less">
.n-l-name{
    h3{
        font-size: 20px;
        margin-bottom: 10px;
        em{
            color:red;
        }
    }
    .table-content{
        // max-height:321px;
        // overflow: auto;
    }
    .table-content .el-table-column--selection .cell{
        padding: 0 5px 0 5px;
    }
    .table-content .index-td{border-right: 0 none;}
    .table-content .index-td .cell{    
        text-align: center;
        padding: 0 5px 0 5px;
    }
    .btn{
        height: 50px;
        font-size: 18px;
        color:#fff;
        border-radius: 5px;
        padding:10px;
        margin: 20px 0;
        background: #20a0ff;
        border:1px solid #20a0ff;
        box-shadow: 3px 3px 2px #ccc;
    }
}

</style>
