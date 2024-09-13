import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { request } from '../../utils'
import { openMessage, CLOSE_MESSAGE } from '../../actions'
import { SETTINGS } from '../../const'
import { Product } from './components/product/product'
import styled from 'styled-components'

const ProductsContainer = ({ className }) => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])

  useEffect(() => {
    request(`/groups/${params.groupId}/products`, 'GET').then((products) => {
      if (products.error) {
        dispatch(openMessage(products.error))
        setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
      }
      setProducts(products.data)
    })
  }, [dispatch, params.groupId])

  const handlerClickProduct = (productId) => {
    navigate(`/groups/${params.groupId}/products/${productId}`)
  }

  return (
    <div className={className}>
      <h3>Группа товаров{params.groupId}</h3>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} groupId={params.groupId} onClick={() => handlerClickProduct(product.id)} />
        ))}
      </div>
    </div>
  )
}

export const Products = styled(ProductsContainer)`
  width: 1000px;
  margin: 0 auto;

  & .products-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`
