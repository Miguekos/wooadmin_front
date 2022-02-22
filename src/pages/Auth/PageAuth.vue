<template>
  <div class="my-font login">
    <q-layout view="lHh Lpr lFf">
      <q-header class="bg-white transparent">
        <q-list style="padding-top: 115px">
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold text-h6 text-center"
                ><img
                  style="width:50vw;max-width:350px; border-radius: 10px 10px 10px 10px;"
                  class="shadow-24"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list align="center">
          <q-item>
            <q-item-section>
              <q-item-label
                class="q-pb-xs q-pt-xs text-h6 text-black text-bold"
              >
                Iniciar sesión
              </q-item-label>
              <q-item-label class="q-pt-xs text-black text-bold">
                Hola, puedes iniciar sesión
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-header>

      <q-footer class="bg-white q-pa-lg transparent">
        <q-card class="shadow-14" style="border-radius: 10px 10px 10px 10px">
          <form @submit.prevent="submitForm">
            <q-list class="q-pb-xs">
              <q-item-section
                style="border-radius: 10px 10px 0px 0px"
                class="bg-accent text-accent"
              >
                <q-item-label>.</q-item-label>
                <q-item-label>.</q-item-label>
              </q-item-section>
              <q-item>
                <q-item-section>
                  <q-input
                    outlined
                    dense
                    name="email"
                    ref="email"
                    stack-label
                    label-color="black-5"
                    color="grey"
                    v-model="form.email"
                    label="Email"
                    placeholder="Tu cuenta de correo"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input
                    dense
                    outlined
                    name="password"
                    ref="password"
                    v-model="form.password"
                    stack-label
                    label="Contraseña"
                    label-color="black-5"
                    color="grey"
                    :type="isPwd ? 'password' : 'text'"
                    placeholder="Introduce tu contraseña"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
              <!-- <q-item>
          <q-item-section side center>
            <q-item-label>
              <q-checkbox v-model="val" />
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-left">
              De acuerdo con los Términos y condiciones y Politicas de Privacidad.
            </q-item-label>
          </q-item-section>
        </q-item> -->
            </q-list>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-btn
                    size="sm"
                    :loading="loadlogin"
                    color="accent"
                    type="submit"
                    text-color="white"
                    label="Iniciar Sesión"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-list class="q-pt-xs">
              <q-item>
                <q-item-section class="text-black" style="font-size: 10px">
                  <q-item-label v-ripple:white @click="modalRecoverPass()"
                    >Olvidaste tu contraseña
                  </q-item-label>
                </q-item-section>
                <q-item-section></q-item-section>
              </q-item>
            </q-list>
          </form>
        </q-card>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
// import { LocalStorage } from "quasar";
import { LocalStorage } from "quasar";
import { mapActions } from "vuex";
// console.log(process.env.API);
// import { openURL } from 'quasar'
export default {
  // preFetch({ store }) {
  //   // console.log("stored autth");
  //   // console.log(store.state.auth.auth);
  //   if (!store.state.auth) {
  //     // console.log(store.state.auth);
  //     // redirect('/')
  //   }
  // },
  data() {
    return {
      loadlogin: false,
      val: false,
      text: "",
      ph: "",
      password: "",
      isPwd: true,
      dense: false,
      loading: false,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login", "recuperar"]),
    modalRecoverPass() {
      this.$q
        .dialog({
          title: "Recuperar contraseña",
          message:
            "¡Un correo será enviado con la contraseña generada, no olvides verificar tu bandeja de spam!",
          prompt: {
            model: "",
            isValid: val => val.length > 2, // << here is the magic
            type: "text", // optional
            label: "Correo",
            outlined: true
          },
          color: "blue-5",
          cancel: true,
          persistent: true,
          transitionShow: "slide-down",
          transitionHide: "slide-up"
        })
        .onOk(async data => {
          console.log(">>>> OK, received", data);
          const res = await this.recuperar(data);
          console.log(res);
          if (res.codRes == "00") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo enviado!",
              // icon: "favorite_border",
              icon: "email",
              color: "white",
              textColor: "green-5",
              position: "top"
            });
          } else if (res.codRes == "01") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo no existe!",
              // icon: "favorite_border",
              icon: "unsubscribe",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          } else {
            this.$q.notify({
              // progress: true,
              message: "¡Error controlado!",
              // icon: "favorite_border",
              icon: "cancel_presentation",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    submitForm() {
      this.loadlogin = true;
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        // console.log();
        this.login({
          email: this.form.email.toLowerCase().trim(),
          password: this.form.password
        })
          .then(resp => {
            if (!resp.detail) {
              if (resp.acceso_sistema) {
                console.log("resp", resp);

                this.$store.commit("auth/setAuth", true);
                this.$store.commit("auth/setRole", resp.rol);
                const userDetalle = {
                  name: resp.name,
                  email: resp.email
                };
                this.$q.notify({
                  message: "¡Bienvenido!",
                  icon: "insert_emoticon",
                  color: "white",
                  textColor: "blue-5",
                  position: "top"
                });
                LocalStorage.set("UserDetalle", resp);
                this.loadlogin = false;
                this.$router.push("/");
              } else {
                this.$q.notify({
                  message: `Está suspendido del sistema, comuníquese con el administrador..!`,
                  color: "white",
                  textColor: "red-5",
                  position: "top"
                });
                this.loadlogin = false;
              }
            } else {
              // console.log("Email o Contraseña incorrecta");
              this.$q.notify({
                message: `${resp.detail}`,
                color: "white",
                textColor: "amber-5",
                position: "top"
              });
              this.loadlogin = false;
            }
          })
          .catch(err => {
            console.log(err);
            this.loadlogin = false;
            this.$q.notify({
              message: "Error en la red",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          });
        // console.log("login the user");
      }
    }
  }
};
</script>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 100px #ffffff inset !important;
  border-bottom: 1px solid #c2c2c2;
  border-top: 1px solid #c2c2c2;
}

.login {
  /*background-image: url("~assets/earth_dream.png");*/
  background-image: linear-gradient(
    -200deg,
    #ffffff 42%,
    #9abbee 60%,
    #def3f8 100%
  );
}
</style>
