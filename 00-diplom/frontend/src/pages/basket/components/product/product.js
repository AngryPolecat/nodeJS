import { useState } from 'react'
import { Icon, Input } from '../../../../components'
import styled from 'styled-components'

const ProductContainer = ({ className, product: { id, title, url, count, cost, group }, setTotalPrice, totalPrice, onRemoveProductFromBasket }) => {
  const [productCount, setProductCount] = useState(1)

  const handlerChangeCountProduct = ({ target }) => {
    setProductCount(target.value)
    setTotalPrice(totalPrice - cost + cost * target.value)
  }

  return (
    <div className={className}>
      <li>
        <div className="product-image">
          <img src={url} alt="" />
        </div>
        <div className="product-info">
          <span className="product-title">{title}</span>
          <span className="product-cost">
            Цена: {cost} <Icon id="fa-btc" size="14px" margin="0 0 0 0" />
          </span>
          <span>Остаток на складе: {count}</span>
        </div>
        <div className="product-count">
          <Input type="number" size="14px" width="70px" name="product-count" value={productCount} onChange={handlerChangeCountProduct} min="1" step="1" max={count} />
        </div>
        <div className="total">
          {productCount * cost}
          <Icon id="fa-btc" size="16px" margin="0 0 0 0" />
        </div>
        <div className="buttons">
          <Icon id="fa-trash-o" size="22px" margin="0 0 0 10px" onClick={onRemoveProductFromBasket} />
        </div>
      </li>
    </div>
  )
}

export const Product = styled(ProductContainer)`
  display: flex;
  flex-direction: row;

  & li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #405060;
    margin-bottom: 5px;
    padding: 10px;
    decoration: none;
    list-style-type: none;
    border-radius: 10px;
    width: 99%;

    & .product-image {
      width: 150px;
      height: 100px;
      background-image: url('https://china-motor.ru/img/placeholder.jpg');
      background-repeat: no-repeat;
      background-size: 150px 100px;
      margin-right: 10px;

      & img {
        width: 150px;
        height: 100px;
      }
    }

    & .product-info {
      display: flex;
      flex-direction: column;
      text-align: left;
      width: 45%;

      & span {
        font-size: 14px;
      }

      & .product-title {
        font-weight: bold;
        font-size: 16px;
      }

      & .product-cost {
        display: flex;
        flex-direction: row;
      }
    }

    & .product-count {
      width: 15%;
    }

    & .total {
      display: flex;
      flex-direction: row;
      width: 10%;
      justify-content: end;
    }
  }
`
