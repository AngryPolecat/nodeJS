import { useParams, useMatch } from 'react-router-dom'
import { ProductContent, ProductForm } from './components'
import styled from 'styled-components'

const ProductContainer = ({ className }) => {
  const params = useParams()
  const isCreatingProduct = useMatch('/groups/:groupId/products/new')
  const isEditingProduct = useMatch('/groups/:groupId/products/:productId/edit')

  //console.log(params.groupId)

  return <div className={className}>{!isCreatingProduct && !isEditingProduct ? <ProductContent /> : <ProductForm groupId={params.groupId} />}</div>
}

export const Product = styled(ProductContainer)`
  width: 1000px;
  margin: 0 auto;
`
