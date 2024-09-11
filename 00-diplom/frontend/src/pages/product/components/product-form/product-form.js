import { useSelector } from 'react-redux'
import { Input, Icon, Textarea } from '../../../../components'
import { groupsSelector } from '../../../../selectors'
import styled from 'styled-components'

const ProductFormContainer = ({ className, groupId }) => {
  const groups = useSelector(groupsSelector)

  const handlerChangeGroupProduct = () => {}

  return (
    <div className={className}>
      <div className="buttons">
        <Icon id="fa-floppy-o" size="24px" margin="5px 0 0 15px" title="Сохранить товар" />
        <Icon id="fa-trash-o" size="24px" margin="5px 0 0 15px" title="Удалить товар" />
      </div>
      <Input type="text" placeholder="Наименование товара" size="14px" name="title" />
      <div className="groups-container">
        <select value={groupId} onChange={handlerChangeGroupProduct} name="group">
          {groups.map(({ id, title }) => (
            <option value={id} key={id}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <Input type="text" placeholder="URL адрес картинки товара" size="14px" name="url" />
      <Input type="text" placeholder="Цена товара" size="14px" name="cost" width="150px" />
      <Input type="text" placeholder="Количество товара" size="14px" name="count" width="150px" />
      <div className="content-container">
        <Textarea placeholder="Описание товара" size="14px" name="description" />
      </div>
    </div>
  )
}

export const ProductForm = styled(ProductFormContainer)`
  width: 1000px;
  margin: 0 auto;

  & .buttons {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-bottom: 5px;
  }

  & .content-container {
    width: 100%;
  }

  & textarea {
    width: 100%;
    resize: none;
    height: 100px;
  }

  & .groups-container {
    display: flex;
    flex-direction: row;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 200px;

    & select {
      outline: none;
      border: none;
      background: inherit;
      color: #212529;
      padding: 5px;
      width: 100%;
    }
  }
`
