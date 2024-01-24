<script lang="ts" setup>
interface Props {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  label: undefined,
  hasError: false,
  errorMessage: undefined,
});

const attrs = useAttrs() as { id?: string };

const { ui } = useAppConfig();

provide<string | undefined>("id", attrs.id);
</script>

<template>
  <div class="flex flex-col">
    <label :for="attrs.id" :class="ui.formField.label">
      {{ label }}
    </label>
    <slot />

    <div v-show="hasError && errorMessage" :class="ui.formField.errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
