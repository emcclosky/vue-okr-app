import { mount } from "@vue/test-utils";
import KeyResultCard from "./index.vue";

const ProgressBarStub = {
  name: "ProgressBar",
  template: "<div />",
  props: ["progress"],
};

describe("KeyResultCard", () => {
  it("processes valid props data", () => {
    const wrapper = mount(KeyResultCard, {
      propsData: {
        keyResult: {
          result: "I am a key result",
          completionRate: "0",
        },
      },
    });
    expect(wrapper.vm.keyResult.result).toMatch("I am a key result");
    expect(wrapper.vm.keyResult.completionRate).toMatch("0");
  });

  it("prop values rendered in html elements", () => {
    const wrapper = mount(KeyResultCard, {
      propsData: {
        keyResult: {
          result: "I am a key result",
          completionRate: "0",
        },
      },
    });
    expect(wrapper.find("p").text()).toMatch("I am a key result");
    expect(wrapper.find(".key-result-card__percentage").text()).toMatch("0%");
  });

  it("rendered child component", () => {
    const wrapper = mount(KeyResultCard, {
      stubs: { ProgressBar: ProgressBarStub },
      propsData: {
        keyResult: {
          result: "I am a key result",
          completionRate: "0",
        },
      },
    });
    expect(wrapper.findComponent({ name: "ProgressBar" }).exists()).toBe(true);
  });
});
