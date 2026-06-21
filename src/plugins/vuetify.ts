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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          border: '#1c0e0e',
          background: "#000000",
          text: "#cbd8f7",
          "active-green": "#5FCFAC",
          "text-light-blue": "#778cbc",
          white: "#ffffff",
          "leadership-management": "#ff4066",
          "soft-skill": "#ffb815",
          "it-and-software": "#33bfff",
          "hard-skills": "#ff8473",
          "green-skills": "#3ce17e",
          link: "#1c53f4",
          "base-text": "#ffffff",
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
