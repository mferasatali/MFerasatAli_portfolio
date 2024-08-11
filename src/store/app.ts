// Utilities
import { defineStore } from "pinia";
import { ref } from "vue";
import { ChatBotPayload } from "./interface";

// import { inject } from "vue";
import { BASE_URL } from "./url";
import axios from "axios";
// const axios: any = inject("axios");

export const AppStore = defineStore("app", () => {
  const exploreCurrentTab = ref(0);
  const navBar = ref("Home");
  const headerConnnect = ref(false);
  function setNavBar(title: string) {
    navBar.value = title;
  }

  function getNavBar(): string {
    return navBar.value;
  }

  function setExploreCurrentTab(tab: number) {
    exploreCurrentTab.value = tab;
  }

  async function chatBotApi(payload: ChatBotPayload) {
    try {
      const result = await axios.post(
        `${BASE_URL}/public/chatbot/chat`,
        payload
      );

      return result.data.data;
    } catch (error) {
      console.log(error, "error");
    }
  }


  return {
    headerConnnect,
    setNavBar,
    getNavBar,
    setExploreCurrentTab,
    chatBotApi
  };
});
