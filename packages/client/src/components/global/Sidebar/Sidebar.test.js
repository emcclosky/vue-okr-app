import Vuex from "vuex";
import VueRouter from "vue-router";
import { mount, createLocalVue } from "@vue/test-utils";
import Sidebar from "./index.vue";
import PerformanceIcon from "@/components/ui-elements/PerformanceIcon";
import DropdownArrow from "@/components/ui-elements/DropdownArrow.vue";
import CloseIcon from "@/components/ui-elements/CloseIcon.vue";
import SettingIcon from "@/components/ui-elements/SettingIcon.vue";
import DashboardIcon from "@/components/ui-elements/DashboardIcon.vue";
import TaskIcon from "@/components/ui-elements/TaskIcon.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.component("PerformanceIcon", PerformanceIcon);
localVue.component("DropdownArrow", DropdownArrow);
localVue.component("CloseIcon", CloseIcon);
localVue.component("SettingIcon", SettingIcon);
localVue.component("DashboardIcon", DashboardIcon);
localVue.component("TaskIcon", TaskIcon);

const router = new VueRouter();

describe("Sidebar", () => {
  it("active modifier removed from sidebar when menuOpen is false", async () => {
    const mockActions = {
      menuOpen: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        menuOpen: true,
      },
      actions: mockActions,
    });

    const wrapper = mount(Sidebar, {
      localVue,
      store,
      router,
    });

    expect(wrapper.vm.menuOpen).toBe(true);
    const sidebar = wrapper.find(".sidebar");
    expect(sidebar.classes()).toContain("sidebar--open");
    await wrapper.find(".sidebar__close-button").trigger("click");
    expect(sidebar.classes()).not.toContain("sidebar--active");
  });

  it("dispatches menuOpen status when close button clicked", async () => {
    const mockActions = {
      menuOpen: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        menuOpen: true,
      },
      actions: mockActions,
    });

    const wrapper = mount(Sidebar, {
      localVue,
      store,
      router,
    });

    expect(wrapper.vm.menuOpen).toBe(true);
    await wrapper.find(".sidebar__close-button").trigger("click");
    expect(mockActions.menuOpen).toHaveBeenCalled();
  });

  it("route-link goes to /okrs", () => {
    const store = new Vuex.Store({
      state: {
        menuOpen: true,
      },
      actions: {
        menuOpen: jest.fn(),
      },
    });

    const wrapper = mount(Sidebar, {
      localVue,
      store,
      router,
    });

    const links = wrapper.findAll("a");
    expect(links.at(0).props("to")).toBe("/okrs");
  });
});
