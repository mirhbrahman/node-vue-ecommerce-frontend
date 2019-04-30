<template>
  <div>
    <app-header class="mb-3"></app-header>
    <b-container>
      <slot name="content"></slot>
    </b-container>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "@/components/partials/AppHeader";
import AppFooter from "@/components/partials/AppFooter";
export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>

<style></style>
