<template>
  <q-page padding>
    <q-list>
      <q-item class="q-pb-lg">
        <q-item-section class="flex flex-center">
          <q-img
            color="grey"
            style="height: 110px; max-width: 120px;"
            alt="Roseline logo"
            src="~assets/icloudgrey.svg"
          />
          <q-item-label header class="q-pt-xs text-grey text-bold">
            Roseline
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label class="q-pb-xs text-h6 text-black text-bold">
            Iniciar Sesión
          </q-item-label>
          <q-item-label class="q-pt-xs text-grey text-bold">
            Hola, puedes reliazar tu registro
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list class="q-pb-lg">
      <q-item>
        <q-item-section>
          <q-input
            stack-label
            label-color="red-5"
            color="grey"
            autofocus
            v-model="text"
            label="Email"
            placeholder="Tu cuenta de correo"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-input
            v-model="password"
            stack-label
            label="Contraseña"
            label-color="red-5"
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
          <q-btn color="red-6" text-color="white" label="Iniciar Sesion" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      val: false,
      text: "",
      ph: "",
      password: "",
      isPwd: true,

      dense: false
    };
  }
};
</script>
