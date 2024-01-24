<script lang="ts" setup>
import type { AppConfig } from "nuxt/schema";

const { ui } = useAppConfig();

interface Props {
  label?: string;
  size?: keyof AppConfig["ui"]["button"]["sizes"];
  variant?: keyof AppConfig["ui"]["button"]["variants"];
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  size: "md",
  variant: "primary",
  icon: "",
});

const classes = computed(() => [
  ui.button.root,
  ui.button.sizes[props.size],
  ui.button.variants[props.variant],
]);
</script>

<template>
  <button :class="classes">
    <slot>
      <Icon v-if="icon" :name="icon" />
      {{ label }}
    </slot>
  </button>
</template>
