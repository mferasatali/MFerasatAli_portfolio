<template>
  <section id="contact-me" class="pa-md-14 pa-5">
    <v-row align="center" class="mt-md-10 mt-6">
      <v-col cols="12" class="px-2 px-md-5">
        <div ref="contact" class="contact">
          <p class="main-heading">Contact Me</p>
        </div>
        <div ref="contact1" class="contact1">
          <p class="sub-heading px-2">
            We would love to speak with you. Feel free to reach out using the
            below details.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="12" sm="6" class="my-0 py-0">
        <div class="form-field">
          <v-text-field
            v-model="firstName"
            class="form-field-input"
            variant="solo"
            placeholder="First Name"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="my-0 py-0">
        <div class="form-field">
          <v-text-field
            v-model="lastName"
            class="form-field-input"
            variant="solo"
            placeholder="Last Name"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="my-0 py-0">
        <div class="form-field">
          <v-text-field
            v-model="email"
            class="form-field-input"
            variant="solo"
            placeholder="Email"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="6" class="my-0 py-0">
        <div class="form-field">
          <v-text-field
            v-model="phoneNumber"
            class="form-field-input"
            variant="solo"
            placeholder="phoneNumber"
            type="number"
          />
        </div>
      </v-col>
      <v-col cols="12" class="my-0 py-0">
        <div class="form-field">
          <v-textarea
            v-model="message"
            rows="6"
            class="form-field-input"
            variant="solo"
            placeholder="Message"
          />
        </div>
      </v-col>
      <v-col cols="12" class="d-flex align-center justify-end">
        <v-btn
          variant="text"
          class="contact-btn"
          @click="contactFerasat"
          :loading="loading"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
    <v-snackbar
      v-model:model-value="snackbar"
      :timeout="4000"
      :color="color"
      variant="tonal"
      location="top right"
      class="mt-16"
    >
      {{ snackMessage }}
    </v-snackbar>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { AppStore } from "@/store/app";
import gsap from "gsap";
import { loadSheetsApi } from "@/utils/googleSpreadSheetAPI";

const store = AppStore();
const contact = ref(null);
const contact1 = ref(null);
const snackbar = ref(false);
const snackMessage = ref("Please Fill the form completely.");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const message = ref("");
const phoneNumber = ref("");
const color = ref("error");
const loading = ref(false);

onMounted(async () => {
  store.setNavBar("ContactUs");
  gsap.to(contact.value, {
    opacity: 1,
    display: "block",
    x: 1,
    y: 1,
    delay: 0.5,
  });
  gsap.to(contact1.value, {
    duration: 1,
    opacity: 1,
    display: "block",
    x: 1,
  });
});

const contactFerasat = async () => {
  loading.value = true;
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !message.value ||
    !phoneNumber.value
  ) {
    snackbar.value = true;
    loading.value = false;
    return;
  }
  try {
    const value = {
      Name: `${firstName.value} ${lastName.value}`,
      Email: email.value,
      Message: message.value,
      Phone: phoneNumber.value,
    };
    try {
      await loadSheetsApi(value);
      snackbar.value = true;
      color.value = "success";
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      message.value = "";
      phoneNumber.value = "";
      snackMessage.value = "Detail Submitted Successfully.";
    } catch (error) {
      snackbar.value = true;
      color.value = "error";
      snackMessage.value = "Error Submitting Details.";
    }
  } catch (error) {
    snackbar.value = true;
    color.value = "error";
    snackMessage.value = "Error Submitting Details.";
  }
  loading.value = false;
};
</script>
<style scoped lang="scss">
#contact-me {
  padding: 2rem;
  .main-heading {
    font-size: 43px;
    color: #ffffff !important;
    font-weight: 600;
  }

  .sub-heading {
    font-size: 14px;
    font-weight: 300;
    color: #ffffff;
  }

  .form-field {
    :deep(.form-field-label) {
      font-size: 14px;
      line-height: 16px;
      text-transform: capitalize;
      color: #3e457c;
      margin-bottom: 12px;
      display: block;
    }

    :deep(.form-field-input) {
      .v-input__control {
        .v-field.v-field--no-label.v-field--variant-solo.v-theme--dark.v-locale--is-ltr {
          border-radius: 13px !important;
          background: #251414;
        }

        .v-text-field__slot {
          padding: 0 8px !important;
        }
      }

      .v-text-field__details {
        .v-messages__message {
          padding: 0 8px !important;
        }
      }
    }

    &-errors {
      margin: 0.4rem 0;

      &-error {
        color: rgb(132, 3, 3);
      }
    }
  }

  .contact {
    transform: translateX(700px) translateY(500px);
    opacity: 0;
    display: none;
  }

  .contact1 {
    transform: translateX(-200px);
    opacity: 0;
    display: none;
  }

  .contact-btn {
    border-radius: 11px;
    background-color: 2px solid #5c6fba;
    font-size: 13px;
    color: #ffff !important;
  }
}
</style>
