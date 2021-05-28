import VueRouter from "vue-router";
import { mount, createLocalVue } from "@vue/test-utils";
import CreateOkr from "./index.vue";

jest.mock("axios");
import axios from "axios";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe("CreateOkr", () => {
  it("renders properly", () => {
    const wrapper = mount(CreateOkr, {
      localVue,
      router,
      data() {
        return {
          submissionData: {
            objective: "objective",
            keyResults: [],
          },
        };
      },
    });
    expect(wrapper.vm).toBeTruthy();
  });

  it("axios post should be called when handleSubmit is invoked", async () => {
    const wrapper = mount(CreateOkr, {
      localVue,
      router,
      data() {
        return {
          submissionData: {
            objective: "objective",
            keyResults: [],
          },
        };
      },
    });
    await wrapper.vm.handleSubmit();
    expect(axios).toBeCalledWith({
      data: '{"objective":"objective","keyResults":[]}',
      headers: { "Content-Type": "application/json" },
      method: "post",
      url: "http://localhost:8000/okrs/okr",
    });
  });

  it("router should redirect to /okrs after axios put", async () => {
    const wrapper = mount(CreateOkr, {
      localVue,
      router,
      data() {
        return {
          submissionData: {
            objective: "objective",
            keyResults: [],
          },
        };
      },
    });
    router.push("/okrs/okr/1234");
    await wrapper.vm.handleSubmit();
    expect(router.currentRoute.fullPath).toEqual("/okrs");
  });

  it("adds new key result input when Add Key Result clicked", async () => {
    const wrapper = mount(CreateOkr, {
      localVue,
      router,
      data() {
        return {
          submissionData: {
            objective: "objective",
            keyResults: [],
          },
        };
      },
    });
    expect(wrapper.vm.keyResults.length).toEqual(0);
    await wrapper.find(".okr-form__add-more-button").trigger("click");
    expect(wrapper.vm.keyResults.length).toEqual(1);
  });

  it("click cancel calls $router.go with -1 param", async () => {
    const wrapper = mount(CreateOkr, {
      localVue,
      router,
    });
    const spy = jest.spyOn(router, "go");
    await wrapper.find(".button--border").trigger("click");
    expect(spy).toHaveBeenCalledWith(-1);
  });
});
