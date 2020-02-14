export const getSettings = `
  query GetSettings{
    settings {
      id
      type
      text
      value
      values {
        id
        value
      }
      singleValues
      readOnly
    }
  }
`