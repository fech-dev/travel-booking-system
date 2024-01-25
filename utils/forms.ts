import type { PublicPathState } from "vee-validate";

export const getVariantByState = <TValue = any>(
  state: PublicPathState<TValue>
): "success" | "danger" | undefined => {
  if (state.touched && state.dirty && state.valid) return "success";
  if (state.touched && state.dirty && !state.valid) return "danger";
  return undefined;
};
