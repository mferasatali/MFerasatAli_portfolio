/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const savedTheme =
  typeof localStorage !== "undefined" && localStorage.getItem("mfa-theme") === "light"
    ? "light"
    : "dark";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: savedTheme,
    themes: {
      light: {
        colors: {
          primary: '#2563eb',
          secondary: '#6366f1',
          border: 'rgba(15, 23, 42, 0.1)',
          background: "#f1f5f9",
          text: "#0f172a",
          surface: "#ffffff",
          "active-green": "#5FCFAC",
          "text-light-blue": "#778cbc",
          white: "#ffffff",
          "leadership-management": "#ff4066",
          "soft-skill": "#ffb815",
          "it-and-software": "#33bfff",
          "hard-skills": "#ff8473",
          "green-skills": "#3ce17e",
          link: "#1c53f4",
          "base-text": "#0f172a",
          "dark-bg": "#212444",
          "grey": "#BDBDBD",
        },
      },
      dark:{
        colors:{
          primary: '#3b82f6',
          secondary: '#6366f1',
          border: 'rgba(255, 255, 255, 0.08)',
          text: "#f8fafc",
          background: "#080d1a",
          surface: "#131b2e",
          "active-green": "#5FCFAC",
          "text-light-blue": "#778cbc",
          white: "#ffffff",
          "leadership-management": "#ff4066",
          "soft-skill": "#ffb815",
          "it-and-software": "#33bfff",
          "hard-skills": "#ff8473",
          "green-skills": "#3ce17e",
          link: "#6366f1",
          "base-text": "#ffffff",
          "dark-bg": "#0f172a",
          "grey": "#94a3b8",
        }
      }
    },
  },
})
