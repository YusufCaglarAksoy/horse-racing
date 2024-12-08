import {createStore} from "vuex";
import storeConfig from "@/store/index.js";
import Swal from "sweetalert2";

vi.mock("sweetalert2", async () => {
  const actual = await vi.importActual("sweetalert2");
  return {
    ...actual,
    default: {
      ...actual.default,
      fire: vi.fn(() => ({
        then: vi.fn((callback) => callback()),
      })),
    },
  };
});

describe("Vuex Store", () => {
  let store;

  beforeEach(() => {
    store = storeConfig;
  });

  it("generateHorses commits a list of 20 horses", async () => {
    await store.dispatch("generateHorses");

    expect(store.state.horses).toHaveLength(20);

    store.state.horses.forEach((horse, index) => {
      expect(horse).toMatchObject({
        id: index + 1,
        name: `Horse ${index + 1}`,
        condition: 100,
        speed: expect.any(Number),
        color: expect.any(String),
      });
    });
  });

  describe("Mutations", () => {

    it("SET_HORSES sets horses in state", () => {
      const horses = [{id: 1, name: "Horse 1"}];
      store.commit("SET_HORSES", horses);
      expect(store.state.horses).toEqual(horses);
    });

    it("SET_LAPS initializes laps and resets currentRound", () => {
      const laps = [{distance: 1200}, {distance: 1400}];
      store.commit("SET_LAPS", laps);
      expect(store.state.laps).toEqual(laps);
      expect(store.state.currentRound).toBe(0);
    });

    it("NEXT_ROUND increments currentRound and resets horse positions", () => {
      const horses = [
        {id: 1, position: 100, order: 1, distTarget: 200},
        {id: 2, position: 50, order: 2, distTarget: 150},
      ];
      store.commit("SET_HORSES", horses);
      store.commit("NEXT_ROUND");
      expect(store.state.currentRound).toBe(1);
      store.state.horses.forEach((horse) => {
        expect(horse.position).toBe(0);
        expect(horse.order).toBeUndefined();
        expect(horse.distTarget).toBe(0);
      });
    });
  });

  describe("Getters", () => {
    it("currentLap returns the current lap", () => {
      const laps = [{distance: 1200}, {distance: 1400}];
      store.commit("SET_LAPS", laps);
      expect(store.getters.currentLap).toEqual(laps[0]);
    });
  });

  describe("Actions", () => {
    it("generateHorses commits a list of 20 horses", async () => {
      await store.dispatch("generateHorses");

      expect(store.state.horses).toHaveLength(20);

      store.state.horses.forEach((horse, index) => {
        expect(horse).toMatchObject({
          id: index + 1,
          name: `Horse ${index + 1}`,
          condition: expect.any(Number),
          speed: expect.any(Number),
        });
      });
    });

    it("generateLaps commits a list of laps and results", async () => {
      await store.dispatch("generateHorses");
      await store.dispatch("generateLaps");
      expect(store.state.laps).toHaveLength(6);
      expect(store.state.results).toEqual(store.state.laps);
    });

    it("finishRace updates results and calls Swal.fire", async () => {
      const horses = [{id: 1, name: "Horse 1", order: 1}];
      const laps = [{name: "1ST", horses}];
      store.commit("SET_LAPS", laps);
      store.commit("SET_RESULTS", laps);

      await store.dispatch("finishRace");
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining("Lap Is Completed"),
        })
      );
    });

    it("runLap processes a lap and stops when completed", async () => {
      const horses = [
        {id: 1, position: 0, speed: 50, condition: 100},
        {id: 2, position: 0, speed: 60, condition: 100},
      ];
      const laps = [{distance: 100, horses}];
      store.commit("SET_LAPS", laps);
      store.commit("SET_HORSES", horses);

      await store.dispatch("runLap");
      expect(store.state.running).toBe(true);
    });

    it("stopRace toggles running state to false", async () => {
      store.commit("TOGGLE_RUNNING", true);
      await store.dispatch("stopRace");
      expect(store.state.running).toBe(false);
    });
  });
});
