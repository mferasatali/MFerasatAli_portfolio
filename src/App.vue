<template>
  <v-layout>
    <div>
      <v-navigation-drawer
        class="nav"
        v-model="appBar"
        :temporary="true"
        :width="250"
        elevation="0"
      >
        <RouterLink to="/" class="d-flex align-center justify-center">
          <img width="100px" src="@/assets/mfa-logo.svg" class="mr-4" />
        </RouterLink>
        <v-list class="d-flex align-start flex-column mt-16" style="gap: 1rem">
          <v-list-item
            to="/home"
            class="mx-6"
            color="white"
            variant="plain"
            @click="setTab('/home')"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <img
                  v-if="route.path == '/home'"
                  src="@/assets/icons/linear/active/dashboard.svg"
                  class="mx-2"
                />
                <img
                  v-else
                  src="@/assets/icons/linear/simple/dashboard.svg"
                  class="mx-2"
                />
                Home
              </div>
            </template></v-list-item
          >
          <v-list-item
            to="/education"
            class="mx-6"
            color="white"
            variant="plain"
            @click="setTab('/education')"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <img
                  v-if="route.path == '/education'"
                  src="@/assets/icons/linear/active/candidates.svg"
                  class="mx-2"
                />
                <img
                  v-else
                  src="@/assets/icons/linear/simple/candidates.svg"
                  class="mx-2"
                />
                Journey
              </div>
            </template>
          </v-list-item>
          <v-list-item
            to="/work-experience"
            class="mx-6"
            color="white"
            variant="plain"
            @click="setTab('/work-experience')"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <img
                  v-if="route.path == '/work-experience'"
                  src="@/assets/icons/linear/active/teacher.svg"
                  class="mx-2"
                />
                <img
                  v-else
                  src="@/assets/icons/linear/simple/teacher.svg"
                  class="mx-2"
                />
                Experience
              </div>
            </template>
          </v-list-item>
          <v-list-item
            to="/personal-project"
            class="mx-6"
            color="white"
            variant="plain"
            @click="setTab('/personal-project')"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <img
                  v-if="route.path == '/personal-project'"
                  src="@/assets/icons/linear/active/assessment.svg"
                  class="mx-2"
                />
                <img
                  v-else
                  src="@/assets/icons/linear/simple/assessment.svg"
                  class="mx-2"
                />
                Projects
              </div>
            </template>
          </v-list-item>
          <v-list-item
            to="/contact-me"
            class="mx-6"
            color="white"
            variant="plain"
            @click="setTab('/contact-me')"
          >
            <template v-slot:default>
              <div class="d-flex align-center">
                <img
                  v-if="route.path == '/contact-me'"
                  src="@/assets/icons/linear/active/employees.svg"
                  class="mx-2"
                />
                <img
                  v-else
                  src="@/assets/icons/linear/simple/employees.svg"
                  class="mx-2"
                />
                Contact Me
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-app-bar
      class="app-bar"
      elevation="0"
      style="background: #1e0808 !important"
    >
      "
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="appBar = !appBar"></v-app-bar-nav-icon>
      </template>
      <v-spacer />
      <HeaderComponent />
    </v-app-bar>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px"
    >
      <div class="main-class">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  if (sessionStorage.getItem("route")) {
    const route = sessionStorage.getItem("route");
    if (route) router.push(route);
    else router.push("/home");
  }
});

const appBar = ref(true);
const route = useRoute();
const setTab = (tab: string) => {
  sessionStorage.setItem("route", tab.toString());
};
</script>

<style scoped lang="scss">
.nav {
  background-color: #1e080861 !important;
  border: none !important;
  border-radius: 20px !important;
  padding: 2.5rem 1rem 4rem 1rem;
  z-index: 1000;
}
.app-bar {
  background-color: #000000 !important;
  box-shadow: none;
  color: white;
}
.main-class {
  width: 100%;
}
</style>
