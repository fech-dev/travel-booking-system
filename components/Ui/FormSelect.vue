<script
  lang="ts"
  setup
  generic="OptionType extends { label: string; value: string }"
>
import type { AppConfig } from "nuxt/schema";

interface Props {
  size?: keyof AppConfig["ui"]["input"]["sizes"];
  variant?: keyof AppConfig["ui"]["input"]["variants"];
  options: OptionType[];
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
  <select v-model="model" :class="classes" :name="name">
    <option></option>
    <option v-for="(option, i) of options" :key="i" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
