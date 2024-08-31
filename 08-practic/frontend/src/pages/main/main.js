import debounce from 'lodash/debounce'
import { useEffect, useState, useCallback } from 'react'
import { PostCard, Pagination, Search } from './components'
import { useServerRequest } from '../../hooks'
import { PAGINATION_LIMIT } from '../../const'
import styled from 'styled-components'

const MainContainer = ({ className }) => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [searchPhrase, setSearchPhrase] = useState('')
  const [shouldSearch, setShouldSearch] = useState(false)
  const requestServer = useServerRequest()

  useEffect(() => {
    requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then((posts) => {
      setPosts(posts.res)
      setLastPage(!posts.countPosts % PAGINATION_LIMIT ? Math.floor(posts.countPosts / PAGINATION_LIMIT) : Math.floor(posts.countPosts / PAGINATION_LIMIT) + 1)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestServer, page, shouldSearch])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(setShouldSearch, 1000), [])

  const handlerChangeSearch = ({ target }) => {
    setSearchPhrase(target.value)
    debounceSearch(!shouldSearch)
  }

  return (
    <div className={className}>
      <Search onChangeSearchPhrase={handlerChangeSearch} searchPhrase={searchPhrase} />
      {posts.length ? (
        <div className="post-list">
          {posts.map(({ id, imageUrl, title, publishedAt, commentsCount }) => (
            <PostCard key={id} id={id} imageUrl={imageUrl} title={title} publishedAt={publishedAt} commentsCount={commentsCount} />
          ))}
        </div>
      ) : (
        <div className="empty-list">Список статей пуст...</div>
      )}
      <Pagination page={page} setPage={setPage} lastPage={lastPage} />
    </div>
  )
}

export const Main = styled(MainContainer)`
  & .post-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 40px 0px 40px;
    justify-content: flex-start;
  }

  & .empty-list {
    margin-top: 20px;
  }
`
