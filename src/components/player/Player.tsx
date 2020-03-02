import * as React from 'react'

import { IPlayer } from '../../types'

import './styles/Player.scss'

// <i
// :className="[isHovered || isPlayerOnMyWatchList ? 'fa-thumbs-up' : 'fa-thumbs-o-up']"
// className="fa"
// ></i>
// :className="[isHovered || isPlayerOnMyWatchList ? 'fa-thumbs-up' : 'fa-thumbs-o-up']"
// {/* <span className="icon is-small" @mouseover="isHovered = true" @mouseout="isHovered = false"> */}

interface PlayerProps {
  onClick?: (player: IPlayer) => void
  player: IPlayer
}

const Player = ({onClick, player}: PlayerProps) => (
  <div
    v-if="player"
    className="vsf-player box"
    onClick={onClick as any}
  >
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Image"
          />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{player.Name}</strong>{' '}
            <small> Jersey # - {player.Rank}</small> <small>31m</small>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <span className="icon is-small">
              <i className="fa" />
            </span>
          </div>
        </nav>
      </div>
    </article>
  </div>
)

export default Player

// {/* <script>
// export default {
//   name: 'vsf-player',
//   props: {
//     player: Object,
//     onPlayerClicked: Function
//   },
//   data() {
//     return {
//       isHovered: false
//     }
//   },
//   methods: {
//     playerClicked() {
//       if (this.onPlayerClicked) {
//         this.onPlayerClicked(this.player)
//       }
//     }
//   },
//   computed: {
//     isPlayerOnMyWatchList() {
//       if (this.player) {
//         return true
//       }
//       return false
//     }
//   }
// }
// </script>
