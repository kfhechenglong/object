<template>
  <div class="tingli clearfix">
    <!--左侧列表-->
    <ul class="tingliTopTab fl">
        <li :class="{active:!isActive}" @click="tagAttogle('canvas')">听力图</li>
        <li :class="{active:isActive}" @click="tagAttogle('img')">其它检查</li>
    </ul>
    <div class="tinglileft fl">
        <div class="tinglileftTree">
            <ul>
                <li v-if="!isActive" @click="_showAddtinglitu"><i class="fl fa fa-file-text-o" style="line-height:35px;margin-left:10px;"></i>录入听力图</li>
                <li v-else @click="_newupload" ><i class="fl fa fa-file-text-o" style="line-height:35px;margin-left:10px;"></i>录入检查图</li>
            </ul>
            <div class="test-date">
                <div v-if="!isActive">
                    <el-tree :data="handleData" ref="tree" node-key="id" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="true" :default-expanded-keys="[1]" :default-checked-keys="defaultChecked" @check-change="checkNode" :render-content="renderContent"></el-tree>
                </div>
              <div v-else>
                  <el-tree :data="handleData" ref="tree" show-checkbox node-key="id" :props="defaultProps" :highlight-current="false" :default-expanded-keys="[1]" :default-checked-keys="defaultChecked" @node-click="currentOtherClick" @check-change="currentOtherChecked"></el-tree>
              </div>
            </div>
        </div>
    </div>
    <!--右侧功能 使用组件 -->
    <div class="tingliright fl" >
        <div v-show="!isActive" class="ear">
            <div v-if=" canvasListData.length >0 " class="tingli-warp clearfix">
                <div class="clearfix content-title">
                    <div class="fl xq">
                        详情
                        <span style="font-size:16px;color:#333;">&nbsp;&nbsp;测试耳：{{getEar}}</span>
                    </div>
                    <ul class="fr">
                        <!-- <li><i class="el-icon-plus"></i>添加</li> -->
                        <li @click="_deleData('audio_id')"><i class="el-icon-delete2"></i>删除</li>
                        <li @click="_editor"><i class="el-icon-edit"></i>编辑</li>
                        <li @click="_download"><i class="fa fa-cloud-download"></i>下载</li>
                        <li @click="_showPrint"><i class="fa fa-print"></i>打印</li>
                    </ul>
                </div>
                <div class="svg-show" style="height:calc(100% - 55px);width:100%;">
                    <ele-tinglitu ref="tinglitu" :objZong="canvasData">
                    </ele-tinglitu>
                </div>
                <!-- <Tinglitu ref="tinglitu" :objZong="canvasData"></Tinglitu> -->
            </div>
            <div v-else class="noData">
                 <img src="../../../../../static/images/nodata.png" alt="" width="300px">
                 <p>您可以选择录入听力图功能！</p>
            </div> 
        </div>
        <div v-show="isActive" class="tinglirightImg">
            <div v-show="imgsData.length >0 " style="height:100%; margin-left:20px;">
                <div class="content-title clearfix">
                    <div class="fl xq">
                        详情
                    </div>
                    <ul class="fr">
                        <li @click="_Rotate"><i class="fa fa-undo"></i>旋转图片</li>
                        <li @click="_deldeImg"><i class="el-icon-delete2"></i>删除单张</li>
                        <li @click="_deleData('id')"><i class="el-icon-delete2"></i>删除群组</li>
                        <li @click="upload"><i class="el-icon-edit"></i>编辑追加</li>
                        <li @click="download"><i class="fa fa-cloud-download"></i>下&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;载</li>
                        <li @click="_print"><i class="fa fa-print"></i>打&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;印</li>
                    </ul>
                </div>
                <div class="img-preview">
                    <Imgpreview  ref="imgs" v-on:imgs="_Allimgs"></Imgpreview>
                </div>
            </div>
            <div v-show="imgsData.length == 0" class="noData">
                <img src="../../../../../static/images/nodata.png" alt="" width="300px">
                <p>您可以选择录入检查图功能！</p>
            </div>
        </div>
    </div>
    <!-- 编辑听力图 -->
    <div class="editSvg">
        <el-dialog title="录入听力图" v-model="addtinglitu" :before-close="cancel" :top="top">
            <addtinglitu ref="addtinglitu" :id="checkedList" v-on:successSave = "_saveSuccess" :objZong="canvasData"></addtinglitu>
        </el-dialog>
    </div>
    <div class="print" v-if="showPrint" >
        <div id="print-tone" :class="{'visibility':hidden}">
            <div id="print-warp">
                <div class="fiexd-w">
                    <div class="print-warp">
                        <div class="print-tone clearfix" id="toimg">
                            <print ref="print" ></print>
                        </div>
                    </div> 
                    <!-- 打印及关闭按钮 -->
                    <printButton :show="false" @close="closePrint" @code="codeQQ"></printButton>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showQQVisible">
        <codeQQ ref="code" :info="codeInfo" @close="_closeCodeQQ"></codeQQ>
    </div>
  </div>
