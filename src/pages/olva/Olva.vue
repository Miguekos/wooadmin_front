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
      title="Envios ForceXpress"
      :data="getOlva"
      :columns="columns"
      row-key="id"
      :pagination.sync="initialPagination"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top-right>
        <div class="row">
          <div class="col-xs-4 col-md q-pa-xs">
            <q-input
              dense
              filled
              debounce="300"
              v-model="filter"
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
          </div>
          <div class="col-xs-4 col-md q-pa-xs">
            <q-input dense filled v-model="fechaIncio" label="ID Minimo"/>
          </div>
          <div class="col-xs-4 col-md q-pa-xs">
            <q-input dense filled v-model="fechaFin" label="ID Maximo"/>
          </div>
          <div class="col-xs-6 col-md q-pa-xs">
            <q-btn
              class="full-width"
              color="orange-6"
              @click="cargar_ordenes()"
              text-color="white"
              label="Cargar"
            />
          </div>
          <div class="col-xs-6 col-md q-pa-xs">
            <q-btn
              color="primary"
              label="Imprimir"
              class="text-black full-width"
              @click="generandopdfs()"
            ></q-btn>
          </div>
          <div class="col-xs-12 col-md q-pa-xs">
            <q-btn
              color="green"
              label="Reporte"
              class="text-white full-width"
              @click="download()"
            ></q-btn>
          </div>
        </div>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-blue q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied"/>
          <span> Bueno... esto es triste: {{ message }} </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon"/>
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
import {mapGetters, mapActions, mapState} from "vuex";
import {Loading, QSpinnerGears, QSpinnerBars} from "quasar";
import {date} from "quasar";
import XLSX from "xlsx";

export default {
  computed: {
    ...mapGetters("ordenes", ["getOlva"]),
    ...mapState("ordenes", ["ini_date", "fin_date"]),
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
    }
  },
  data() {
    return {
      selected: [],
      filter: "",
      json_fields: {
        name: "Nombre",
        lastname: "Apellido",
        idpedido: "Pedido",
        registro: "Registro",
        comuna: "Comuna",
        control: "Control",
        direccion: "Direccion",
        // estado: "Estado",
        proveedores: "Proveedor",
        responsable: "Responsable",
        telf: "Telefono",
        tipodepago: "Tipo de pago",
        user_registrante: "User Registrante",
        valordeflete: "Valor de flete",
      },
      initialPagination: {
        sortBy: "id",
        descending: true,
        page: 1,
        rowsPerPage: 200
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "id",
          label: "Codigo Woo",
          align: "left",
          field: row => row[0].id,
          format: val => `${val}`,
          sortable: true
        },
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
    ...mapActions("ordenes", [
      "mongolvaGet",
      "get_generarpdfs",
      "setFechaIni",
      "setFechaFin"
    ]),
    renameKeys(obj, newKeys) {
      const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        if (newKeys[key] !== undefined) {
          // console.log(fechaOrder);
          if (key === "created_at") {
            let newDate = new Date(obj[key]);
            return {
              [newKey]: date.formatDate(newDate, "ddd DD/MM/YY - hh:mm a")
            };
          } else {
            return {[newKey]: obj[key]};
          }
        }
      });
      return Object.assign({}, ...keyValues);
    },
    download() {
      if (this.selected.length > 0) {
        // console.log(typeof this.dateExpo);
        // console.log(this.tab);
        let dataExport = [];
        for (let index = 0; index < this.selected.length; index++) {
          const objID = this.selected[index].registro;
          const obj = this.selected[index];
          // console.log('obj', obj)
          const renamedObj = this.renameKeys({
            ...obj,
            ...objID
          }, this.json_fields);
          // console.log("renamedObj", renamedObj);
          dataExport.push(renamedObj);
        }
        console.log('dataExport', dataExport.sort((a, b) => (a.registro > b.registro) ? 1 : -1))
        const myHeader = ["Nombre", "Apellido", "Pedido", "Registro", "Telefono", "Comuna", "Control", "Direccion", "Proveedor", "Tipo de pago", "Valor de flete"];
        const data = XLSX.utils.json_to_sheet(dataExport, {header: myHeader});
        const wb = XLSX.utils.book_new();
        let timeStamp = Date.now();
        const filename = `${date.formatDate(timeStamp, "DD_MM_YYYY_SS")}`;
        XLSX.utils.book_append_sheet(wb, data, "data");
        XLSX.writeFile(wb, `${filename}.xlsx`);
        this.selected = []
      } else {
        this.$q.notify({
          message: "debe selecionar 1 registro como minimo para exportar"
        })
      }
    },
    async calcular_rango() {
      const calculo = Number(this.fin_date) - Number(this.ini_date);
      console.log("calculo->", calculo);
      if (calculo <= 200) {
        await Loading.show({
          spinner: QSpinnerGears,
          spinnerColor: "green-5",
          spinnerSize: 80
        });
        await this.mongolvaGet({
          ini: this.ini_date,
          fin: this.fin_date
        });
        this.selected = [];
        await Loading.hide();
      } else {
        this.$q.notify({
          position: "top-right",
          color: "red",
          message: `Los registros no pueden exceder los 200`
        });
      }
    },
    async cargar_ordenes() {
      await this.calcular_rango();
    },
    async page_loading_ini() {
      await this.$q.loading.show();
    },
    async page_loading_end() {
      await this.$q.loading.hide();
    },
    async generandopdfs() {
      this.$q.loading.show();
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
        if (response.codRes === "00") {
          await this.descargar(response.id);
          this.$q.dialog({
            title: 'Reporte',
            message: 'Quieres descargar el reporte generado?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            this.download()
          }).onOk(() => {
            // console.log('>>>> second OK catcher')
          }).onCancel(() => {
            // console.log('>>>> Cancel')
          }).onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          })
          // this.selected = [];
        }
        this.$q.loading.hide();
      } else {
        console.log("esta en 0");
        this.$q.loading.hide();
      }
    },
    async descargar(e) {
      console.log("value", e);
      await this.page_loading_ini();
      fetch(`https://api.apps.com.pe/fileserver/tickets/${e}_2.pdf`, {
        method: "GET", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(async response => response.blob())
        .then(async blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = `${e}-${uuid.v4()}.pdf`;
          a.click();
          a.remove();
          setTimeout(() => window.URL.revokeObjectURL(url), 100);
          // console.log('UUID v1:', uuid.v1());
          // console.log('UUID v4:', uuid.v4());
          await this.page_loading_end();
        })
        .catch(async err => {
          console.log(err);
          await this.page_loading_end();
        });
    }
  },
  async created() {
    await this.calcular_rango();
    // if (this.ini_date == 0 && this.fin_date == 0) {
    // } else {
    //   await Loading.show({
    //     spinner: QSpinnerGears,
    //     spinnerColor: "blue-5",
    //     spinnerSize: 80
    //   });
    //   await this.mongolvaGet({
    //     ini: this.ini_date,
    //     fin: this.fin_date
    //   });
    //   await Loading.hide();
    // }
  }
};
</script>
