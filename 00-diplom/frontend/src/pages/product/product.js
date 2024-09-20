import { useParams, useMatch } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductContent, ProductForm } from './components'
import { request } from '../../utils'
import { openMessage, CLOSE_MESSAGE, setProduct, resetProduct } from '../../actions'
import { productSelector } from '../../selectors'
import { SETTINGS } from '../../const'
import styled from 'styled-components'

const ProductContainer = ({ className }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const product = useSelector(productSelector)
  const isCreatingProduct = useMatch('/groups/:groupId/products/new')
  const isEditingProduct = useMatch('/groups/:groupId/products/:productId/edit')

  useLayoutEffect(() => {
    if (isCreatingProduct) {
      dispatch(resetProduct(params.groupId))
    }
  }, [dispatch, params.groupId, isCreatingProduct])

  useEffect(() => {
    if (!isCreatingProduct) {
      request(`/groups/${params.groupId}/products/${params.productId}`, 'GET').then((product) => {
        if (product.error) {
          dispatch(openMessage(product.error))
          setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
          return
        }
        dispatch(setProduct(product.data))
      })
    }
  }, [dispatch, params.groupId, params.productId, isCreatingProduct])

  return (
    <div className={className}>
      {!isCreatingProduct && !isEditingProduct ? <ProductContent groupId={params.groupId} product={product} /> : <ProductForm groupId={params.groupId} product={product} />}
    </div>
  )
}

export const Product = styled(ProductContainer)`
  width: 1000px;
  margin: 0 auto;
`
