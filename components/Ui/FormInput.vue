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

const id = inject<string>("id", attrs.id as string);
</script>

<template>
  <textarea
    v-if="props.type === 'textarea'"
    :id="id"
    v-model="model"
    :class="classes"
  />
  <input v-else :id="id" v-model="model" :type="type" :class="classes" />
</template>
