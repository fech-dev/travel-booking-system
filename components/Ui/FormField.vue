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

provide<string | undefined>("id", attrs.id);
</script>

<template>
  <div class="flex flex-col">
    <label :for="attrs.id" class="uppercase mb-1">{{ label }}</label>

    <slot />

    <div
      v-show="hasError && errorMessage"
      class="mt-2 text-sm py-1 px-2 rounded-md text-danger-600 bg-danger-100"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
