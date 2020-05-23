<template>
  <q-page class="q-pa-xs">
    <template>
      <div class="q-pa-xs">
        <q-table
          class="cursor-pointer"
          card-class="bg-grey-1 text-brown"
          table-class="text-grey-8"
          table-header-class="text-brown"
          dense
          title="Productos"
          :data="data"
          :columns="columns"
          row-key="name"
          :loading="loading"
          :filter="filter"
          :pagination.sync="pagination"
        >
          <template v-slot:top-right>
            <div class="q-pr-md">
              <q-btn
              color="primary"
              icon-right="archive"
              label="Export to csv"
              no-caps
              @click="exportTable"
            />
            </div>
            <div class="q-pl-md">
            <q-input dense v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            </div>
          </template>
          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-amber q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span> Bueno... esto es triste: {{ message }} </span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr @click="detalleCliente(props.row)" :props="props">
              <q-td key="name" :props="props">
                {{ props.row.name }}
              </q-td>
              <q-td key="id_pedido" :props="props">
                <q-badge color="purple">{{ props.row.id }}</q-badge>
              </q-td>
              <q-td key="slug" :props="props">
                <q-badge color="orange">{{ props.row.slug }}</q-badge>
              </q-td>
              <q-td key="price" :props="props">
                <q-badge color="primary">
                  {{ props.row.price }}
                </q-badge>
              </q-td>
              <q-td key="stock_quantity" :props="props">
                <q-badge color="secondary">
                  {{ props.row.stock_quantity }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>
          <!-- <template v-slot:top-right>
            <q-input dense v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template> -->
        </q-table>
      </div>
    </template>
    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalle</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <Detalle :info="detalleInfo" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <!-- <q-btn flat label="Open another dialog" @click="secondDialog = true" /> -->
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import { axiosInstance } from "boot/axios";
import { Loading, QSpinnerGears, QSpinnerBars } from "quasar";
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}
export default {
  data() {
    return {
      detalleInfo: [],
      inception: false,
      filter: "",
      loading: false,
      pagination: {
        sortBy: "id_pedido",
        descending: true,
        page: 1,
        rowsPerPage: 17
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "id_pedido",
          align: "center",
          label: "ID Pedidio",
          field: "id",
          sortable: true
        },
        {
          name: "slug",
          label: "Descripcion",
          field: row => row.slug
        },
        {
          name: "price",
          label: "Precio",
          field: row => row.price
        },
        {
          name: "stock_quantity",
          label: "Stock",
          field: row => row.stock_quantity
        }
      ],
      data: []
    };
  },
  components: {
    Detalle: () => import("components/DetalleOrdenes")
  },
  methods: {
    detalleCliente(arg) {
      this.detalleInfo = arg;
      this.inception = true;
      console.log(arg);
      console.log("Preciono");
    },
    loadData() {
      axiosInstance
        .get("/productos/100")
        .then(response => {
          console.log(response.data);
          this.data = response.data;
          Loading.hide();
          // this.loading = false;
        })
        .catch(err => {
          console.log(err);
          // this.$q.notify({
          //   color: 'negative',
          //   position: 'top',
          //   message: 'Loading failed',
          //   icon: 'report_problem'
          // })
        });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("productos-export.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    }
  },
  async mounted() {
    await Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: "amber-5",
      spinnerSize: 80
    });
    await this.loadData();
  }
};
</script>
