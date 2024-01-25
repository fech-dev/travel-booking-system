export const useVisibilityControls = (initalValue: boolean = false) => {
  const visible = ref(initalValue);

  const show = () => (visible.value = true);
  const hide = () => (visible.value = false);
  const toggle = () => (visible.value = !visible.value);

  return { visible, show, hide, toggle };
};
