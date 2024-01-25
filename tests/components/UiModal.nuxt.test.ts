import { expect, describe, test } from "vitest";
import { mount } from "@vue/test-utils";
import UiModal from "~/components/Ui/Modal.vue";

describe("<Modal />", () => {
  test("should be hidden by default", () => {
    const wrapper = mount(UiModal, {
      global: { stubs: { teleport: true } },
    });

    expect(wrapper.find("[data-testid=modal]").exists()).toBe(false);
  });

  test("should be visible if 'visible' props is true", () => {
    const wrapper = mount(UiModal, {
      global: { stubs: { teleport: true } },
      props: { visible: true },
    });

    expect(wrapper.find("[data-testid=modal]").exists()).toBe(true);
  });

  test("should have a title", () => {
    const wrapper = mount(UiModal, {
      global: { stubs: { teleport: true } },
      props: { visible: true, title: "Awesome Modal" },
    });

    expect(
      wrapper.find("[data-testid=modal] [data-testid=modal-title]").text()
    ).toContain("Awesome Modal");
  });

  test.todo("renders header slot");

  test("renders content (default) slot", () => {
    const wrapper = mount(UiModal, {
      global: { stubs: { teleport: true } },
      props: { visible: true, title: "Awesome Modal" },
      slots: { default: () => "<div>Content...</div>" },
    });

    expect(
      wrapper.find("[data-testid=modal] [data-testid=modal-content]").html()
    ).toContain("<div>Content...</div>");
  });
});
