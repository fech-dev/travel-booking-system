<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

interface Props {
  label: string;
  to: RouteLocationRaw;
}

defineProps<Props>();
</script>

<template>
  <li>
    <NuxtLink
      class="inline-block px-2 py-2 text-lg uppercase hover:text-primary-400 transition duration-200 ease-out"
      active-class="text-primary text-xl"
      :to="to"
    >
      {{ label }}
    </NuxtLink>
  </li>
</template>
