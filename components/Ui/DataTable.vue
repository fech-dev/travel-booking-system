<script lang="ts" setup generic="TRow extends Record<string, any> = {}">
import { get } from "lodash-es";

export type DataTableColumn<T extends Record<string, any>> = {
  prop: keyof T;
  label: string;
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

const selected = defineModel<TRow[] | undefined>("selected", {
  default: [],
});

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
 * If the row is selected, will be removed from the selected list, otherwise will be addedd.
 */
const toggleSelectedRow = (row: TRow) => {
  if (!props.selectable) return;
  const selected = isSelected(row);

  selectionHandlers[props.selectionMode]?.call(undefined, row, !selected);
};
</script>

<template>
  <div class="overflow-auto bg-primary-100 text-primary-900 rounded">
    <table class="w-full relative">
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
            <td class="px-5 py-4 text-left">
              {{
                !column.value
                  ? get(row, column.prop)
                  : column.value(get(row, column.prop))
              }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
