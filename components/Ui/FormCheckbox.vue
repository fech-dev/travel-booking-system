<script lang="ts" setup>
interface Props {
  label?: string;
  checkedValue?: any;
  uncheckedValue?: any;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  checkedValue: true,
  uncheckedValue: false,
});

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const id = computed(() => (attrs.id as string) || Date.now().toString());

const model = defineModel<any>({
  default: false,
});

const isChecked = computed(() => {
  return model.value === props.checkedValue
    ? true
    : model.value === props.uncheckedValue
      ? false
      : undefined;
});

const setModelValue = (event: Event) => {
  const { checked } = event.target as HTMLInputElement;

  model.value = checked ? props.checkedValue : props.uncheckedValue;
};
</script>

<template>
  <label :for="id" class="inline-flex gap-2 items-baseline cursor-pointer">
    <input
      v-bind="attrs"
      :id="id"
      type="checkbox"
      class="hidden"
      :checked="isChecked"
      @change="setModelValue"
    />

    <div
      class="w-6 aspect-square border-2 rounded-sm shadow p-1 bg-surface-50 hover:border-primary-400 transition-colors duration-150 ease-in-out"
      :class="[model && 'border-primary', !model && 'border-primary-200']"
    >
      <Transition
        enter-from-class="scale-0"
        enter-active-class="transition-transform duration-150 ease-out"
        leave-active-class="transition-transform duration-150 ease-in"
        leave-to-class="scale-0"
      >
        <div v-show="isChecked" class="w-full h-full bg-primary"></div>
      </Transition>
    </div>

    <div v-if="label || $slots.default" class="text-sm">
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>
