<script lang="ts" setup>
import type {
  ModalInstance,
  BookingsTableInstance,
} from "~/components/instances";
import type { CreateBookingBody } from "~/schemas";

const bookingApi = useBookingApi();

const bookingsTable = ref<BookingsTableInstance | null>(null);
const createBookingModal = ref<ModalInstance | null>(null);

const onCreateBooking = () => {
  createBookingModal.value?.show();
};

const creatingBooking = ref(false);
const createBooking = async (body: CreateBookingBody) => {
  try {
    creatingBooking.value = true;

    await bookingApi.create(body);
    createBookingModal.value?.hide();
    alert("Booking created successfully");
  } catch (error) {
    alert(`Cannot create booking`);
  } finally {
    creatingBooking.value = false;
    bookingsTable.value?.refresh();
  }
};
</script>

<template>
  <div>
    <div class="container">
      <h1 class="text-4xl font-semibold uppercase text-primary-800 mb-6">
        Bookings
      </h1>

      <BookingsTable ref="bookingsTable" @create="onCreateBooking" />
    </div>

    <UiModal ref="createBookingModal" class="max-w-5xl" title="Create Booking">
      <CreateBookingForm @submit="createBooking" />
    </UiModal>
  </div>
</template>
