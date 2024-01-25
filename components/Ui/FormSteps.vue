<script lang="ts" setup generic="V extends object">
import type { FormContext } from "vee-validate";

interface Props {
  submitBtnLabel?: string;
  form: FormContext<V>;
}

const props = withDefaults(defineProps<Props>(), {
  submitBtnLabel: "Submit",
});

interface Emits {
  (e: "submit", values: V): void;
}
const emit = defineEmits<Emits>();

const currentStep = defineModel<number>("currentStep", { default: 1 });
provide("currentStep", currentStep);

// updated from children to automatically count the steps
const steps = ref(0);
provide("steps", steps);

const isFirstStep = computed(() => currentStep.value === 1);
const isLastStep = computed(() => currentStep.value === steps.value);

const prev = () => {
  if (!isFirstStep.value) currentStep.value -= 1;
};

const next = () => {
  !isLastStep.value
    ? (currentStep.value += 1)
    : emit("submit", props.form.values);
};

const onSubmit = props.form.handleSubmit(() => next());
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot
      :current-step="currentStep"
      :is-first-step="isFirstStep"
      :is-last-step="isLastStep"
      :steps="steps"
    />

    <div class="mt-5 flex justify-between items-center">
      <UiButton
        label="Back"
        type="button"
        variant="neutral"
        :disabled="isFirstStep"
        @click="prev"
      />

      <UiButton type="submit" :label="isLastStep ? submitBtnLabel : 'Next'" />
    </div>
  </form>
</template>
