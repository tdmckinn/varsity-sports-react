import * as React from 'react'
import { observer, inject } from 'mobx-react'

const vsfThemeMusic: any = require('../../assets/audio/nfx_theme.mp3')

const ThemeMusic = () => (
  <section className="vsf-music">
    <audio id="vsf-music__audio" src={vsfThemeMusic} />
    <div className="vsf-music__player">
      <svg
        v-if="!isThemeplaying"
        className="vsf-music__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
      <svg
        v-if="isThemeplaying"
        className="vsf-music__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M6 6h12v12H6z" />
      </svg>
    </div>
  </section>
)

export default ThemeMusic
