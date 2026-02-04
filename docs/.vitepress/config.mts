import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Ontologie LEE",
  description: "Documentation ontologique de la plateforme Les Entreprises s'Engagent",
  lang: 'fr-FR',
  base: '/lee-ontologie-docs/',
  
  mermaid: {
    // Configuration optionnelle de Mermaid
    // Référence: https://mermaid.js.org/config/setup/modules/mermaidAPI.html
  },
  
  mermaidPlugin: {
    class: "mermaid", // Classes CSS pour le conteneur
  },
  
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Contexte', link: '/01-contexte-et-enjeux' },
      { text: 'Proposition', link: '/02-proposition-ontologique' },
      { text: 'Glossaire', link: '/03-glossaire' },
      { text: 'Cycles de vie', link: '/04-cycles-de-vie' },
    ],

    sidebar: [
      {
        text: 'Ontologie',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Contexte et enjeux', link: '/01-contexte-et-enjeux' },
          { text: 'Proposition ontologique', link: '/02-proposition-ontologique' },
          { text: 'Glossaire unifié', link: '/03-glossaire' },
          { text: 'Cycles de vie', link: '/04-cycles-de-vie' },
        ]
      }
    ],

    outline: {
      label: 'Sur cette page',
      level: [2, 3]
    },

    docFooter: {
      prev: 'Page precedente',
      next: 'Page suivante'
    },

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Documentation de reference',
      copyright: 'Les Entreprises s Engagent'
    }
  }
}))