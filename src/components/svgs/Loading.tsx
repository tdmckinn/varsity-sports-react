import * as React from 'react'

const Loading = () => (
  <svg
    xmlBase="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={{ height: 100, marginLeft: 50 }}
    id="L4"
    x="0px"
    y="0px"
    enableBackground="new 0 0 0 0"
    version="1.1"
    viewBox="0 0 100 100"
    xmlSpace="preserve"
  >
    <circle cx="6" cy="50" r="6" fill="#fff" stroke="none">
      <animate
        attributeName="opacity"
        begin="0.1"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0"
      />
    </circle>
    <circle cx="26" cy="50" r="6" fill="#fff" stroke="none">
      <animate
        attributeName="opacity"
        begin="0.2"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0"
      />
    </circle>
    <circle cx="46" cy="50" r="6" fill="#fff" stroke="none">
      <animate
        attributeName="opacity"
        begin="0.3"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0"
      />
    </circle>
  </svg>
)

// <!-- Orginal Source: https://codepen.io/nikhil8krishnan/pen/rVoXJa -->

export default Loading
