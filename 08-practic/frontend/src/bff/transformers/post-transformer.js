export const postTransformer = (dbPost) => ({
  id: dbPost.id,
  title: dbPost.title,
  imageUrl: dbPost.image_url,
  content: dbPost.content,
  publishedAt: dbPost.published_at,
});
