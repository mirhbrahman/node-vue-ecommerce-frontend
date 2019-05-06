<template>
  <app-layout>
    <div slot="content">
      <div class="row">
        <div class="col-md-8 offset-2">
          <b-card>
            <article class="card">
              <div class="card-body p-5">
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="nav-tab-card">
                    <form role="form">
                      <div class="form-group">
                        <label for="cardNumber">Card number</label>
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            name="cardNumber"
                            placeholder=""
                            v-model="cardNumber"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text text-muted">
                              <i class="fab fa-cc-visa"></i>
                              <i class="fab fa-cc-amex"></i>
                              <i class="fab fa-cc-mastercard"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <!-- form-group.// -->

                      <div class="row">
                        <div class="col-sm-8">
                          <div class="form-group">
                            <label
                              ><span class="hidden-xs">Expiration</span>
                            </label>
                            <div class="input-group">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="MM"
                                name=""
                                v-model="expMonth"
                              />
                              <input
                                type="number"
                                class="form-control"
                                placeholder="YY"
                                name=""
                                v-model="expYear"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label
                              data-toggle="tooltip"
                              title=""
                              data-original-title="3 digits code on back side of the card"
                              >CVC</label
                            >
                            <input
                              type="number"
                              class="form-control"
                              required=""
                              v-model="cvc"
                            />
                          </div>
                          <!-- form-group.// -->
                        </div>
                      </div>
                      <!-- row.// -->
                      <button
                        class="subscribe btn btn-primary btn-block"
                        type="button"
                        @click="onConfirmClick"
                      >
                        Confirm
                        <span class="badge badge-success"
                          >${{ totalPrice }}</span
                        >
                      </button>
                    </form>
                  </div>
                </div>
                <!-- tab-content .// -->
              </div>
              <!-- card-body.// -->
            </article>
            <!-- card.// -->
          </b-card>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import AppLayout from "@/components/layouts/AppLayout.vue";
export default {
  components: {
    AppLayout
  },
  data() {
    return {
      cardNumber: "",
      expMonth,
      expYear,
      cvc: "",
      stripeKey: "pk_test_arr20NMmOPBNJWZCNBvTZib8"
    };
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
  methods: {
    onConfirmClick() {
      // Generate stripe token
      let card = {
        number: this.cardNumber,
        cvc: this.cvc,
        exp_month: this.expMonth,
        exp_year: this.expYear
      };
      window.Stripe.setPublishableKey("pk_test_arr20NMmOPBNJWZCNBvTZib8");
      window.Stripe.createToken(card, this.stripeResponseHandler);
    },
    stripeResponseHandler(status, response) {
      if (response.error) {
        console.error(response.error);
      } else {
        // token to create a charge on our server
        var token_from_stripe = response.id;
        // Setting card info
        const cardInfo = {
          cardNumber: this.cardNumber,
          expMonth: this.expMonth,
          expYear: this.expYear,
          cvc: this.cvc
        };
        // Listed product id and quantity for checkout
        let products = [];

        this.items.map(item => {
          let tempProduct = {
            productId: item.productId,
            quantity: item.quantity,
            attributes: item.attributes
          };
          products.push(tempProduct);
        });
        // Plase order
        let order = {
          cardInfo: cardInfo,
          stripeToken: token_from_stripe,
          products: products
        };
        this.$store.dispatch("checkout/setCheckout", order);
      }
    }
  }
};
</script>

<style></style>
