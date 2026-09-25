<script lang="ts" setup>
</script>

<template>
  <article class="card t:mt-4 t:flex t:bg-red-400 t:p-2 t:text-2xl">
    <h2 class="card__title">
      Title
    </h2>

    <p class="card__description">
      Test description
    </p>

    <button class="card__button">
      Learn more
    </button>
  </article>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 360px;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &__title {
    margin-bottom: 12px;
    font-weight: 700;

    @include adaptiveValue('font-size', 56, 16, 1, $containerWidth, $mobile);

    @media (max-width: toEm($mobile)) {
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
}
</style>
