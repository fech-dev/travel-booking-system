<script lang="ts" setup>
const onCreateBooking = () => {};
</script>

<template>
  <div class="container">
    <h1 class="text-4xl font-semibold uppercase text-primary-800 mb-6">
      Bookings
    </h1>
    <BookingsTable @create="onCreateBooking" />
  </div>
</template>
