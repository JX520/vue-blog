<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}
html,
body {
  font-size: 16px;
}

@media screen and (min-width: 1921px) {
  html,
  body {
    font-size: 18px;
  }
}
@media screen and (min-width: 1680px) and (max-width: 1920px) {
  html,
  body {
    font-size: 16px;
  }
}
@media screen and (min-width: 1201px) and (max-width: 1679px) {
  html,
  body {
    font-size: 13px;
  }
}
@media screen and (min-width: 900px) and (max-width: 1200px) {
  html,
  body {
    font-size: 11px;
  }
}
@media screen and (max-width: 899px) {
  html,
  body {
    font-size: 10px;
    /* transform: scale(0.83, 0.83); */
  }
}
</style>
