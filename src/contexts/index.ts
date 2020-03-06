import * as React from 'react';

import { AuthStore } from '../stores/authStore'
import { DraftStore } from '../stores/draft'

export const storesContext = React.createContext({
  authStore: new AuthStore(),
  draftStore: new DraftStore()
})
