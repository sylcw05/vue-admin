<template>
    <div class="container-decision-item-info">
        <div class="item-info-box">
            <div v-for="item in decisionInfo" :class="'item-info item-box-'+item.name" :key="item.name" v-if="item.show">
                <div class="item-decision-info-title">{{item.title}}</div>
                <div class="item-container-person" v-if="item.name==='person'">
                    <div class="item-container-img">
                        <img src="../../../assets/img/heat.jpg" alt="">
                        <div>用户照片</div>
                    </div>
                    <div class="item-container-text">
                        <div>姓名：{{userCarInfo.xm}}</div>
                        <div>所属单位：{{userCarInfo.adminArea}}</div>
                        <div>身份证号：{{userCarInfo.sfzjhm}}</div>
                        <div>手机号码：{{userCarInfo.lxdh}}</div>
                    </div>
                </div>
                <div class="item-container-person" v-if="item.name==='car'">
                    <div class="item-container-img">
                        <img src="../../../assets/img/heat.jpg" alt="">
                        <div>车辆照片</div>
                    </div>
                    <div class="item-container-text item-container-car-text">
                        <div>车牌号：{{userCarInfo.cph}}</div>
                        <div>车辆编号：{{userCarInfo.carNumber}}</div>
                        <div>车辆类型：{{userCarInfo.cx}}</div>
                        <div>出发地址：{{userCarInfo.routePogrammeEntityList[0].coordinatesList[0].address}}</div>
                        <div>目的地址：{{userCarInfo.routePogrammeEntityList[0].coordinatesList[userCarInfo.routePogrammeEntityList[0].coordinatesList.length-1].address}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-info-box">
            <div v-for="item in decisionInfo" :class="'icon-'+item.name" :key="item.name" @click="showItem(item)"></div>
        </div>
        <div class="icon-back-index" @click="back"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      decisionInfo: [
        { name: 'person', show: false, title: '人员信息' },
        { name: 'car', show: false, title: '车辆信息' },
        { name: 'route', show: false, title: '行程信息' },
        { name: 'video', show: false, title: '视频/录像' }
      ]
    }
  },
  props: {
    userCarInfo: Object
  },
  methods: {
    showItem(item) { // 是否显示
      item.show = !item.show
    },
    back() {
      this.$emit('backIndex', false)
    }
  }
}
</script>
<style lang="scss">
.item-info-box{
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
}
.container-decision-item-info .item-info{
    width: 380px;
    height: 202px;
    background: url(../../../assets/img/bgInfo.png) no-repeat;
    background-size: 100% 100%;
}
.nav-info-box{
    position: absolute;
    right: 68px;
    bottom: 10px;
    display: flex;
}
.icon-person, .icon-car, .icon-route, .icon-video{
    width: 58px;
    height: 40px;
    margin-right: 20px;
}
.icon-person{
    background: url(../../../assets/img/personInfo.png) no-repeat;
    background-size: 100% 100%;
}
.icon-car{
    background: url(../../../assets/img/carInfo.png) no-repeat;
    background-size: 100% 100%;
}
.icon-route{
    background: url(../../../assets/img/routeInfo.png) no-repeat;
    background-size: 100% 100%;
}
.icon-video{
    background: url(../../../assets/img/videoInfo.png) no-repeat;
    background-size: 100% 100%;
}
.item-decision-info-title{
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 18px;
    text-align: center;
}
.item-container-person{
    display: flex;
    flex-wrap: nowrap;
    padding: 0 20px;
}
.item-container-img img{
    display: block;
    margin-bottom: 8px;
    width: 90px;
    height: 110px;
}
.item-container-img{
    text-align: center;
}
.item-container-text{
    margin-left: 10px;
}
.item-container-text div{
    margin-bottom: 16px;
}
.item-container-car-text div{
    margin-bottom: 5px;
}
.icon-back-index{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 50px;
    height: 40px;
    background: url(../../../assets/img/backbutton.png) no-repeat;
    background-size: 100% 100%;
}
</style>
