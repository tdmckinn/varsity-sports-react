import * as React from 'react'

import './styles/Research.scss'

const Research = () => (
  <div>
    <h1 className="nfx-research__header title">Research</h1>
    <section className="nfx-dashboard-gif">
      <iframe
        src="https://giphy.com/embed/13ip2CvBrm4FrO"
        width="480"
        height="269"
        style={{ maxWidth: '100%' }}
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
      <p>
        <a href="https://giphy.com/gifs/football-13ip2CvBrm4FrO">via GIPHY</a>
      </p>
    </section>
  </div>
)

export default Research
