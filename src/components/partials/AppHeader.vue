<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-brand>
        <router-link class="navbar-brand" to="/">AlphaEcom</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-nav-item href="#" right>
            <router-link to="/cart"
              ><b-badge variant="light"
                ><i class="fas fa-cart-plus"></i> {{ totalCartItem }}</b-badge
              ></router-link
            >
          </b-nav-item>

          <router-link v-if="!isLoggedIn" class="nav-link" to="/login"
            >Sign In</router-link
          >
          <router-link v-if="!isLoggedIn" class="nav-link" to="/register"
            >Signup</router-link
          >
          <b-nav-item v-else href="#" right @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      totalCartItem: "cart/cartItemCount",
      isLoggedIn: "auth/isLoggedIn"
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
<style>
.navbar-dark .navbar-nav .nav-link {
  color: white !important;
}
</style>
