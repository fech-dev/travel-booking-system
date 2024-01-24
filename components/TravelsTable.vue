<script lang="ts" setup>
import type { Travel } from "~/schemas";
import type { DataTableColumn } from "~/components/Ui/DataTable.vue";
import type { DataTableInstance } from "~/components/instances";

interface Emits {
  (e: "create"): void;
  (e: "update", selectedTravels: Travel[]): void;
  (e: "delete", selectedTravels: Travel[]): void;
}

const emit = defineEmits<Emits>();

const travelApi = useTravelApi();

const table = ref<DataTableInstance | null>(null);
const {
  data: travels,
  pending: loadingTravels,
  refresh,
} = useAsyncData(() => travelApi.list(), { default: () => [] });

const filters = ref({ name: "" });

const { filteredData } = useTravelFilters(travels, filters);

const selectedTravels = ref<Travel[]>([]);

const columns: DataTableColumn<Travel>[] = [
  { prop: "picture", cellClass: "max-w-[8rem]" },
  { prop: "name", label: "Name" },
  { prop: "price", label: "Price" },
  { prop: "average_user_rating", label: "Rating" },
  {
    prop: "departure_date",
    label: "Departure Date",
    value: (v) => formatDate(v),
  },
  { prop: "return_date", label: "Return Date", value: (v) => formatDate(v) },
];

defineExpose({
  refresh,
  clearSelected: () => table.value?.clearSelected(),
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <!-- filters -->
      <div class="flex gap-2">
        <UiFormField>
          <UiFormInput v-model="filters.name" placeholder="Search Travel" />
        </UiFormField>
      </div>

      <!-- actions -->
      <div class="flex gap-2">
        <UiButton
          label="Add Travel"
          icon="ph:plus-circle-fill"
          @click="emit('create')"
        />
        <UiButton
          :disabled="!selectedTravels.length"
          variant="warning"
          icon="uil:edit"
          @click="emit('update', selectedTravels)"
        />
        <UiButton
          :disabled="!selectedTravels.length"
          variant="danger"
          icon="ph:trash-fill"
          @click="emit('delete', selectedTravels)"
        />
      </div>
    </div>

    <UiDataTable
      ref="table"
      v-model:selected="selectedTravels"
      class="h-[80vh] mt-3 shadow-lg"
      stripped
      selectable
      :loading="loadingTravels"
      :columns="columns"
      :data="filteredData"
    >
      <template #picture-cell="{ row }">
        <img
          :src="row.picture"
          :alt="row.name"
          class="object-contain object-center"
        />
      </template>
    </UiDataTable>
  </div>
</template>
