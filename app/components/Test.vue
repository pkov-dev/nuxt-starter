<script lang="ts" setup>
const uiStore = useUIStore()
</script>

<template>
  <article class="card">
    <div class="card__content">
      <h2 class="card__title">
        Title
        {{ uiStore.test }}
      </h2>

      <p class="card__description">
        Test description
      </p>

      <button class="card__button">
        Learn more
        <Icon name="app:form-success-circle" />
      </button>
    </div>
    <div class="card__img">
      <NuxtImg
        src="/images/main.png"
        width="720"
        height="375"
        sizes="sm:100vw md:50vw lg:720px"
        format="webp"
        loading="lazy"
        alt="hello"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  width: 100%;
  max-width: 80vw;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 16px;
  margin-top: 100px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
  gap: 20px;
  margin-inline: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (width < to-em($md)) {
    flex-direction: column;
  }

  // .card__content
  &__content {
  }

  &__title {
    margin-bottom: 12px;
    font-family: var(--font-heading);
    font-weight: 700;

    @include adaptive-value('font-size', 56, 16, 1, $lg, $xs);

    @media (width < to-em($sm)) {
      color: red;
    }
  }

  &__description {
    margin-bottom: 20px;
    color: #666;
    line-height: 1.5;
  }

  &__button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: #222;
    color: #fff;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  // .card__img
  &__img {
  }
}
</style>
