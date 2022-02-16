<template>
  <q-page class="q-pa-xs">
    {{ filtrosNuevos }}
    <div class="row q-gutter-xs q-pa-xs">
      <div class="col-12 col-md">
        <q-input dense filled v-model="keyword" label="Buscar por nombre" />
      </div>
      <div class="col-12 col-md">
        <q-select
          color="orange-10"
          filled
          clearable
          dense
          v-model="citys"
          :options="city_unique"
          label="Ciudades"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="green-10"
          filled
          clearable
          dense
          v-model="statuss"
          :options="status_unique"
          label="Estados"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="indigo-10"
          filled
          clearable
          dense
          v-model="payment_method_titles"
          :options="payment_method_title_unique"
          label="Metodos de Pago"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-input dense filled v-model="fechaIncio" label="ID Minimo" />
      </div>
      <div class="col-12 col-md">
        <q-input dense filled v-model="fechaFin" label="ID Maximo" />
      </div>
      <div class="col-12 col-md">
        <q-btn
          color="orange-6"
          class="full-width"
          @click="cargar_ordenes()"
          text-color="white"
          label="Cargar"
        />
      </div>
      <div class="col-12 col-md">
        <q-btn
          color="green-6"
          class="full-width"
          @click="realizar_envio()"
          text-color="white"
          label="enviar"
        />
      </div>
    </div>
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
          virtual-scroll
          :pagination="initialPagination"
          rows-per-page-label=" "
          title="Ordenes"
          :data="filteredByAll"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :filter="filter"
          selection="multiple"
          :selected.sync="selected"
        >
          <!--          <template v-slot:body-cell="props">-->
          <!--            <q-td @click="detalleCliente(props.row.line_items)" :props="props">-->
          <!--              {{ props.value }}-->
          <!--            </q-td>-->
          <!--          </template>-->
          <template v-slot:body-cell-tipodepago="props">
            <q-td :props="props">
              <q-btn
                v-if="props.row.tipodepago === 'Pagado'"
                color="info"
                size="sm"
                rounded
                @click="tipoDePago(props.row, 'Por Pagar')"
              >
                {{ props.row.tipodepago }}
              </q-btn>
              <q-btn
                v-else-if="props.row.tipodepago === 'Por Pagar'"
                color="green"
                size="sm"
                rounded
                @click="tipoDePago(props.row, '')"
              >
                {{ props.row.tipodepago }}
              </q-btn>
              <q-btn
                v-else-if="props.row.tipodepago === ''"
                color="black"
                size="sm"
                rounded
                @click="tipoDePago(props.row, 'Pagado')"
              >
                Ninguno
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-id_pedido="props">
            <q-td :props="props">
              <q-btn
                color="orange"
                class="text-black text-bold"
                size="sm"
                rounded
                @click="detalleCliente(props.row)"
              >
                {{ props.value }}
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-city_ori="props">
            <q-td
              @click="addselect(props.row)"
              class="cursor-pointer"
              :props="props"
            >
              <!--              <div v-if="props.row.billing.porcentaje > 80">asd</div>-->
              <q-badge v-if="props.row.billing.porcentaje > 80" color="blue-10">
                {{ props.value }}
              </q-badge>
              <q-badge v-else color="red-10">
                {{ props.value }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-enviado="props">
            <q-td :props="props">
              <!--              <div v-if="props.row.billing.porcentaje > 80">asd</div>-->
              <q-badge v-if="props.row.enviado" color="green">
                Enviado
              </q-badge>
              <q-badge v-else color="red">
                No enviado
              </q-badge>
            </q-td>
          </template>
          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-green-7 q-gutter-sm">
              <q-icon size="2em" name="sentiment_dissatisfied" />
              <span> Bueno... esto es triste: {{ message }} </span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>
        </q-table>
      </div>
    </template>
    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Detalle del Pedido {{ detalleInfo.id }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <Detalle :info="detalleInfo.line_items" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <!--          <q-btn flat label="Decline" color="primary" v-close-popup/>-->
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--    <q-dialog v-model="inception">-->
    <!--      <q-card>-->
    <!--        <q-card-section>-->
    <!--          <div class="text-h6">Detalle</div>-->
    <!--        </q-card-section>-->

    <!--        <q-card-section class="q-pt-none">-->
    <!--          <Detalle :info="detalleInfo" />-->
    <!--        </q-card-section>-->

    <!--        <q-card-actions align="right" class="text-primary">-->
    <!--          &lt;!&ndash; <q-btn flat label="Open another dialog" @click="secondDialog = true" /> &ndash;&gt;-->
    <!--          <q-btn flat label="Close" v-close-popup />-->
    <!--        </q-card-actions>-->
    <!--      </q-card>-->
    <!--    </q-dialog>-->
  </q-page>
</template>

<script>
import { axiosInstance } from "boot/axios";
import { mapGetters, mapActions, mapState } from "vuex";
import { Loading, QSpinnerGears, QSpinnerBars } from "quasar";

export default {
  computed: {
    ...mapGetters("ordenes", ["getOrdenes"]),
    ...mapState("ordenes", [
      "backbutton",
      "searchactive",
      "ini_date",
      "fin_date"
    ]),
    fechaIncio: {
      get() {
        return this.ini_date;
      },
      set(val) {
        this.setFechaIni(val);
      }
    },
    fechaFin: {
      get() {
        return this.fin_date;
      },
      set(val) {
        this.setFechaFin(val);
      }
    },
    filtrosNuevos() {
      // console.log("NUevos filtros", this.filteredByAll);
      const array = this.filteredByAll;
      this.status = [];
      this.city = [];
      this.payment_method_title = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        this.status.push(element.status);
        this.city.push(element.billing.city);
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
      id_ini: "",
      id_fin: "",
      initialPagination: {
        sortBy: "id_pedido",
        descending: true,
        page: 1,
        rowsPerPage: 200
        // rowsNumber: xx if getting data from a server
      },
      tipoDePagobool: false,
      selected: [],
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
        rowsPerPage: 100
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
          name: "fecha_registro",
          label: "Fecha",
          field: row => row.fecha_registro
        },
        {
          name: "enviado",
          align: "right",
          label: "Estado",
          field: row => row.enviado
        },
        {
          name: "payment_method_title",
          label: "Tipo Metodo",
          field: "payment_method_title",
          align: "right",
          sortable: true
        },
        {
          name: "tipodepago",
          label: "Tipo Envio",
          field: "tipodepago",
          align: "right",
          sortable: true
        },
        {
          name: "precio",
          label: "Precio",
          field: row => row.precio,
          align: "right",
          sortable: true
        },
        { name: "city", label: "Ciudad", field: row => row.billing.city },
        {
          name: "city_ori",
          label: "Ciudad Ori",
          field: row => row.billing.city_ori
        },
        {
          name: "shipping_address_1",
          label: "Direccion Envio",
          field: row => row.billing.address_1
        },
        {
          name: "phone",
          label: "Telf",
          field: row => row.billing.phone
        },
        {
          name: "email",
          label: "Correo",
          field: row => row.billing.email
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
    ...mapActions("ordenes", [
      "callOrdenes",
      "OlvaEnvio",
      "call_realizar_envio",
      "setFechaIni",
      "setFechaFin"
    ]),
    async calcular_rango() {
      if (this.ini_date != 0 && this.fin_date != 0) {
        const calculo = Number(this.fin_date) - Number(this.ini_date);
        console.log("calculo->", calculo);
        if (calculo <= 200) {
          await Loading.show({
            spinner: QSpinnerGears,
            spinnerColor: "green-5",
            spinnerSize: 80
          });
          await this.callOrdenes({
            page: 2,
            cant: 100,
            ini: this.ini_date,
            fin: this.fin_date
          });
          this.list = this.getOrdenes;
          this.selected = []
          await Loading.hide();
        } else {
          this.$q.notify({
            position: "top-right",
            color: "red",
            message: `Los registros no pueden exceder los 200`
          });
        }
      }
    },
    async cargar_ordenes() {
      await this.calcular_rango();
    },
    addselect(e) {
      console.log("e", e);
      const foundIndex = this.selected.findIndex(x => x.id == e.id);
      console.log("foundIndex", foundIndex);
      if (foundIndex < 0) {
        this.selected.push(e);
      } else {
        const newArray = this.selected.filter(item => item.id !== e.id);
        console.log(newArray);
        this.selected = newArray;
      }
    },
    tipoDePago(obj, e) {
      // console.log("tipoDePago->",e)
      const item = obj;
      const foundIndex = this.list.findIndex(x => x.id == item.id);
      // items[foundIndex] = item;
      // console.log(foundIndex)
      // console.log(this.list[foundIndex])
      // this.list[foundIndex].tipodepago = e
      // console.log(this.list[foundIndex])
      this.$store.commit("ordenes/SetEstado", {
        id: foundIndex,
        estado: e
      });
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    async realizar_envio() {
      const items = JSON.stringify(this.selected);
      // console.log(cantidad);
      console.log(this.selected.length);
      if (this.selected.length > 0) {
        this.$q
          .dialog({
            title: "Confirm",
            message: "Quieres realizar el envio?",
            cancel: true,
            persistent: true
          })
          .onOk(async () => {
            // console.log("Puede pasar");
            await Loading.show({
              spinner: QSpinnerBars,
              spinnerColor: "green-5",
              spinnerSize: 80
              // backgroundColor: "purple",
              // message: "Estamos enviando tus pedidos",
              // messageColor: "black"
            });
            // console.log("items", items);
            const envioOlva = await this.call_realizar_envio(items);
            console.log("envioOlva->", envioOlva);
            if (envioOlva.codRes === "00") {
              this.$q.notify({
                message: "Proceso Correcto!",
                color: "green-8",
                position: "top-right"
              });
              this.selected = [];
              // await this.callOrdenes({
              //   page: 2,
              //   cant: 100,
              //   ini: this.ini_date,
              //   fin: this.fin_date
              // });
              // this.list = this.getOrdenes;
              await this.calcular_rango();
              await Loading.hide();
            } else if (envioOlva.codRes === "01") {
              this.$q.notify({
                message: "Verifica comuna ó estado Tipo de envios!",
                color: "blue-8",
                position: "top-right"
              });
              this.selected = [];
              await Loading.hide();
            } else {
              this.$q.notify({
                message: "Error Controlado!",
                color: "yellow-8",
                position: "top-right"
              });
              this.selected = [];
              await Loading.hide();
            }
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      } else {
        this.$q.notify({
          message: "Debe selecionar items para enviar",
          color: "red-8",
          position: "top-right"
        });
      }
    },
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
      return list.filter(item => item.billing.city === city);
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
    },
    showLoading() {
      /* This is for Codepen (using UMD) to work */
      const spinner =
        typeof QSpinnerFacebook !== "undefined"
          ? QSpinnerFacebook // Non-UMD, imported above
          : Quasar.components.QSpinnerFacebook; // eslint-disable-line
      /* End of Codepen workaround */

      this.$q.loading.show({
        spinner,
        spinnerColor: "yellow",
        spinnerSize: 80,
        backgroundColor: "purple",
        message: "Some important process is in progress. Hang on...",
        messageColor: "black"
      });

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    }
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
  async mounted() {
    await this.calcular_rango();
    // this.loading = true;
    // if (this.ini_date == 0 && this.fin_date == 0) {
    // } else {
    //   await Loading.show({
    //     spinner: QSpinnerGears,
    //     spinnerColor: "green-5",
    //     spinnerSize: 80
    //   });
      // await this.callOrdenes({
      //   page: 2,
      //   cant: 100,
      //   ini: this.ini_date,
      //   fin: this.fin_date
      // });
      // this.list = this.getOrdenes;


      // const array = this.getOrdenes;
      // this.list = array;
      // for (let index = 0; index < array.length; index++) {
      //   const element = array[index];
      //   this.status.push(element.status);
      //   this.city.push(element.shipping.city);
      //   this.payment_method_title.push(element.payment_method_title);
      // }
      // await Loading.hide();
    // }
  }
};
</script>
