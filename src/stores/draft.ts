import { computed, observable, action } from 'mobx'

export class DraftStore {
  @observable exitedDraft: boolean
  @observable isUserDrafting: boolean = false
  @observable isUserDraftLoading: boolean

  @action updateDraft() {
    this.isUserDrafting = true
  }
}

const draftStore = new DraftStore()

export default draftStore
