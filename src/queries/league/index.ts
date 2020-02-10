export const getLeagues = `
query GetLeagues {
  leagues {
    id
    DraftDateTime
    LeagueName
    CommissionerID
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
