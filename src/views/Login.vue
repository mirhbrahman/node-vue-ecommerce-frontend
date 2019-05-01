<template>
  <app-layout>
    <div class="home" slot="content">
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  <form class="form-signin">
                    <div class="form-label-group">
                      <input
                        type="email"
                        v-model="email"
                        class="form-control"
                        placeholder="Email"
                        required
                      />
                      <small v-if="isError" class="text-danger">{{
                        errors.email
                      }}</small>
                    </div>

                    <div class="form-label-group">
                      <input
                        type="password"
                        v-model="password"
                        class="form-control"
                        placeholder="Password"
                        required
                      />
                      <small v-if="isError" class="text-danger">{{
                        errors.password
                      }}</small>
                    </div>

                    <div class="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        class="custom-control-label text-muted"
                        for="customCheck1"
                        >Remember password</label
                      >
                    </div>
                    <button
                      @click="login"
                      class="btn btn-lg btn-info btn-block text-uppercase"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <hr class="my-4" />
                    <button
                      class="btn btn-lg btn-google btn-block text-uppercase"
                      type="submit"
                    >
                      <i class="fab fa-google mr-2"></i> Sign in with Google
                    </button>
                    <button
                      class="btn btn-lg btn-facebook btn-block text-uppercase"
                      type="submit"
                    >
                      <i class="fab fa-facebook-f mr-2"></i> Sign in with
                      Facebook
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
// @ is an alias to /src
import AppLayout from "@/components/layouts/AppLayout.vue";
export default {
  components: {
    AppLayout
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      isError: "error/isError",
      errors: "error/getErrors"
    })
  },
  methods: {
    login(e) {
      e.preventDefault();

      const payload = {
        email: this.email,
        password: this.password
      };

      // Dispatch action to login customer
      this.$store.dispatch("auth/login", payload);
    }
  }
};
</script>

<style scoped>
.old-price {
  color: gray;
  text-decoration: line-through;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group input::placeholder {
  color: #6c757d;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}
</style>
