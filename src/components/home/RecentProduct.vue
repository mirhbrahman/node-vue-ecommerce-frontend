<template>
  <div class="com-md-12 mt-3">
    <h5 class="text-info">Recent Products</h5>
    <hr />
    <div class="row">
      <div v-for="product in products" :key="product._id" class="col-md-4">
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
              >{{ product.name }}</router-link
            >
          </h5>
          <p v-if="product.isFlashSale" class="mb-0">
            <span class="old-price">${{ product.price | price }}</span> |
            <span class="text-info"
              >${{ product.flashSale.flashPrice | price }}</span
            >
          </p>
          <p v-else class="mb-0">
            <span class="text-info">${{ product.price | price }}</span>
          </p>
          <b-card-text> </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    // Dispatch action to get recent products
    this.$store.dispatch("products/getRecentProducts");
  },
  computed: {
    ...mapGetters({
      products: "products/getRecentProducts"
    })
  },
  filters: {
    price: function(value) {
      return Number(value).toFixed(2);
    }
  }
};
</script>

<style>
.card-img-top {
  height: 150px;
}
.product-link:hover {
  text-decoration: none;
}
</style>
