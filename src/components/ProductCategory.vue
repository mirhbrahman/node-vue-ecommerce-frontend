<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(category, index) in categories" :key="index">
        <div>
          <p v-b-toggle="`${category._id}`" class="mb-0" variant="outline-info">
            {{ category.name }}
            <i
              v-if="subCategories(category._id)"
              class="fas fa-angle-down fr"
            ></i>
          </p>
          <b-collapse :id="`${category._id}`" class="mt-2">
            <b-list-group>
              <b-list-group-item
                v-for="subCat in subCategories(category._id)"
                :key="subCat._id"
                >{{ subCat.name }}</b-list-group-item
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
    }
  }
};
</script>

<style>
p:hover {
  cursor: pointer;
}
.fr {
  float: right;
  margin-top: 6px;
  color: gray;
}
</style>
