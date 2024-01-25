<script lang="ts" setup>
import type { BookingWithTravel } from "~/schemas";
import type { DataTableColumn } from "~/components/Ui/DataTable.vue";
import type { DataTableInstance } from "~/components/instances";

interface Emits {
  (e: "create"): void;
}

const emit = defineEmits<Emits>();

const bookingApi = useBookingApi();

const table = ref<DataTableInstance | null>(null);
const {
  data: bookings,
  pending: loadingBookings,
  refresh,
} = useAsyncData(() => bookingApi.list(), { default: () => [] });

const columns: DataTableColumn<BookingWithTravel>[] = [
  { prop: "id", label: "ID" },
  { prop: "travel.name", label: "Travel Name" },
  { prop: "customer.name", label: "Customer Name" },
  { prop: "customer.phone", label: "Customer Phone" },
  { prop: "customer.email", label: "Customer Email" },
  { prop: "customer.age", label: "Customer Age" },
  { prop: "customer.gender", label: "Customer Gender" },
  { prop: "payment_type", label: "Payment Type" },
  { prop: "notes", label: "Notes" },
];

defineExpose({
  refresh,
  clearSelected: () => table.value?.clearSelected(),
});
</script>

<template>
  <div>
    <div class="flex justify-end items-center">
      <UiButton
        label="Add Booking"
        icon="ph:plus-circle-fill"
        @click="emit('create')"
      />
    </div>

    <UiDataTable
      ref="table"
      class="h-[80vh] mt-3 shadow-lg"
      stripped
      :loading="loadingBookings"
      :columns="columns"
      :data="bookings"
    />
  </div>
</template>
