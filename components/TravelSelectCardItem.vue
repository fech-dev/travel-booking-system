<script lang="ts" setup>
import type { Travel } from "~/schemas";

interface Props {
  travel: Travel;
}

const props = defineProps<Props>();

const selected = inject<Ref<Travel | undefined>>("selected", ref());

const isSelected = computed(() => selected.value?.id === props.travel.id);
</script>

<template>
  <div
    class="flex cursor-pointer hover:bg-primary-100 hover:focus:bg-primary-200 transition-colors duration-200"
    :class="[!isSelected && 'bg-primary-50', isSelected && 'bg-primary-400']"
  >
    <!-- image -->
    <div class="flex-1 basis-1/4">
      <img
        :src="travel.picture"
        :alt="travel.name"
        class="object-cover h-full w-full"
      />
    </div>

    <!-- content -->
    <div class="flex-1 basis-3/4 py-4 px-5">
      <div class="uppercase text-primary-800 text-2xl font-semibold">
        {{ travel.name }}
      </div>

      <div class="flex gap-2">
        <div>
          <Icon name="clarity:airplane-solid" />
          {{ formatDate(travel.departure_date) }}
        </div>
        <div>
          <Icon name="clarity:airplane-solid" :rotate="90" />
          {{ formatDate(travel.return_date) }}
        </div>
      </div>

      <div>
        <span class="font-semibold text-lg text-primary">
          {{ travel.price }}
        </span>
        €/per person
      </div>

      <!-- rating -->
      <div class="flex text-lg text-nowrap whitespace-nowrap">
        <template v-for="i in Math.round(travel.average_user_rating)" :key="i"
          >⭐</template
        >
      </div>

      <div class="text-sm text-surface-600">{{ travel.description }}</div>
    </div>
  </div>
</template>
