import * as React from 'react';

import { AuthStore } from '../stores/authStore'

export const storesContext = React.createContext({
  authStore: new AuthStore(),
})
