import axios from 'axios'

export const layoutData = () =>
  axios(
    'https://api.themoviedb.org/3/movie/popular?api_key=4bc08ab955f501a524c27210af4c49f3&language=en-US&page=1',
  )
