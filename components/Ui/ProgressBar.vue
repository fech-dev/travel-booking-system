<script lang="ts" setup>
interface Props {
  value?: number;
  maxValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  maxValue: 100,
});

const wrapper = ref<HTMLDivElement | null>(null);

const barWidth = computed(() => {
  if (!wrapper.value) {
    return undefined;
  }

  const wrapperWidth = wrapper.value.offsetWidth;
  const width = (wrapperWidth * props.value) / props.maxValue;
  return `${width}px`;
});
</script>

<template>
  <div ref="wrapper" class="rounded-full bg-surface-100 shadow h-2">
    <div
      class="bg-primary rounded-full h-full transition-all duration-300 ease-out"
      :style="{ width: barWidth }"
    ></div>
  </div>
</template>
