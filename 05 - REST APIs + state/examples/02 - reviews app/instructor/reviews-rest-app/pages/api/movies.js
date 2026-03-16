const BASE_URL = 'http://localhost:5000'

export const getReviews = () => {
  return fetch(`${BASE_URL}/reviews/`, {
      method: "GET", // we don't *need* to pass this; fetches are GET by default
      headers: {
        'Content-Type': 'application/json'       
      }
    })
    .then((response)=> {
      return response.json()
    }).then((data)=> {
      // using Promise.resolve here will pass the data we have
      // fetched here as the returnedData passed when we use the function.
      // getReviews().then((returnedData) => { // when used in other places. })
      return Promise.resolve(data)
    })
}
