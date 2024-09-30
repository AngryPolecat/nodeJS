import styled from 'styled-components';

const ProductContainer = ({ className, product }) => {
  return <div className={className}>{product.title}</div>;
};

export const Product = styled(ProductContainer)``;
