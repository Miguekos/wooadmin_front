<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          dense
          round
          glossy
          color="secondary"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-accent"
          >Rapunzel <b class="text-positive">Admin Panel</b></q-toolbar-title
        >
        <div class="text-positive">V{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- <q-drawer
      :width="200"
      :breakpoint="500"
      overlay
      content-class="bg-grey-3"
      v-model="leftDrawerOpen"
      show-if-above
    > -->
    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Perfil</q-item-label
          >
          <q-separator spaced />
          <q-list>
            <q-item clickable v-ripple class="justify-center">
              <q-avatar size="100px" font-size="52px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <!-- <q-item-label>{{ userdatil.name }}</q-item-label> -->
                <q-item-label>Miguel Rodriguez</q-item-label>
                <!-- <q-item-label caption>{{ userdatil.email }}</q-item-label> -->
                <q-item-label caption>Miguekos1233@gmail.com</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!--        <q-item clickable tag="a" @click="Logout()">-->
        <!--          <q-item-section avatar>-->
        <!--            <q-icon name="logout" />-->
        <!--          </q-item-section>-->

        <!--          <q-item-section>-->
        <!--            <q-item-label>Salir</q-item-label>-->
        <!--            <q-item-label caption>-->
        <!--              Cerar Session-->
        <!--            </q-item-label>-->
        <!--          </q-item-section>-->
        <!--        </q-item>-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Ordenes",
          caption: "Listar Ordenes",
          icon: "view_list",
          link: "#/ordenes"
        },
        {
          title: "New Ordenes",
          caption: "Listar Ordenes",
          icon: "view_list",
          link: "#/newordenes"
        },
        {
          title: "Productos",
          caption: "Listar Productos",
          icon: "blur_circular",
          link: "#/productos"
        },
        {
          title: "TexCargo",
          caption: "Listar Envios",
          icon: "markunread",
          link: "#/texcargo"
        }
        // {
        //   title: "Detalle Ordenes",
        //   caption: "Detalle Ordenes",
        //   icon: "table_chart",
        //   link: "#/detalle"
        // }
      ]
    };
  },
  created (){
    console.log('this.sockets', this.sockets);
    this.sockets.subscribe('woorapuncel', async data => {
      console.log("socket dniwoorapuncel", data);
      // this.getPosition();
    });
    this.$socket.emit("conectado", 'conectado');
  }
};
</script>
