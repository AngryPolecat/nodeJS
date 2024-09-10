import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const ProductsContainer = ({ className }) => {
  const params = useParams()

  return (
    <div className={className}>
      <h3>Группа товаров{params.groupId}</h3>
    </div>
  )
}

export const Products = styled(ProductsContainer)``
