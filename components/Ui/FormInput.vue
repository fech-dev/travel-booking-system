<script lang="ts" setup>
import type { AppConfig } from "nuxt/schema";

interface Props {
  size?: keyof AppConfig["ui"]["input"]["sizes"];
  variant?: keyof AppConfig["ui"]["input"]["variants"];
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "neutral",
  type: "text",
});

const model = defineModel<any>();

const { ui } = useAppConfig();

const classes = computed(() => [
  ui.input.base,
  ui.input.sizes[props.size],
  ui.input.variants[props.variant],
]);

const attrs = useAttrs();

const name = inject<string>("name", attrs.name as string);
</script>

<template>
  <textarea
    v-if="props.type === 'textarea'"
    v-model="model"
    :name="name"
    :class="classes"
  />
  <input v-else v-model="model" :name="name" :type="type" :class="classes" />
</template>
