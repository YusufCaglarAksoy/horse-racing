<template>
  <div
    class="flex-none lg:w-5/12 bg-insider-dark-blue py-4  h-full px-10 md:w-1/2 w-full lg:order-2 order-1 overflow-y-auto">
    <div class="flex justify-center flex-col h-full w-full overflow-y-auto" v-if="currentLap?.name">
      <div class="relative w-full h-16 flex pr-12 border border-white bg-gray-900"
           v-for="(horse,index) in currentLap.horses"
           :key="horse">
        <div
          class="w-10 vertical-mid [writing-mode:vertical-rl] rotate-180 flex justify-center bg-white items-center">
          {{ index + 1 }}
        </div>
        <div class="flex items-center h-full relative w-full border-gray-300 border-r-4">
          <div
            class="absolute flex items-center justify-center"
            :style="['color:'+horse?.color,'left:'+getPosition(horse?.position)+'%']"
          >
            <i class="fa-solid fa-horse text-4xl" :class="(horse.order===undefined && horse?.position)?'fa-shake':''"
               style="--fa-primary-color: #000000; --fa-secondary-opacity: 1;"></i>
            <div class="w-4 h-4 flex justify-center items-center absolute bg-black text-white rounded-full">{{
                horse?.id
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center"><h1 class="text-white text-2xl font-bold mt-5 lap-name lap-name">
        {{ currentLap?.name }} Lap -
        {{ currentLap?.distance }}m</h1></div>
      <div class="relative w-100"><h1 class="text-white text-2xl font-bold absolute right-5 -top-8">FINISH</h1></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentLap() {
      return this.$store.getters.currentLap
    },
  },
  methods: {
    getPosition(position) {
      return this.currentLap?.distance ? (position / this.currentLap?.distance) * 100 : 0
    },
  },
};
</script>
