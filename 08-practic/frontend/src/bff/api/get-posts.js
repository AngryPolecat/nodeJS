import { postTransformer } from '../transformers'
import { URL } from '../../config'

export const getPosts = (searchPhrase, page, limit) =>
  fetch(`${URL}/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
    .then((response) => response.json())
    .then((loadPosts) => loadPosts && loadPosts.map(postTransformer))
