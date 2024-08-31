import { URL } from '../../config'

export const getCountPosts = (searchPhrase) =>
  fetch(`${URL}/posts?title_like=${searchPhrase}`)
    .then((response) => response.json())
    .then((loadPosts) => loadPosts.length)
