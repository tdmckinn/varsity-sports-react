export const getLeagues = `
query GetLeagues {
  leagues {
    id
    IsDrafting
    DraftDateTime
    CommissionerID
    LeagueName
    LeagueSettings {
      DraftType
      Scoring
      MaxTeams
      WaiverType
      RosterPositions
      TradeDeadline
    }
    LeagueTeams {
      id
      OwnerID
    }
  }
}
`
