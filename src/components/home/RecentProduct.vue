<template>
  <div class="com-md-12 mt-3">
    <h5 class="text-info">Recent Products</h5>
    <hr />
    <div class="row">
      <div v-for="item in items" :key="{ item }" class="col-md-4">
        <b-card
          title=""
          img-src="https://picsum.photos/600/400/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <h5 class="text-info">Product Title</h5>
          <p class="mb-0">
            <span class="old-price">$24.99</span> |
            <span class="text-info">$22.99</span>
          </p>
          <b-card-text> </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6]
    };
  }
};
</script>

<style></style>
