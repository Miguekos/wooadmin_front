<template>
  <div class="q-pa-xs">
    <q-table
      dense
      class="my-sticky-header-table"
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      flat
      :filter="filter"
      virtual-scroll
      title="Envios TexCargo"
      :data="getOlva"
      :columns="columns"
      row-key="id"
      :pagination.sync="initialPagination"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="generar impresion"
          class="text-black q-mr-sm"
          @click="generandopdfs()"
        ></q-btn>
        <q-input
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-blue q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Bueno... esto es triste: {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
      <template v-slot:body-cell-ticket="props">
        <q-td :props="props">
          <!--          <q-btn-->
          <!--            rounded-->
          <!--            size="xs"-->
          <!--            color="blue"-->
          <!--            @click="generandopdfs(props.row)"-->
          <!--            label="descargar"-->
          <!--          ></q-btn>-->
          <!--          <div>-->
          <!--            <q-badge color="purple" :label="props.value" />-->
          <!--          </div>-->
          <!--          <div class="my-table-details">-->
          <!--            {{ props.row.details }}-->
          <!--          </div>-->
        </q-td>
      </template>
      <template v-slot:body-cell-producto="props">
        <q-td :props="props">
          <div v-for="(items, index) in props.row[0].line_items" :key="index">
            {{ index + 1 }}.- {{ items.name }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Loading, QSpinnerGears, QSpinnerBars } from "quasar";

export default {
  computed: {
    ...mapGetters("ordenes", ["getOlva"])
  },
  data() {
    return {
      selected: [],
      filter: "",
      initialPagination: {
        sortBy: "registro",
        descending: true,
        page: 1,
        rowsPerPage: 100
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "registro",
          label: "Codigo Restareo",
          align: "left",
          field: row => row.registro.registro,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "consignado",
          align: "center",
          label: "Cliente",
          field: row => row,
          format: val => `${val.registro.name} ${val.registro.lastname}`,
          sortable: true
        },
        {
          name: "telf",
          align: "center",
          label: "Telefono",
          field: row => row[0].billing.phone,
          format: val => `${val}`,
          sortable: true
        },
        // {
        //   name: "ticket",
        //   label: "Ticket",
        //   align: "center",
        //   field: row => row.ticket,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        {
          name: "producto",
          label: "Producto",
          align: "right",
          field: row => row,
          // format: val => `${val[0].line_items[0].name}`,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("ordenes", ["mongolvaGet", "get_generarpdfs"]),
    async page_loading_ini() {
      await this.$q.loading.show();
    },
    async page_loading_end() {
      await this.$q.loading.hide();
    },
    async generandopdfs() {
      this.$q.loading.show()
      // console.log("e->", `${JSON.stringify(e[0])}`);
      let pdfs = [];
      const array = this.selected;
      if (array.length > 0) {
        console.log("array.length", array.length);
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          // console.log("element", element)
          pdfs.push({
            id: element.id,
            registro: element.registro,
            detalle: element[0]
          });
          // console.log("asd->", pdfs);
        }
        const response = await this.get_generarpdfs(pdfs);
        console.log("resposne->", response);
        if (response.codRes === '00'){
          await this.descargar(response.id)
          this.selected = []
        }
        this.$q.loading.hide()
      } else {
        console.log("esta en 0")
        this.$q.loading.hide()
      }
    },
    async descargar(e) {
      console.log("value", e);
      await this.page_loading_ini();
      fetch(
        `https://api.apps.com.pe/fileserver/tickets/${e}_2.pdf`,
        {
          method: "GET", // or 'PUT'
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(async response => response.blob())
        .then(async blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = `${e}.pdf`;
          a.click();
          a.remove();
          setTimeout(() => window.URL.revokeObjectURL(url), 100);
          await this.page_loading_end();
        })
        .catch(async err => {
          console.log(err);
          await this.page_loading_end();
        });
    }
  },
  async created() {
    await Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: "blue-5",
      spinnerSize: 80
    });
    await this.mongolvaGet();
    await Loading.hide();
  }
};
</script>
