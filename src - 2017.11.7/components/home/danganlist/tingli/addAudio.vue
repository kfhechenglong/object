<style  lang="less">
#add{
  // width:1250px;
  height:650px;
  margin:0 auto;
  /******测试方法选择******/ 
  .test-add-model{
    line-height: 30px;
    font-size: 18px;
    margin-bottom:10px;
    li{
      float: left;
      margin-left:20px;
      input{
        height:20px;
      }
      /**********助听设备***********/ 
      .el-input{
        width: 160px;
      }
      /******测试方法***********/ 
      .el-input__inner{
        height:26px !important;
        border-radius:0px;
        // border: 1px solid #a9a9a9;
        width:160px !important;
        padding-left:5px !important;
      }
      .el-input__inner:focus{
          border: 1px solid #a9a9a9;
      }
    }

  }
  /*******放大图的按钮组********/ 
  .big-btn{
    position: absolute;
    z-index: 20002;
    right:35px;
    top:100px;
    ul{
      // margin-top:50px;
      li{
        margin:10px 0;
      }
    }
    /****单选组*****/ 
    .el-radio-button__inner{
      border-radius:4px;
      border:1px solid #bfcbd9;
      padding:10px 0;
      width:100%;
    }
    .el-radio-button{
      display:block;
      margin:10px 0;
    }
    .el-radio-group{
      margin:15px 0;
    }
    .el-button{
      padding: 10px 0;
      width:100%;
    }
  }
  .tl-data-table tr input {
    height: 22px;
    padding-left: 3px;
    margin: 0;
    width: 25px;
  } 
}
/******无背景图******/ 
.ibox-title-row{
    position: relative;
    cursor:pointer;
    width:120px;
    height: 35px;
    line-height: 35px;
    text-align:center;
    border: 1px solid #ccc;
    // margin-right: 10px;
    &:hover{
      color:#20a0ff;
    }
    .arrows{
      font-size: 14px;
      position: absolute;
      right:5px;
      top:12px;
      transform: rotate(0);
      transition: transform .4s ease-in-out;
    }
    .arrowsActive{
      right:3px;
      transform: rotate(180deg);
    }
  }
 #page-wrapper .ibox-title{
  
  
  }
  .addtu{
    .ibox-content{
      padding-top:10px;
    }
    .l-ear,.r-ear{
      height:95%;
      width:40%;
    }
    .l-ear{margin-left:10px;}
    #youer1{

    }
    .c-btn{
      margin-left:50px;
      // height:85%;
      width:10%;
      margin-top:100px;
    }
    .btn-group-lg{
      li{
        margin-top:10px;
        /******复制到另一侧*****/ 
        button{
          width:120px;
          height:40px;
          cursor:pointer;
        }
      }
    }
    #save{
      width:100px;
      height:40px;
      cursor:pointer;
      color:#fff;
      background-color:#22c6c6; 
      font-size: 18px;
      margin:30px;
    }
    .row-info{
      padding:0 20px;
      li{
        margin-left:0px;
        .el-date-editor.el-input{
            width:182px;
        }
        .el-input__inner{
            height:26px;
            border-radius:0px;
            border-radius:0px;
            border: 1px solid #a9a9a9;
        }
        .el-input__inner:focus{
            border: 1px solid #a9a9a9;
        }
      }
      .degree{
        .el-input{
          width:70%;
        }
      }
    }
    .row-marks{
      margin:10px 40px;
      textarea{width:300px !important;font-size: 16px;padding-left:5px;}
    }
    .row ul{
      margin-top:14px;
      li{
        margin-top:10px;
      }
    }
    .row tr .el-input{
      input{
      }
      .el-input__inner{
        height:28px !important;
        border-radius:0px;
        border: 1px solid #a9a9a9;
        width:100px !important;
        padding-left:5px !important;
      }
      .el-input__inner:focus{
          border: 1px solid #a9a9a9;
      }
    }
    .clear{
       clear:both;
    }
    /******放大图******/
    .bigCanvas{
      /***display:none;***/
      position: absolute;
      padding:10px;
      left: 0px;
      top: 0px;
      width:1280px;
      height:700px;
      border-top: 1px solid #ccc;
      background-color:#fff;
    } 
    .bigCanvas-on{
      display:block;
    }
  }
</style>

