<template>
  <div class="tab-tips">
     <el-dialog :title="title+'功能简介'" v-model="tabTipsVisible" top="30%" :show-close="false">
        <div v-if="tabNname === 0">
            <p>所有在校学生的花名册，可查看单个学生的基本信息、病历诊断信息、听力图、听力学相关检查记录（电耳镜、声导抗、耳声发射（OAE）、多频稳态诱发电位（ASSR）、脑干诱发电位（ABR）以及评估记录（林氏六音和言语评估类记录）</p>
        </div>
        <div v-if="tabNname === 5">
            <p>以班级为中心，统计在校、离校学生的性别、年龄、助听设备、助听PTA、祼耳PTA的数据占比，并且可以在已统计出的图表中，继续进行二次统计，达到数据更加精细化，以满足教学管理需求。  可查看和设置学生的听力评估完成情况，可自行设置应测评估任务，方便及时评估学生的听力情况。</p>
        </div>
        <div v-if="tabNname === 8">
            <p>可批量查询、删除、打印、设置学生档案！</p>
        </div>
        <div v-if="tabNname === 6">
            <p>全面改进采用游戏形式的测听模式让孩子更好的配合，保持更持久的关注力；全面的了解孩子助听设备辅助后听觉察觉能力的改善状况，可以精确到每一个频率点，也可以从简单到复杂多个配置可选。</p>
        </div>
        <div v-if="tabNname === 7">
            <p>孩子发错了音，是听不清还是发的不准？个性化听辩让老师可以任意选择两个音考察孩子的实际聆听辨识能力。</p>
        </div>
        <div v-if="tabNname === 4">
            <p>听得见还要听的清，详细的考察孩子各个声母音素的区分及辨别能力。</p>
        </div>
        <div v-if="tabNname === 3">
            <p>除了可以听到以外，孩子是否具备了识别相同音不同声调的能力？ 游戏化的界面让孩子更好的配合测试。</p>
        </div> 
        <div v-if="tabNname === 2">
            <p>精细化分频段的考察孩子对音素细节差异的听辩能力，我们可以了解孩子在不同频段，是否具备足够的辨别力。</p>
        </div>
        <div v-if="tabNname === 1">
            <p>林氏六音不仅可以用于评估，还可以用于日常的康复训练。不同情况下使用林氏六音的目地有所不同。主要包括以下方面：</p>
            <ul>
                <li>1、迅速了解儿童残余听力的大致情况；</li>
                <li>2、了解儿童在不同距离情况下的听能表现，不同距离指1米以内，1米、2米或更远；</li>
                <li>3、帮助听障儿童建立对声音的察觉和辨识能力；</li>
                <li>4、帮助儿童培养倾听的习惯；</li>
                <li>5、随时监控儿童的听能表现；</li>
                <li>6、概括性评估助听设备的使用效果；</li>
                <li>7、有利于听力检测时得到较为准确的听力图；</li>
            </ul>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'tab-tips',
  data () {
    return {
      tabTipsVisible:false
    }
  },
  props:{
    flag:null,
    tabText:String
  },
  computed:{
    tabNname:function(){
        return this.flag;
    },
    title:function(){
      return this.tabText;
    }
  },
  methods:{
    showTabTips(){
        // this.tabNname = this.flag;
        this.tabTipsVisible = true;
    }
  }
}
</script>

<style lang="less">
.tab-tips{
  .el-dialog{
    width:500px;
    .el-dialog__header{
      text-align: center;
    }
    p,li{
        height:auto;
        line-height:30px;
        font-size: 16px;
        text-indent:2em;
    }
    li{
      font-size: 15px;
    }
  }
}
</style>
