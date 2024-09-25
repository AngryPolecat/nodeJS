import { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Icon, Textarea } from '../../../../components';
import { openMessage, CLOSE_MESSAGE, setProduct } from '../../../../actions';
import { SETTINGS } from '../../../../const';
import { request } from '../../../../utils';
//import { productSelector } from '../../../../selectors';
import styled from 'styled-components';

// const initialFormState = {
//   title: '',
//   group: null,
//   url: '',
//   cost: '',
//   count: '',
//   description: '',
// };

// const useStore = (product) => {
//   const [stateForm, setStateForm] = useState({ ...product });

//   return {
//     setProduct: () => setStateForm({ ...product }),
//     getState: () => stateForm,
//     updateStateForm: (field, value) => setStateForm({ ...stateForm, [field]: value }),
//   };
// };

const ProductFormContainer = ({ className, product, groupId }) => {
  //const product = useSelector(productSelector);
  //console.log('Form components', product);

  //const { getState, updateStateForm, setProduct } = useStore(product);
  //const { title, url, cost, count, description, group } = getState();
  const [title, setTitle] = useState(product.title);
  const [url, setUrl] = useState(product.url);
  const [cost, setCost] = useState(product.cost);
  const [count, setCount] = useState(product.count);
  const [group, setGroup] = useState(groupId);
  const [description, setDescription] = useState(product.description);
  const [groups, setGroups] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setTitle(product.title);
    setUrl(product.url);
    setCost(product.cost);
    setCount(product.count);
    setGroup(groupId);
    setDescription(product.description);
  }, [product.title, product.url, product.cost, product.count, product.description, groupId]);

  useEffect(() => {
    request('/groups?limit=0', 'GET').then((groups) => {
      if (groups.error) {
        dispatch(openMessage(groups.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        navigate('/');
        return;
      }
      setGroups(groups.data);
    });
  }, [dispatch, navigate]);

  // const handlerChangeFieldForm = ({ target }) => {
  //   const { name, value } = target;
  //   updateStateForm(name, value);
  // };

  const handlerSaveProduct = () => {
    const requestUrl = product.id ? `${product.id}` : '';
    const method = product.id ? 'PATCH' : 'POST';
    request(`/groups/${groupId}/products/` + requestUrl, method, { title, url, cost, count, description, group }).then((product) => {
      if (product.error) {
        dispatch(openMessage(product.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        return;
      }
      dispatch(setProduct(product.data));
      navigate(`/groups/${groupId}/products/${product.data.id}`);
    });
  };

  const handlerChangeTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handlerChangeGroup = ({ target }) => {
    setGroup(target.value);
  };

  const handlerChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const handlerChangeCost = ({ target }) => {
    setCost(target.value);
  };

  const handlerChangeCount = ({ target }) => {
    setCount(target.value);
  };

  const handlerChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  return (
    <div className={className}>
      <div className="buttons">
        <Icon id="fa-floppy-o" size="24px" margin="5px 0 0 0" title="Сохранить товар" onClick={handlerSaveProduct} />
      </div>
      <Input type="text" placeholder="Наименование товара" size="14px" name="title" value={title} onChange={handlerChangeTitle} />
      <div className="groups-container">
        <select value={group} onChange={handlerChangeGroup} name="group">
          {groups.map(({ id, title }) => (
            <option value={id} key={id}>
              {title}
            </option>
          ))}
        </select>
      </div>
      <Input type="text" placeholder="URL адрес картинки товара" size="14px" name="url" value={url} onChange={handlerChangeUrl} />
      <Input type="text" placeholder="Цена товара" size="14px" name="cost" width="150px" value={cost} onChange={handlerChangeCost} />
      <Input type="text" placeholder="Количество товара" size="14px" name="count" width="150px" value={count} onChange={handlerChangeCount} />
      <div className="content-container">
        <Textarea placeholder="Описание товара" size="14px" name="description" value={description} onChange={handlerChangeDescription} />
      </div>
    </div>
  );
};

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
    min-height: 500px;
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
`;
