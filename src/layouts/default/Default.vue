<template>
  <v-app>
    <div
      class="app-container"
      :class="path.path == '/home' ? 'image' : ''"
    >
      <DefaultView />
    </div>
    <div class="mt-auto d-flex align-center justify-center pt-7" v-if="false">
      <v-tooltip
        text="View Details"
        location="top"
        theme="red"
        activator="parent"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            class="btn-explore"
            @click="viewDetails"
            v-bind="props"
          >
            <template v-slot:prepend>
              <img src="@/assets/icons/linear/menu.svg" class="ml-2" />
            </template>
          </v-btn>
        </template>
      </v-tooltip>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import DefaultView from "./View.vue";
import { useRouter } from "vue-router";
import { onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
onBeforeMount(() => {
  if (sessionStorage.getItem("page") == "discover") {
    router.push("/discover");
  }
});

const viewDetails = () => {
  sessionStorage.setItem("page", "discover");
  router.push("/discover");
};

const path = computed(() => route);
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss"; // Import your variable styles

.app-container {
  min-height: 100vh;
  position: relative;
}
.image {
  // background: url("@/assets/images/Ellipse 1.png") center/cover no-repeat;
}
.btn-explore {
  position: sticky;
  top: 9px;
  border: 2px solid map-get($map: $dark-colors, $key: "border") !important;
  border-radius: 0.8rem !important;
  background: linear-gradient(
      180deg,
      rgba(28, 83, 244, 0.1) -52.63%,
      rgba(3, 0, 22, 0.54) 51.46%,
      rgba(28, 83, 244, 0.1) 142.11%
    ),
    linear-gradient(
      0deg,
      map-get($map: $dark-colors, $key: "border"),
      map-get($map: $dark-colors, $key: "border")
    ) !important;
}
</style>
