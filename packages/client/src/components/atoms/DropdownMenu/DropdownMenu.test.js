import { shallowMount } from "@vue/test-utils";
import DropdownMenu from "./index.vue";

describe("DropdownMenu", () => {
  it("processes valid props data", () => {
    const wrapper = shallowMount(DropdownMenu, {
      propsData: {
        dropdownOptions: [
          {
            name: "Edit",
            action: jest.fn(),
            icon: "EditIcon",
          },
        ],
        element: {
          _id: "123",
          objective: "Is objective",
          keyResults: [],
        },
      },
    });
    expect(wrapper.vm.dropdownOptions[0].name).toMatch("Edit");
    expect(wrapper.vm.element.objective).toMatch("Is objective");
  });

  it("handleAction called on click", () => {
    const wrapper = shallowMount(DropdownMenu, {
      propsData: {
        dropdownOptions: [
          {
            name: "Edit",
            action: jest.fn(),
            icon: "EditIcon",
          },
        ],
        element: {
          _id: "123",
          objective: "Is objective",
          keyResults: [],
        },
      },
    });
    expect(wrapper.find(".dropdown-menu__option").exists()).toBe(true);
    const dropdownOption = wrapper.find(".dropdown-menu__option");

    const spy = spyOn(wrapper.vm, "handleAction");
    dropdownOption.trigger("click");
    expect(spy).toHaveBeenCalledWith(wrapper.vm.dropdownOptions[0]);
  });
});
