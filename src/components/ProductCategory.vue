<template>
  <div>
    <b-list-group>
      <b-list-group-item variant="info">All Categories</b-list-group-item>
      <b-list-group-item v-for="(category, index) in categories" :key="index">
        <div>
          <p class="mb-0" variant="outline-info">
            <span @click="onCategoryClick(category)">{{
              category.name | ucfirst
            }}</span>

            <i
              v-b-toggle="`${category._id}`"
              v-if="subCategories(category._id)"
              class="fas fa-angle-down fr"
            ></i>
          </p>
          <b-collapse :id="`${category._id}`" class="mt-2">
            <b-list-group>
              <b-list-group-item
                class="sub-cat"
                v-for="subCat in subCategories(category._id)"
                :key="subCat._id"
                @click="onSubCategoryClick(subCat)"
                >{{ subCat.name | ucfirst }}</b-list-group-item
              >
            </b-list-group>
          </b-collapse>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ucfirst } from "../utils/helpers";
import router from "../router";
export default {
  created() {
    // Dispatch action to get all categories
    this.$store.dispatch("categories/getCategories");
    // Dispatch action to get all sub-categories
    this.$store.dispatch("subCategories/getSubCategories");
  },
  computed: {
    ...mapGetters({
      categories: "categories/getCategories",
      allSubSategories: "subCategories/getSubCategories"
    })
  },
  methods: {
    // Filter sub category by category
    subCategories(catId) {
      const subCat = this.allSubSategories.filter(
        subCat => subCat.category === catId
      );
      return subCat.length > 0 ? subCat : false;
    },
    onCategoryClick(category) {
      this.$store.dispatch("products/getProductByCategory", category.slug);
      router.push({
        name: "productByCategory",
        params: { slug: category.slug }
      });
    },
    onSubCategoryClick(subCategory) {
      this.$store.dispatch(
        "products/getProductBySubCategory",
        subCategory.slug
      );
      router.push({
        name: "productBySubCategory",
        params: { slug: subCategory.slug }
      });
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
p:hover {
  cursor: pointer;
}
.sub-cat:hover {
  cursor: pointer;
}
.fr {
  float: right;
  margin-top: 6px;
  color: gray;
}
</style>
