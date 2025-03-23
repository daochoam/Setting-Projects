import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { fa, aliases as faAliases } from 'vuetify/iconsets/fa'
import { md, aliases as mdAliases } from 'vuetify/iconsets/md'
import { mdi, aliases as mdiAliases } from 'vuetify/iconsets/mdi'
import { de, en, es, fr } from 'vuetify/locale'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
  locale: {
    messages: { en, fr, de, es },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...faAliases,
      ...mdiAliases,
      ...mdAliases,
    },
    sets: {
      fa,
      mdi,
      md,
    },
  },
})

export default vuetify
