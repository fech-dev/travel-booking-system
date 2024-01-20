import { it, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import UiFormInput from "~/components/Ui/FormInput.vue";

describe("<UiFormInput />", () => {
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

  it("should set the id from parent component", () => {
    const wrapper = mount(UiFormInput, {
      global: { provide: { id: "test" } },
    });

    expect(wrapper.attributes().id).toBe("test");
  });

  it("should set id from attrs if id is not provided", () => {
    const wrapper = mount(UiFormInput, {
      attrs: { id: "testing" },
    });

    expect(wrapper.attributes().id).toBe("testing");
  });
});
