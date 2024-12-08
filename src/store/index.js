import {createStore} from "vuex";
import Swal from "sweetalert2";

export default createStore({
  state: {
    horses: [],
    laps: [],
    results: [],
    currentRound: 0,
    running: false,
  },
  mutations: {
    SET_HORSES(state, horses) {
      state.horses = horses
    },
    SET_LAPS(state, laps) {
      state.running = false
      state.laps = laps
      state.currentRound = 0
    },
    SET_RESULTS(state, results) {
      state.results = results
    },
    UPDATE_RESULT(state, result) {
      state.results[state.currentRound] = result
    },
    NEXT_ROUND(state) {
      state.currentRound++
      state.horses.forEach(h => {
        h.position = 0
        h.order = undefined
        h.distTarget = 0
      })
    },
    UPDATE_HORSE_CONDITION(state, {horseId, newCondition}) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.condition = newCondition;
      }
    },
    TOGGLE_RUNNING(state, isRunning) {
      state.running = isRunning;
    },
  },
  getters: {
    currentLap: (state) => state.laps[state.currentRound],
  },
  actions: {
    generateHorses({commit}) {
      const horses = Array.from({length: 20}, (_, i) => ({
        id: i + 1,
        name: `Horse ${i + 1}`,
        condition: 100,
        speed: Math.floor(Math.random() * 51) + 80,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255} ,${Math.random() * 255})`
      }))

      commit("SET_HORSES", horses)
    },
    generateLaps({state, dispatch, commit}) {
      dispatch("generateHorses")
      const laps = [1200, 1400, 1600, 1800, 2000, 2200].map((dist, index) => ({
        distance: dist,
        name: (index + 1) + (["ST", "ND", "RD"][((index + 1) % 10) - 1] || "TH"),
        horses: state.horses.sort(() => 0.5 - Math.random()).slice(0, 10),
        result: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      }));

      commit("SET_LAPS", laps)
      commit("SET_RESULTS", laps)
    },
    finishRace({commit, state, dispatch, getters}) {
      const lap = getters.currentLap

      lap.horses.forEach(horse => {
        commit("UPDATE_HORSE_CONDITION", {
          horseId: horse?.id,
          newCondition: horse?.condition
        })
      })

      const result = [...lap.horses]
        .sort((a, b) => a.order - b.order)
        .map(({id, name, order, position, color, condition}) => ({
          id,
          name,
          order,
          position,
          color,
          condition,
        }));

      const winner = result[0]?.name;

      Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 15000,
        icon: "info",
        title: lap?.name + " Lap Is Completed.",
        text: winner + " won this lap.",
        confirmButtonText: state?.currentRound === 5 ? "Generate New Program" : "Next Lap",
        confirmButtonColor: "#051235",
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).then(() => {
        if (state?.currentRound === 5) {
          dispatch("generateLaps")
        } else {
          commit("NEXT_ROUND");
        }
      })

      commit("UPDATE_RESULT", {...lap, result});
    },
    runLap({state, commit, getters, dispatch}) {
      let lap = getters.currentLap
      console.log(lap)
      if (!lap?.horses || !lap?.horses.length) {
        Swal.fire("", "Please Generate Program", "warning")
        return
      }
      commit("TOGGLE_RUNNING", true);

      let finishedHorseCount = 0;
      let raceInterval = setInterval(() => {
        if (!state.running) {
          clearInterval(raceInterval);
          return
        }
        lap.horses.forEach(horse => {
          if (horse.order !== undefined) return;

          if (!horse?.distTarget) horse.distTarget = 100

          if (!horse?.position) horse.position = 0

          //horse.position += (horse.speed / horse?.condition);
          horse.position += ((Math.random() * 5) * horse.speed) / (horse?.condition * 2);

          if (horse.position >= horse?.distTarget) {
            horse.distTarget += 100
            horse.condition = Math.max(0, horse.condition - 1);
          }
          if (horse.position >= lap?.distance) {
            horse.order = finishedHorseCount++
          }
        });

        if (lap.horses.every(horse => horse.position >= lap.distance)) {
          clearInterval(raceInterval);
          commit("TOGGLE_RUNNING", false);
          dispatch("finishRace")
        }
      }, 1);
    },
    stopRace({commit}) {
      commit("TOGGLE_RUNNING", false);
    },
  }
})
