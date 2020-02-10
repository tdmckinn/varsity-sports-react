import { computed, observable, action } from 'mobx'
import netlifyIdentity from 'netlify-identity-widget'

export class AuthStore {
  @observable user = {
    id: '',
    isLoggedIn: false,
    fullName: '',
    email: '',
    wins: 0,
    loses: 0,
    favoriteTeam: '',
  }

  constructor() {
    if (localStorage.getItem('gotrue.user')) {
      const { id, email, user_metadata } = JSON.parse(
        localStorage.getItem('gotrue.user') || '{}'
      )
      this.user = {
        ...this.user,
        ...{
          id,
          email,
          isLoggedIn: true, // check expiration token
          fullName: user_metadata.full_name,
        },
      }
    }
  }

  @computed get isAuthenticated() {
    return this.user.isLoggedIn
  }

  @action setUser(user: any) {
    this.user = user
  }

  @action login() {
    netlifyIdentity.init({
      container: 'body',
    })

    if (!this.isAuthenticated) {
      netlifyIdentity.open('signup')

      netlifyIdentity.on('login', (user: any) => {
        this.setUser({
          ...this.user,
          ...{
            email: user.email,
            id: user.id,
            isLoggedIn: true,
            fullName: user.user_metadata.full_name,
          },
        })

        netlifyIdentity.close()
      })
    }
  }
  // tslint:disable-next-line:no-empty
  @action logout() {
    netlifyIdentity.logout()
  }
}
