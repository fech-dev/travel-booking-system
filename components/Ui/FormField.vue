<script lang="ts" setup>
interface Props {
  label?: string;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  errorMessage: undefined,
});

const attrs = useAttrs() as { name?: string };

const { ui } = useAppConfig();

provide<string | undefined>("name", attrs.name);
</script>

<template>
  <div class="flex flex-col">
    <label :for="attrs.name" :class="ui.formField.label">
      {{ label }}
    </label>
    <slot />

    <div v-show="errorMessage" :class="ui.formField.errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
