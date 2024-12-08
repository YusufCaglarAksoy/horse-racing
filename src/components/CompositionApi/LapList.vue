<template>
  <div class="w-1/2 h-full flex flex-col">
    <div class="flex justify-center py-2 bg-insider-dark-blue">
      <h2 class="text-2xl text-white font-bold">{{ title }}</h2>
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-800 border-r border-insider-green" :class="[props?.type+'-list']">
      <div v-for="item in items" :key="item.id" class="item-block">
        <div class="flex justify-center bg-insider-green text-insider-dark-blue text-sm font-bold">
          <h6>{{ item?.name }} Lap - {{ item?.distance }}m</h6>
        </div>
        <list-table :data="item[type]" :columns="columns"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import ListTable from "./ListTable.vue";

const props = defineProps({
  title: {type: String, required: true},
  items: {type: Array, required: true},
  type: {type: String, required: true},
});

const columns = [
  {field: 'id', header: 'Id'},
  {field: 'name', header: 'Name'},
  {field: 'color', header: 'Color'},
];

</script>
