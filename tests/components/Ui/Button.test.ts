import { it, expect, describe } from "vitest";
import { mount } from "@vue/test-utils";
import UiButton from "~/components/Ui/Button.vue";

describe("<UiButton />", () => {
  it("should have label as text", () => {
    const wrapper = mount(UiButton, {
      props: { label: "Click Me" },
    });

    expect(wrapper.text()).toBe("Click Me");
  });
});
