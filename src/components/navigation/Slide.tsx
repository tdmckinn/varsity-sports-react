import * as React from 'react'

import './styles/Slide.scss'

const Slide = ({ slides }: any) => (
  <div className="vsf-slide">
    <div className="siema">
      {slides.map((item: any, index: any) => (
        <section className="siema-slide hero" key={index}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">The Leauge</h1>
            </div>
          </div>
        </section>
      ))}
    </div>
  </div>
)

export default Slide

//   componentDidMount() {
//     /* eslint-disable no-new */
//     /* eslint-disable no-undef */
//     this.siema = new Siema({
//       duration: 500,
//       perPage: 1
//     })
//   },
//   methods: {
//     nextSlide() {
//       this.siema.next()
//     },
//     prevSlide() {
//       this.siema.prev()
//     }
//   }
