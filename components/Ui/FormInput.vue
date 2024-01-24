<script lang="ts" setup>
import type { AppConfig } from "nuxt/schema";

interface Props {
  size?: keyof AppConfig["ui"]["input"]["sizes"];
  variant?: keyof AppConfig["ui"]["input"]["variants"];
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "neutral",
});

const model = defineModel<any>();

const { ui } = useAppConfig();

const classes = computed(() => [
  ui.input.base,
  ui.input.sizes[props.size],
  ui.input.variants[props.variant],
]);

const attrs = useAttrs();

const id = inject<string>("id", attrs.id as string);
</script>

<template>
  <input :id="id" v-model="model" :class="classes" />
</template>
