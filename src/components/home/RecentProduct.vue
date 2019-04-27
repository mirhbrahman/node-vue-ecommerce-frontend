<template>
  <div class="com-md-12 mt-3">
    <h5 class="text-info">Recent Products</h5>
    <hr />
    <div class="row">
      <div v-for="product in products" :key="product._id" class="col-md-4">
        <product-item :product="product"></product-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "@/components/partials/ProductItem";

export default {
  components: {
    ProductItem
  },
  created() {
    // Dispatch action to get recent products
    this.$store.dispatch("products/getRecentProducts");
  },
  computed: {
    ...mapGetters({
      products: "products/getProducts"
    })
  }
};
</script>

<style>
.card-img-top {
  height: 150px;
}
</style>
