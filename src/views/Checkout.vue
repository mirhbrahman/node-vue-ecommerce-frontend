<template>
  <app-layout>
    <div class="home" slot="content">
      <!-- <pre-loader></pre-loader> -->
      <div class="row">
        <div class="col-md-12">
          <b-card>
            <h4 class="text-info">Checkout</h4>
            <hr />
            <div class="row">
              <div class="col-md-4 order-md-2 mb-4">
                <h4
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <span class="text-muted">Your cart</span>
                  <span class="badge badge-secondary badge-pill">{{
                    totalItem
                  }}</span>
                </h4>
                <ul class="list-group mb-3">
                  <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <h6 class="my-0">{{ item.product.name | ucfirst }}</h6>
                      <small class="text-muted">Qnt: {{ item.quantity }}</small>
                    </div>
                    <span v-if="item.product.isFlashSale" class="text-muted">
                      ${{ item.quantity * item.product.flashSale.flashPrice }}
                    </span>
                    <span v-else class="text-muted"
                      >${{ item.quantity * item.product.price }}</span
                    >
                  </li>

                  <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${{ totalPrice }}</strong>
                  </li>
                </ul>
              </div>
              <div class="col-md-8 order-md-1">
                <h4 class="mb-3">Address</h4>
                <form class="needs-validation" novalidate="">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName">First name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName">Last name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder=""
                        value=""
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="you@example.com"
                    />
                    <div class="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required=""
                    />
                    <div class="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="address2"
                      >Address 2
                      <span class="text-muted">(Optional)</span></label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                    />
                  </div>

                  <div class="row">
                    <div class="col-md-5 mb-3">
                      <label for="country">Country</label>
                      <select
                        class="custom-select d-block w-100"
                        id="country"
                        required=""
                      >
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="state">State</label>
                      <select
                        class="custom-select d-block w-100"
                        id="state"
                        required=""
                      >
                        <option value="">Choose...</option>
                        <option>California</option>
                      </select>
                      <div class="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="zip">Zip</label>
                      <input
                        type="text"
                        class="form-control"
                        id="zip"
                        placeholder=""
                        required=""
                      />
                      <div class="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                  </div>
                  <hr class="mb-4" />

                  <h4 class="mb-3">Payment methods</h4>

                  <div class="d-block my-3">
                    <div class="custom-control custom-radio">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        checked=""
                        required=""
                      />
                      <label class="custom-control-label" for="credit"
                        >Credit card</label
                      >
                    </div>

                    <div class="custom-control custom-radio">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required=""
                      />
                      <label class="custom-control-label" for="paypal"
                        >Paypal</label
                      >
                    </div>
                    <div class="custom-control custom-radio">
                      <input
                        id="debit"
                        name="paymentMethod"
                        type="radio"
                        class="custom-control-input"
                        required=""
                      />
                      <label class="custom-control-label" for="debit"
                        >COD</label
                      >
                    </div>
                  </div>

                  <hr class="mb-4" />
                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Continue to checkout
                  </button>
                </form>
              </div>
            </div>
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
export default {
  name: "home",
  components: {
    AppLayout,
  },
  computed: {
    ...mapGetters({
      items: "cart/getItems",
      totalItem: "cart/cartItemCount"
    }),
    totalPrice() {
      let total = 0;
      this.items.map(item => {
        if (item.product.isFlashSale) {
          total += item.quantity * item.product.flashSale.flashPrice;
        } else {
          total += item.quantity * item.product.price;
        }
      });
      return total;
    }
  },
  methods: {},
  filters: {
    ucfirst: function(value) {
      return ucfirst(value);
    }
  }
};
</script>

<style></style>