</template>
<script>
import tinglitu from'./tinglitu'
// import Tinglitu from'./tinglitu - 副本.vue'
import Addtinglitu from'./addAudio.vue'
// import Addtinglitu from'./addAudio - 副本.vue'
import {mapState,mapMutations} from'vuex'
import Imgpreview from '../../commonvue/imgpreview.vue'
import util from '../../../../common/util.js'
import codeQQ from'../../commonvue/codeQQ/codeQQ.vue'
import Print from'../../zuting/report.vue'
import printButton from'../../commonvue/print/print-button.vue'
export default {
  components:{
        'ele-tinglitu':tinglitu,
        Imgpreview,
        Addtinglitu,
        codeQQ,
        Print,
        printButton,
        // Tinglitu
    },
    data(){
      return{
        top:dialog_top,
        addtinglitu:false,
        isActive:false,
        markData: [],
        handleData:[],
        defaultProps:{
          children: 'children',
          label: 'label'
        },
        // defaultChecked:[1],
        // 听力图列表数据
        canvasListData:[],
        // 其它检查的列表数据
        imgsData:[],
        // 听力图的具体数据
        canvasData:[],
        checkedList:[],
        getEar:'—',
        flag:true,
        // 其它检查参数
        imgData:false,
        type:'up',
        time:'',
        id:null,
        file:'',
        hidden:false,
        showQQVisible:false,
        showPrint:false//打印
      }
    },
    // created(){
    //     this.openUrl();
    // },
    beforeRouteEnter (to, from, next) {
        next(function(vm){
            vm.isActive = false;
            sessionStorage.setItem('test_id',JSON.stringify(6));
            vm.time = parseInt(new Date().getTime());//获取时间戳，用于生成二维码信息
            vm.$store.commit('getter_code_time',vm.time);
            vm.openUrl();
        })
    },
    beforeRouteLeave(to, from, next) {//清空数据
        this.imgsData = [];
        this.canvasListData = [];
        this.handleData = [];
        this.time = null;
        this.$store.commit('getter_code_time',this.time);
        this.$refs.imgs.serverImgUrl = [];
        this.$refs.imgs.bigImg = null;
        next();
    },
    computed:{
        ...mapState(['studyID','wepAppTime']),
         // 默认选中的节点
        defaultChecked:function(){
            if(this.handleData[0]){
                var defaultCheckedId = +this.handleData[0]['children'][0]['id'];
                // 显示默认选中的学生的测试数据
                // 默认选中的id
                this.checkedList = [defaultCheckedId];
                if(!this.isActive){
                    this._response1(defaultCheckedId,false);
                }else{
                    if(this.imgsData.length > 0){
                        var defaultCheckedId = +this.handleData[0]['children'][0]['children'][0]['id'];
                        this.checkedList = [defaultCheckedId];
                        this.$refs.imgs.getStudyImg('/audiogram/otherimages',{'id':defaultCheckedId});
                    };
                    return [defaultCheckedId];
                };
                return [defaultCheckedId];
            }
            return [0];
        } ,
        codeInfo:function(){//生成二维码的信息
            return {'time':this.time,'type':this.type,'user_id':this.studyID,'file':this.file,'id':this.id}
        },
    },
    watch:{
        wepAppTime:function(){   
            let time = this.time
            if(this.wskt.up_loder(this) === 'redact'){
                // this.$refs.code.dialogQQVisible = false;//关闭二维码
                this._closeCodeQQ(false)
                if(this.id){//刷新当前日期图片
                    this.$refs.imgs.getStudyImg('/audiogram/otherimages',{'id':this.checkedList[0]});
                }else{//刷新图片列表
                    this.tagAttogle('img');
                } 
            }
        },
    },
    methods:{
        _print(){//打印其它检查报告单
            let that = this;
            util.getPrint(this,next);
            function next(){
                // util.print('#img-print');
                that.$refs.imgs.print()
            }
        },
        // 下载听力报告
        _download(){
            //获取时间戳，用于生成二维码信息
            this.time = parseInt(new Date().getTime());
            this.$store.commit('getter_code_time',this.time);
            util.getterIpCode(this,next);
            function next(pointer){
                function prom(pointer){
                    return new Promise((resolve,reject) =>{
                        pointer.$store.commit('code_api','bg');
                        pointer.showPrint = true;
                        pointer.hidden = true;//隐藏打印界面
                        resolve(pointer)
                    })
                }
                prom(pointer).then((pointer) =>{
                    return new Promise((resolve,reject) =>{
                        pointer.$refs.print.createdPng();
                        pointer.$refs.print._lookPng();
                        resolve(pointer)
                    })
                }).then((pointer) =>{
                    return new Promise((resolve,reject) =>{
                        pointer.file = 'ceshi';
                        pointer.type = null;
                        pointer.showQQVisible = true;
                        resolve(pointer)
                    })
                }).then((pointer) =>{
                    return new Promise((resolve,reject) =>{
                        pointer.$refs.code.useqrcode();
                        resolve(pointer)
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            };
        },
        // 上传
        upload(){
            //获取时间戳，用于生成二维码信息
            this.time = parseInt(new Date().getTime());
            this.$store.commit('getter_code_time',this.time);
            util.getterIpCode(this,next);
            function next(pointer){
                pointer.$store.commit('code_api','up');
                pointer.showQQVisible = true;
                pointer.type = "up";
                pointer.id = pointer.checkedList[0];
                pointer.file = 'tingli';
                setTimeout(() =>{
                    pointer.$refs.code.useqrcode();
                },50)
            };
        },
        cancel(){//关闭录入听力图时的回调
            this.addtinglitu = false;
            this.$refs.addtinglitu.Close();
        },
        // 录入听力图数据保存成功
        _saveSuccess(e){
            if(e){//成功时，请求列表
                this.cancel();//清空增加听力图的数据
                this.openUrl();
            }
        },
        _editor(){
            this.addtinglitu = true;
            // 编辑听力图数据
            setTimeout(()=>{
                this.$refs.addtinglitu.add = false;
                // this.$refs.addtinglitu._editor_drawyuan();
                this.$refs.addtinglitu.editor();
            },50);
        },
        _newupload(){//录入其它听力
            //获取时间戳，用于生成二维码信息
            this.time = parseInt(new Date().getTime());
            this.$store.commit('getter_code_time',this.time);
            util.getterIpCode(this,next);
            function next(pointer){
                pointer.$store.commit('code_api','up');
                pointer.type = "up";
                pointer.id = null;
                pointer.file = 'tingli';
                pointer.showQQVisible = true;
                setTimeout(() =>{
                    pointer.$refs.code.useqrcode();
                },50)
            };
        },
        //下载图片
        download(){
            //获取时间戳，用于生成二维码信息
            this.time = parseInt(new Date().getTime());
            this.$store.commit('getter_code_time',this.time);
            util.getterIpCode(this,next);
            function next(pointer){
                pointer.$store.commit('code_api','dw');
                pointer.showQQVisible = true;
                pointer.type = "down";
                pointer.file = 'tingli';
                pointer.id = pointer.checkedList[0];
                setTimeout(() =>{
                    pointer.$refs.code.useqrcode();
                },50)
            };
        },
        _showAddtinglitu(){
            this.addtinglitu = true;
        },
        // 标签切换
        tagAttogle(str){
            this.handleData = [];
            let user_id = {user_id:this.studyID};
            console.log(str);
            if(str === "img"){
                this.isActive = true;
                this.$ajax.post('/audiogram/otherlist',user_id).then((response)=>{
                    console.log(response)
                    if(response.code === 200){
                        this.imgsData = response.data;
                        this._handleCanvasData(this.imgsData,'id');
                    }else{
                        this.imgsData = [];
                    }
                });
            }else{//听力图数据
                this.isActive = false;
                this.openUrl();
            };
        },
        _Allimgs(data){
            if(data.length == 0){//如果图片列表已经全部删除，则删除时间列表
                let agruments = {
                      'id':this.checkedList,
                      'user_id':this.studyID
                    };
                let url = '/audiogram/otherdelete';
                // 删除其它测试的数据
                this._api(this,url,agruments,true,'id',true);
            };
        },
        // 路由打开获得听力图初始数据
        openUrl(){
            this.$ajax.post('/audiogram/showlist',{user_id:this.studyID}).then((response)=>{
                console.log(response)
                if(response.code === 200){
                    this.canvasListData = response.data;
                    // this._response1(response.data[0].audio_id,false)
                    this._handleCanvasData(this.canvasListData,'audio_id');
                }else{//没有数据的话，初始化原始值
                    this.canvasData = ['',''];
                    this.canvasListData = [];
                }
            });
        },
        contrast(store, data) {
            this._response1(data['id'],true)
            event.stopPropagation();
        },
        renderContent(h, { node, data, store }) {
            return (
              <span class="con-btn">
                <span>
                  <span>{node.label}</span>
                </span>
                <span style="float: right;margin-right: 10px;" on-click={ () => this.contrast(store, data) }>
                  <span></span>
                  <el-button size="mini">对比</el-button>
                </span>
              </span>);
        },
        // 处理听力图的数据
        _handleCanvasData(e,id){
            let str = e;
            let data = [];
            str.forEach((item) =>{
                // 获取日期
                let getTime = new Date(item['time']);
                let labelTime = (+getTime.getMonth() + 1) +'月' +getTime.getDate()+'日';
                let parentTime = getTime.getFullYear()+'年';
                // 判断有没有当前元素的年份
                let year = "";
                if(!item.project_name){
                    for (let i = 0; i < data.length; i++) {
                      year += data[i]['label'] ;
                    };
                    if(year.indexOf(parentTime) > -1){
                      for (let i = 0; i < data.length; i++) {
                        // 若有则在子对象中添加
                       if(data[i]['label']  === parentTime) {
                        data[i]['children'].push({'label':labelTime,'id':item[id]});
                       }
                      }
                    }else{//如果没有则push一个，
                      let obj = {
                        "label":parentTime,
                        'children':[{'label':labelTime,'id':item[id]}]
                      }
                      data.push(obj)
                    }
                }else{
                    let nodeSonde = ""
                    for (let i = 0; i < data.length; i++) {
                      year += data[i]['label'] ;
                      // 获取二级节点
                      let classifyS = data[i]['children']
                      for (let j = 0; j < classifyS.length; j++) {//判断二级节点是否相同
                          nodeSonde += classifyS[j].label;
                          nodeSonde += "-"
                      }
                    };
                    let classify = item.project_name;
                    if(year.indexOf(parentTime) > -1){//判断年是否
                        for (let i = 0; i < data.length; i++) {
                            // 若有则在子对象中添加
                           if(data[i]['label']  === parentTime) {//找到已存在的年份
                                if(nodeSonde.indexOf(classify) > -1){//判断二级节点是否相同
                                    let nodeSondeData = data[i]['children']
                                    for (let j = 0; j < nodeSondeData.length; j++) {
                                        if(nodeSondeData[j].label == classify){//找到相同的节点
                                            nodeSondeData[j]['children'].push({'label':labelTime,'id':item[id]});
                                        }
                                    }
                                }else{//如果不存在二级节点，则直接添加
                                    data[i]['children'].push({'label':classify,'children':[{'label':labelTime,'id':item[id]}]});
                                }
                            }
                        }
                    }else{//如果没有则push一个，
                      let obj = {
                        "label":parentTime,
                        'children':[]
                      };
                      let aaa = {'label':classify,'children':[]};
                      let child = {
                            'label':labelTime,'id':item[id]
                        };
                      aaa['children'].push(child)
                      obj['children'].push(aaa)
                      data.push(obj)
                      // return;
                    }
                }
            });
            this.handleData = data;
        },
        // 获取听力图的列表数据
        _response1(id,flag){
            // console.log(id)
            this.$ajax.post('/audiogram/showone',{'audio_id':id}).then((response) =>{
                console.log(response)
                if(response.code === 200){
                    this.$store.commit('hasCanvasData',response.data);
                    let user_text = JSON.stringify(response.data);
                    sessionStorage.setItem('user_text',user_text)
                    this.getEar = response.data.radioEar;
                    if(flag){
                        if(this.canvasData.length > 1){//最多保存两组数据，用于进行对比
                            this.canvasData.shift();
                        };
                        this.canvasData.unshift(response.data.data);
                    }else{
                        this.canvasData = [response.data.data];
                    };
                    setTimeout(() =>{
                         this.$refs.tinglitu.drawyuan();//调用听力图中svg渲染
                     },50)
                }
            })
        },
        // 获取其它检查的列表数据
        _response2(){
            let num = 0;
            let id = this.imgsData[num]['id'];
            this.$ajax.post('/audiogram/otherimages',{'id':id}).then((response) =>{
                console.log(response)
            })
        },
        handleNodeClick(data,node,str) {
            if(data.id === undefined){return;}
            // 如果被选中，再次单击取消选中
            if(node['checked']){
                // debugger
                for (var i = 0; i < this.checkedList.length; i++) {
                    if(this.checkedList[i] == data['id']){
                        this.checkedList.splice(i,1);
                        var canvasData = this.canvasData.splice(i,1);
                    }
                };
                this.checkedList.push(data['id'])
                this.canvasData.push(canvasData[0])
                setTimeout(() =>{//调用听力图中svg渲染
                    this.$refs.tinglitu.drawyuan();
                },50)
                return;
            }
            this.checkedList = [data.id]
            this.checkedListPre = data.id;
            // 被勾选的列表
            this.$refs.tree.setCheckedKeys([data.id]);
            // 最后一个被选择的发送请求
            this._response1(data['id'],false)
        },
        checkNode(data,checked,node){
            return;
            if(data['id'] == this.checkedListPre){return;}
            if(checked){//点击复选框时的操作
                if(data.id === undefined){return;}
                if(this.checkedList.length > 1){
                    this.checkedList = [this.checkedList[1]];
                }
                this.checkedList.unshift(data['id']);
                this.$refs.tree.setCheckedKeys(this.checkedList);
                this._response1(data['id'],true)
            }else{
                // console.log(this.checkedList)
                //点击取消复选框时的操作
                this.canvasData.shift();
                // this.canvasData.unshift('');
                setTimeout(() =>{//调用听力图中svg渲染
                    this.$refs.tinglitu.drawyuan();
                },50)
            }
        },
        // 其它检查的点击选择
        currentOtherClick(data){
            console.log(data,data.id);
            if(data.id === undefined){return;}
            // 被勾选的列表
            this.$refs.tree.setCheckedKeys([data.id]);
        },
        currentOtherChecked(data,checked,node){
            console.log(data.id,checked,node);
            // this.$refs.tree.setCheckedKeys([data.id]);
             if(checked){
                if(data.id === undefined){return;}
                this.checkedList = [data.id];
                this.$refs.tree.setCheckedKeys([data.id]);//只能选择一个节点
                // console.log(111);
                this.$refs.imgs.getStudyImg('/audiogram/otherimages',{'id':data.id});
             }
        },
        // 删除图片
        _deldeImg(){
            this.$refs.imgs._deldeImg('/audiogram/deleteimage',this.checkedList[0]);
        },
        // 删除选中的数据
        _deleData(id){
            // util._click(this,deleData);
            deleData(this);
            function deleData(that){
                if(that.checkedList.length <= 0){msgTipsErr(that,'请选择您要删除的数据');return;}
                // if(that.checked.length>0){
                that.$confirm('您是否要删除选中的数据？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() =>{
                        // 发送删除请求
                       let agruments,url;
                       if(id !== 'id'){
                            agruments = {
                              'audio_id':that.checkedList,
                              'user_id':that.studyID
                            };
                            url = '/audiogram/delete';
                       }else{
                            agruments = {
                              'id':that.checkedList,
                              'user_id':that.studyID
                            };
                            url = '/audiogram/otherdelete';
                       }
                       console.log(agruments)
                        // 删除其它测试的数据
                        that._api(that,url,agruments,true,id);
                    }).catch(() =>{
                        msgTipsSuccess(that,'您已取消删除!'); 
                        return;
                    });
            };
        },
        // api接口
        _api(str,api,agruments,dele,id,flag){
            // console.log(id)
            str.$ajax.post(api,agruments).then((response) =>{
                console.log(response);
                if (response.code ===200){
                    let markData = response.data;
                    if(response.data.length == 0){//如返回的数据为空，怎么显示暂无数据
                        if(id == 'id'){
                            str.imgsData = [];
                        }else{
                            str.canvasListData = [];
                        }
                    };
                    if(!flag){//删除组的成功提示
                       msgTipsSuccess(str,'删除成功！'); 
                    };
                    str._handleCanvasData(markData,id)
                }else{
                    msgTipsErr(str,'删除失败！');
                    str.markData = [];
                };
                  // 删除时的提示信息
                if(dele){
                    str.checkedList.length = 0;
                };
            }).catch((err) =>{
                  msgTipsErr(str,'请求出现异常！');
            })
        },
        // 旋转图片
        _Rotate(){
            this.$refs.imgs._Rotate();
        },
        closePrint(e){//接收关闭信息
          this.showPrint = e;
        },
        _closeCodeQQ(e){//下载按钮，二维码关闭时的函数
          this.showPrint = e;
          this.showQQVisible = false;
          this.hidden = e;
          // this.$store.commit('getter_code_time','');
        },
        codeQQ(e){
            this.$store.commit('code_api','bg');
            // 显示二维码
            this.file = 'ceshi';
            this.type = null;
            this.showQQVisible = true;
            setTimeout(() =>{
                this.$refs.code.useqrcode();
            },50)
        },
        //听力图打印
        _showPrint(){
            this.showPrint = !this.showPrint;
            setTimeout(()=>{//将听力图保存成图片格式
                this.$refs.print.createdPng();
                // this.$refs.print._lookPng();
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@titleH:50px;
@border:#88d89f;
@contitle:35px;
@fc:#fff;
@bcl:#65c0df;
.tingli{
    padding-left:20px;
    /*****暂无数据*******/ 
    .noData{
        ul>li{
            font-size: 20px;
             background-color: @bcl;
              width: 150px;
              height: 50px;
              margin:8px auto;
              line-height: 50px;
              text-align: center;
              margin-top: 10px;
              border-radius: 5px;
              cursor:pointer;
              color:#fff;
              // &:hover{
              //   background-color:#25C707;
              // }
        }
    }
    /********听力图左侧*********/ 
    .tinglileft{
        margin-top: 30px;
        background:@bcl;
        border:3px solid @bcl;
        border-radius: 0 13px 13px 13px;
        box-shadow:1px 1px 5px @bcl;
        .tinglileftTree{
            width:220px;
            height:500px;
            ul{
                background-color:#fff;
                padding-top: 5px;
                padding-bottom: 5px;
                border-radius:0 10px 0 0;
            }
            li{
                font-size:20px;
                line-height: @contitle;
                margin:0px 10px;
                height:@contitle;
                text-align:center;
                border-radius:5px;
                color:@fc;
                border:1px solid #278bc4;
                background-color: #278bc4;
                cursor:pointer;
                box-shadow: 2px 2px 2px #ccc;
            }
            .el-tree-node__content{
                height: 40px;
                line-height: 40px;
            }
            .con-btn .el-button{
                font-size: 16px;
                padding: 8px;
                min-width: 60px;
            }
            .con-btn .el-button:focus{
                background: #1ab297;color:#FFF;
            }
            .test-date{
                overflow-y: auto;
                height: 453px;
                background-color:#fff;
                border-radius:0 0 10px 10px;
                .el-tree{
                  border:0px none;
                }
            }
        }
    }
    .tingliTopTab{
        padding-top:30px;
        li{
            cursor:pointer;
            background-color: #eee;
            width: 110px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            color: #337ab7;
            margin-bottom: 10px;
            font-size: 18px;
            border-radius: 5px 0 0 5px;
            box-shadow: 3px 3px 2px #ccc;
            &.active{
                background-color: @bcl;
                color:@fc;;
            }
        }
    }
    /********听力图样式*********/ 
    .tingliright{
        padding-top:30px;
        width:900px;
        height: 90%;
        .ear{
            width:100%;
            height: 100%;
        }
        .tingli-warp{
            margin-left:20px;
            height:100%;
        }
        .xq{line-height:47px; font-size:18px; text-indent:1em;}
        .content-title{
            width:calc(~"100% - 20px");
        }
        /*****听力图片*****/ 
        .tinglirightImg{
            height: 100%;
            position: relative;
            .img-preview{
                height: calc(~"100% - 52px");
            }
            .img .topBigimg img{
                max-width:450px;
            }
            .QQcode{
                position: absolute;
                right:42px;
                top:130px;
                width:120px;
                height:150px;
                // background-color:red;
                .QQcodeinner{
                    height:130px;
                    width:120px;
                    background-color: #37c438;
                    border-radius:10px;
                    position: absolute;
                    left:50%;
                    top:20px;
                    transform:translate(-50%);color:@fc;
                    text-align:center;
                    div{
                        width:90px;
                        height:90px;
                        background-color: #fff;
                        margin-left:15px;
                        margin-top:15px;

                    }
                }
                p{
                    margin-top:150px;
                    color:#37c438;
                    font-size: 14px;
                }
                ul>li{
                     background-color: @bcl;
                      width: 120px;
                      height: 35px;
                      margin-left:8px;
                      line-height: 35px;
                      text-align: center;
                      margin-top: 15px;
                      border-radius: 5px;
                      cursor:pointer;
                      color:#fff;
                      // &:hover{
                      //   background-color:#25C707;
                      // }
                }
            }
        }
    }
    .editSvg{
        .el-dialog{
            padding-bottom:30px;
            width:1300px;
        }
    }
}
</style>
