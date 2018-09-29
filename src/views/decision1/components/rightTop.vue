<template>
    <div class="decision-container-right-top">
        <div class="right-top-wheater">
            <span class="text-wheater">-6°</span>
            <span class="icon-wheater"></span>
            <div class="box-timer">
                <div>星期五  12:30  </div>
                <div>2017-11-18</div>
            </div>
        </div>
        <div class="right-top-exam">请选择考试计划</div>
        <div class="right-top-info">
            <div class="right-top-info-item">
                <span class="icon-heat"></span>
                <span>{{userName}}</span>
            </div>
            <div class="right-top-info-item">
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
@import '../../../styles/variables.scss';
.right-top-wheater{
    display: flex;
    align-items: center;
    margin-left: 55px;
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
    margin: 0 10px;
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
.right-top-info{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-right: 34px;
}
.icon-heat{
    background: url(../../../assets/img/heat.png) no-repeat;
    background-size: 100% 100%;
}
.icon-logout{
    background: url(../../../assets/img/logout.png) no-repeat;
    background-size: 100% 100%;
}
.right-top-info-item{
    display: flex;
    align-items: center;
    margin-left: 18px;
    cursor: pointer;
}
.right-top-exam{
    font-size: 20px;
}
</style>
