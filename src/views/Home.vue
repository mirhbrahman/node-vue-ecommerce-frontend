<template>
  <app-layout>
    <div class="home" slot="content">
      <pre-loader></pre-loader>
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">
          <home-slider></home-slider>
          <recent-product></recent-product>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/layouts/AppLayout.vue";
import PreLoader from "@/components/partials/PreLoader.vue";
import ProductCategory from "@/components/ProductCategory.vue";
import HomeSlider from "@/components/home/HomeSlider.vue";
import RecentProduct from "@/components/home/RecentProduct.vue";
export default {
  name: "home",
  components: {
    AppLayout,
    PreLoader,
    ProductCategory,
    HomeSlider,
    RecentProduct
  }
};
</script>

<style>
.old-price {
  color: gray;
  text-decoration: line-through;
}
</style>
