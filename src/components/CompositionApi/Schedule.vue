<template>
  <div class="flex-none lg:w-4/12 h-full overflow-hidden md:w-1/2 w-full lg:order-3 order-2">
    <div class="flex h-full">
      <lap-list title="Program" :items="laps" type="horses"/>
      <lap-list title="Result" :items="results" type="result"/>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useStore} from 'vuex';
import LapList from './LapList.vue';

const store = useStore();

const laps = computed(() => store.state.laps);
const results = computed(() => store.state.results);
</script>
