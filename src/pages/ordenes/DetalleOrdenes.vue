<template>
  <div class="fit row wrap justify-start items-start content-start">
    <div class="col-md-4 col-xs-12" style="overflow: auto;">
      <q-list separator>
        <q-item>
          <q-item-section>
            <q-card class="my-card-1">
              <q-list>
                <q-item>
                  <q-item-section class="text-h6">Acciones:</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>
                      <q-select
                        dense
                        standout
                        v-model="model"
                        :options="options"
                        label="Reembolso por CULQUI"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label side left>
                      <q-btn
                        rounded
                        size="sm"
                        color="blue-8"
                        text-color="white"
                        label="Aplicar"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-table
                      dense
                      flat
                      hide-header
                      hide-bottom
                      title="Historial de acciones:"
                      :data="data"
                      :columns="columns"
                      row-key="name"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">
                      Estado del Despacho:
                    </q-item-label>
                    <div class="q-pa-sm">
                      <q-option-group
                        :options="optionsR"
                        label="Notifications"
                        type="radio"
                        v-model="group"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-md-8 col-xs-12" style="overflow: auto;">
      <q-list separator>
        <q-item id="pedidos">
          <q-item-section>
            <q-card class="my-card-2">
              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">
                      Pedido: #0001
                    </q-item-label>
                    <q-item-label caption>Detalle:</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-card flat class="my-card-1">
                      <q-card-section>
                        <q-list dense>
                          <q-item>
                            <q-item-section>
                              <b>Detalles:</b>
                            </q-item-section>
                            <q-item-section>
                              <b>Datos de envio:</b>
                            </q-item-section>
                            <q-item-section> </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label
                                ><u>Fecha de pedido:</u>
                                17/05/2020</q-item-label
                              >
                            </q-item-section>
                            <q-item-section>
                              <q-item-label
                                ><u>Nombre:</u> Miguel Rodriguez</q-item-label
                              >
                            </q-item-section>
                            <q-item-section>
                              <q-item-label
                                ><u>Direccion:</u> Los Olivos, Villa
                                Sol</q-item-label
                              >
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>
                                <q-select
                                  style="width: 195px"
                                  dense
                                  v-model="model"
                                  :options="options"
                                  label="estado"
                                />
                              </q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label><u>DNI:</u> 001811517</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>
                                <u>Distrito:</u> Los Olivos
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label> <u>Canal:</u> Web </q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label
                                ><u>Correo:</u>
                                miguekos1233@gmail.com</q-item-label
                              >
                            </q-item-section>
                            <q-item-section>
                              <q-item-label><u>Cidudad:</u> Lima</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label></q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label
                                ><u>Celular:</u> 965778450</q-item-label
                              >
                            </q-item-section>
                            <q-item-section>
                              <q-item-label><u>Región:</u> Lima</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>
        <q-item id="articulos">
          <q-item-section>
            <q-card class="my-card-2">
              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">
                      Articulos:
                    </q-item-label>
                    <q-item-label caption>Detalles:</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-card class="my-card-1">
                      <q-card-section>
                        <q-list dense>
                          <q-item>
                            <q-item-section>Blusa Amaranta</q-item-section>
                            <q-item-section side right>
                              <q-btn round size="xs" color="red" label="" />
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>SKU: BBNOD1S</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Talla: S</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label class="text-red-5"
                                >Alerta: Stock Agotado</q-item-label
                              >
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>ID Productos: 0001</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Color: Blanco</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label></q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-card class="my-card-1">
                      <q-card-section>
                        <q-list dense>
                          <q-item>
                            <q-item-section>Blusa Amaranta</q-item-section>
                            <q-item-section side right>
                              <q-btn round size="xs" color="red" label="" />
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>SKU: BBNOD1S</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Talla: S</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label class="text-red-5"
                                >Alerta: Stock Agotado</q-item-label
                              >
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>ID Productos: 0001</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>Color: Blanco</q-item-label>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label></q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>
        <q-item id="envio">
          <q-item-section>
            <q-card class="my-card-2">
              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">
                      Envio
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-card flat class="my-card-1">
                      <q-card-section>
                        <q-list dense separator>
                          <q-item>
                            <q-item-section>Envio provincia</q-item-section>
                            <q-item-section side right>
                              S./ 16.00
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>Tracking Code:</q-item-label>
                            </q-item-section>
                            <q-item-section side right>
                              <q-item-label>2095854</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label>Proveedor Logistico</q-item-label>
                            </q-item-section>
                            <q-item-section side right>
                              <q-item-label>Olva Courier</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
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
      group: null,
      optionsR: [
        { label: "Pendiente de recojo", value: "bat" },
        { label: "Recogido", value: "friend", color: "green" },
        { label: "En espera proveedor", value: "upload", color: "red" },
        { label: "En ruta proveedor", value: "ruta", color: "teal" },
        { label: "Entregado", value: "entre", color: "indigo" }
      ],
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 0
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Dessert (100g serving)",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        }
      ],
      data: [
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "19:00 17/05/2020 Stock reservado Blusa Bohemia",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    ...mapActions("ordenes", ["mongolvaGet"])
  },
  async created() {
    // await Loading.show({
    //   spinner: QSpinnerGears,
    //   spinnerColor: "blue-5",
    //   spinnerSize: 80
    // });
    // await this.mongolvaGet();
    // await Loading.hide();
  }
};
</script>
<style lang="stylus">
.my-card-1 {
  // border: 1px solid
  border-radius: 15px 15px 15px 15px;
}

.my-card-2 {
  // border: 1px solid
  background-color: #ffffff
  border-radius: 15px 15px 15px 15px;
}
</style>
