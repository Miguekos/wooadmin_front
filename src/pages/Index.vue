<template>
  <div class="flex-center flex">
    <!--    <Chatrs />-->
    <q-img
      src="~assets/logorapunzel.png"
      style="width:150vw;max-width:250px;"
    ></q-img>
  </div>
</template>

<script>
export default {
  components: {
    Chatrs: () => import("components/charts/Index")
  }
};
</script>

<style></style>
