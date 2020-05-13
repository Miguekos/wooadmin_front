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
        <q-toolbar-title>Woo Admin</q-toolbar-title>
        <div>V{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :width="200"
      :breakpoint="500"
      overlay
      content-class="bg-grey-3"
      v-model="leftDrawerOpen"
    >
      <q-list>
        <q-item-label header class="text-white text-center bg-primary shadow-4">MENU</q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
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
          title: "Productos",
          caption: "Listar Productos",
          icon: "blur_circular",
          link: "#/productos"
        },
        {
          title: "Olva",
          caption: "Listar Envios",
          icon: "markunread",
          link: "#/olva"
        }
      ]
    };
  }
};
</script>
