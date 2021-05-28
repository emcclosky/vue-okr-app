import Vuex from "vuex";
import VueRouter from "vue-router";
import { mount, createLocalVue } from "@vue/test-utils";
import OkrCard from "./index.vue";
import DropdownMenu from "@/components/atoms/DropdownMenu";
import DropdownArrow from "@/components/ui-elements/DropdownArrow.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.component("DropdownMenu", DropdownMenu);
localVue.component("DropdownArrow", DropdownArrow);
const router = new VueRouter();

jest.mock("axios", () => ({
  delete: jest.fn(() =>
    Promise.resolve({
      okrs: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
    })
  ),
}));

import axios from "axios";

describe("OkrCard", () => {
  it("Objective completion rate calculated correctly", async () => {
    const wrapper = mount(OkrCard, {
      localVue,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    wrapper.vm.calculateObjectiveCompletion();
    expect(wrapper.find(".okr-card__percent").text()).toBe("20%");
  });

  it("toggleDropdown adds active class", async () => {
    const wrapper = mount(OkrCard, {
      localVue,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    const options = wrapper.find(".okr-card__options");
    await options.find("button").trigger("click");
    const dropdownMenu = wrapper.find(".dropdown-menu");
    expect(dropdownMenu.classes()).toContain("active");
  });

  it("toggleDropdown on active dropdown removes active class", async () => {
    const wrapper = mount(OkrCard, {
      localVue,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    const options = wrapper.find(".okr-card__options");
    options.find("button").trigger("click");
    const dropdownMenu = wrapper.find(".dropdown-menu");
    await options.find("button").trigger("click");
    expect(dropdownMenu.classes("active")).toBe(false);
  });

  it("okr data should be dispatched when editOkr is invoked", async () => {
    const mockActions = {
      setAllOkrData: jest.fn(),
      setOkrData: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        allOkrData: [],
      },
      actions: mockActions,
    });

    const wrapper = mount(OkrCard, {
      localVue,
      store,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    const okr = {
      _id: "1234",
    };
    await wrapper.vm.editOkr(okr);
    expect(mockActions.setOkrData).toHaveBeenCalled();
  });

  it("should redirect to /okr/okr/${okr._id} when editOkr is invoked", async () => {
    const mockActions = {
      setAllOkrData: jest.fn(),
      setOkrData: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        allOkrData: [],
      },
      actions: mockActions,
    });

    const wrapper = mount(OkrCard, {
      localVue,
      store,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    router.push("/okrs");
    const okr = {
      _id: "1234",
    };
    await wrapper.vm.editOkr(okr);
    expect(router.currentRoute.fullPath).toEqual("/okrs/okr/1234");
  });

  it("axios delete should be called when deleteOkr is invoked", async () => {
    const mockActions = {
      setAllOkrData: jest.fn(),
      setOkrData: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        allOkrData: [],
      },
      actions: mockActions,
    });

    const wrapper = mount(OkrCard, {
      localVue,
      store,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    const okr = {
      _id: "1234",
    };
    await wrapper.vm.deleteOkr(okr);
    expect(axios.delete).toBeCalledWith(
      `http://localhost:8000/okrs/okr/${okr._id}`
    );
  });

  it("axios delete should be called when deleteOkr is invoked", async () => {
    const mockActions = {
      setAllOkrData: jest.fn(),
      setOkrData: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        allOkrData: [],
      },
      actions: mockActions,
    });

    const wrapper = mount(OkrCard, {
      localVue,
      store,
      router,
      propsData: {
        data: {
          _id: "1234",
          objective: "I am an objective",
          keyResults: [{ results: "KR", completionRate: "20" }],
        },
      },
      data() {
        return {
          objectiveCompletion: 0,
          showKeyResults: false,
        };
      },
    });
    const okr = {
      _id: "1234",
    };
    await wrapper.vm.deleteOkr(okr);
    expect(mockActions.setAllOkrData).toHaveBeenCalled();
  });
});
