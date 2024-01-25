<script lang="ts" setup>
import type { CreateBookingBody, Travel } from "~/schemas";
import { CreateBookingBodySchema } from "~/schemas";

interface Emits {
  (e: "submit", values: CreateBookingBody): void;
}

const emit = defineEmits<Emits>();
const travelApi = useTravelApi();

const { data: travels, pending: loadingTravels } = useAsyncData(
  () => travelApi.list(),
  { default: () => [] }
);

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
const paymentOptions = [
  { label: "Credit Transfer", value: "Credit Transfer" },
  { label: "PayPal", value: "PayPal" },
  { label: "Revolut", value: "Revolut" },
];

const currentStep = ref(1);

const validationSchemas = [
  CreateBookingBodySchema.pick({ travel_id: true }),
  CreateBookingBodySchema.pick({ customer: true }),
  CreateBookingBodySchema.pick({ payment_type: true, notes: true }),
];

const currentValidationSchema = computed(() =>
  toTypedSchema(validationSchemas[currentStep.value - 1])
);

const form = useForm({
  validationSchema: currentValidationSchema,
});

const { defineField, errors } = form;

const [travelId, travelIdProps] = defineField("travel_id", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const selectedTravel = computed<Travel | undefined>({
  set: (travel) => {
    travelId.value = travel!.id;
  },
  get: () => travels.value.find((travel) => travel.id === travelId.value),
});

// Customer fields
const [customerName, customerNameProps] = defineField("customer.name", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [customerPhone, customerPhoneProps] = defineField("customer.phone", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [customerEmail, customerEmailProps] = defineField("customer.email", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [customerGender, customerGenderProps] = defineField("customer.gender", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [customerAge, customerAgeProps] = defineField("customer.age", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [paymentType, paymentTypeProps] = defineField("payment_type", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [notes, notesProps] = defineField("notes", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const onSubmit = () => emit("submit", form.values as CreateBookingBody);
</script>

<template>
  <UiProgressBar class="mb-3" :value="currentStep - 1" :max-value="3" />

  <UiFormSteps
    v-model:current-step="currentStep"
    :form="form"
    @submit="onSubmit"
  >
    <UiFormStep title="Where do we go?" class="flex justify-center h-[40vh]">
      <UiFormField
        class="w-3/4 pt-5"
        name="travel_id"
        :error-message="errors['travel_id']"
      >
        <TravelSelect
          v-model="selectedTravel"
          v-bind="travelIdProps"
          :loading="loadingTravels"
          :travels="travels"
        />
      </UiFormField>
    </UiFormStep>

    <UiFormStep
      title="Customer Data"
      class="flex flex-col justify-center gap-5 h-[40vh]"
    >
      <UiFormField
        label="Customer Name"
        name="customer.name"
        :error-message="errors['customer.name']"
      >
        <UiFormInput v-model="customerName" v-bind="customerNameProps" />
      </UiFormField>

      <div class="flex gap-5">
        <UiFormField
          class="flex-1"
          label="Customer Phone"
          name="customer.phone"
          :error-message="errors['customer.phone']"
        >
          <UiFormInput v-model="customerPhone" v-bind="customerPhoneProps" />
        </UiFormField>

        <UiFormField
          class="flex-1"
          label="Customer Email"
          name="customer.email"
          :error-message="errors['customer.email']"
        >
          <UiFormInput v-model="customerEmail" v-bind="customerEmailProps" />
        </UiFormField>
      </div>

      <div class="flex gap-5">
        <UiFormField
          class="flex-1"
          label="Customer Gender"
          name="customer.gender"
          :error-message="errors['customer.gender']"
        >
          <UiFormSelect
            v-model="customerGender"
            :options="genderOptions"
            v-bind="customerGenderProps"
          />
        </UiFormField>

        <UiFormField
          class="flex-1"
          label="Customer Age"
          name="customer.age"
          :error-message="errors['customer.age']"
        >
          <UiFormInput v-model="customerAge" v-bind="customerAgeProps" />
        </UiFormField>
      </div>
    </UiFormStep>

    <UiFormStep
      title="Payment Type"
      class="flex flex-col justify-center gap-5 h-[40vh]"
    >
      <UiFormField
        label="Payment Type"
        name="payment_type"
        :error-message="errors['payment_type']"
      >
        <UiFormSelect
          v-model="paymentType"
          :options="paymentOptions"
          v-bind="paymentTypeProps"
        />
      </UiFormField>
      <UiFormField
        label="Notes (optional)"
        name="notes"
        :error-message="errors['notes']"
      >
        <UiFormInput v-model="notes" type="textarea" v-bind="notesProps" />
      </UiFormField>
    </UiFormStep>
  </UiFormSteps>
</template>
