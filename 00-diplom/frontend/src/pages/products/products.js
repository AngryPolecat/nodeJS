import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../utils';
import { openMessage, CLOSE_MESSAGE } from '../../actions';
import { SETTINGS } from '../../const';
import { Product } from './components/product/product';
import { Pagination } from '../../components';
import { groupSelector } from '../../selectors';
import styled from 'styled-components';

const ProductsContainer = ({ className }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const group = useSelector(groupSelector);

  useEffect(() => {
    request(`/groups/${params.groupId}/products?page=${page}&limit=${SETTINGS.PAGINATION_LIMIT_PRODUCT}`, 'GET').then((products) => {
      if (products.error) {
        dispatch(openMessage(products.error));
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT);
        //закомментировать если нужно узнать внутреннюю ошибку
        navigate('/404');
      }
      setProducts(products.data);
      setLastPage(products.lastPage);
    });
  }, [dispatch, params.groupId, page, navigate]);

  const handlerClickProduct = (productId) => {
    navigate(`/groups/${params.groupId}/products/${productId}`);
  };

  return (
    <div className={className}>
      <Pagination page={page} lastPage={lastPage} onClickBack={() => setPage(page - 1)} onClickForward={() => setPage(page + 1)}>
        {group.title}
      </Pagination>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} groupId={params.groupId} onClick={() => handlerClickProduct(product.id)} />
        ))}
      </div>
    </div>
  );
};

export const Products = styled(ProductsContainer)`
  width: 1000px;
  margin: 0 auto;

  & .products-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 0px solid black;
    padding: 0 20px;
  }

  & .pagination {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;

    & h3 {
      width: 100%;
    }

    & i {
      color: #405060;
    }
  }
`;
