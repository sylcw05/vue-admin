<template>
    <div class="decision-top">
        <div class="top-wheater">
            <span class="text-wheater">-6°</span>
            <span class="icon-wheater"></span>
            <div class="box-timer">
                <div>星期五  12:30  </div>
                <div>2017-11-18</div>
            </div>
        </div>
        <div class="top-title"></div>
        <div class="top-info">
            <div class="top-info-item">
                <span class="icon-heat"></span>
                <span>{{userName}}</span>
            </div>
            <div class="top-info-item">
                <span class="icon-logout"></span>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    userName: String
  }
}
</script>

<style lang="scss">
.decision-top{
    display: flex;
    justify-content: space-between;
}
.top-wheater{
    display: flex;
    margin-top: 8px;
    margin-left: 35px;
}
.text-wheater{
    font-size: 24px;
}
.icon-wheater{
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url(../../../assets/img/wu.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 28px 0 8px;
}
.box-timer{
    font-size: 14px;
}
.icon-heat, .icon-logout{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
}
.top-info{
    display: flex;
    flex-wrap: nowrap;
    margin-top: 22px;
    margin-right: 30px;
}
.icon-heat{
    background: url(../../../assets/img/heat.png) no-repeat;
    background-size: 100% 100%;
}
.icon-logout{
    background: url(../../../assets/img/logout.png) no-repeat;
    background-size: 100% 100%;
}
.top-info-item{
    display: flex;
    margin-left: 18px;
    cursor: pointer;
}
.top-title{
    width: 1115px;
    height: 72px;
    margin-top: 8px;
    background: url(../../../assets/img/title.png) no-repeat center;
    background-size: auto 100%;
}
</style>
