<template>
  <router-view/>
</template>

<script>

export default {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  text-shadow: transparent 0px 0px 0px, rgb(0 0 0) 0px 0px 0px !important;
}

::-webkit-scrollbar {
  width: 12px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  height: 30px;
  background-color: #999;
  -webkit-border-radius: 7px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
</style>
