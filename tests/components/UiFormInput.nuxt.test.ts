import { it, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import UiFormInput from "~/components/Ui/FormInput.vue";

describe("<UiFormInput />", () => {
  it("should render a input element", () => {
    const wrapper = mount(UiFormInput);

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should render a textarea element", () => {
    const wrapper = mount(UiFormInput, {
      props: { type: "textarea" },
    });

    expect(wrapper.find("textarea").exists()).toBe(true);
  });

  it("has v-model", async () => {
    const wrapper = mount(UiFormInput, {
      props: {
        modelValue: "",
        "onUpdate:modelValue": (value: string) =>
          wrapper.setProps({ modelValue: value }),
      },
    });

    await wrapper.find("input").setValue("testing");
    expect(wrapper.props("modelValue")).toBe("testing");
  });

  it("should set the name from parent component", () => {
    const wrapper = mount(UiFormInput, {
      global: { provide: { name: "test" } },
    });

    expect(wrapper.attributes().name).toBe("test");
  });

  it("should set id from attrs if id is not provided", () => {
    const wrapper = mount(UiFormInput, {
      attrs: { id: "testing" },
    });

    expect(wrapper.attributes().id).toBe("testing");
  });
});
