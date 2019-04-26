<template>
  <div>
    <app-header class="mb-3"></app-header>
    <b-container>
      <slot name="content"></slot>
    </b-container>
  </div>
</template>

<script>
import AppHeader from "@/components/partials/AppHeader";
export default {
  components: {
    AppHeader
  }
};
</script>

<style></style>
