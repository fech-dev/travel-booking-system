<script lang="ts" setup generic="TRow extends Record<string, any> = {}">
import { get } from "lodash-es";

export type DataTableColumn<T extends Record<string, any>> = {
  prop: keyof T;
  label?: string;
  cellClass?: string | string[] | object | object[];
  value?: (value: any) => any;
};

interface Props {
  loading?: boolean;
  selectable?: boolean;
  selectionMode?: "single" | "multiple";
  columns: DataTableColumn<TRow>[];
  data?: TRow[];
  dataKey?: string;
  stripped?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  loading: false,
  selectable: false,
  selectionMode: "single",
  dataKey: "id",
  stripped: false,
});

const isEmpty = computed(() => !props.data || props.data.length === 0);

const selected = defineModel<TRow[] | undefined>("selected", {
  default: [],
});

const clearSelected = () => {
  selected.value = [];
};

const isSelected = (row: TRow): boolean => {
  if (!selected.value?.length) return false;

  return !!selected.value.find(
    (item) => item[props.dataKey] === row[props.dataKey]
  );
};

const selectionHandlers = {
  single: (row: TRow, select: boolean) => {
    if (select) selected.value = [row];
    else selected.value = [];
  },
  multiple: (row: TRow, select: boolean) => {
    if (select) {
      selected.value = [...selected.value!, row];
    } else {
      const rowIndex = selected.value?.findIndex(
        (item) => item[props.dataKey] === row[props.dataKey]
      );

      if (!rowIndex || rowIndex === -1) return;

      selected.value = selected.value!.toSpliced(rowIndex, 1);
    }
  },
};

/**
 * Check if a given row is selected.
 * If the row is selected, will be removed from the selected list, otherwise will be added.
 */
const toggleSelectedRow = (row: TRow) => {
  if (!props.selectable) return;
  const selected = isSelected(row);

  selectionHandlers[props.selectionMode]?.call(undefined, row, !selected);
};

defineExpose({ clearSelected });
</script>

<template>
  <div class="overflow-auto bg-primary-100 text-primary-900 rounded relative">
    <Transition
      enter-from-class="opacity-0 scale-0"
      enter-active-class="transition duration-300 ease-in-out"
      leave-active-class="transition duration-300 ease-in-out"
      leave-to-class="opacity-0 scale-0"
    >
      <div
        v-if="isEmpty || loading"
        class="absolute top-0 left-0 w-full h-full flex justify-center items-center text-surface-50 text-2xl z-30"
        :class="[
          isEmpty && 'bg-primary-900/40',
          loading && 'bg-primary-900/70',
        ]"
      >
        <div v-show="isEmpty && !loading">No data found...</div>
        <div v-show="loading">Loading data...</div>
      </div>
    </Transition>

    <table class="w-full">
      <thead class="sticky top-0 bg-primary-100">
        <tr>
          <td v-if="selectable" class="px-5 py-4">&nbsp;</td>

          <template v-for="column of columns" :key="column.prop">
            <th class="px-5 py-4 text-left">{{ column.label }}</th>
          </template>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, i) of data"
          :key="i"
          tabindex="0"
          class="transition-colors duration-200 hover:bg-primary-300/50"
          :class="[
            selectable && 'cursor-pointer',
            isSelected(row) && 'bg-primary-400/50',
            stripped && 'odd:bg-surface-100',
          ]"
          @click="toggleSelectedRow(row)"
        >
          <td v-if="selectable" class="px-5 py-4">
            <UiFormCheckbox
              type="checkbox"
              :model-value="isSelected(row)"
              @update:model-value="toggleSelectedRow(row)"
            />
          </td>

          <template v-for="column of columns" :key="column.prop">
            <td class="px-5 py-4 text-left" :class="column.cellClass">
              <slot
                :name="`${String(column.prop)}-cell`"
                v-bind="{ column, row }"
              >
                {{
                  !column.value
                    ? get(row, column.prop)
                    : column.value(get(row, column.prop))
                }}
              </slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
