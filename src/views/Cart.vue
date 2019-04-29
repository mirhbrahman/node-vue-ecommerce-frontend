<template>
  <app-layout>
    <div class="home" slot="content">
      <!-- <pre-loader></pre-loader> -->
      <div class="row">
        <div class="col-md-3">
          <product-category></product-category>
        </div>
        <div class="col-md-9">
          <b-card>
            <h4 class="text-info">Cart</h4>
            <table id="cart" class="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style="width:50%">Product</th>
                  <th style="width:10%">Price</th>
                  <th style="width:8%">Quantity</th>
                  <th style="width:22%" class="text-center">Subtotal</th>
                  <th style="width:10%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td data-th="Product">
                    <div class="row">
                      <div class="col-sm-12">
                        <h5 class="text-info">
                          {{ item.product.name | ucfirst }}
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td v-if="item.product.isFlashSale" data-th="Price">
                    ${{ item.product.flashSale.flashPrice }}
                  </td>
                  <td v-else data-th="Price">${{ item.product.price }}</td>
                  <td data-th="Quantity">
                    <input
                      type="number"
                      class="form-control text-center"
                      :value="item.quantity"
                      @change="quantityChange($event, item.productId)"
                    />
                  </td>
                  <td data-th="Subtotal" class="text-center">
                    ${{ subTotal(item) }}
                  </td>
                  <td class="actions" data-th="">
                    <button class="btn btn-danger btn-sm">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <a href="#" class="btn btn-warning"
                      ><i class="fa fa-angle-left"></i> Continue Shopping</a
                    >
                  </td>
                  <td colspan="2" class="hidden-xs"></td>
                  <td class="hidden-xs text-center">
                    <strong>Total ${{ totalPrice }}</strong>
                  </td>
                  <td>
                    <a href="#" class="btn btn-info btn-block">Checkout </a>
                  </td>
                </tr>
              </tfoot>
            </table>
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
import PreLoader from "@/components/partials/PreLoader.vue";
import ProductCategory from "@/components/ProductCategory.vue";
export default {
  name: "home",
  components: {
    AppLayout,
    PreLoader,
    ProductCategory
  },
  computed: {
    ...mapGetters({
      items: "cart/getItems"
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
    subTotal(item) {
      let subTotal = 0;
      // Calculate subtotal
      if (item.product.isFlashSale) {
        subTotal = item.quantity * item.product.flashSale.flashPrice;
      } else {
        subTotal = item.quantity * item.product.price;
      }
      return subTotal;
    },
    quantityChange(qnt, productId) {
      const payload = {
        quantity: qnt.target.value,
        productId: productId
      };
      this.$store.dispatch("cart/changeQuantity", payload);
    }
  },
  filters: {
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
.table > tbody > tr > td,
.table > tfoot > tr > td {
  vertical-align: middle;
}
@media screen and (max-width: 600px) {
  table#cart tbody td .form-control {
    width: 20%;
    display: inline !important;
  }
  .actions .btn {
    width: 36%;
    margin: 1.5em 0;
  }

  .actions .btn-info {
    float: left;
  }
  .actions .btn-danger {
    float: right;
  }

  table#cart thead {
    display: none;
  }
  table#cart tbody td {
    display: block;
    padding: 0.6rem;
    min-width: 320px;
  }
  table#cart tbody tr td:first-child {
    background: #333;
    color: #fff;
  }
  table#cart tbody td:before {
    content: attr(data-th);
    font-weight: bold;
    display: inline-block;
    width: 8rem;
  }

  table#cart tfoot td {
    display: block;
  }
  table#cart tfoot td .btn {
    display: block;
  }
}
</style>
