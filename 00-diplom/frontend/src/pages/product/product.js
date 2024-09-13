import { useParams, useMatch } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ProductContent, ProductForm } from './components'
import { request } from '../../utils'
import { openMessage, CLOSE_MESSAGE, setProduct } from '../../actions'
import { SETTINGS } from '../../const'
import styled from 'styled-components'

const ProductContainer = ({ className }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const isCreatingProduct = useMatch('/groups/:groupId/products/new')
  const isEditingProduct = useMatch('/groups/:groupId/products/:productId/edit')

  useEffect(() => {
    if (!isCreatingProduct) {
      request(`/groups/${params.groupId}/products/${params.productId}`, 'GET').then((product) => {
        if (product.error) {
          dispatch(openMessage(product.error))
          setTimeout(() => dispatch(CLOSE_MESSAGE), SETTINGS.MESSAGE_OPENING_LIMIT)
          return
        }
        //setProduct(product.data)
        dispatch(setProduct(product.data))
      })
    }
  }, [dispatch, params.groupId, params.productId, isCreatingProduct])

  return <div className={className}>{!isCreatingProduct && !isEditingProduct ? <ProductContent /> : <ProductForm groupId={params.groupId} />}</div>
}

export const Product = styled(ProductContainer)`
  width: 1000px;
  margin: 0 auto;
`
