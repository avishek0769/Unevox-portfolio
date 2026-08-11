import { defineCliConfig } from 'sanity/cli'
import { SANITY_PROJECT_ID } from '../constants'


export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
