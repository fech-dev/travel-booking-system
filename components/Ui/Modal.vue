<script lang="ts" setup>
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: undefined,
});

const visible = defineModel<boolean>("visible", { default: false });

const show = () => {
  visible.value = true;
};

const hide = () => {
  visible.value = false;
};

const toggle = () => (visible.value ? hide() : show());

watchEffect(() => {
  if (document?.body) {
    visible.value
      ? document.body.style.setProperty("overflow", "hidden")
      : document.body.style.removeProperty("overflow");
  }
});

defineOptions({ inheritAttrs: false });

defineExpose({
  show,
  hide,
  toggle,
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300 ease-in-out"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-to-class="opacity-0"
    >
      <UiBackdrop
        v-if="visible"
        data-testid="modal-backdrop"
        class="flex justify-center items-center overflow-y-auto"
        @click.self="hide"
      >
        <div
          class="shadow-lg bg-surface-200 rounded-md flex-1"
          v-bind="$attrs"
          data-testid="modal"
        >
          <!-- header -->
          <div
            class="py-5 px-8 flex items-center justify-between"
            data-testid="modal-header"
          >
            <slot v-if="title || $slots.header" name="header">
              <h2
                class="text-2xl text-primary-800 font-semibold uppercase"
                data-testid="modal-title"
              >
                {{ title }}
              </h2>
            </slot>

            <slot name="close-button">
              <UiButton variant="transparent" size="sm" @click="hide">
                <Icon name="uil:times" class="text-xl" />
              </UiButton>
            </slot>
          </div>

          <!-- content -->
          <div class="py-5 px-8" data-testid="modal-content">
            <slot />
          </div>
        </div>
      </UiBackdrop>
    </Transition>
  </Teleport>
</template>
