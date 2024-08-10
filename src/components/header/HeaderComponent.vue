<template>
  <div class="d-flex align-center justify-end pa-4">
    <v-menu
      location="left"
      :close-on-content-click="false"
      v-model:model-value="open"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="text-capitalize free-trail-btn"
          height="45px"
          v-bind="props"
        >
          Connect With Ferasat
        </v-btn>
      </template>
      <div class="d-flex flex-column base-card base-card-card ml-4">
        <div class="d-flex align-center justify-center">
          <p class="header">Contact & Social Links</p>
        </div>
        <div
          class="d-flex flex-column mt-2 base-card base-card-menu"
          style="gap: 0.6rem"
        >
          <div class="d-flex align-center" style="gap: 0.6rem">
            <v-icon> mdi-email </v-icon>
            <p>mferasatali@gmail.com</p>
          </div>
          <div class="d-flex align-center" style="gap: 0.6rem">
            <v-icon> mdi-email </v-icon>
            <p>ALT: ferasatali14@gmail.com</p>
          </div>
          <div class="d-flex align-center" style="gap: 0.6rem">
            <v-icon> mdi-phone </v-icon>
            <p>03424658936</p>
          </div>
        </div>
        <div
          class="d-flex align-center flex-row mt-3 base-card base-card-menu"
          style="gap: 0.6rem"
          v-for="(item, index) in FerasatSocialLinks"
          :key="index"
        >
          <img width="25px" class="social-icons" :src="item.icon" />
          <p>
            {{ item.name }} :
            <a :href="item.link" target="_blank"> MFerasatAli</a>
          </p>
        </div>
        <div class="d-flex flex-column mt-2 base-card base-card-menu">
          <v-btn
            variant="text"
            href="https://docs.google.com/document/d/1A-R_jMio_P9suJDP8aKNNMK7uHaTDEOH/edit?usp=sharing"
            target="_blank"
          >
            <v-icon class="mr-2"> mdi-download </v-icon>
           CV
          </v-btn>
          <v-btn
            variant="text"
            href="https://drive.google.com/file/d/1NKosJ2dj94GCBNEzmjgpjcA82yuKfUsp/view?usp=sharing"
            target="_blank"
          >
            <v-icon class="mr-2"> mdi-download </v-icon>
            Resume
          </v-btn>
          <v-btn
            variant="text"
            href="https://drive.google.com/file/d/18a37mXxFUQZzhxqfwQeBEKYo-eIKSacu/view?usp=sharing"
            target="_blank"
          >
            <v-icon class="mr-2"> mdi-download </v-icon>
            Cover Letter
          </v-btn>
        </div>
      </div>
    </v-menu>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
const open = ref(false);
import { FerasatSocialLinks } from "@/utils/ferasatSocialLinks";
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/scrollbars.scss";

.free-trail-btn {
  border: 2px solid map-get($map: $dark-colors, $key: "border");
  border-radius: 0.8rem;
  background: #263238
}
.base-card {
  padding: 1.75rem 1.5rem !important;
  background: #263238 !important;
  box-shadow: 0 6px 32px rgba(44, 50, 169, 0.04) !important;
  border-radius: 20px !important;

  &-card {
    width: 350px;
    min-height: 460px;
    max-height: 480px;
    @media (max-width: 1300px) {
      min-height: 500px !important;
      max-height: 520px !important;
    }
    overflow-y: auto;
    @extend .base-scrollbar;
  }
  &-menu {
    background: #000000 !important;
  }
}
</style>
