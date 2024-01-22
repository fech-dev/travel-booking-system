import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import UiFormCheckbox from "~/components/Ui/FormCheckbox.vue";

test("input element should be not visible", () => {
  const wrapper = mount(UiFormCheckbox);

  const input = wrapper.find("input[type=checkbox]");
  expect(input.classes()).toContain("hidden");
});

test("if is checked, should set modelValue prop with 'checked-value' value", async () => {
  const wrapper = mount(UiFormCheckbox, {
    props: {
      checkedValue: "yes",
      uncheckedValue: "no",
    },
  });

  const input = wrapper.find("input[type=checkbox]");
  await input.setValue(true);

  const emitted = wrapper.emitted();
  expect(emitted).toHaveProperty("update:modelValue");
  expect(emitted["update:modelValue"]).toHaveLength(1);
  expect(emitted["update:modelValue"][0]).toEqual(["yes"]);
});

test("if is not checked, should set the modelValue prop with 'unchecked-value' value", async () => {
  const wrapper = mount(UiFormCheckbox, {
    props: {
      modelValue: "yes",
      checkedValue: "yes",
      uncheckedValue: "no",
    },
  });

  const input = wrapper.find("input[type=checkbox]");
  await input.setValue(false);

  const emitted = wrapper.emitted();
  expect(emitted).toHaveProperty("update:modelValue");
  expect(emitted["update:modelValue"]).toHaveLength(1);
  expect(emitted["update:modelValue"][0]).toEqual(["no"]);
});
