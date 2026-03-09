const BASE_URL = 'https://zenquotes.io/api'

export const getRandomQuote = () => {
  // Let's start by peeking at what happens.
  fetch(`${BASE_URL}/random`)
    .then((response) => {
      console.log(response.json())
    })
}