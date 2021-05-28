import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import Nav from "./index.vue";
import ChevronDownIcon from "@/components/ui-elements/ChevronDownIcon";
import SearchIcon from "@/components/ui-elements/SearchIcon.vue";
import CloseIcon from "@/components/ui-elements/CloseIcon.vue";
import ProfileIcon from "@/components/ui-elements/ProfileIcon.vue";
import MenuIcon from "@/components/ui-elements/MenuIcon.vue";
import NotificationIcon from "@/components/ui-elements/NotificationIcon.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("ChevronDownIcon", ChevronDownIcon);
localVue.component("SearchIcon", SearchIcon);
localVue.component("CloseIcon", CloseIcon);
localVue.component("ProfileIcon", ProfileIcon);
localVue.component("MenuIcon", MenuIcon);
localVue.component("NotificationIcon", NotificationIcon);

describe("Nav", () => {
  it("active modifier present on form when searchActive is true", async () => {
    const store = new Vuex.Store({
      state: {
        clientWidth: 0,
        scrollPos: 0,
      },
      actions: {
        searchOpen: jest.fn(),
      },
    });

    const wrapper = mount(Nav, {
      localVue,
      store,
    });

    expect(wrapper.find(".nav__search-form").exists()).toBe(true);
    const searchForm = wrapper.find(".nav__search-form");
    expect(wrapper.findComponent({ ref: "search-button" }).exists()).toBe(true);
    const button = wrapper.findComponent({ ref: "search-button" });
    await button.trigger("click");
    expect(searchForm.classes()).toContain("nav__search-form--active");
  });

  it("dispatches searchActive status when search button clicked", async () => {
    const mockActions = {
      searchOpen: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        clientWidth: 0,
        scrollPos: 0,
      },
      actions: mockActions,
    });

    const wrapper = mount(Nav, {
      localVue,
      store,
    });

    expect(wrapper.findComponent({ ref: "search-button" }).exists()).toBe(true);
    const button = wrapper.findComponent({ ref: "search-button" });
    await button.trigger("click");
    expect(mockActions.searchOpen).toHaveBeenCalled();
  });

  it("active modifier removed on form when searchActive is false", async () => {
    const mockActions = {
      searchOpen: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        clientWidth: 0,
        scrollPos: 0,
      },
      actions: mockActions,
    });

    const wrapper = mount(Nav, {
      localVue,
      store,
    });

    expect(wrapper.find(".nav__search-form").exists()).toBe(true);
    const searchForm = wrapper.find(".nav__search-form");
    expect(wrapper.find(".nav__close-button").exists()).toBe(true);
    const button = wrapper.find(".nav__close-button");
    await button.trigger("click");
    expect(searchForm.classes()).not.toContain("nav__search-form--active");
  });

  it("dispatches menuOpen status when menu button clicked", async () => {
    const mockActions = {
      menuOpen: jest.fn(),
    };

    const store = new Vuex.Store({
      state: {
        clientWidth: 0,
        scrollPos: 0,
      },
      actions: mockActions,
    });

    const wrapper = mount(Nav, {
      localVue,
      store,
    });

    expect(wrapper.find(".nav__menu-button").exists()).toBe(true);
    const button = wrapper.find(".nav__menu-button");
    await button.trigger("click");
    expect(mockActions.menuOpen).toHaveBeenCalled();
  });
});
