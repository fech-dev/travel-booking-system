<script lang="ts" setup>
interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "neutral" | "success" | "warning" | "danger";
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  variant: "neutral",
});

const model = defineModel<string>();

const sizes = {
  sm: "py-1 px-2 text-sm rounded-sm",
  md: "py-2 px-4 rounded",
  lg: "py-3 px-6 text-lg rounded-lg shadow",
};

const variants = {
  neutral: [
    "border-surface-200",
    "hover:shadow-primary hover:border-primary",
    "focus:shadow-primary focus:border-primary-600",
  ],
  success: [
    "border-success",
    "hover:shadow-success-600/50",
    "focus:shadow-success-600/75",
  ],
  warning: [
    "border-warning",
    "hover:shadow-warning-600/50",
    "focus:shadow-warning-600/75",
  ],
  danger: [
    "border-danger",
    "hover:shadow-danger-600/50",
    "focus:shadow-danger-600/75",
  ],
};

const classes = computed(() => [
  "leading-1 border shadow bg-slate-100",
  "transition duration-200 ease-out",
  "focus:outline-none",
  sizes[props.size],
  variants[props.variant],
]);

const attrs = useAttrs();

const id = inject<string>("id", attrs.id as string);
</script>

<template>
  <input :id="id" v-model="model" :class="classes" />
</template>
