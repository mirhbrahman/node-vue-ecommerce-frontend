<template>
  <b-card
    title=""
    :img-src="product.thumb.url"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <h5 class="text-info">
      <router-link
        class="text-info product-link"
        :to="{ name: 'singleProduct', params: { slug: product.slug } }"
        >{{ product.name | ucfirst }}</router-link
      >
    </h5>
    <small class="">
      <router-link
        class="category-text product-link"
        :to="{
          name: 'productByCategory',
          params: { slug: product.category.slug }
        }"
        >{{ product.category.name | ucfirst }}</router-link
      >
    </small>
    <p v-if="product.isFlashSale" class="mb-0">
      <span class="old-price">${{ product.price | price }}</span> |
      <span class="text-info">${{ product.flashSale.flashPrice | price }}</span>
    </p>
    <p v-else class="mb-0">
      <span class="text-info">${{ product.price | price }}</span>
    </p>
    <b-card-text> </b-card-text>
  </b-card>
</template>

<script>
import { ucfirst } from "../../utils/helpers";
export default {
  props: ["product"],
  filters: {
    price: function(value) {
      return Number(value).toFixed(2);
    },
    ucfirst: function(value) {
      return ucfirst(value);
    }
  }
};
</script>

<style></style>
