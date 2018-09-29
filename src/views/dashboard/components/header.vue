<template>
  <div class="menu-item">
       <div class="menu-inner">
           <div class="menu-inner__top">
                <div class="menu-icon" :class="attr.theme.color">
                     <span class="icons" :class="attr.theme.class">
                       <svg-icon :icon-class="attr.theme.icon"></svg-icon>
                     </span>
                </div>
                <h4 class="title"> {{ attr.theme.title }}</h4>
           </div>
           <slot></slot>
       </div>
  </div>
</template>

<script>

export default {
  name: 'dbheader',
  props: {
    attr: {
      type: Object
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.menu-item{
    padding: 0 15px;
    flex: 1;
    @media screen and (max-width: 960px){
      
      flex-grow: 0;
      max-width: 100%;
      flex-basis: 100%;
    }
    .menu-inner{
      color: rgba(0, 0, 0, 0.87);
      width: 100%;
      border: 0;
      display: flex;
      position: relative;
      word-wrap: break-word;
      min-width: 0;
      font-size: .16rem;
      background: #fff;
      margin-top: 30px;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
      margin-bottom: 30px;
      border-radius: 6px;
      flex-direction: column;
    }
    .menu-inner__top{
      margin: 0 15px;
      padding: 0;
      position: relative;
      text-align: right;
      margin-bottom: 20px;
      .more{
          color: #999999;
          margin: 0;
          font-size: .2rem;
          margin-top: 0;
          padding-top: 10px;
          margin-bottom: 0;
      }
      .count{
          color: #3C4858;
          margin-top: 0px;
          min-height: auto;
          font-weight: 300;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          margin-bottom: 3px;
      }
      .menu-icon{
        float: left;
        padding: 15px;
        margin-top: -20px;
        margin-right: 15px;
        border-radius: 3px;
        background-color: #999;
        color: #FFFFFF;
        .icons{
          display: inline-block;
          width: 56px;
          height: 56px;
          overflow: unset;
          font-size: 36px;
          text-align: center;
          line-height: 56px;
          margin-bottom: 1px;
          &:hover{
            cursor:pointer
          }
        }
        .medium{
            width: 32px;
            height: 32px;
            line-height: 32px;
            font-size: 24px;
        }
      }
      .title{
        text-align: left;
        color: "#3C4858";
        font-weight: 300;
        font-size: 0.18rem;
        margin-top: 15px;
      }
    }
    .menu-inner__bottom{
        border-top: 1px solid #eee;
        margin-top: 20px;
        margin: 0 15px 10px;
        border: 0;
        padding: 0;
        display: flex;
        padding-top: 10px;
        align-items: center;
        border-radius: 0;
        justify-content: space-between;
        background-color: transparent;
        a{
          font-size: 20px;
          text-indent: 5px;
        }
    }
}

.menu-yellow{
    background: linear-gradient(60deg, #ffa726, #fb8c00);
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
}
.menu-green{
    background: linear-gradient(60deg, #66bb6a, #43a047);
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
}
.menu-blue{
    background: linear-gradient(60deg, #26c6da, #00acc1);
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
}


</style>
