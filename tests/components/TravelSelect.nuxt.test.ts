import { test, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import TravelSelect from "~/components/TravelSelect.vue";
import { createTravel } from "../factories/travel";
import UiFormInput from "~/components/Ui/FormInput.vue";

const travelNames = [
  "Road to Milan",
  "Road to Rome",
  "Road to Cagliari",
  "Road to London",
  "Road to Japan",
];

const travels = travelNames.map((name) => ({ ...createTravel(), name }));

describe("<TravelSelect />", () => {
  test("should render a UiFormInput", () => {
    const wrapper = mount(TravelSelect, {
      props: { travels },
    });

    expect(wrapper.findComponent(UiFormInput).exists()).toBe(true);
    expect(wrapper.findComponent(UiFormInput).isVisible()).toBe(true);
  });

  test("renders a list of given travels", async () => {
    const wrapper = mount(TravelSelect, {
      props: { travels },
    });

    await wrapper.findComponent(UiFormInput).trigger("click");

    const list = wrapper.find("ul");
    expect(list.isVisible()).toBe(true);
    expect(list.findAll("li")).toHaveLength(travels.length);
  });

  test("travels can be filtered by name", async () => {
    const wrapper = mount(TravelSelect, {
      props: { travels },
    });

    await wrapper.findComponent(UiFormInput).setValue("an");
    expect(wrapper.findAll("ul li")).toHaveLength(2);
  });

  test("when a travel is selected, should emit the 'update:modelValue' event with the selected travel", () => {});

  test("when a travel is selected, the search input should have the selected travel's full name", async () => {});
});
