// GLOBALS
const sizes = {
  sm: "py-1 px-2 rounded text-sm",
  md: "py-2 px-4 rounded h-10",
  lg: "py-4 px-6 rounded text-lg",
};

// COMPONENTS
const button = {
  root: [
    "inline-flex justify-center items-center gap-2",
    "leading-1 text-center font-semibold uppercase",
    "select-none cursor-pointer border",
    "transition-color duration-200 ease",
    "hover:shadow hover:-translate-y-[1px]",
    "focus:shadow focus:outline-none focus:outline-offset-0",
    "disabled:pointer-events-none disabled:cursor-default disabled:opacity-75",
  ],
  variants: {
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
    transparent: [
      "bg-transparent border-transparent",
      "hover:bg-surface-500/20 hover:shadow-surface-500/50",
      "focus:shadow-primary-200/75",
    ],
  },
  sizes,
};

const formField = {
  label: "uppercase mb-1 font-semibold",
  errorMessage: [
    "mt-2  py-1 px-2",
    "text-sm rounded-md",
    "text-danger-600 bg-danger-100",
  ],
};

const input = {
  base: [
    "leading-1 border shadow bg-slate-100",
    "transition duration-200 ease-out",
    "focus:outline-none",
  ],
  variants: {
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
  },
  sizes,
};

const textarea = input;

export default {
  button,
  formField,
  input,
  textarea,
};
