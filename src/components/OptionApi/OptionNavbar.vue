<template>
  <div class="w-full flex justify-between items-center h-20 px-10 shadow-lg">
    <h1 class="md:text-4xl text-2xl text-insider-dark-blue font-bold">Horse Racing</h1>
    <div class="flex gap-3">
      <button type="button" @click="generateLaps" data-cy="generate-program"
              class="shadow-md md:text-md text-sm md:px-5 text-insider-dark-blue hover:bg-insider-dark-blue hover:text-white font-medium focus:scale-100 transition-all px-2 py-1.5 bg-insider-green rounded-md focus:ring-2 hover:ring-insider-dark-blue focus:ring-offset-1 ring-insider-green">
        Generate Program
      </button>
      <button type="button" @click="stopRace" v-if="running"
              class="shadow-md md:text-md text-sm md:px-5 text-insider-dark-blue hover:bg-insider-dark-blue hover:text-white font-medium focus:scale-100 transition-all px-2 py-1.5 bg-insider-green rounded-md focus:ring-2 hover:ring-insider-dark-blue focus:ring-offset-1 ring-insider-green">
        Stop Race
      </button>
      <button type="button" @click="runLap" v-else
              class="shadow-md md:text-md text-sm md:px-5 text-insider-dark-blue hover:bg-insider-dark-blue hover:text-white font-medium focus:scale-100 transition-all px-2 py-1.5 bg-insider-green rounded-md focus:ring-2 hover:ring-insider-dark-blue focus:ring-offset-1 ring-insider-green">
        Start Race
      </button>
    </div>
  </div>
</template>
<script>

import {mapActions, mapState} from "vuex";

export default {
  computed: {...mapState(['running'])},
  methods: {
    ...mapActions(['generateLaps', 'runLap', 'stopRace']),
  }
}
</script>
