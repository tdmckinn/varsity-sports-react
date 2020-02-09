import { computed, observable, action } from 'mobx'

export class DraftStore {
  @observable draft = {
    exitedDraft: false,
    isUserDrafting: false,
    isUserDraftLoading: false
  }

  @action updateDraft() {
    
  }
}

const draftStore = new DraftStore()

export default draftStore
