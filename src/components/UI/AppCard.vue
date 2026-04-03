<template>
  <div :class="['card', `card--${variant}`]">
    <div class="card__header">
      <slot name="card-header"></slot>
    </div>

    <div v-if="$slots['card-content']" class="card__content">
      <slot name="card-content"></slot>
    </div>

    <div v-if="$slots['card-footer']" class="card__footer">
      <slot name="card-footer"></slot>
    </div>

    <div v-if="$slots['card-action']" class="card__action">
      <slot name="card-action"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'normal'
  }
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-card);
  border-radius: var(--radius-main);
  width: 100%;
}

.card__header {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  min-height: 48px;
  padding: var(--gap-m) var(--gap-m) 0 var(--gap-m);
}

.card__content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-m);
  padding: var(--gap-xl);
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-xl);
  font-size: var(--font-size-small);
  padding: 0 var(--gap-xl) var(--gap-xxl) var(--gap-xl);
  min-height: 48px;
}

.card__footer span {
  text-wrap: nowrap;
}

.card__action {
  padding: 0 var(--gap-m) var(--gap-m) var(--gap-m);
}

.card--hover {
  transition: .2s;
  cursor: pointer;
  border: 1px transparent solid;
}

.card--hover:hover {
  border: 1px var(--color-primary) solid;
}
</style>