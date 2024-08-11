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
          border: '#1D1E3B',
          background: "#000000",
          text: "#ffffff",
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
          primary: '#092122',
          secondary: '#113031',
          border: '#1D1E3B',
          text: "#778CBC",
          background: "#000000",
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
        }
      }
    },
  },
})
