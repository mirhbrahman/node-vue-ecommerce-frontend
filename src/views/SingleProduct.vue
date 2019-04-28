<template>
  <app-layout>
    <div class="home" slot="content">
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">
          <b-card>
            <div class="row">
              <div class="col-md-5">
                <div>
                  <b-carousel
                    id="carousel-1"
                    :interval="4000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="500"
                    img-height="500"
                    style="text-shadow: 1px 1px 2px #333;"
                  >
                    <!-- Text slides with image -->
                    <b-carousel-slide
                      img-src="https://picsum.photos/500/500/?image=52"
                    ></b-carousel-slide>
                    <b-carousel-slide
                      img-src="https://picsum.photos/500/500/?image=52"
                    ></b-carousel-slide>
                  </b-carousel>
                </div>
              </div>
              <div class="col-md-7">
                <h5 class="text-info">
                  {{ product.name }}
                </h5>
                <p class="text-muted mb-0">
                  <b-badge variant="info">SKU</b-badge> {{ product.sku }}
                </p>

                <div class="mb-2">
                  <small>
                    <span class="text-muted">Brand: </span>
                    <span class="text-info">{{
                      product.manufacturer.name
                    }}</span>
                    <span class="text-muted"> | </span>
                    <span class="text-muted">Model: </span>
                    <span class="text-info">{{ product.model }}</span>
                  </small>
                </div>
                <div class="mb-2">
                  <small>
                    <span class="text-info">{{ product.category.name }}</span>
                    <span class="text-muted"> | </span>
                    <span class="text-info">{{
                      product.subCategory.name
                    }}</span>
                  </small>
                </div>
                <hr />
                <div>
                  <p v-if="product.isFlashSale" class="mb-0 product-price">
                    <span class="old-price">${{ product.price | price }}</span>
                    <span class="text-muted"> | </span>
                    <span class="text-info"
                      >${{ product.flashSale.flashPrice | price }}</span
                    >
                    &nbsp;<b-badge variant="success">On Flash Sale</b-badge>
                  </p>
                  <p v-else class="mb-0">
                    <span class="text-info">${{ product.price | price }}</span>
                  </p>
                </div>
                <hr />
                <div>
                  <div
                    v-for="(attr, index) in product.attributes"
                    :key="index"
                    class="row"
                  >
                    <div class="col-md-3">
                      <p class="text-muted att-name">
                        {{ attr.optionGroupName }}
                      </p>
                    </div>
                    <div class="col-md-7">
                      <b-form-group>
                        <b-form-radio-group
                          id="radio-slots"
                          @change="selectAttr"
                        >
                          <b-form-radio
                            v-for="(option, index) in attr.options"
                            :key="index"
                            value="1"
                            >{{ option.name }}</b-form-radio
                          >
                        </b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <b-button variant="info">Add to Cart</b-button>
                </div>
              </div>
            </div>
          </b-card>

          <b-card class="mt-3">
            <h5>Features</h5>
            <hr />
            <p class="text-muted">{{ product.sortDesc }}</p>
          </b-card>
          <b-card class="mt-3">
            <h5>Description</h5>
            <hr />
            <p class="text-muted">
              Rated capacity - 3.75V/5000mAh (TYP) Battery type - Lithium-ion
              Polymer rechargeable cell Size - 125 x 69 x 9.9mm Charging time -
              3.5 hrs with 5V/2A plug and standard cable Load detection -
              Auto-detects device plug-in/plug-out Input Voltage - DC 5.0V
              Output Voltage - DC 5.1V
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import AppLayout from "@/components/layouts/AppLayout.vue";
import ProductCategory from "@/components/ProductCategory.vue";
export default {
  name: "singleProduct",
  props: ["slug"],
  components: {
    AppLayout,
    ProductCategory
  },
  data() {
    return {
      selected: ""
    };
  },
  created() {
    // Dispatch event to get product
    this.$store.dispatch("products/getProduct", this.slug);
  },
  computed: {
    ...mapGetters({
      product: "products/getProduct"
    })
  },
  methods: {
    selectAttr(item) {
      console.log(item);
    }
  },
  filters: {
    price: function(value) {
      return Number(value).toFixed(2);
    }
  }
};
</script>

<style>
.old-price {
  color: gray;
  text-decoration: line-through;
}
.product-price {
  font-size: 20px;
}
.att-name {
  text-transform: uppercase;
}
</style>
