<script lang="ts" setup>
import type { AppConfig } from "nuxt/schema";
import type { Travel } from "~/schemas";

interface Props {
  travels: Travel[];
  variant?: keyof AppConfig["ui"]["input"]["variants"];
}

const props = defineProps<Props>();

const inputName = inject<string>("name");

const search = ref("");

const filteredTravels = computed(() => {
  if (!search.value) return props.travels;

  return props.travels.filter((travel) =>
    travel.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const { visible: optionsVisible, show, hide } = useVisibilityControls();

const selected = defineModel<Travel>();

const setSelected = (travel: Travel) => {
  selected.value = travel;
};

watch(selected, (travel?: Travel) => {
  search.value = travel?.name || "";
});

provide("selected", selected);
</script>

<template>
  <div class="relative">
    <UiFormInput
      v-model="search"
      class="w-full relative z-10"
      :name="inputName"
      :variant="variant"
      placeholder="Search and select a travel"
      @focus.capture="show"
      @blur.capture="hide"
    />

    <Transition
      enter-from-class="opacity-0 -translate-y-10 -z-10"
      enter-active-class="transition duration-500 ease-in-out"
      leave-active-class="transition duration-500 ease-in-out"
      leave-to-class="opacity-0 -translate-y-10 -z-10"
    >
      <ul
        v-show="optionsVisible"
        class="absolute mt-2 rounded shadow overflow-y-auto w-full max-h-64"
      >
        <li
          v-for="travel of filteredTravels"
          :key="travel.id"
          class="border-b border-surface-200"
          @click="setSelected(travel)"
        >
          <TravelSelectCardItem :travel="travel" />
        </li>
      </ul>
    </Transition>
  </div>
</template>
