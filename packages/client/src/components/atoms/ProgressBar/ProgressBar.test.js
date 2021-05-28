import { shallowMount } from "@vue/test-utils";
import ProgressBar from "./index.vue";

describe("ProgressBar", () => {
  it("processes valid props data", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        progress: "50",
      },
    });
    expect(wrapper.vm.progress).toMatch("50");
  });

  it("assigns width based on prop data", () => {
    const wrapper = shallowMount(ProgressBar, {
      propsData: {
        progress: "50",
      },
    });
    expect(wrapper.find(".progress-bar__progress").attributes().style).toBe(
      "width: 50%;"
    );
  });

  it("assigns 0% width when no prop data passed", () => {
    const wrapper = shallowMount(ProgressBar, {});
    expect(wrapper.find(".progress-bar__progress").attributes().style).toBe(
      "width: 0%;"
    );
  });
});
