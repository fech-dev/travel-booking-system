<script lang="ts" setup>
interface Props {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "neutral" | "primary" | "success" | "warning" | "danger";
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  size: "md",
  variant: "primary",
  icon: "",
});

const sizes = {
  sm: "py-1 px-2 rounded text-sm",
  md: "py-2 px-4 rounded",
  lg: "py-4 px-6 rounded text-lg",
};

const variants = {
  neutral: [
    "bg-surface-100 border-surface-100 text-slate-800",
    "hover:bg-surface-200 hover:shadow-surface-200",
    "focus:border-surface-200",
  ],
  primary: [
    "bg-primary-500 border-primary-500 text-white",
    "hover:bg-primary-600 hover:shadow-primary-500",
    "focus:border-primary-600",
  ],
  success: [
    "bg-success-500 border-success-500 text-white",
    "hover:bg-success-600 hover:shadow-success-500",
    "focus:border-success-600",
  ],
  warning: [
    "bg-warning-500 border-warning-500 text-white",
    "hover:bg-warning-600 hover:shadow-warning-600",
    "focus:border-warning-600",
  ],
  danger: [
    "bg-danger-500 border-danger-500 text-white",
    "hover:bg-danger-600 hover:shadow-danger-600",
    "focus:border-danger-600",
  ],
};

const classes = computed(() => [
  "inline-flex justify-center items-center gap-2",
  "leading-1 text-center font-semibold uppercase",
  "select-none cursor-pointer border",
  "transition-color duration-200 ease",
  "hover:shadow hover:-translate-y-[1px]",
  "focus:shadow focus:outline-none focus:outline-offset-0",
  "disabled:pointer-events-none disabled:cursor-default disabled:opacity-75",
  sizes[props.size],
  variants[props.variant],
]);
</script>

<template>
  <button :class="classes">
    <Icon v-if="icon" :name="icon" />
    {{ label }}
  </button>
</template>
