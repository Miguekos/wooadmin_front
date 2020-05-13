<template>
  <div class="q-pa-xs">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      flat
      dnese
      bordered
      title="Envios Olva"
      :data="getOlva"
      :columns="columns"
      row-key="codigoRastreo"
      :pagination.sync="pagination"
    >
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-blue q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Bueno... esto es triste: {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
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
      pagination: {
        sortBy: 'remito',
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Codigo Restareo",
          align: "left",
          field: row => row.codigoRastreo,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "consignado",
          align: "center",
          label: "Contrgiados",
          field: "consignado",
          sortable: true
        },
        {
          name: "observacion",
          label: "Observacion",
          field: "observacion",
          sortable: true
        },
        {
          name: "remito",
          label: "Remito",
          field: row => row.remito ? row.remito : "No se envio",
          sortable: true
        }
      ],
      data:[]
    };
  },
  methods: {
    ...mapActions("ordenes", ["mongolvaGet"])
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
