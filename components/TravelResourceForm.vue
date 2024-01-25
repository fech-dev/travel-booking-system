<script lang="ts" setup>
import type { CreateTravelBody } from "~/schemas";
import { CreateTravelBodySchema } from "~/schemas";

interface Props {
  saving?: boolean;
  travel?: CreateTravelBody;
}

const props = withDefaults(defineProps<Props>(), {
  saving: false,
  travel: () => ({
    name: "",
    description: "",
    picture: "",
    price: "",
    average_user_rating: 0,
    departure_date: "",
    return_date: "",
  }),
});

interface Emits {
  (e: "save", travel: CreateTravelBody): void;
}

const emit = defineEmits<Emits>();

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(CreateTravelBodySchema),
  initialValues: props.travel,
});

const [name, nameProps] = defineField("name", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [description, descriptionProps] = defineField("description", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [picture, pictureProps] = defineField("picture", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [price, priceProps] = defineField("price", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [startsAt, startsAtProps] = defineField("departure_date", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const [endsAt, endsAtProps] = defineField("return_date", {
  props: (state) => ({ variant: getVariantByState(state) }),
});

const onSubmit = handleSubmit(
  (values) => {
    emit("save", values);
  },
  (errors) => {
    console.error(errors);
  }
);
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
    <UiFormField label="Name" name="name" :error-message="errors.name">
      <UiFormInput v-model="name" v-bind="nameProps" />
    </UiFormField>

    <UiFormField
      label="Description"
      name="description"
      :error-message="errors.description"
    >
      <UiFormInput
        v-model="description"
        type="textarea"
        v-bind="descriptionProps"
      />
    </UiFormField>

    <UiFormField
      label="Picture URL"
      name="picture"
      :error-message="errors.picture"
    >
      <UiFormInput v-model="picture" v-bind="pictureProps" />
    </UiFormField>

    <UiFormField
      name="price"
      label="Price for single pearson"
      :error-message="errors.price"
    >
      <UiFormInput v-model="price" v-bind="priceProps" />
    </UiFormField>

    <UiFormField
      label="Departure date"
      name="departure_date"
      :error-message="errors.departure_date"
    >
      <UiFormInput v-model="startsAt" type="date" v-bind="startsAtProps" />
    </UiFormField>

    <UiFormField
      label="Return date"
      name="return_date"
      :error-message="errors.return_date"
    >
      <UiFormInput v-model="endsAt" type="date" v-bind="endsAtProps" />
    </UiFormField>

    <div class="flex justify-end mt-2">
      <UiButton
        type="submit"
        label="Save"
        variant="success"
        :disabled="saving"
      />
    </div>
  </form>
</template>
