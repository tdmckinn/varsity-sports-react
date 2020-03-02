export const getUserTeams = `
query GetDraft($userId: String!) {
  userTeams(userId: $userId) {
    id
    Name
    LeagueID
    Players {
      id
      Name
      TeamID
      LineUpPosition
    }
  }
}
`
