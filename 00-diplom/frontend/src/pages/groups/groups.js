import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { request } from '../../utils'
import { Group } from './components/group/group'
import { Input, Icon } from '../../components'
import { openMessage, CLOSE_MESSAGE } from '../../actions'
import { ROLE } from '../../const'
import { userRoleSelector } from '../../selectors'
import styled from 'styled-components'

const GroupsContainer = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])
  const [titleValue, setTitleValue] = useState('')
  const [urlImageValue, setUrlImageValue] = useState('')
  const [updateGroups, setUpdateGroups] = useState(false)
  const role = useSelector(userRoleSelector)

  useEffect(() => {
    request('/groups?limit=0', 'GET').then((groups) => {
      if (groups.error) {
        dispatch(openMessage(groups.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        navigate('/')
        return
      }
      setGroups(groups.data)
    })
  }, [updateGroups, dispatch, navigate])

  const handlerChangeTitle = ({ target }) => setTitleValue(target.value)

  const handlerChangeImageUrl = ({ target }) => setUrlImageValue(target.value)

  const handlerSaveNewGroup = () => {
    request(`/groups`, 'POST', { group: { title: titleValue, url: urlImageValue } }).then((res) => {
      if (res.error) {
        dispatch(openMessage(res.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        return
      }
      setTitleValue('')
      setUrlImageValue('')
      setUpdateGroups(!updateGroups)
    })
  }

  if (role !== ROLE.ADMIN) {
    return <Navigate to="/" />
  }

  return (
    <div className={className}>
      <h3>Группы товаров</h3>
      <ul>
        <div className="new-group">
          <li>
            <div className="group-image"></div>
            <div className="group-info">
              <Input type="text" name="title" placeholder="Название новой группы товаров..." value={titleValue} onChange={handlerChangeTitle} />
              <Input type="text" name="url" placeholder="URL картинки новой группы товаров..." value={urlImageValue} onChange={handlerChangeImageUrl} />
            </div>
          </li>
          <Icon id="fa-floppy-o" size="20px" margin="0 0 0 10px" onClick={handlerSaveNewGroup} />
        </div>
        {groups.map((group) => {
          return <Group key={group.id} group={group} onUpdateGroups={() => setUpdateGroups(!updateGroups)} />
        })}
      </ul>
    </div>
  )
}

export const Groups = styled(GroupsContainer)`
  width: 1000px;
  margin: 0 auto;

  & .new-group {
    display: flex;
    flex-direction: row;
  }

  & li {
    display: flex;
    flex-direction: row;
    border: 2px solid #405060;
    margin-bottom: 5px;
    padding: 10px;
    decoration: none;
    list-style-type: none;
    border-radius: 10px;
    width: 99%;

    & .group-image {
      width: 180px;
      height: 100px;
      background-image: url('https://china-motor.ru/img/placeholder.jpg');
      background-repeat: no-repeat;
      background-size: 150px 100px;
      margin-right: 10px;
    }

    & .group-info {
      display: flex;
      flex-direction: column;
      width: 100%;

      & input {
        width: 99%;
        padding: 4px 0 4px 4px;
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
  }
`
