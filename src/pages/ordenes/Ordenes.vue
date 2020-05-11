<template>
  <q-page class="q-pa-xs">
    {{ filtrosNuevos }}
    <div class="row q-gutter-xs q-pa-xs">
      <div class="col-12 col-md">
        <q-input dense filled v-model="keyword" label="Buscar" />
      </div>
      <div class="col-12 col-md">
        <q-select
          color="orange"
          filled
          clearable
          dense
          v-model="citys"
          :options="city_unique"
          label="Ciudades"
        >
          <!--          <template v-if="citys" v-slot:append>-->
          <!--            <q-icon-->
          <!--              name="cancel"-->
          <!--              @click.stop="citys = null"-->
          <!--              class="cursor-pointer"-->
          <!--            />-->
          <!--          </template>-->
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="green"
          filled
          clearable
          dense
          v-model="statuss"
          :options="status_unique"
          label="Estados"
        >
          <!--          <template v-if="statuss" v-slot:append>-->
          <!--            <q-icon-->
          <!--              name="cancel"-->
          <!--              @click.stop="statuss = null"-->
          <!--              class="cursor-pointer"-->
          <!--            />-->
          <!--          </template>-->
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="indigo"
          filled
          clearable
          dense
          v-model="payment_method_titles"
          :options="payment_method_title_unique"
          label="Metodos de Pago"
        >
          <!--          <template v-if="payment_method_titles" v-slot:append>-->
          <!--            <q-icon-->
          <!--              name="cancel"-->
          <!--              @click.stop="payment_method_titles = null"-->
          <!--              class="cursor-pointer"-->
          <!--            />-->
          <!--          </template>-->
        </q-select>
      </div>
    </div>
    <template>
      <div class="q-pa-xs">
        <q-table
          dense
          class="cursor-pointer transparent"
          title="Ordenes"
          :data="filteredByAll"
          :columns="columns"
          row-key="name"
          :loading="loading"
          :filter="filter"
          :pagination.sync="pagination"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class=""
                style="font-size: 16px"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <!-- <template v-slot:body-cell="props">
            <q-td :props="props">
              <q-badge color="blue" :label="props.value" />
            </q-td>
          </template> -->
          <template v-slot:body="props">
            <q-tr @click="detalleCliente(props.row)" :props="props">
              <q-td key="name" :props="props">
                {{ props.row.billing.first_name }}
              </q-td>
              <q-td key="id_pedido" :props="props">
                <!--                <q-badge color="purple">{{ props.row.id }}</q-badge>-->
                {{ props.row.id }}
              </q-td>
              <q-td key="payment_method" :props="props">
                <!--                <q-badge color="orange">{{ props.row.payment_method }}</q-badge>-->
                {{ props.row.payment_method }}
              </q-td>
              <q-td key="payment_method_title" :props="props">
                <!--                <q-badge color="primary">-->
                <!--                  {{ props.row.payment_method_title }}-->
                <!--                </q-badge>-->
                {{ props.row.payment_method_title }}
              </q-td>
              <q-td key="shipping_address_1" :props="props">
                <!--                <q-badge color="teal">-->
                <!--                  {{ props.row.shipping.address_1 }}-->
                <!--                </q-badge>-->
                {{ props.row.shipping.address_1 }}
              </q-td>
              <q-td key="city" :props="props">
                <!--                <q-badge color="accent">{{ props.row.shipping.city }}</q-badge>-->
                {{ props.row.shipping.city }}
              </q-td>
              <q-td key="shipping_total" :props="props">
                <!--                <q-badge color="amber">{{ props.row.shipping_total }}</q-badge>-->
                {{ props.row.shipping_total }}
              </q-td>
            </q-tr>
          </template>
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
import { axiosInstance } from "boot/axios";
import { mapGetters, mapActions, mapState } from "vuex";
import { Loading, QSpinnerGears } from "quasar";
export default {
  computed: {
    ...mapGetters("ordenes", ["getOrdenes"]),
    ...mapState("ordenes", ["backbutton", "searchactive"]),
    filtrosNuevos() {
      console.log("NUevos filtros", this.filteredByAll);
      const array = this.filteredByAll;
      this.status = [];
      this.city = [];
      this.payment_method_title = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        this.status.push(element.status);
        this.city.push(element.shipping.city);
        this.payment_method_title.push(element.payment_method_title);
      }
    },
    filteredByAll() {
      const keyw = this.getByKeyword(this.list, this.keyword),
        stat = this.getByStatus(keyw, this.statuss),
        cunt = this.getByCity(stat, this.citys),
        metPago = this.getByPayment_method_title(
          cunt,
          this.payment_method_titles
        );
      return metPago;
    },
    status_unique() {
      console.log("Log de Status");
      return [...new Set(this.status)];
    },
    city_unique() {
      return [...new Set(this.city)];
    },
    payment_method_title_unique() {
      return [...new Set(this.payment_method_title)];
    }
  },
  data() {
    return {
      city: [],
      citys: "",
      payment_method_title: [],
      payment_method_titles: "",
      keyword: "",
      detalleInfo: [],
      status: [],
      statuss: "",
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
          field: row => row.billing.first_name,
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
          name: "payment_method",
          align: "center",
          label: "Metodo Pago",
          field: "payment_method",
          sortable: true
        },
        {
          name: "payment_method_title",
          label: "Tipo Metodo",
          field: "payment_method_title",
          sortable: true
        },
        {
          name: "shipping_address_1",
          label: "Direccion Envio",
          field: row => row.shipping.address_1
        },
        { name: "city", label: "Ciudad", field: row => row.shipping.city },
        {
          name: "shipping_total",
          label: "Costo de Envio",
          field: row => row.shipping_total
        }
      ],
      list: []
    };
  },
  components: {
    Detalle: () => import("components/DetalleOrdenes"),
    Search: () => import("components/Search"),
    SearchNew: () => import("components/SearchNew")
  },
  methods: {
    ...mapActions("ordenes", ["callOrdenes"]),
    getByKeyword(list, keyword) {
      const search = keyword.trim().toLowerCase();
      if (!search.length) return list;
      return list.filter(
        item => item.billing.first_name.toLowerCase().indexOf(search) > -1
      );
    },
    getByStatus(list, status) {
      if (!status) return list;
      return list.filter(item => item.status === status);
    },
    getByCity(list, city) {
      if (!city) return list;
      return list.filter(item => item.shipping.city === city);
    },
    getByPayment_method_title(list, paymentmt) {
      if (!paymentmt) return list;
      return list.filter(item => item.payment_method_title === paymentmt);
    },
    detalleCliente(arg) {
      this.detalleInfo = arg;
      this.inception = true;
      console.log(arg);
      console.log("Preciono");
    }
  },
  async mounted() {
    // this.loading = true;
    await Loading.show({
      spinner: QSpinnerGears
    });
    await this.callOrdenes();
    this.list = this.getOrdenes;
    // const array = this.getOrdenes;
    // this.list = array;
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    //   this.status.push(element.status);
    //   this.city.push(element.shipping.city);
    //   this.payment_method_title.push(element.payment_method_title);
    // }
    await Loading.hide();
  }
};
</script>
