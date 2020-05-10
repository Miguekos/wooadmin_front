<template>
  <div class="">
    <!-- <q-input dense borderless placeholder="Buscar" dark input-class="text-right" size="10px" v-model="searchField"> -->
    <q-input dense placeholder="Buscar" size="10px" v-model="searchField">
      <!--      <template v-slot:before>-->
      <!--        <q-icon name="search" />-->
      <!--      </template>-->
      <template v-slot:append>
        <q-icon
          v-if="searchField !== ''"
          name="close"
          @click="searchField = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>
    </q-input>
    <q-separator />
    <q-input dense placeholder="Buscar" size="10px" v-model="searchFieldNew">
      <!--      <template v-slot:before>-->
      <!--        <q-icon name="search" />-->
      <!--      </template>-->
      <template v-slot:append>
        <q-icon
          v-if="searchFieldNew !== ''"
          name="close"
          @click="searchFieldNew = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      text: "",
      ph: "",
      dense: false
    };
  },
  computed: {
    ...mapState("ordenes", ["search", "searchNew"]),
    searchField: {
      get() {
        return this.search;
      },
      set(value) {
        this.setSearch(value);
        console.log("search", value);
      }
    },
    searchFieldNew: {
      get() {
        return this.searchNew;
      },
      set(value) {
        this.setSearchNew(value);
        console.log("searchNew", value);
      }
    }
  },
  methods: {
    ...mapActions("ordenes", ["setSearch"])
  }
};
</script>

<style scoped></style>
