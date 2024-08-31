import { getPosts, getComments, getCountPosts } from '../api'
import { getCountComments } from '../utils'

export const fetchPosts = async (searchPhrase, page, limit) => {
  const [posts, comments, countPosts] = await Promise.all([getPosts(searchPhrase, page, limit), getComments(), getCountPosts(searchPhrase)])

  return {
    error: null,
    res: posts.map((post) => {
      return {
        ...post,
        commentsCount: getCountComments(comments, post.id),
      }
    }),
    countPosts,
  }
}
