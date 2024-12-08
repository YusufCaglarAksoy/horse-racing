<template>
  <div class="flex-none lg:w-4/12 h-full overflow-hidden md:w-1/2 w-full lg:order-3 order-2">
    <div class="flex h-full">
      <option-lap-list title="Program" :items="laps" type="horses"/>
      <option-lap-list title="Result" :items="results" type="result"/>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {mapState} from "vuex";
import OptionListTable from "@/components/OptionApi/OptionListTable.vue";
import OptionLapList from "@/components/OptionApi/OptionLapList.vue";

export default defineComponent({
  components: {OptionLapList, OptionListTable,},
  computed: {
    ...mapState(["laps", "results"]),
  },
});
</script>
