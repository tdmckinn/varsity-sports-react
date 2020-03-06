export const draftQuery = `
  query GetDraft($draftId: String!) {
    draft(draftId: $draftId) {
      id
      LeagueID
      CurrentRound
      CurrentUserDrafting
      DraftDateTime
      IsDraftComplete
      Rounds
      Teams {
        id
        OwnerID
        Name
        Picks
        Players {
          id
          Name
          TeamID
          LineUpPosition
        }
      }
      Players {
        id
        Rank
        Name
        Position
        Age
        FantasyPoints
        AverageDraftPosition
      }
    }
  }
`
