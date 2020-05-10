<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered separator>
      <!-- {{ InfoTratada }} -->
      <!-- <div v-for="InfoTratadas in InfoTratada">
        {{ InfoTratadas.name }}
        {{ InfoTratadas.value }}
      </div> -->
      <q-item clickable v-ripple v-for="(InfoTratadas, index) in InfoTratada" :key="index">
        <q-item-section>
          <!-- <q-item-label>{{ InfoTratadas.name }}</q-item-label> -->
          <q-item-label caption>{{ InfoTratadas.value }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
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
