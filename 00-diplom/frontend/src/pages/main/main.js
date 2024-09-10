import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SETTINGS } from '../../const'
import { request } from '../../utils'
import { openMessage, CLOSE_MESSAGE } from '../../actions'
import { Group } from './components/group/group'
import styled from 'styled-components'

const MainContainer = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const page = 1
    request(`/groups?page=${page}&limit=${SETTINGS.PAGINATION_LIMIT}`).then((groups) => {
      if (groups.error) {
        dispatch(openMessage(groups.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), 4000)
        return
      }
      setGroups(groups.data)
      //console.log(groups.lastPage)
    })
  }, [dispatch])

  const handlerClickGroup = (groupId) => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <div className={className}>
      <h3>Каталог</h3>
      <div className="groups-container">
        {groups.map((group) => (
          <Group key={group.id} group={group} onClick={() => handlerClickGroup(group.id)} />
        ))}
      </div>
    </div>
  )
}

export const Main = styled(MainContainer)`
  width: 1000px;
  margin: 0 auto;

  & .groups-container {
    display: flex;
    border: 0px solid black;
    padding: 0 15px;
    flex-wrap: wrap;
  }
`
