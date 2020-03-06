export interface Draft {
  selectedPick: any
  draftPickNumber: any
  lastPick: any
  players: any[]
}

export interface Weather {
  type: string
  description: string
  wind: {
    speed: string
    direction: {
      degrees: number
      label: string
    }
  }
  temperature: {
    fahrenheit: number
    celsius: number
  }
  humidityPercent: string
}

export interface Venue {
  id: number
  name: string
}

export interface GameSchedule {
  id: number
  week: number
  awayTeam: Team
  homeTeam: Team
  broadcasters: [string]
  weather: Weather
  venue: Venue
  startTime: string
  venueAllegiance: string
}

export interface Team {
  id: number
  abbreviation: string
}

export interface ILeague {
  id: number
  DraftID: number
  DraftDateTime: string
  CommissionerName: string
  CommissionerID: string
  LeagueName: string
  LeagueTeams: any
  LeagueSettings: any
  Users: any
  DateCreated: string
  IsDraftComplete: boolean
  IsDrafting: boolean
}

export interface IPlayer {
  id: number
  Name: string
  Rank: string
}

export interface UserPlayer {
  id: number
  TeamID: number
  Name: string
  Position: string
  LineUpPosition: string
}

export interface IUserTeam {
  id: number
  LeagueID: number
  Name: string
  OwnerID: string
  Players: [UserPlayer]
  DateCreated: string
  Picks: [number]
}