<template>
  <q-page class="loginform flex flex-center">
    <div class="row justify-center">
      <!-- <div class="col-8 text-center">
        <p class="text-white caption">Inicio de Sesion </p>
      </div> -->

      <q-card
        class="my-card text-white"
        style="width: 300px; height: 280px; background: radial-gradient(circle, #26a69a 0%, #014a88 100%)"
      >
        <q-tabs
          v-model="tab"
          class="bg-primary text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="Login" label="Login" />
          <q-tab name="Registrar" label="Registrar" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-primary-1 text-center">
          <q-tab-panel name="Login">
            <login-register :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="Registrar">
            <login-register :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "Login"
    };
  },
  components: {
    "login-register": require("../../components/Auth/LoginRegister.vue").default
  }
};
</script>

<style scoped>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
body {
  max-width: 500px;
  background-color: #b71c1c;
  margin: 0 auto;
}
</style>
