<script lang="ts" setup>
interface Props {
  title?: string;
}

defineProps<Props>();

defineOptions({ inheritAttrs: false });

const currentStep = inject<Ref<number>>("currentStep");
const steps = inject<Ref<number>>("steps", ref(0));

const stepId = ++steps.value;

const isVisible = computed(() => currentStep?.value === stepId);
</script>

<template>
  <div v-show="isVisible">
    <h3 v-if="title" class="text-primary-800 uppercase text-2xl font-semibold">
      {{ title }}
    </h3>

    <div v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>
