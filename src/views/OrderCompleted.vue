<template>
  <app-layout>
    <div slot="content">
      <pre-loader></pre-loader>
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">
          <b-card>
            <b-alert show variant="success">
              <h4 class="alert-heading">Well done!</h4>
              <p>
                You successfully place your order.
              </p>
              <hr />
              <p class="mb-0">
                For more details please visit your order page.
              </p>
            </b-alert>
          </b-card>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "@/components/layouts/AppLayout.vue";
import PreLoader from "@/components/partials/PreLoader.vue";
import ProductCategory from "@/components/ProductCategory.vue";
export default {
  components: {
    AppLayout,
    PreLoader,
    ProductCategory
  }
};
</script>

<style></style>
