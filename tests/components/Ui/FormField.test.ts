import { it, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import UiFormField from "~/components/Ui/FormField.vue";

describe("<UiFormField />", () => {
  it("should have a default slot (default state)", () => {
    const wrapper = mount(UiFormField, {
      slots: { default: '<input name="test"/>' },
    });

    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().name).toBe("test");
  });

  it("should provide id attribute on default slot", () => {
    const ChildComponent = defineComponent({
      setup() {
        const id = inject<string>("id");
        return { id };
      },
      template: `<input :id="id" />`,
    });

    const wrapper = mount(UiFormField, {
      attrs: { id: "test" },
      slots: { default: h(ChildComponent) },
    });

    const inputEl = wrapper.find("input");
    expect(inputEl.attributes().id).toBe("test");
  });

  it("should have a label", () => {
    const wrapper = mount(UiFormField, {
      props: { label: "Test Name" },
    });

    const label = wrapper.find("label");
    expect(label.text()).toBe("Test Name");
  });

  it("should show the feedback message", () => {
    const wrapper = mount(UiFormField, {
      props: {
        hasError: true,
        errorMessage: "Name field is required",
      },
    });

    const el = wrapper.find("label + div");
    expect(el.isVisible()).toBe(true);
    expect(el.text()).toBe("Name field is required");
  });
});
