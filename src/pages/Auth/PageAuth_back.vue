<template>
  <div>
    <form @submit.prevent="submitForm">
      <q-list style="padding-top: 5px">
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-h6 text-center"
              ><img
                src="~assets/clipdealer_A15780965_preview.jpg"
                style="width:50vw;max-width:250px; border-radius: 10px 10px 10px 10px"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="q-pb-xs q-pt-xs text-h6 text-black text-bold">
              Iniciar sesión
            </q-item-label>
            <q-item-label class="q-pt-xs text-black text-bold">
              Hola, puedes iniciar sesión
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list class="q-pb-md">
        <q-item>
          <q-item-section>
            <q-input
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
              :loading="loadlogin"
              color="blue-6"
              type="submit"
              text-color="white"
              label="Iniciar Sesión"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list class="q-pt-lg">
        <q-item>
          <q-item-section>
            <q-item-label v-ripple:white @click="modalRecoverPass()"
              >Olvidaste tu contraseña
            </q-item-label>
          </q-item-section>
          <q-item-section></q-item-section>
        </q-item>
      </q-list>
    </form>
    <q-dialog></q-dialog>
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
          email: this.form.email,
          password: this.form.password
        })
          .then(resp => {
            if (!resp.detail) {
              // console.log("resp", resp);
              LocalStorage.set("loggin", true);
              LocalStorage.set("role", resp.rol);
              LocalStorage.set("idUser", resp.id_);
              this.$store.commit("auth/setAuth", true);
              this.$store.commit("auth/setRole", resp.rol);
              const userDetalle = {
                name: resp.name,
                email: resp.email
              };
              this.$q.notify({
                // progress: true,
                message: "¡Bienvenido!",
                // icon: "favorite_border",
                icon: "insert_emoticon",
                color: "white",
                textColor: "blue-5",
                position: "top"
              });
              LocalStorage.set("UserDetalle", resp);
              // console.log("loguerado Correctamente");
              this.loadlogin = false;
              this.$router.push("/");
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
  -webkit-box-shadow: 0 0 0px 100px #ffffff inset !important;
  border-bottom: 1px solid #c2c2c2;
}
</style>
