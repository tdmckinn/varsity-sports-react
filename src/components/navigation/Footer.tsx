import * as React from 'react'

import './styles/Footer.scss'

const Footer = ({ children }: { children?: any }) => (
  <footer className="vsf-footer footer">
    <div className="container">
      {children}
      <div className="content has-text-centered">
        <p>
          <strong>Varsity Sports Fantasy</strong> by
          <a
            className="vsf-footer__user-link"
            href="https://tirellmckinnon.com"
          >
            Tirell Mckinnon
          </a>
        </p>
        <p>
          <a
            className="icon vsf-footer__user-link"
            href="https://github.com/tdmckinn/varsity-sports-fantasy"
          >
            <i className="material-icons">code</i>
            Github
          </a>
        </p>
        <div className="vsf-footer__disclaimer">
          Disclaimer: I don't own any music, video, or data related content on
          this site. This site is also not officated with the NFL in any way.
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