<template>
    <div  id="add" class="fixed-sidebar addtu full-height-layout">
      <svg style="display: none;width:10px;height:10px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <symbol id="a" viewBox="0 -212 1024 1024">
            <path d="M241 638 l66 0 l-92 174 l-100 -174 l85 0 l0 -50 l-26 0 q-34 0 -100 -18 q-58 -7 -74 -32 l0 -101 q24 34 81 50 q59 25 111 25 q166 0 166 -117 q0 -40 -19 -66 q-16 -26 -48 -42 q-25 -24 -108 -66 q-127 -67 -159 -115 q-24 -36 -24 -102 q0 -82 66 -142 q74 -58 183 -58 q109 0 158 24 l0 102 q-57 -52 -166 -52 q-67 0 -115 36 q-52 22 -52 82 q0 32 15 57 q26 34 43 45 q34 13 109 56 q117 57 157 109 q51 58 51 117 q0 99 -74 151 q-52 39 -134 47 l0 60 Z"></path>
          </symbol>
          <symbol id="b" viewBox="0 -212 1024 1024">
            <path d="M0 661 q36 33 94 51 q57 23 108 23 q167 0 167 -115 q0 -41 -15 -68 q-27 -27 -51 -42 q-35 -25 -109 -66 q-133 -67 -158 -118 q-36 -35 -36 -101 q0 -84 69 -143 q82 -59 191 -59 q118 0 161 28 l0 97 q-60 -48 -168 -48 q-74 0 -118 33 q-41 25 -41 84 q0 33 8 58 q16 36 49 43 q18 17 102 59 q116 59 158 108 q52 59 52 117 q0 102 -85 152 q-66 58 -184 58 q-43 0 -109 -17 q-60 -7 -85 -34 l0 -100 Z"></path>
          </symbol>
          <symbol id="c" viewBox="0 -212 1024 1024">
            <path d="M372 0 l42 26 l-178 178 l170 161 l347 -357 l41 44 l-362 354 l194 178 l168 -170 l34 34 l-176 178 l127 119 l-34 41 l-119 -118 l-160 144 l-44 -26 l160 -160 l-176 -186 l-380 364 l-26 -25 l363 -373 l-161 -168 l-160 168 l-34 -41 l160 -161 l-152 -145 l43 -41 l143 150 l170 -168 Z"></path>
          </symbol>
          <symbol id="d" viewBox="0 -212 1024 1024">
            <path d="M811 36 l-148 142 q70 87 70 214 q0 143 -92 229 q-85 93 -229 93 q-128 0 -213 -72 l-171 170 l-28 -28 l177 -177 q-78 -87 -78 -215 q0 -136 93 -220 q85 -93 220 -93 q129 0 215 79 l150 -157 l34 35 ZM404 675 q128 0 207 -79 q85 -85 85 -206 q0 -107 -69 -177 l-400 399 q64 63 177 63 ZM414 123 q-129 0 -192 79 q-78 72 -78 192 q0 115 56 186 l399 -400 q-78 -57 -185 -57 Z"></path>
          </symbol>
          <symbol id="e" viewBox="0 -212 1024 1024">
            <path d="M108 242 q0 272 230 265 q207 7 207 -265 l0 -454 l73 0 l0 454 q0 166 -65 247 q-58 76 -205 83 l0 66 l89 0 l-114 174 l-91 -174 l73 0 l0 -66 q-305 -7 -272 -330 l0 -454 l75 0 l0 454 Z"></path>
          </symbol>
          <symbol id="f" viewBox="0 -212 1024 1024">
            <path d="M10 491.82 q-8 338 313 330 q313 8 305 -330 l0 -465 l-93 0 l0 449 q8 286 -212 277 q-228 9 -228 -277 l0 -449 l-85 0 l0 465 Z"></path>
          </symbol>
          <symbol id="i" viewBox="0 -212 1024 1024">
            <path d="M397 358 q20 46 29 113 q28 -67 37 -113 l264 -570 l133 0 l0 796 l-93 0 l0 -550 q0 -75 9 -168 q-20 26 -29 93 l-284 625 l-9 20 l105 0 l-133 208 l-105 -208 l85 0 l0 -20 l-284 -605 q-18 -49 -29 -113 q0 17 11 37 q9 104 9 131 l0 550 l-113 0 l0 -796 l133 0 l264 570 Z"></path>
          </symbol>
          <symbol id="j" viewBox="0 -212 1024 1024">
            <path d="M96 237 q0 -18 -8 -114 q-10 -43 -10 -51 q18 61 26 104 l261 636 l52 0 l262 -636 q16 -69 16 -104 l0 740 l88 0 l0 -811 l-122 0 l-235 593 q-16 51 -27 112 q-26 -61 -43 -112 l-234 -593 l-122 0 l0 811 l96 0 l0 -575 Z"></path>
          </symbol>
          <symbol id="k" viewBox="0 -212 1024 1024">
            <path d="M311 -61 l80 71 l-34 24 l-357 0 l0 56 l318 0 l0 683 l-318 0 l0 39 l357 0 l0 -739 l41 -39 l80 87 l151 -333 l-318 151 Z"></path>
          </symbol>
          <symbol id="l" viewBox="0 -212 1024 1024">
            <path d="M298 661 l332 151 l-149 -315 l-87 77 l-40 -38 l0 -748 l-354 0 l0 55 l322 0 l0 678 l-322 0 l0 39 l346 0 l39 31 l-87 70 Z"></path>
          </symbol>
          <symbol id="m" viewBox="0 -212 1024 1024">
            <path d="M0 76 l0 -39 l378 0 l0 775 l-378 0 l0 -46 l339 0 l0 -690 l-339 0 Z"></path>
          </symbol>
          <symbol id="n" viewBox="0 -212 1024 1024">
            <path d="M169 223 l230 221 l-370 368 l-29 -30 l347 -338 l-347 -347 l29 -22 l118 126 l89 -75 l-51 -81 l302 -117 l-169 295 l-59 -81 l-90 81 Z"></path>
          </symbol>
          <symbol id="o" viewBox="0 -212 1024 1024">
            <path d="M52 502 l48 59 l82 -52 l117 303 l-294 -170 l81 -58 l-55 -59 l-2 2 l-29 -23 l7 -7 l2 -2 l339 -339 l-348 -339 l29 -29 l362 368 l-339 346 Z"></path>
          </symbol>
          <symbol id="p" viewBox="0 -212 1024 1024">
            <path d="M22 69 l-22 30 l351 341 l-351 351 l22 21 l372 -372 l-372 -371 Z"></path>
          </symbol>
          <symbol id="q" viewBox="0 -212 1024 1024">
            <path d="M581 115 l0 -64 l-341 0 l-24 -22 l85 -70 l-301 -171 l109 310 l85 -54 l15 31 l0 737 l372 0 l0 -40 l-318 0 l0 -657 l318 0 Z"></path>
          </symbol>
          <symbol id="r" viewBox="0 -212 1024 1024">
            <path d="M659 -147 l0 -65 l-391 0 l0 773 l-17 15 l-72 -89 l-179 325 l325 -122 l-57 -97 l8 -9 l383 0 l0 -40 l-351 0 l0 -691 l351 0 Z"></path>
          </symbol>
          <symbol id="s" viewBox="0 -212 1024 1024">
            <path d="M379 67 l0 -47 l-379 0 l0 792 l379 0 l0 -39 l-340 0 l0 -706 l340 0 Z"></path>
          </symbol>
          <symbol id="t" viewBox="0 -212 1024 1024">
            <path d="M174 454 l337 343 l-21 15 l-360 -358 l190 -199 l-87 -58 l-65 73 l-168 -270 l313 109 l-58 68 l74 65 l161 -155 l21 22 l-337 345 Z"></path>
          </symbol>
          <symbol id="u" viewBox="0 -212 1024 1024">
            <path d="M44 167 l358 350 l-38 21 l-90 84 l67 76 l-318 114 l181 -304 l54 84 l99 -75 l-357 -350 l372 -379 l30 14 l-358 365 Z"></path>
          </symbol>
          <symbol id="v" viewBox="0 -212 1024 1024">
            <path d="M371 812 l23 -21 l-348 -357 l348 -356 l-23 -14 l-371 370 l371 378 Z"></path>
          </symbol>
          <symbol id="w" viewBox="0 -212 1024 1024">
            <path d="M773 16 l-33 40 l-740 0 l0 756 l756 0 l0 -731 l40 -42 l66 90 l162 -341 l-318 147 l67 81 ZM40 96 l659 0 q17 0 17 17 l0 659 l-676 0 l0 -676 Z"></path>
          </symbol>
          <symbol id="x" viewBox="0 -212 1024 1024">
            <path d="M1009 812 l-146 -323 l-71 81 l-42 -40 l0 -742 l-750 0 l0 750 l725 0 l33 40 l-72 81 l323 153 ZM40 -172 l670 0 l0 670 l-670 0 l0 -670 Z"></path>
          </symbol>
          <symbol id="y" viewBox="0 -212 1024 1024">
            <path d="M0 60 l767 0 l0 752 l-767 0 l0 -752 ZM42 770 l676 0 l0 -668 l-676 0 l0 668 Z"></path>
          </symbol>
          <symbol id="z" viewBox="0 -212 1024 1024">
            <path d="M689 -52 l51 60 l-43 48 l0 0 l-319 344 l-345 -344 l-33 43 l337 345 l-337 335 l33 33 l345 -335 l327 335 l43 -41 l-344 -327 l252 -254 l84 -91 l45 -48 l72 89 l151 -352 l-319 160 Z"></path>
          </symbol>
          <symbol id="four" viewBox="0 -212 1024 1024">
            <path d="M674 652 l331 160 l-141 -325 l-77 58 l-47 -50 l0 0 l-333 -323 l323 -341 l-41 -43 l-315 341 l-333 -341 l-41 43 l331 341 l-331 332 l41 34 l333 -333 l323 333 l47 45 l-70 69 Z"></path>
          </symbol>
          <symbol id="five" viewBox="0 -212 1024 1024">
            <path d="M382 406 l316 -341 l41 41 l-333 341 l341 324 l-41 41 l-324 -332 l-341 332 l-41 -33 l341 -332 l-341 -341 l41 -41 l341 341 Z"></path>
          </symbol>
          <symbol id="six" viewBox="0 -212 1024 1024">
            <path d="M929 812 l-861 0 l271 -461 l-102 -85 l-68 85 l-169 -306 l306 122 l-52 85 l92 76 q0 8 -7 8 l160 -284 l430 760 ZM853 781 l-362 -653 l-352 653 l714 0 Z"></path>
          </symbol>
          <symbol id="seven" viewBox="0 -212 1024 1024">
            <path d="M292 538 l-58 66 l54 57 l-288 151 l121 -311 l76 69 l54 -69 l401 -713 l425 750 l-785 0 ZM660 -137 l-358 645 l706 0 l-348 -645 Z"></path>
          </symbol>
          <symbol id="zero" viewBox="0 -212 1024 1024">
            <path d="M839 812 l-839 0 l420 -758 l419 758 ZM420 136 l-344 630 l696 0 l-352 -630 Z"></path>
          </symbol>
          <symbol id="one" viewBox="0 -212 1024 1024">
            <path d="M849 113 q-114 -114 -287 -114 q-184 0 -288 106 l-54 -52 l68 -77 l-288 -152 l137 320 l60 -77 l54 54 q-99 113 -99 281 q0 180 112 294 q114 116 298 116 q173 0 287 -116 q114 -114 114 -294 q0 -183 -114 -289 ZM803 666 q-90 93 -241 93 q-153 0 -251 -93 q-100 -97 -100 -264 q0 -160 100 -258 q98 -100 251 -100 q151 0 241 100 q100 98 100 258 q0 167 -100 264 Z"></path>
          </symbol>
          <symbol id="two" viewBox="0 -212 1024 1024">
            <path d="M814 -99 q-113 -113 -293 -113 q-175 0 -288 113 q-120 113 -120 293 q0 173 120 286 q16 16 39 23 l-69 69 l-60 -76 l-143 316 l295 -143 l-69 -74 l60 -69 q99 60 235 69 q180 0 293 -115 q113 -113 113 -286 q0 -180 -113 -293 ZM768 450 q-97 92 -247 92 q-145 0 -242 -92 q-99 -97 -99 -256 q0 -166 99 -263 q97 -99 242 -99 q150 0 247 99 q99 97 99 263 q0 159 -99 256 Z"></path>
          </symbol>
          <symbol id="three" viewBox="0 -212 1024 1024">
            <path d="M409 812 q-182 0 -305 -114 q-104 -113 -104 -288 q0 -182 104 -295 q123 -114 305 -114 q168 0 290 114 q105 113 105 295 q0 175 -105 288 q-122 114 -290 114 ZM151 668 q100 93 258 93 q153 0 244 -93 q98 -97 98 -258 q0 -167 -98 -265 q-91 -100 -244 -100 q-158 0 -258 100 q-98 98 -98 265 q0 161 98 258 Z"></path>
          </symbol>
          <symbol id="nine" viewBox="0 -212 1024 1024">
            <path d="M424 -39 l251 246 l-251 247 l-253 -247 l253 -246 ZM213 207 l207 206 l207 -206 l-207 -206 l-207 206 ZM450 614 l401 -402 l-425 -425 l-426 425 l411 411 l0 20 l-82 0 l97 169 l97 -169 l-73 0 l0 -29 ZM426 -169 l379 379 l-379 379 l-379 -379 l379 -379 Z"></path>
          </symbol>
          <symbol id="comma" viewBox="0 -212 1024 1024">
            <path d="M450 628 l413 -409 l-432 -432 l-431 432 l239 238 q0 1 1 3 l-3 -2 l177 180 l0 9 l-76 0 l95 165 l95 -165 l-78 0 l0 -19 ZM468 224 l175 -179 l175 174 l-180 180 l-170 -175 ZM408 224 l-175 180 l-185 -185 l180 -180 l180 185 ZM438 195 l-180 -185 l175 -176 l180 181 l-175 180 ZM607 429 l-174 175 l-169 -169 l174 -180 l169 174 ZM450 628 l413 -409 l-432 -432 l-431 432 l239 238 q0 1 1 3 l-3 -2 l177 180 l0 9 l-76 0 l95 165 l95 -165 l-78 0 l0 -19 ZM468 224 l175 -179 l175 174 l-180 180 l-170 -175 ZM408 224 l-175 180 l-185 -185 l180 -180 l180 185 ZM438 195 l-180 -185 l175 -176 l180 181 l-175 180 ZM607 429 l-174 175 l-169 -169 l174 -180 l169 174 Z"></path>
          </symbol>
          <symbol id="period" viewBox="0 -212 1024 1024">
            <path d="M446 454 q73 0 114 -40 q43 -40 43 -98 q0 -29 -11 -53 q-11 -25 -32 -42 q-21 -18 -58 -30 q30 -17 46 -44 q16 -25 16 -57 q0 -36 -19 -63 q-17 -28 -48 -42 q-31 -14 -88 -14 l-95 0 l0 202 l-131 0 l0 50 l131 0 l0 231 l132 0 ZM417 18 q50 0 74 19 q23 19 23 53 q0 23 -14 44 q-13 21 -37 30 q-25 9 -75 9 l-27 0 l0 -155 l56 0 ZM388 222 q61 0 86 5 q37 9 57 33 q22 25 22 56 q0 26 -16 48 q-14 22 -38 32 q-26 11 -77 11 l-61 0 l0 -185 l27 0 ZM442 608 l397 -397 l-420 -419 l-419 419 l406 406 l0 28 l-82 0 l95 167 l97 -167 l-74 0 l0 -37 ZM793 211 l-374 374 l-374 -374 l374 -374 l374 374 Z"></path>
          </symbol>
          <symbol id="h" viewBox="0 -212 1024 1024">
            <path d="M429 -39 l422 429 l-422 422 l-429 -422 l429 -429 ZM804 390 l-375 -383 l-383 383 l383 383 l375 -383 ZM414 159 l238 238 l-238 232 l-224 -232 l224 -238 ZM608 396 l-191 -191 l-183 191 l183 185 l191 -185 Z"></path>
          </symbol>
          <symbol id="g" viewBox="0 -212 1024 1024">
            <path d="M432 -58 l-196 196 l-228 235 l424 439 l438 -439 l-438 -431 ZM820 379 l-179 177 l-176 -181 l166 -181 l189 185 ZM428 762 l-172 -178 l179 -188 l180 188 l-187 178 ZM61 373 l176 -189 l180 192 l-183 185 l-173 -188 ZM269 155 l163 -164 l180 180 l-164 173 l-179 -189 Z"></path>
          </symbol>
          <symbol id="eight" viewBox="0 -212 1024 1024">
            <path d="M421 812 l421 -422 l-421 -420 l-421 420 l421 422 ZM797 390 l-376 369 l-378 -369 l378 -377 l376 377 ZM412 145 q52 0 78 9 q36 17 52 52 q18 27 18 61 q0 27 -8 53 q-18 36 -44 44 q34 18 52 36 q15 14 26 34 q10 27 10 62 q0 52 -36 87 q-44 52 -114 52 l-139 0 l0 -235 l-113 0 l0 -44 l113 0 l0 -211 l105 0 ZM350 197 l0 150 l35 0 q53 0 74 -13 q24 -11 37 -25 q20 -19 20 -42 q0 -34 -33 -56 q-19 -14 -71 -14 l-62 0 ZM350 583 l71 0 q52 0 69 -10 q30 -12 46 -34 q16 -19 16 -43 q0 -43 -18 -62 q-18 -26 -61 -34 l-123 0 l0 183 Z"></path>
          </symbol>
          <symbol id="yuyy">
            <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
          </symbol>
        </defs>
      </svg>
      <div id="page-wrapper" class="container-fluid" style="padding:5px;">
        <div class="ibox height-auto">
          <div class="test-add-model">
            <ul class="clearfix">
              <li>助听设备：</li>
              <li><span>左：</span>
                <el-input @focus ="_check_product($event,'left')" readonly="readonly" v-model="eq_left.string" placeholder="请选择助听设备！"></el-input>
              </li>
              <li><span>右：</span>
                <el-input @focus ="_check_product($event,'right')" readonly="readonly" v-model="eq_right.string" placeholder="请选择助听设备！"></el-input>
              </li>
              <li><span>测试方法：</span>
                  <el-input @focus ="_checked($event,5)" readonly="readonly" v-model="testModel" placeholder="请选择测试方法！"></el-input>
              </li>
              <li><span>测试音：</span>
                <el-input @focus ="_checked($event,6)" readonly="readonly" v-model="tone" placeholder="请选择测试音！"></el-input>
              </li>
            </ul>
          </div>
          <!-- 听力图部分 -->
          <div class="ibox-content" style=" height:calc(100% - 70px) " id="ibox">
             <!--听力图-->
             <div class="row clearfix" style="height:75%;" id="row">
                 <!--右耳听力图-->
                 <div class="l-ear fl" id="123">
                  <p style="text-align:center;color:red;height:25px;">右耳</p>
                  <div style=" height:calc(100% - 25px)">
                    <div id="youer1" v-on:click="_bigCanv('you')"></div>
                  </div>
                 </div>
                 <!--功能按钮-->
                <div class=" c-btn fl ">
                    <div style="text-align:center">
                      <ul class=" btn-group-vertical btn-group-lg " role="group">
                        <li class="ibox-title-row">
                          <i :class="[{arrowsActive:showNew},'el-icon-caret-bottom','arrows']"></i>
                          <div  v-if="!showNew" @click="addImg"> 无背景图</div>
                          <div  v-if="showNew" @click="removeImg"> 言语香蕉图</div> 
                        </li>
                        <li>
                          <button type="button" class="" title="复制到另一侧耳朵" id="copy" v-on:click="copy"><i class="fa fa-exchange" style="font-size:20px;"></i></button>
                        </li>
                      </ul>
                    </div>
                </div>
                <!--左耳听力图-->
                <div class="r-ear fr">
                  <p style="text-align:center;color:#0000ff;height:25px;">左耳</p>
                  <div style="height:calc(100% - 25px)">
                    <div id="zuoEr1" v-on:click="_bigCanv('zuo')">
                    </div>
                   <!-- <svg id="zuo1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> -->
                    <!-- </svg> -->
                  </div>
                </div>
                <div class="clear"></div>
                <!--听力图数据表-->
                <div class="row clearfix">
                  <div class="fl clearfix">
                    <table class="table tl-data-table tl-r fl">
                      <thead>
                        <tr>
                          <th v-for="val in tableheader">{{val}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="qidao-table change" v-show="qidaoP">
                         <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="gudao-table change"  v-show="gudaoP">
                          <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="shushiyu-table change" v-show="shushiyuP">
                          <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="bushiyu-table change" v-show="bushiyuP">
                          <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="shengchang-table change" v-show="shengchangP">
                          <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="tingyu-table change" v-show="tingyuP">
                          <td v-for="(val,index) in inputArryValuer"><input type="text" @change="update('you',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                      </tbody>
                    </table>
                    <ul class="fl">
                      <li>：听力值</li>
                      <!-- <li>：掩蔽值</li> -->
                    </ul>
                  </div>
                  
                  <div class="fr clearfix">
                    <ul class="fl">
                      <li>听力值：</li>
                      <!-- <li>掩蔽值：</li> -->
                    </ul>
                    <table class="table tl-data-table tl-l fl">
                      <thead>
                        <tr>
                          <th v-for="val in tableheader">{{val}}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="qidao-table change" v-show="qidaoP">
                          <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="gudao-table change"  v-show="gudaoP">
                         <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="shushiyu-table change" v-show="shushiyuP">
                         <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="bushiyu-table change" v-show="bushiyuP">
                         <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="shengchang-table change"  v-show="shengchangP">
                          <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                        <tr class="tingyu-table change" v-show="tingyuP">
                          <td v-for="(val,index) in inputArryValuel"><input type="text" @change="update('zuo',val.key,$event.target.value)" v-bind:value="val.msg"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!--听力图数据表结束-->
             </div>
             <!--听力图结束-->
             <!-- 听力检测结果 -->
             <div class="row clearfix ">
                <div class="row-info fl">
                  <ul class="dl-horizontal dl-80">
                    <li>
                      <label for="machine">测听设备：</label>
                      <input id="machine" type="text" style="height:22px; padding:0 5px;" v-model="shebei">
                    </li>
                    <li style="margin-top:10px;" class="degree">
                      <label>配合度&nbsp;&nbsp;&nbsp;：</label>
                      <el-input @focus ="_checked($event,7)" readonly="readonly" v-model="degree" placeholder="请选择配合度！"></el-input>
                    </li>
                    <li style="margin-top:10px;">
                      <span>测听日期：</span>
                      <el-date-picker 
                          v-model="updatetime"
                          type="date"
                          format="yyyy-MM-dd"
                          placeholder="选择日期"
                          @change="change"
                          :picker-options="pickerOptions0"
                        >
                      </el-date-picker>
                    </li>
                  </ul>
                </div>
                <div class="row-marks fl">
                  <textarea id="remarks" class="form-control" rows='4' placeholder="备注：" v-model.trim="beizhu">        
                  </textarea>
                </div>
                <div class="fl">
                  <table class="table tl-data-table tab-border-none text-center" style="width:320px; margin:0 auto;">
                    <thead>
                      <tr>
                        <th></th>
                        <th>AC</th>
                        <th>BC</th>
                        <th>助听听阈</th>
                        <th>助听效果</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>左耳3频率</td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="ACL"></td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="BCL"></td>
                        <td><input readonly="readonly"  type="text" style="width:30px;  color:#F00" v-bind:value="LHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,9)" readonly="readonly" v-model="LEffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                      <tr>
                        <td>右耳3频率</td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="ACR"></td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="BCR"></td>
                        <td><input readonly="readonly" type="text" style="width:30px;  color:#F00" v-bind:value="RHTL"></td>
                        <td>
                          <el-input @focus ="_checked($event,8)" readonly="readonly" v-model="REffect" placeholder="请选择助听效果！"></el-input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 多选按钮组结束 -->
                <div v-if="add">
                  <el-button id="save" class="fr" type="success" @click.native="_tosave('add')">保存录入</el-button>
                </div>
                <div v-else>
                  <el-button id="save" class="fr" type="success" @click.native="_tosave('edit')">保存编辑</el-button>
                </div>
             </div>
          </div>
        </div>
      </div>
      <div class="big-btn" v-if="showBigSvg">
        <ul>
          <li v-if="bigleft" style="color:#0000ff;text-align:center;font-size:16px;font-weight:600;">
            左耳录入
          </li>
          <li v-if="!bigleft" style="color:red;text-align:center;font-size:16px;font-weight:600;">
            右耳录入
          </li>
        </ul>
        <el-radio-group v-model="active" fill="#60b45d" text-color="#fff">
          <el-radio-button  id="qidao" @click.native ="qidaoC" label="气导">
            <i id="qidao-L" class="testicon testicon-AC-L font-color-blue" ></i>气导<i  id="qidao-R" class="testicon testicon-AC-R font-color-red" ></i>
          </el-radio-button>
          <el-radio-button id="gudao" @click.native="gudaoC" label="骨导">
            <i id="gudao-L" class="testicon testicon-BC-L font-color-blue"></i>骨导<i id="gudao-R" class="testicon testicon-BC-R font-color-red"></i>
          </el-radio-button>
          <el-radio-button  id="shushiyu" @click.native="shushiyuC" label="舒适阈">
            <i id="shushiyu-L" class="testicon testicon-MCL font-color-blue"></i>舒适阈<i id="shushiyu-R" class="testicon testicon-MCL font-color-red"></i>
          </el-radio-button>
          <el-radio-button  id="bushiyu" @click.native="bushiyuC" label="不舒适阈">
            <i id="bushiyu-L" class="testicon testicon-UCL font-color-blue"></i>不舒适阈<i id="bushiyu-R" class="testicon testicon-UCL font-color-red"></i>
          </el-radio-button>
          <!-- <el-radio-button  id="shengchang" @click.native="shengchangC" label="声场">
            <i  id="shengchang-L" class="testicon testicon-SF font-color-blue"></i>声场<i id="shengchang-R" class="testicon testicon-SF font-color-red"></i>
          </el-radio-button> -->
          <el-radio-button  id="tingyu" @click.native="tingyuC" label="助听听阈">
            <i id="tingyu-L" class="testicon testicon-FF-L font-color-blue"></i>助听听阈<i id="tingyu-R" class="testicon testicon-FF-R font-color-red"></i>
          </el-radio-button>
        </el-radio-group>
        <ul class="clearfix" >
          <li>
            <el-button :plain="true" v-on:click="yan" type="info">加&nbsp;&nbsp;掩&nbsp;&nbsp;蔽</el-button>
          </li>
          <li>
            <el-button :plain="true" v-on:click="wu" type="info">无&nbsp;&nbsp;响&nbsp;&nbsp;应</el-button>
          </li>
          <li v-if="bigleft" style="margin-top:30px;">
            <el-button  v-on:click="_clearBigCanv('zuo')" type="danger">关闭录入</el-button>
          </li>
          <li v-if="!bigleft">
            <el-button  v-on:click="_clearBigCanv('you')" type="danger">关闭录入</el-button>
          </li>
        </ul>
      </div>
      <!-- 选择助听设备 -->
      <ele-product ref="product" @productData = "productData" :initProductData="initProductData"></ele-product>
      <!-- 选择项 -->
      <ele-optionmenu ref="optionmenu" :isAllPrint="false" @toggleNum = "toggle_num" @testType="_hadCheckData" :htmlValue="hasInputValue" :curtStatus="check_value"></ele-optionmenu>
    </div>
    
</template>

<script>
var addData = []
var objZong;
// 听力图 图标对照
var fontarray = {'SFRN': 'a','SFLN': 'a', 'SFR': 'b', 'SFL': 'b', 'SFLM': 'c', 'SFRM': 'd', 'UCLLN': 'e', 'UCLRN': 'e', 'UCLL': 'f', 'UCLR': 'f', 'FFL': 'g', 'FFR': 'h', 'FFS': '8', 'FFLN': ',', 'FFRN': '9', 'FFSN': '.', 'MCLLN': 'i','MCLRN': 'i', 'MCLL': 'j', 'MCLR': 'j', 'BCLMC': 'k', 'BCLMN': 'l', 'BCLM': 'm', 'BCLC': 'n', 'BCLN': 'o', 'BCL': 'p', 'BCRMC': 'q', 'BCRMN': 'r', 'BCRM': 's', 'BCRC': 't', 'BCRN': 'u', 'BCR': 'v', 'ACLMC': 'w', 'ACLMN': 'x', 'ACLM': 'y', 'ACLC': 'z', 'ACLN': '4', 'ACL': '5', 'ACRMC': '6', 'ACRMN': '7', 'ACRM': '0', 'ACRC': '1', 'ACRN': '2', 'ACR': '3','FFLM': 'g', 'FFRM': 'h'}
var arrayY = ['-10', ' 0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120']
// var arrayXxia = ['750', '1500', '3000', '6000']
var arrayX = ['125', '250', '500', '1k', '2k', '4k', '8k', '16k']
var arrayXxia = ['750', '1.5k', '3k', '5k', '6k', '9k']
var arrayX2 = ['125', '250', '500', '1000', '2000', '4000', '8000', '16000']
var arrayXxia2 = ['750', '1500', '3000', '5000', '6000', '9000']
// x轴上显示坐标x值
var arrayXcoordinate = []
// y轴上显示坐标y值
var arrayYcoordinate = []
// 下方x轴上显示坐标x值
var arrayXxiaCoordinate = []

var tip = 5 // y轴可画线间距
var arrayYline = function (tip) {
  var data = []
  for (var i = -10; i <= 120;) {
    data.push(i)
    i = i + tip
  }
  return data
}
// y轴上所有的坐标听力值
var arrayYline1 = arrayYline(tip)
// y轴上所有的坐标值的像素值
var arrayYline2 = []
// 画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
var arrayyuan = []
// 左耳画圆时的所有坐标点所对应的x轴上和y轴上的数组的对应键值和类型
var arrayyuanzuo = []
// 画布上鼠标坐标
var mycanvasx
var mycanvasy
// 坐标轴上坐标点之间的相差像素
var xcha
var ycha
// 插入svg 需要引用的
var ming = 'http://www.w3.org/2000/svg'
var XLINK_NS = 'http://www.w3.org/1999/xlink'
var ATTR_MAP = {
  'className': 'class',
  'svgHref': 'href'
}
var NS_MAP = {
  'svgHref': XLINK_NS
}
// 添加svg标签
var svgYou
var svgZuo
// svg下字体标签
var svgText
// svg下画线标签
var svgLine
// svg下 g标签鼠标移动 下加重线
var gMove
// svg下 g标签画听力图
var gTu
// 是否已经有言语图
var addImgIf = false
// 是否能画图的标记
var qidao = false
var gudao = false
var shushiyu = false
var bushiyu = false
var shengchang = false
var tingyu = true
//
var wufanying = false
var yanbi = false
var buke = false
// 听力节点类型
var dataType2
// 记录font的标记
var fontSign = 'FF'
var fontMask
// input 标记
// var inputSign = 'q'


var gshi;//g标签
var arrayyuanshi = [];//右耳的原始数据
var arrayyuanshizuo = [];//左耳的原始数据
var arrayyuanshiGai = [];//右耳修改过的原始数据
var arrayyuanshizuoGai = [];//左耳修改过的原始数据
function leftClick(e,vueD,svgZuo,argument) {//点击听力图的函数
  // debugger
  fontMask = fontSign + argument.average;
  if(e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  // x轴是否对准
  var xmi = false
  // y轴是否对准
  var ymi = false
  // 左右差值
  var cha = ycha / argument.accuracy;
  // 在x轴的数值数组中对应的键
  var indexx
  // 在y轴的数值数组中对应的键
  var indexy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      indexx = i
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      indexx = k + 20
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      indexy = j
      break
    }
  };
  if (xmi === true && ymi === true) {
    dataType2 = 1
    if (yanbi) {
      if (qidao || gudao) {
        dataType2 = 0
      }
      yanbi = false
    };
    if (wufanying) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'wu'
      // }
      wufanying = false
    };
    if (buke) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'bu'
      // }
      buke = false
    };
    // 检查X轴点是否存在和此点坐标是否已经存在
    vueD.chcekX(indexx, indexy,arrayyuanzuo, dataType2);
    if(!(argument.zhu)){vueD.tableText(arrayyuanzuo, argument.tableText)};
    vueD.yuan(svgZuo,arrayyuanzuo, argument.color, fontMask);
    vueD.average(argument.average,arrayyuanzuo);
  }
};
function leftMove(e,vueD,svgZuo,argument,coord) {//鼠标移动时的函数
  // console.log(e)
  // debugger
  if(e.type == "touchmove"  || e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  // debugger
  svgZuo.appendChild(gMove)
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  var xmi = false
  var ymi = false
  var cha = ycha / argument.accuracy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      break
    }
  };
  if (xmi === true && ymi === true) {
    vueD.liang(svgZuo,mycanvasx, mycanvasy, argument.color,coord,svgZuo)
  } else {
    vueD.clearG(svgZuo, gMove)
  }
};
function rightClick(e,vueD,svgZuo,argument) {//点击听力图的函数
  // console.log(argument)
  if(e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  fontMask = fontSign + argument.average
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  // x轴是否对准
  var xmi = false
  // y轴是否对准
  var ymi = false
  // 左右差值
  var cha = ycha / argument.accuracy
  // 在x轴的数值数组中对应的键
  var indexx
  // 在y轴的数值数组中对应的键
  var indexy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      indexx = i
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      indexx = k + 20
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      indexy = j
      break
    }
  };
  if (xmi === true && ymi === true) {
    dataType2 = 1
    if (yanbi) {
      // if (qidao || gudao) {
        dataType2 = 0
      // }
      yanbi = false
    };
    if (wufanying) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'wu'
      // }
      wufanying = false
    };
    if (buke) {
      // if (qidao || gudao || tingyu) {
        dataType2 = 'bu'
      // }
      buke = false
    };
    // 检查X轴点是否存在和此点坐标是否已经存在
    vueD.chcekX(indexx, indexy,arrayyuan, dataType2)
    if(!(argument.zhu)){vueD.tableText(arrayyuan, argument.tableText)}
    vueD.yuan(svgZuo,arrayyuan, argument.color, fontMask)
    vueD.average(argument.average,arrayyuan)
  }
};
function rightMove(e,vueD,svgZuo,argument,coord) {//鼠标移动时的函数
  svgZuo.appendChild(gMove)

  if(e.type == "touchmove" || e.type == "touchstart"){
    var currentE = e.touches[0]
  }else{
    var currentE = e
  }
  mycanvasx = vueD.getCanvasPos(svgZuo, currentE).x
  mycanvasy = vueD.getCanvasPos(svgZuo, currentE).y
  var xmi = false
  var ymi = false
  // debugger
  var cha = ycha / argument.accuracy
  for (var i = 0; i < arrayXcoordinate.length; i++) {
    if (Math.abs(mycanvasx - arrayXcoordinate[i]) <= cha) {
      mycanvasx = arrayXcoordinate[i]
      xmi = true
      break
    }
  };
  for (var k = 0; k < arrayXxiaCoordinate.length; k++) {
    if (Math.abs(mycanvasx - arrayXxiaCoordinate[k]) <= cha) {
      mycanvasx = arrayXxiaCoordinate[k]
      xmi = true
      break
    }
  };
  for (var j = 0; j < arrayYline2.length; j++) {
    if (Math.abs(mycanvasy - arrayYline2[j]) <= cha) {
      mycanvasy = arrayYline2[j]
      ymi = true
      break
    }
  };
  if (xmi === true && ymi === true) {
    vueD.liang(svgZuo,mycanvasx, mycanvasy, argument.color,coord,svgZuo)
  } else {
    vueD.clearG(svgZuo, gMove)
  }
}
import {mapState} from'vuex'
import Product from '../../commonvue/product.vue'
import optionMenu from '../../commonvue/option-menu.vue'
export default{
  name: 'add',
  components: {
    'ele-product':Product,
    'ele-optionmenu':optionMenu
  },
  data () {
    return {
      isNowPage: true,
      showAdd: false,
      qidaoP: qidao,
      gudaoP: gudao,
      shushiyuP: shushiyu,
      bushiyuP: bushiyu,
      shengchangP: shengchang,
      tingyuP: tingyu,
      showNew:true,
      active:'助听听阈',
      updatetime:'',
      inputArryValuel:[
        {key:0,msg:null},
        {key:1,msg:null},
        {key:2,msg:null},
        {key:20,msg:null},
        {key:3,msg:null},
        {key:21,msg:null},
        {key:4,msg:null},
        {key:22,msg:null},
        {key:5,msg:null},
        {key:23,msg:null},
        {key:24,msg:null},
        {key:6,msg:null},
        {key:25,msg:null},
        {key:7,msg:null}
      ],
      inputArryValuer:[
        {key:0,msg:null},
        {key:1,msg:null},
        {key:2,msg:null},
        {key:20,msg:null},
        {key:3,msg:null},
        {key:21,msg:null},
        {key:4,msg:null},
        {key:22,msg:null},
        {key:5,msg:null},
        {key:23,msg:null},
        {key:24,msg:null},
        {key:6,msg:null},
        {key:25,msg:null},
        {key:7,msg:null}
      ],
      inputArryValueYanl:[
        {key:0,msg:null,disable:true},
        {key:1,msg:null,disable:true},
        {key:2,msg:null,disable:true},
        {key:20,msg:null,disable:true},
        {key:3,msg:null,disable:true},
        {key:21,msg:null,disable:true},
        {key:4,msg:null,disable:true},
        {key:22,msg:null,disable:true},
        {key:5,msg:null,disable:true},
        {key:23,msg:null,disable:true},
        {key:24,msg:null,disable:true},
        {key:6,msg:null,disable:true},
        {key:25,msg:null,disable:true},
        {key:7,msg:null,disable:true}
      ],
      inputArryValueYanr:[
        {key:0,msg:null,disable:true},
        {key:1,msg:null,disable:true},
        {key:2,msg:null,disable:true},
        {key:20,msg:null,disable:true},
        {key:3,msg:null,disable:true},
        {key:21,msg:null,disable:true},
        {key:4,msg:null,disable:true},
        {key:22,msg:null,disable:true},
        {key:5,msg:null,disable:true},
        {key:23,msg:null,disable:true},
        {key:24,msg:null,disable:true},
        {key:6,msg:null,disable:true},
        {key:25,msg:null,disable:true},
        {key:7,msg:null,disable:true}
      ],
      tableheader:['125','250','500','750','1k','1.5k','2k','3k','4k','5k','6k','8k','9k','16k'],
      BCL: '',
      ACL:'',
      ACR:'',
      LHTL: '',
      BCR: '',
      RHTL: '',
      beizhu:'',
      shebei:'',
      REffect:'',
      LEffect:'',
      degree:'',
      testModel:'',
      tone:'',
      eq_left:{'string':'','array':[]},
      eq_right:{'string':'','array':[]},
      argument:{//左边听力图的参数
        'color':'#0000FF',
        'average':'L',
        'tableText' :'l',
        'clearTu':'zuo1',
        'accuracy':4
      },
      argumentR :{//右边听力图的参数
        'color':'#FF0000',
        'average':'R',
        'tableText' :'r',
        'clearTu':'you1',
        'accuracy':4
      },
      bigleft:false,
      showBigSvg:false,
      add:true,
      // 时间选择
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7 + 24*60*60*1000;
        }
      },
      markFontSize:{size:14,top:5},
      // 听力图底线坐标起点，终点坐标位置
      coord:{
        leftTopX:25,
        rightTopX:15,
        leftBottomX:25,
        rightBottomX:15,
        leftTopY:15,
        rightTopY:15,
        leftBottomY:5,
        rightBottomY:5,
        dashLineCoord:10,
        textCoord:0,
        xDis:30,
        yDis:40,
        xDisCha:35,
      },
      // 听力线的线宽
      tinglixianWidth:1,
      initProductData: {},
      // 下拉菜单选项
      check_value:0,
      focusNum:0,
      hasInputValue:'',
    }
  },
  created () {
    
  },
  props:{
      objZong:null,
      id:null
  },
  computed:{// 获取产品列表
    ...mapState(['canvasMarks','product']),
  },
  mounted () {
    var myDate = new Date()
    this.updatetime = myDate.toLocaleDateString();//获取当前日期
    //创建zuo耳
    var vueD = this
    gMove = this.createTag('g', {})
    this._creatElementyuo();//创建右耳
    this._creatElement();//创建左耳图
    // 创建香蕉图
    this.addImg();
  },
  methods: {
    _checked(e,num){
      this.hasInputValue = typeof(e.target.value) ==='string' ? e.target.value.toString() : (e.target.innerText ? e.target.innerText : '');
      this.check_value = num;
      this.focusNum = num;
      this.$refs.optionmenu.dialogToggleVisible = true;
    },
    _hadCheckData(e){
      // console.log(e)
      if(this.focusNum === 5){
        this.testModel = e.name;
      }else if(this.focusNum === 6){
        this.tone = e.name;
      }else if(this.focusNum === 7){
        this.degree = e.name;
      }else if(this.focusNum === 8){
        this.REffect = e.name;
      }else if(this.focusNum === 9){
        this.LEffect = e.name;
      }
    },
    toggle_num(e){
      this.check_value = e;
      // console.log(e)
    },
    // 获取设备的名称
    productData(e){
      const arr = e.map((item) =>{
        return item.value;
      });
      const string = e.map((item) =>{
        return item.label
      }).toString().replace(/,/g,' / ');
      if(this.earSide === 'left'){
        this.eq_left.string = string;
        this.eq_left.array = arr;
      }else if(this.earSide === 'right'){
        this.eq_right.string = string;
        this.eq_right.array = arr;
      }
    },
    // 选择设备
    _check_product(e,str){
      let string = "",arr = [];
      if(str === 'left'){
        string = this.eq_left.string;
        arr = this.eq_left.array;
      }else if(str === 'right'){
        string = this.eq_right.string;
        arr = this.eq_right.array;
      }
      this.initProductData = {
        'string':string,
        'array':arr
      };
      this.earSide = str;
      this.$refs.product.dialogProductVisible = true;
    },
    _befroeClose(){// 关闭前的回调
      //所有数据清空
      this.active = "助听听阈";
      this.BCL= '';
      this.ACL= '';
      this.ACR= '';
      this.LHTL= '';
      this.BCR= '';
      this.RHTL= '';
      this.beizhu= '';
      this.shebei= '';
      this.REffect= '';
      this.LEffect= '';
      this.degree= '';
      this.tone = '';
      this.testModel = '';
      this.initProductData = {};
      this.eq_left = {'string':'','array':[]};
      this.eq_right = {'string':'','array':[]};
      this.updatetime = (new Date()).toLocaleDateString();
      addData = [];
      arrayyuan = [];
      arrayyuanzuo = [];
      this.add = true;
      this._clearBigCanv('zuo');
      this._clearBigCanv('you');
      this.clearText('l');
      this.clearText('r');
    },
    _creatElement(){
      this.markFontSize = {size:14,top:5};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      var ming = 'http://www.w3.org/2000/svg'
      svgZuo = this.createTag('svg',{'xmlns': ming});
       document.getElementById('zuoEr1').appendChild(svgZuo)
      document.getElementById('zuoEr1').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
      svgZuo.id = 'zuo1'
      svgZuo.style = 'cursor:crosshair'
      svgZuo.style.width = document.getElementById('zuoEr1').clientWidth;
      svgZuo.style.height = document.getElementById('zuoEr1').clientHeight;
      this.tu(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height, '#0000FF',this.coord)
      this.xian(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height,this.coord)
      var vueD = this;
      // svgZuo.addEventListener("click",function(e){ leftClick(e,vueD,svgZuo,vueD.argument)},false);
      // svgZuo.addEventListener("mousemove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,vueD.coord)},false);
      // svgZuo.addEventListener("touchmove",function(e){leftMove(e,vueD,svgZuo,vueD.argument)},false);
    },
    _creatElementyuo(){
      this.markFontSize = {size:14,top:5};
      // 设置听力线线宽
      this.tinglixianWidth = 1;
      var ming = 'http://www.w3.org/2000/svg'
      svgYou = this.createTag('svg',{'xmlns': ming});
      document.getElementById('youer1').appendChild(svgYou)
      document.getElementById('youer1').style = 'border:1px solid #eee; height:100%; background-size:100% 100%; position: relative'
      svgYou.id = 'you1'
      svgYou.style = 'cursor:crosshair'
      svgYou.style.width = document.getElementById('youer1').clientWidth;
      svgYou.style.height = document.getElementById('youer1').clientHeight;
      this.tu(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height, '#FF0000',this.coord)
      this.xian(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height,this.coord)
      var vueD = this;
      // svgYou.addEventListener("click",function(e){ rightClick(e,vueD,svgYou,vueD.argumentR)},false);
      // svgYou.addEventListener("mousemove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,vueD.coord)},false);
      // svgYou.addEventListener("touchmove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR)},false);
    },
    _clearBigCanv(zy){
      this.showBigSvg = false;
      let parent = jq("#add");
      let canvs = jq('.bigCanvas')[0];

      if(zy == "zuo"){
        let zuo1 = jq("#zuo1");
        let zuoEr1 = jq("#zuoEr1");
        zuoEr1.removeChild(zuo1);//清除原图，重新左绘制
        this._creatElement();
        // 判断是否已经开启背景图
        if(this.showNew === true){
          // 先清除右耳背景图
          svgYou.removeChild(document.getElementById('pol'));
          this.addImg();
        }
      }else{
        let you1 = jq("#you1");
        let youer1 = jq("#youer1");
        youer1.removeChild(you1);//清除原图，重新右绘制
        this._creatElementyuo();
        // 判断是否已经开启背景图
        if(this.showNew === true){
          // 先清除左图的背景图
          svgZuo.removeChild(document.getElementById('pol2'));
          this.addImg();
        }
      }
      if(canvs){//如果创建了，则清除
        parent.removeChild(canvs);//清除大图
      }
      // 绘制数据
      this._saveShowData();//保存数据
      this._bigdrawyuan()//读取数据
      // this.drawyuan();
    },
    _bigCanv(zy){//放大canvas
      //标记字体的大小
      this.markFontSize = {size:24,top:10};
      // 设置听力线线宽
      this.tinglixianWidth = 2;
      let parent = jq("#add");
      this.showBigSvg = true;
      // let zuoEr1 = jq('#zuoEr1')
       var ming = 'http://www.w3.org/2000/svg'
      let div = document.createElement('div');
      let svgNew = this.createTag('svg',{'xmlns': ming});
      div.className = "bigCanvas";
      div.id = "bigCanvas" +zy;
      svgNew.style='cursor: crosshair;';
      svgNew.id='big'+zy;
      svgNew.style.width="1200px";
      svgNew.style.height="680px";
      parent.appendChild(div);
      div.appendChild(svgNew)
      let coord = {
        leftTopX:50,
        rightTopX:15,
        leftBottomX:50,
        rightBottomX:15,
        leftTopY:30,
        rightTopY:30,
        leftBottomY:5,
        rightBottomY:5,
        dashLineCoord:22,
        textCoord:50,
        xDis:60,
        yDis:70,
        xDisCha:65,
      };
      if(zy === "zuo"){this.tu(svgNew, 1200, 680, '#0000FF',coord,16);}else{
        this.tu(svgNew, 1200, 680, '#FF0000',coord,16);
      }
      
      this.xian(svgNew, 1200, 680,coord);
      let vueD = this,
          beijing = null;//左右耳背景图
      if(zy === "zuo"){
        this.bigleft = true;
        // svgNew.addEventListener("touchstart",function(e){ leftClick(e,vueD,svgZuo,vueD.argument)},false);
        svgNew.addEventListener("click",function(e){ leftClick(e,vueD,svgZuo,vueD.argument)},false);
        // svgNew.addEventListener("mousemove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        // svgNew.addEventListener("touchmove",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        // svgNew.addEventListener("touchstart",function(e){leftMove(e,vueD,svgZuo,vueD.argument,coord)},false);
        svgZuo = svgNew;
        beijing = 'rightBig';
      }else{
        this.bigleft = false;
        // svgNew.addEventListener("touchstart",function(e){ rightClick(e,vueD,svgYou,vueD.argumentR)},false);
        svgNew.addEventListener("click",function(e){ rightClick(e,vueD,svgYou,vueD.argumentR)},false);
        // svgNew.addEventListener("mousemove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        // svgNew.addEventListener("touchmove",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        // svgNew.addEventListener("touchstart",function(e){rightMove(e,vueD,svgYou,vueD.argumentR,coord)},false);
        svgYou = svgNew;
        beijing = 'leftBig';
      }
      if(this.showNew === true){
        this.addImg(beijing);
      }
      this._saveShowData();
      // this.drawyuan();
      this._bigdrawyuan();//读取数据
      gMove = this.createTag('g', {})
    },
    change:function(e){
      this.updatetime = e;
    },
    // 创建svg标签以及子标签
    createTag: function (tag, attributes) {
      var elem = document.createElementNS(ming, tag)
      for (var attribute in attributes) {
        var name = (attribute in ATTR_MAP ? ATTR_MAP[attribute] : attribute)
        var value = attributes[attribute]
        if (attribute in NS_MAP) {
          elem.setAttributeNS(NS_MAP[attribute], name, value)
        } else {
          elem.setAttribute(name, value)
        }
      }
      return elem
    },
    // 清空svg标签下gmove标签的所有内容
    clearG: function (svg, g) {
      while (g.hasChildNodes()) {
        g.removeChild(g.childNodes[0])
      }
      svg.removeChild(g)
    },
    // 清空svg 下gTu标签
    clearTu: function (uid) {
      // debugger
      // console.log('clear::' + document.getElementById(uid + 'tu'))
      if (document.getElementById(uid + 'tu')) {
        var gtu = document.getElementById(uid + 'tu')
        while (gtu.hasChildNodes()) {
          gtu.removeChild(gtu.childNodes[0])
        }
        document.getElementById(uid).removeChild(gtu)
      }
      // console.log(document.getElementById(uid + 'tu'))
    },
    // 添加言语图
    addImg: function (flag) {
      this.showNew = true;
      if(flag !== "rightBig"){
        var svgPol = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
        svgPol.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
        svgPol.id = 'pol'
        svgYou.appendChild(svgPol)
      }
      if(flag !== "leftBig"){
        var svgPol2 = this.createTag('polygon', {'style': 'fill:#cccccc;stroke-width:1;opacity:0.5'})
        svgPol2.setAttribute('points', arrayXcoordinate[1] + ',' + arrayYline2[4] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[6] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[6] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[4] + ' ' + arrayXxiaCoordinate[3] + ',' + arrayYline2[10] + ' ' + (arrayXxiaCoordinate[2] + xcha / 4) + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[2] + ',' + arrayYline2[12] + ' ' + arrayXcoordinate[1] + ',' + arrayYline2[10])
        svgPol2.id = 'pol2'
        svgZuo.appendChild(svgPol2);
      }
    },
    removeImg: function () {
      this.showNew = false
      svgYou.removeChild(document.getElementById('pol'))
      svgZuo.removeChild(document.getElementById('pol2'))
    },
    qidaoC: function (evt) {
      // console.log('1')
      this.saveArray()
      this.allFalse()
      qidao = true
      this.qidaoP = qidao
      fontSign = 'AC'
      this.drawyuan()
    },
    gudaoC: function (evt) {
      // console.log('2')
      this.saveArray()
      this.allFalse()
      gudao = true
      this.gudaoP = gudao
      fontSign = 'BC'
      this.drawyuan()
    },
    shushiyuC: function (evt) {
      // console.log('3')
      this.saveArray()
      this.allFalse()
      shushiyu = true
      this.shushiyuP = shushiyu
      fontSign = 'MCL'
      this.drawyuan()
    },
    bushiyuC: function (evt) {
      // console.log('4')
      this.saveArray()
      this.allFalse()
      bushiyu = true
      this.bushiyuP = bushiyu
      fontSign = 'UCL'
      this.drawyuan()
    },
    shengchangC: function (evt) {
      // console.log('5')
      this.saveArray()
      this.allFalse()
      shengchang = true
      this.shengchangP = shengchang
      fontSign = 'SF'
      this.drawyuan()
    },
    tingyuC: function (evt) {
      // console.log('6')
      this.saveArray()
      this.allFalse()
      tingyu = true;
      this.tingyuP = tingyu
      fontSign = 'FF'
      this.drawyuan()
    },
    // 清空所有
    allFalse: function () {
      qidao = false
      gudao = false
      shushiyu = false
      bushiyu = false
      shengchang = false
      tingyu = false
      this.qidaoP = qidao
      this.gudaoP = gudao
      this.shushiyuP = shushiyu
      this.bushiyuP = bushiyu
      this.shengchangP = shengchang
      this.tingyuP = tingyu
      this.clearText('r')
      this.clearText('l')
    },
    // 添加掩蔽
    yan: function () {
      yanbi = true
      wufanying = false
      buke = false
      return;
    },
    // 添加无响应
    wu: function () {
      yanbi = false
      wufanying = true
      buke = false
    },
    // 添加不可测量
    bu: function () {
      yanbi = false
      wufanying = false
      buke = true
    },
    // 复制到另一侧耳朵
    copy: function () {
      if (arrayyuan.length > arrayyuanzuo.length) {
        fontMask = fontSign + 'L'
        arrayyuanzuo = []
        arrayyuanzuo = arrayyuan.concat()
        this.clearText('l')
        this.tableText(arrayyuanzuo, 'l')
        // this.clearTu('zuo1')
        this.yuan(svgZuo, arrayyuanzuo, '#0000FF', fontMask)
        this.average('L', arrayyuanzuo)
      } else {
        fontMask = fontSign + 'R'
        arrayyuan = []
        arrayyuan = arrayyuanzuo.concat()
        this.clearText('r')
        this.tableText(arrayyuan, 'r')
        // this.clearTu('you1')
        this.yuan(svgYou, arrayyuan, '#FF0000', fontMask)
        this.average('R', arrayyuan)
      }
    },
    // 获取鼠标在canvas上的坐标
    getCanvasPos: function (svg, e) {
      // console.log(e)
      // debugger
      // 获取鼠标在canvas上的坐标
      var rect = svg.getBoundingClientRect()
      return {
        x: e.clientX - Math.round(rect.left),
        y: e.clientY - Math.round(rect.top)
      }
    },
    // 检查X轴点是否存在和此点坐标是否已经存在 为arrayyuan添加数据
    chcekX: function (x, y, arrayL, dataType) {
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] === x) {
          // 检查此点坐标是否已经存在
          if (arrayL[i][1] === y) {
            arrayL.splice(i, 1)
            arrayL.push([x, -1, dataType])
            return
          } else {
            arrayL.splice(i, 1)
            arrayL.push([x, y, dataType])
            return
          }
        }
      }
      arrayL.push([x, y, dataType])
    },
    // 保存现有的绘制的听力图数组
    saveArray: function () {
      // this.clearTu('you1')
      // this.clearTu('zuo1')
      //生成听力图数据
      this._saveShowData();
      arrayyuanzuo = [];
      arrayyuan = [];
      // console.log(arrayyuanzuo,arrayyuan);
    },
    _saveShowData(){
      // debugger
      if (qidao) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '1') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '1', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '1', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
      if (gudao) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '2') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '2', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '2', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
      if (shushiyu) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '3') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '3', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '3', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
      if (bushiyu) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '4') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '4', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '4', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
      if (shengchang) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '5') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '5', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '5', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
      if (tingyu) {
        for (let i = addData.length -1; i >= 0; i--) {
          if (addData[i].type === '6') {
            addData.splice(i, 1)
          }
        };
        if (arrayyuanzuo.length > 0) {
          addData.push({'type': '6', 'ears': '左', 'data': this.changeFormat(arrayyuanzuo)})
        }
        if (arrayyuan.length > 0) {
          addData.push({'type': '6', 'ears': '右', 'data': this.changeFormat(arrayyuan)})
        }
      };
    },
    // 将听力图数组改变成后台传输格式
    changeFormat: function (arrayL) {
      var Data = []
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] >= 20) {
          Data.push({'x': arrayXxia2[arrayL[i][0] - 20], 'y': arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        } else {
          Data.push({'x': arrayX2[arrayL[i][0]], 'y': arrayYline1[arrayL[i][1]], 'dataType': arrayL[i][2]})
        }
      }
      return Data
    },
    // 保存数据
    _tosave(ags){
      this._saveShowData();//生成听力图数据
      // 如果数据为空或者是"请选择"，则保存成"—"
      const setDate = (data)=>{
        if(data === "" || data === "请选择"){
          return "—"
        }else{
          return data
        }
      };
      let INFO_DATA = {
        "user_id":JSON.parse(sessionStorage.getItem('user_id')),
        'LHTL': setDate(this.LHTL),
        'RHTL': setDate(this.RHTL),
        'remark':this.beizhu,
        'updatetime':this.updatetime,
        'apparatus':setDate(this.shebei),
        'BCL': setDate(this.BCL),
        'ACL':setDate(this.ACL),
        'ACR':setDate(this.ACR),
        'BCR':setDate(this.BCR),
        'REffect':setDate(this.REffect),
        'LEffect':setDate(this.LEffect),
        'degree':setDate(this.degree),
        'tonetype':setDate(this.tone),
        'testmodel':this.testModel,
        'getmodel':'自由给声',
        'eq_left':setDate(this.eq_left),
        'eq_right':setDate(this.eq_right),
      }
      // return;
      let getServer = {
        "audio":{
          ...INFO_DATA
        },
        "hear":JSON.stringify(addData)
      }
      console.log(INFO_DATA)
      
      if(ags === 'add'){
        this._api(`/audiogram/add`,getServer)
      }else{
        
        let data = {
          'audio_id' :this.id[0],
          ...getServer
        };
        console.log(data)
        this._api(`/audiogram/update`,data)
      }
    },
    _api(url,data){
      let that = this;
      console.log(data)
      this.$ajax.post(url,data).then(function(response){
        console.log(response)
        if(response.code == "200"){
            msgTipsSuccess(that,'提交成功!');
            //给父组件发送指令关闭窗口，请求数据列表
            that.$emit('successSave',true);
            // that._befroeClose();//清空数据
        }else{
          msgTipsErr(that,'提交失败!');
        }
      }).catch(function(error){
          console.log(error);
          alert(error);
      })
    },
    // 读取数据
    ReadData: function (obj, arrayL) {
      arrayL = []
      for (var i = 0; i < obj.length; i++) {
        arrayL.push([this.dataX(obj[i].x), this.datay(obj[i].y), obj[i].dataType])
      }
      return arrayL
    },
    // 数据 在x轴的坐标听力值
    dataX: function (x) {
      for (var i = 0; i < arrayX2.length; i++) {
        if (arrayX2[i] === x) {
          return i
        }
      };
      for (var j = 0; j < arrayXxia2.length; j++) {
        if (arrayXxia2[j] === x) {
          return j + 20
        }
      }
    },
    // 数据 在y轴的坐标听力值
    datay: function (y) {
      for (var i = 0; i < arrayYline1.length; i++) {
        if (arrayYline1[i] === y) {
          return i
        }
      }
    },
    // 数据表填值
    tableText: function (arrayL, sing) {
      // debugger
      var inputValue =null,
          yanValue = null;
      if(sing == 'l'){
        inputValue = this.inputArryValuel;
        yanValue = this.inputArryValueYanl
      }else{
        inputValue = this.inputArryValuer;
        yanValue = this.inputArryValueYanr;
      }
      for (var j = 0; j < inputValue.length; j++) {
        for (var i = 0; i < arrayL.length; i++) {
          if(inputValue[j]['key'] == arrayL[i][0]){
            if (arrayL[i][1] === -1) {
              inputValue[j]['msg'] = null
              arrayL.splice(i, 1)
              continue
            }
            if (arrayL[i][2] === 'wu') {
              inputValue[j]['msg'] = '无响应'
            } else if (arrayL[i][2] === 'bu') {
              inputValue[j]['msg'] = '不可测量'
            } else if (arrayL[i][2] === 1) {
              inputValue[j]['msg'] = arrayYline1[(arrayL[i][1])]
              yanValue[j]['disable'] = false;//掩蔽值输入框启用
            } else {
              inputValue[j]['msg'] = arrayYline1[(arrayL[i][1])]
              yanValue[j]['disable'] = false;//掩蔽值输入框启用
            };
            break;
          }
        }
      }
    },
    // 清空数据表中的值
    clearText: function (sign) {
      var inputValue =null,
          yanValue = null;
      if(sign == 'l'){
        inputValue = this.inputArryValuel;
        yanValue = this.inputArryValueYanl
      }else{
        inputValue = this.inputArryValuer;
        yanValue = this.inputArryValueYanr;
      }
      for (var i = 0; i < inputValue.length; i++) {
        inputValue[i]['msg'] = null;
        yanValue[i]['disable'] = true;
      }
    },
    _changeSign(str,ip){//改变标记符号，掩蔽值
      var arrayL,
          color,
          mask,
          svg0,
          sing0,
          sing1;
      if (str === 'you') {
        arrayL = arrayyuan
        color = '#FF0000'
        mask = fontSign + 'R'
        svg0 = svgYou
        sing0 = 'R'
        sing1 = 'r'
      } else {
        arrayL = arrayyuanzuo
        color = '#0000FF'
        mask = fontSign + 'L'
        svg0 = svgZuo
        sing0 = 'L'
        sing1 = 'l'
      }
      for (var i = 0; i < arrayL.length; i++) {//改变听力图的样式
       if(arrayL[i][0] === ip){
        arrayL[i][2] = 0
       } 
       this.yuan(svg0, arrayL, color, mask);
      }
    },
    // 数据表中的值发生改变
    update: function (str, ip, values) {
      var arrayL
      var color
      var mask
      var svg0
      var sing0
      var sing1
      if(!( values == '无响应' || values == '不可测量' || ((-10 <= values) && (values<= 120) && (values % 5 == 0)))){
        event.target.value = null
        alert('请输入合法字符,数字只能是-10与120之间且为5的整数倍，或者是“无响应”，“不可测量”字符串！');
        return;
      }
      // 判断左右
      if (str === 'you') {
        arrayL = arrayyuan
        color = '#FF0000'
        mask = fontSign + 'R'
        svg0 = svgYou
        sing0 = 'R'
        sing1 = 'r'
      } else {
        arrayL = arrayyuanzuo
        color = '#0000FF'
        mask = fontSign + 'L'
        svg0 = svgZuo
        sing0 = 'L'
        sing1 = 'l'
      }
      for (var i in arrayL) {
        // 判断是否已经存在
        if (ip === arrayL[i][0]) {
          // 找到输入值 所有的 数组下标
          for (var j in arrayYline1) {
            if (arrayYline1[j] === parseInt(values)) {
              arrayL[i][1] = j
              if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
                arrayL[i][2] = 1
              }
            }
          }
          this.tableText(arrayL, sing1)
          this.yuan(svg0, arrayL, color, mask)
          this.average(sing0, arrayL)
          return
        }
      }
      for (var k in arrayYline1) {
        if (arrayYline1[k] === parseInt(values)) {
          arrayL.push([ip, k, 1])
          this.tableText(arrayL, sing1)
          this.yuan(svg0, arrayL, color, mask)
          this.average(sing0, arrayL)
          return
        }
      }
    },
    // 计算HTL BCL的值
    average: function (sing, arrayL) {
      let num = 0;
      let count = 0;
      let otherCount = 0;
      if(tingyu || qidao || gudao){
        // 清空当前类别的值，主要是为了防止500、1000、2000、4000
        // 的值取消后，平均值没有重新计算
        if(tingyu){
          this[sing + 'HTL'] = null;
          this[sing + 'BCL'] = null;
        }else if(qidao){
          this['AC' +sing ] = null;
          this['AC'+ sing ] = null;
        } else if(gudao){
          this['BC' +sing ] = null;
          this['BC' +sing ] = null;
        };
        for (var i = 0; i < arrayL.length; i++) {
          if(arrayL[i][0] === 2 || arrayL[i][0] === 3 || arrayL[i][0] === 4){
            otherCount += 1;
          }
          if (arrayL[i][0] === 2 || arrayL[i][0] === 3 || arrayL[i][0] === 4 || arrayL[i][0] === 5) {
            // 获得 db 值
            num += arrayYline1[(arrayL[i][1])];
            count += 1;
          }
        };
        //计算500、1000、2000、4000，的平均值
        //缺少4000 仍然可以求平无，其余3个频率再缺少任意一个值，都不能计算结果
        if(count === 4 || otherCount === 3){
          let total = 0;
          if(count === 4){
            total = 4;
          }else if(otherCount === 3){
            total = 3;
          }
          if(tingyu){//计算听阈平均值
            this[sing + 'HTL'] = parseInt(num / total);
            this[sing + 'BCL'] = parseInt(num / total);
          }else if(qidao){//计算气到平均值
            this['AC' +sing ] = parseInt(num / total);
            this['AC'+ sing ] = parseInt(num / total);
          } else if(gudao){//计算骨导平均值
            this['BC' +sing ] = parseInt(num / total);
            this['BC' +sing ] = parseInt(num / total);
          };
        }
      };
    },
    // 绘制底图
    add: function () {
      // 绘制右 底层画布
      this.tu(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height, '#FF0000',this.coord)
      this.xian(svgYou, svgYou.getBoundingClientRect().width, svgYou.getBoundingClientRect().height,this.coord)
      // 绘制左 底层画布
      this.tu(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height, '#0000FF',this.coord)
      this.xian(svgZuo, svgZuo.getBoundingClientRect().width, svgZuo.getBoundingClientRect().height,this.coord)
    },
    // 绘制听力图的x,y轴和计算数值记录
    tu: function (svg, x, y, colors,coord,fontSize) {
      let size = "10pt";
      if(fontSize){
        size = fontSize +'pt'
      }
      // debugger
      arrayXcoordinate = []
      arrayYcoordinate = []
      arrayXxiaCoordinate = []
      arrayYline2 = [];
      // 画线间隔
      // debugger
      xcha = (x - coord.xDis) / arrayX.length
      ycha = (y - coord.yDis) / arrayY.length
      for (var i = 0; i < arrayX.length; i++) {
        arrayXcoordinate.push(i * xcha + coord.xDisCha)
        svgText = this.createTag('text', {'x': i * xcha + coord.leftTopX, 'y': coord.dashLineCoord,'style':'font-size:'+size})
        svgText.textContent = arrayX[i]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
      // 添加标记
      svgText = this.createTag('text', {'x': 0, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      svgText.textContent = 'db'
      svgText.style.fill = colors
      svg.appendChild(svgText)
      svgText = this.createTag('text', {'x': arrayX.length * xcha - coord.textCoord, 'y':  coord.dashLineCoord,'style':'font-size:'+size})
      svgText.textContent = 'Hz'
      svgText.style.fill = colors
      svg.appendChild(svgText)
      for (var j = 0; j < arrayYline1.length; j++) {
        arrayYline2.push(j * ycha / 2 + coord.leftTopX)
      };
      for (var q = 0; q < arrayY.length; q++) {
        arrayYcoordinate.push(q * ycha + coord.leftTopX)
        svgText = this.createTag('text', {'x': 0, 'y': q * ycha + coord.leftTopX, 'style': 'font-size:'+size})
        svgText.textContent = arrayY[q]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      };
      // console.log(arrayYcoordinate)
      for (var k = 0; k < arrayXxia.length; k++) {
        if (arrayXxia[k] == '5k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 2] + (xcha / 4))
        } else if (arrayXxia[k] == '6k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 2] - (xcha / 2))
        } else if (arrayXxia[k] == '9k') {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 1] + (xcha / 4))
        } else {
          arrayXxiaCoordinate.push(arrayXcoordinate[k + 3] - (xcha / 2))
        }
     
        if (arrayXxia[k] == '6k') {
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k], 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        } else {
          svgText = this.createTag('text', {'x': arrayXxiaCoordinate[k] - coord.dashLineCoord, 'y': y - ycha + coord.leftTopY, 'style': 'font-size:'+size})
        }
        svgText.textContent = arrayXxia[k]
        svgText.style.fill = colors
        svg.appendChild(svgText)
      }
    },
    // 绘制听力图上的坐标线
    xian: function (svg, x, y,coord) {
      var _strokeStyle = '#000000'
      svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': x - xcha + coord.rightTopX, 'y2': coord.rightTopY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': x - xcha + coord.rightTopX, 'y1': coord.rightTopY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha -coord.rightBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': coord.leftBottomX,'y1': y - ycha -coord.leftBottomY, 'x2': x - xcha + coord.rightBottomX, 'y2': y - ycha-coord.rightBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': coord.leftTopY, 'x2': coord.leftBottomX, 'y2': y - ycha -coord.leftBottomY})
      svgLine.style.stroke = _strokeStyle
      svg.appendChild(svgLine)
      //
      _strokeStyle = '#d9d9d9'
      for (var j = 0; j < arrayY.length; j++) {
        svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': arrayYcoordinate[j], 'x2': x - xcha + coord.rightTopX, 'y2': arrayYcoordinate[j]})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var i = 0; i < arrayX.length; i++) {
        svgLine = this.createTag('line', {'x1': arrayXcoordinate[i], 'y1': coord.leftTopY, 'x2': arrayXcoordinate[i], 'y2': y - ycha -coord.leftBottomY})
        svgLine.style.stroke = _strokeStyle
        svg.appendChild(svgLine)
      };
      for (var k = 0; k < arrayXxia.length; k++) {
        this.drawDashLine(svg, arrayXxiaCoordinate[k], y - ycha -coord.leftBottomY, arrayXxiaCoordinate[k], coord.dashLineCoord)
      };
    },
    // 画虚线
    drawDashLine: function (svg, x1, y1, x2, y2, dashLength) {
      var dashLen = dashLength === undefined ? 5 : dashLength
      var xpos = x2 - x1 // 得到横向的宽度;
      var ypos = y2 - y1 // 得到纵向的高度;
      var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen)
      // 利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for (var i = 0; i < numDashes; i++) {
        if (i % 2 === 0) {
        } else {
          svgLine = this.createTag('line', {'x1': x1 + (xpos / numDashes) * (i - 1), 'y1': y1 + (ypos / numDashes) * (i - 1), 'x2': x1 + (xpos / numDashes) * i, 'y2': y1 + (ypos / numDashes) * i})
          svgLine.style.stroke = '#d9d9d9'
          svg.appendChild(svgLine)
        }
      }
    },
    // 画亮线
    liang: function (svg, x, y, colors,coord,svgYou) {
      gMove.id = 'moveline'
      // debugger
      if(jq("#moveline").hasChildNodes()){//清空所有的坐标元素
        let childs = jq("#moveline").childNodes
        for (var i = childs.length-1; i >=0 ; i--) {
         jq("#moveline").removeChild(childs[i]) 
        }
      };
        svgLine = this.createTag('line', {'x1': x, 'y1': coord.leftTopY, 'x2': x, 'y2': svgYou.getBoundingClientRect().height - ycha -coord.leftBottomY})
        svgLine.style.stroke = '#ababab'
        gMove.appendChild(svgLine)
        //
        svgLine = this.createTag('line', {'x1': coord.leftTopX, 'y1': y, 'x2': svgYou.getBoundingClientRect().width - xcha + coord.rightBottomX, 'y2': y})
        svgLine.style.stroke = '#ababab';
        gMove.appendChild(svgLine)
        // 画虚框
        svgLine = this.createTag('rect', {'x': x - 5, 'y': y - 5, 'width': 10, 'height': 10, 'fill': 'none'})
        svgLine.style.stroke = colors
        gMove.appendChild(svgLine)
        svg.appendChild(gMove)
    },
    // 放大图画圆
    _bigdrawyuan:function(){
      objZong = addData;
      let arr = []
      // debugger
      for (var v in objZong) {
        // 生成右耳图
        if (objZong[v].ears === '右') {
          if ((objZong[v].type === '1')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'ACR')
          this.average('R', arrayyuan)
          };
          if ((objZong[v].type === '2')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'BCR')
          this.average('R', arrayyuan)
          };
          if ((objZong[v].type === '3')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'MCLR')
          this.average('R', arrayyuan)
          };
          if ((objZong[v].type === '4')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'UCLR')
          this.average('R', arrayyuan)
          };
          if ((objZong[v].type === '5')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'SFR')
          this.average('R', arrayyuan)
          };
          if ((objZong[v].type === '6')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan);
          this.yuan(svgYou, arrayyuan, '#FF0000', 'FFR')
          this.average('R', arrayyuan)
          };
          
        }
        // 生成左耳图
        if (objZong[v].ears === '左') {
          if ((objZong[v].type === '1')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'ACL')
          this.average('L', arrayyuanzuo)
          };
          if ((objZong[v].type === '2')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'BCL')
          this.average('L', arrayyuanzuo)
          };
          if ((objZong[v].type === '3')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'MCLL')
          this.average('L', arrayyuanzuo)
          };
          if ((objZong[v].type === '4')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'UCLL')
          this.average('L', arrayyuanzuo)
          };
          if ((objZong[v].type === '5')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
            this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'SFL')
            this.average('L', arrayyuanzuo)
          };
          if ((objZong[v].type === '6')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo);
            this.yuan(svgZuo, arrayyuanzuo, '#0000FF', 'FFL')
            this.average('L', arrayyuanzuo)
          }
        }
      };
      // 获取当前类型的坐标点
      this.drawyuan2()
    },
    // 读取数据,用于编辑数据
    _editor_drawyuan: function () {
      // 如果数据保存的是"—"则转换成""
      const setDate = (data)=>{
        if(data === "—" ){
          return ""
        }else{
          return data
        }
      };
      try{
        const svgData = JSON.parse(JSON.stringify(this.canvasMarks));
        this.beizhu= svgData.remark;
        this.shebei= setDate(svgData.apparatus);
        this.REffect= setDate(svgData.REffect);
        this.LEffect= setDate(svgData.LEffect);
        this.degree= setDate(svgData.degree);
        this.tone = setDate(svgData.tonetype);
        this.testModel = setDate(svgData.testmodel);
        this.eq_right = svgData.eq_right;
        this.eq_left = svgData.eq_left;
        this.updatetime = svgData.updatetime;
        // 获取数据，绘制svg
        addData = svgData.data;
        this._bigdrawyuan()
      } catch(err){
        alert(err +'读取数据出错！')
      }
    },
    // 根据 是否能画图的标记 来判断画图的数据
    drawyuan2: function () {
      arrayyuanzuo = [];
      arrayyuan = [];
      objZong = addData
      // 根据数据生成表中数据
      for (var v in objZong) {
        // 生成右耳图
        if (objZong[v].ears === '右') {
          if (qidao && (objZong[v].type === '1')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (gudao && (objZong[v].type === '2')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (shushiyu && (objZong[v].type === '3')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (bushiyu && (objZong[v].type === '4')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (shengchang && (objZong[v].type === '5')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          this.tableText(arrayyuan, 'r')
        }
        // 生成左耳图
        if (objZong[v].ears === '左') {
          if (qidao && (objZong[v].type === '1')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (gudao && (objZong[v].type === '2')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (shushiyu && (objZong[v].type === '3')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (bushiyu && (objZong[v].type === '4')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (shengchang && (objZong[v].type === '5')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          }
          this.tableText(arrayyuanzuo, 'l')
        }
      };
    },
    drawyuan: function () {
      objZong = addData
      // 根据数据生成表中数据
      for (var v in objZong) {
        // 生成右耳图
        if (objZong[v].ears === '右') {
          if (qidao && (objZong[v].type === '1')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (gudao && (objZong[v].type === '2')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (shushiyu && (objZong[v].type === '3')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (bushiyu && (objZong[v].type === '4')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (shengchang && (objZong[v].type === '5')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuan = this.ReadData(objZong[v].data, arrayyuan)
          };
          this.tableText(arrayyuan, 'r')
          this.yuan(svgYou, arrayyuan, '#FF0000', fontSign + 'R')
          this.average('R', arrayyuan)
        }
        // 生成左耳图
        if (objZong[v].ears === '左') {
          if (qidao && (objZong[v].type === '1')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (gudao && (objZong[v].type === '2')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (shushiyu && (objZong[v].type === '3')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (bushiyu && (objZong[v].type === '4')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (shengchang && (objZong[v].type === '5')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          };
          if (tingyu && (objZong[v].type === '6')) {
            arrayyuanzuo = this.ReadData(objZong[v].data, arrayyuanzuo)
          }
          this.tableText(arrayyuanzuo, 'l')
          this.yuan(svgZuo, arrayyuanzuo, '#0000FF', fontSign + 'L')
          this.average('L', arrayyuanzuo)
        }
      }
    },
    // 画图
    yuan: function (svg, arrayL, color, mask) {
      gTu = this.createTag('g', {})
      gTu.id = svg.id+mask+ 'tu'
      gTu.style.fill = color
      let fontOp;
      const that = this;
      // use 的html标签语言
      // console.log(arrayL)
      for (var i = 0; i < arrayL.length; i++) {
        fontOp = mask
        if (arrayL[i][0] >= 20) {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          // console.log(fontOp)
          svgText = this.createTag('text', {
            'x': arrayXxiaCoordinate[(arrayL[i][0] - 20)] - that.markFontSize.top, 'y': arrayYline2[(arrayL[i][1])] + that.markFontSize.top, 'font-family': 'fonteditor','font-size':that.markFontSize.size,'font-weight':'bold'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText);
        } else {
          if (typeof (arrayL[i][2]) === 'number') {
            if (arrayL[i][2] === 1) {
              fontOp = mask
            } else {
              fontOp = fontOp + 'M'
            }
          } else {
            if (arrayL[i][2] === 'wu') {
              fontOp = fontOp + 'N'
            }
            if (arrayL[i][2] === 'bu') {
              fontOp = fontOp + 'C'
            }
          }
          svgText = this.createTag('text', {
            'x': arrayXcoordinate[(arrayL[i][0])] - that.markFontSize.top, 'y': arrayYline2[(arrayL[i][1])] + that.markFontSize.top, 'font-family': 'fonteditor','font-size':that.markFontSize.size,'font-weight':'bold'})
          svgText.textContent = fontarray[fontOp]
          svgText.style.fill = color
          gTu.appendChild(svgText);
        }
      }
      this.tinglixian(svg, gTu, arrayL, color)
    },
    // 听力线
    tinglixian: function (svg, gTu, arrayL, color) {
      // console.log(arrayL)
      // 将画布上圆的x坐标从小到大排序
      arrayL.sort(this.sortNumber)
      var x2
      var y2
      var xp
      var yp
      var num
      for (var i = 0; i < arrayL.length; i++) {
        if (arrayL[i][0] >= 20) {
          if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayL[i - 1][2] === 'wu' || arrayL[i - 1][2] === 'bu') {
                continue
              }
              if (arrayL[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = Math.abs(arrayXxiaCoordinate[(arrayL[i][0] - 20)] - arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)])
              } else {
                x2 = arrayXcoordinate[(arrayL[i - 1][0])]
                // 得到横向的宽度;
                xp = arrayXxiaCoordinate[(arrayL[i][0] - 20)] - arrayXcoordinate[(arrayL[i - 1][0])]
              }
              y2 = arrayYline2[(arrayL[i - 1][1])]
              // 得到纵向的高度;
              yp = arrayYline2[(arrayL[i][1])] - arrayYline2[(arrayL[i - 1][1])]
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color;
              svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(svgLine)
            }
          }
        } else {
          if (arrayL[i][2] === 'wu' || arrayL[i][2] === 'bu') {
            continue
          } else {
            if (i - 1 >= 0) {
              if (arrayL[i - 1][2] === 'wu' || arrayL[i - 1][2] === 'bu') {
                continue
              }
              if (arrayL[i - 1][0] >= 20) {
                x2 = arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
                // 得到横向的宽度;
                xp = arrayXcoordinate[(arrayL[i][0])] - arrayXxiaCoordinate[(arrayL[i - 1][0] - 20)]
              } else {
                x2 = arrayXcoordinate[(arrayL[i - 1][0])]
                xp = arrayXcoordinate[(arrayL[i][0])] - arrayXcoordinate[(arrayL[i - 1][0])]// 得到横向的宽度;
              }
              y2 = arrayYline2[(arrayL[i - 1][1])]
              yp = arrayYline2[(arrayL[i][1])] - arrayYline2[(arrayL[i - 1][1])]// 得到纵向的高度;
              num = Math.floor(Math.sqrt(xp * xp + yp * yp) / 3)
              svgLine = this.createTag('line', {
                'x1': x2 + (xp / num) * 3, 'y1': y2 + (yp / num) * 3, 'x2': x2 + (xp / num) * (num - 3), 'y2': y2 + (yp / num) * (num - 3)})
              svgLine.style.stroke = color;
              svgLine.style.strokeWidth = this.tinglixianWidth;
              gTu.appendChild(svgLine)
            }
          }
        }
      }
      if (document.getElementById(gTu.id)) {
        document.getElementById(gTu.id).parentNode.removeChild(document.getElementById(gTu.id))
      }
      svg.appendChild(gTu)
    },
    // 排序
    sortNumber: function (a, b) {
      var a1
      var b1
      if (a[0] >= 20) {
        a1 = arrayXxiaCoordinate[a[0] - 20]
      } else {
        a1 = arrayXcoordinate[a[0]]
      };
      if (b[0] >= 20) {
        b1 = arrayXxiaCoordinate[b[0] - 20]
      } else {
        b1 = arrayXcoordinate[b[0]]
      };
      return a1 - b1
    }
  }
}
</script>

