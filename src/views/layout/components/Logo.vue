<template>
    <div class="top-header">
         这是logo
    </div>
</template>

<script>
  export default {
    name: 'Logo',
    components: {
    },
    computed: {
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-header{
    height: 60px;
    width: 100%;
    line-height: 60px;
    text-align: center;
    color: #fff;
}
</style>

