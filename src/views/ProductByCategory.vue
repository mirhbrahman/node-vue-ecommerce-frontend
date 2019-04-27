<template>
  <app-layout>
    <div slot="content">
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">
          <h4 class="text-info">Category: {{ slug }}</h4>
          <hr />
          <div class="col-md-12 row p-0 m-0">
            <b-alert v-if="hasProduct" show variant="warning"
              >No data found!</b-alert
            >
            <div
              v-else
              class="col-md-4"
              v-for="product in products"
              :key="product._id"
            >
              <product-item :product="product"></product-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import AppLayout from "@/components/layouts/AppLayout.vue";
import ProductCategory from "@/components/ProductCategory.vue";
import ProductItem from "@/components/partials/ProductItem.vue";
export default {
  props: ["slug"],
  components: {
    AppLayout,
    ProductCategory,
    ProductItem
  },
  created() {
    // Dispatch action to get product by category
    this.$store.dispatch("products/getProductByCategory", this.slug);
  },
  computed: {
    ...mapGetters({
      products: "products/getProducts"
    }),
    hasProduct() {
      return this.products.length > 0 ? false : true;
    }
  }
};
</script>

<style></style>
