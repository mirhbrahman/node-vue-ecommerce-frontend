<template>
  <app-layout>
    <div class="home" slot="content">
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">{{ slug }}ddd</div>
      </div>
    </div>
  </app-layout>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/layouts/AppLayout.vue";
import ProductCategory from "@/components/ProductCategory.vue";
export default {
  name: "singleProduct",
  props: ["slug"],
  components: {
    AppLayout,
    ProductCategory
  }
};
</script>

<style>
.old-price {
  color: gray;
  text-decoration: line-through;
}
</style>
