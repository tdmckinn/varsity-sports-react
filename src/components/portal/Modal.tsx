import * as React from 'react'
import ReactDOM from 'react-dom'

import './Modal.scss'

class Modal extends React.Component<{ children?: any; isAcitve?: boolean }> {
  modalEl: HTMLDivElement
  modalRoot: Element

  constructor(props: any) {
    super(props)
    this.modalRoot = document.querySelector('#vsf-modal-root')!
    this.modalEl = document.createElement('div')
    this.modalEl.className = 'vsf-modal modal is-active'

    const modalBackground = document.createElement('div')
    modalBackground.className = 'modal-background'

    const modalContainer = document.createElement('div')
    modalContainer.className = 'modal-container'

    this.modalEl.appendChild(modalBackground)
    this.modalEl.appendChild(modalContainer)
  }

  componentDidMount() {
    // document.addEventListener('keydown', (e) => {
    //   if (this.show && e.keyCode === 27) {
    //     this.onClose()
    //   }
    // })
    this.modalRoot.appendChild(this.modalEl)
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    this.modalEl.classList.remove('is-active')
    this.modalRoot.removeChild(this.modalEl)
  }

  render() {
    const { isAcitve } = this.props
    isAcitve
      ? this.modalEl.classList.add('is-active')
      : this.modalEl.classList.remove('is-active')

    return ReactDOM.createPortal(
      this.props.children,
      this.modalEl.querySelector('.modal-container')!
    )
  }
}

export default Modal
