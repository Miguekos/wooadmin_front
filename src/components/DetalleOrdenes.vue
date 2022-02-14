<template>
  <div class="q-pa-md">
    <q-list separator>
      <q-item v-for="(InfoTratadas, index) in InfoTratada" :key="index">
        <q-item-section>

          <q-item-label>{{ InfoTratadas.value.name }}</q-item-label>
          <q-item-label caption lines="2"
            >Precio: {{ InfoTratadas.value.price }}.00 $</q-item-label
          >
          <q-item-label caption lines="2">Cant. {{
            InfoTratadas.value.quantity
          }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>ID: {{
            InfoTratadas.value.product_id
          }}</q-item-label>
<!--          <q-icon name="star" color="yellow" />-->
        </q-item-section>
        <q-separator spaced inset />
      </q-item>

    </q-list>
<!--    <q-list bordered separator>-->
<!--      &lt;!&ndash; {{ InfoTratada }} &ndash;&gt;-->
<!--      &lt;!&ndash; <div v-for="InfoTratadas in InfoTratada">-->
<!--        {{ InfoTratadas.name }}-->
<!--        {{ InfoTratadas.value }}-->
<!--      </div> &ndash;&gt;-->
<!--      <q-item-->
<!--        clickable-->
<!--        v-ripple-->
<!--        v-for="(InfoTratadas, index) in InfoTratada"-->
<!--        :key="index"-->
<!--      >-->
<!--        <q-item-section>-->
<!--          <q-item-label-->
<!--            >ID: <b>{{ InfoTratadas.value.product_id }}</b></q-item-label-->
<!--          >-->
<!--          <q-item-label-->
<!--            >Producto: <b>{{ InfoTratadas.value.name }}</b></q-item-label-->
<!--          >-->
<!--          <q-item-label-->
<!--            >Precio: <b>{{ InfoTratadas.value.price }}.00 $</b></q-item-label-->
<!--          >-->
<!--          <q-item-label-->
<!--            >Cantidad:-->
<!--            <b>{{ InfoTratadas.value.quantity }}.00 $</b></q-item-label-->
<!--          >-->

<!--          &lt;!&ndash;          <q-item-label&ndash;&gt;-->
<!--          &lt;!&ndash;            >Producto: <b>{{ InfoTratadas.value.name }}</b></q-item-label&ndash;&gt;-->
<!--          &lt;!&ndash;          >&ndash;&gt;-->
<!--          &lt;!&ndash;          <q-item-label caption>{{ InfoTratadas.value }}</q-item-label>&ndash;&gt;-->
<!--          &lt;!&ndash;          <q-item-label caption>{{ InfoTratadas.value }}</q-item-label>&ndash;&gt;-->
<!--        </q-item-section>-->
<!--      </q-item>-->
<!--    </q-list>-->
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Array,
      required: true
    }
  },
  computed: {
    InfoTratada() {
      // console.log(Object.values(this.info));
      // const array = this.info
      const array = Object.values(this.info);
      let salida = [];
      console.log(array.length);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const jsonString = {
          // name: index,
          value: element
        };
        salida.push(jsonString);
        // console.log(index);
      }
      return salida;
    }
  }
};
</script>
