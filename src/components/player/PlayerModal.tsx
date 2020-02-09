{
  /* <template>
  <vsf-modal :show="show" :on-close="close">
    <div class="vsf-player-modal modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Player Details</p>
        <button class="delete" @click="close"></button>
      </header>
      <section v-if="player" class="modal-card-body">
        <vsf-player :player="player"></vsf-player>
      </section>
      <footer class="modal-card-foot">
        <a v-if="!isPlayerOnMyWatchList" class="button is-success" :class="{ 'is-loading': isLoading }" @click="addPlayer">Add Player</a>
        <a v-else class="button is-danger" :class="{ 'is-loading': isLoading }" @click="removePlayer">
          <i class="material-icons">star</i>Watch List</a>
        <a class="button" @click="close">Cancel</a>
      </footer>
    </div>
  </vsf-modal>
</template>

<script>
import NfxPlayer from './NfxPlayer.vue'

export default {
  name: 'player-modal',
  props: {
    show: Boolean,
    sumbit: Function,
    player: Object
  },
  components: {
    NfxPlayer
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    isPlayerOnMyWatchList() {
      if (this.player) {
        return true
      }
      return false
    }
  },
  methods: {
    close() {
      setTimeout(() => {
        this.isLoading = false
        this.$emit('closing')
      }, 500)
    },
    removePlayer() {
      this.isLoading = true
      this.close()
    },
    addPlayer() {
      this.isLoading = true
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>

</style> */
}
