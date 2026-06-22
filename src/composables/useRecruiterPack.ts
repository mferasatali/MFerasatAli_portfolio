import { ref } from "vue";

const packOpen = ref(false);

export function useRecruiterPack() {
  const openPack = () => {
    packOpen.value = true;
  };

  return { packOpen, openPack };
}
