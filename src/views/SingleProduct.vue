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
                      v-for="(image, index) in product.images"
                      :key="index"
                      :img-src="image.url"
                    ></b-carousel-slide>
                  </b-carousel>
                </div>
              </div>
              <div class="col-md-7">
                <h5 class="text-info">
                  {{ product.name | ucfirst }}
                </h5>
                <p class="text-muted mb-0">
                  <b-badge variant="info">SKU</b-badge> {{ product.sku }}
                </p>

                <div class="mb-2">
                  <small>
                    <span class="text-muted">Brand: </span>
                    <span class="text-info">{{
                      product.manufacturer.name | ucfirst
                    }}</span>
                    <span class="text-muted"> | </span>
                    <span class="text-muted">Model: </span>
                    <span class="text-info">{{ product.model }}</span>
                  </small>
                </div>
                <div class="mb-2">
                  <small>
                    <span class="text-info">{{
                      product.category.name | ucfirst
                    }}</span>
                    <span class="text-muted"> | </span>
                    <span class="text-info">{{
                      product.subCategory.name | ucfirst
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
                          :name="`${attr.optionGroupName}`"
                          @change="selectAttr"
                        >
                          <b-form-radio
                            v-for="(option, index) in attr.options"
                            :key="index"
                            :value="`${JSON.stringify(option)}`"
                            >{{ option.name }}</b-form-radio
                          >
                        </b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <b-button variant="info" @click="addToCart"
                    >Add to Cart</b-button
                  >
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { ucfirst } from "../utils/helpers";
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
      selectedAttr: []
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
    selectAttr(attr) {
      const attrObj = JSON.parse(attr);
      // Check option already selected or not
      let index = this.selectedAttr
        .map(item => item.optionGroup)
        .indexOf(attrObj.optionGroup);

      // If not selected inserted data
      if (index < 0) {
        this.selectedAttr.push(attrObj);
      } else {
        this.selectedAttr[index] = attrObj;
      }
    },
    addToCart() {
      const product = {
        quantity: 1,
        productId: this.product._id,
        product: this.product,
        attributes: this.selectedAttr
      };
      this.$store.dispatch("cart/addItem", product);
    }
  },
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
