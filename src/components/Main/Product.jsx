import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropType from 'prop-types';
import { BasicImage, BasicButton } from '../shared/basics';
import { CART_SIZE, COLOR } from '../../constants';
import { ReactComponent as CartIcon } from '../shared/CartIcon.svg';
import { useDispatch } from 'react-redux';
import { addToCarts, deleteFromCarts } from '../../store/product';

function Product({ id, src, price, title, isStored }) {
  const dispatch = useDispatch();

  const [isClicked, setIsClicked] = useState(isStored);

  const handleCartClick = async () => {
    if (isClicked) {
      dispatch(deleteFromCarts(id));
    } else {
      dispatch(addToCarts(id));
    }

    setIsClicked((prev) => !prev);
  };

  useEffect(() => {
    setIsClicked(isStored);
  }, [isStored]);

  return (
    <div>
      <Styled.ProductImageWrapper>
        <Styled.ProductImage src={src} />
      </Styled.ProductImageWrapper>
      <Styled.ProductInfoContainer>
        <Styled.ProductInfoWrapper>
          <Styled.ProductName>{title}</Styled.ProductName>
          <Styled.ProductPrice>{`${price}원`}</Styled.ProductPrice>
        </Styled.ProductInfoWrapper>
        <Styled.CartButton onClick={handleCartClick}>
          <CartIcon
            width={CART_SIZE.SMALL.WIDTH}
            height={CART_SIZE.SMALL.HEIGHT}
            fill={isClicked ? COLOR.PRIMARY : COLOR.BLACK}
          />
        </Styled.CartButton>
      </Styled.ProductInfoContainer>
    </div>
  );
}

Product.propTypes = {
  id: PropType.string.isRequired,
  src: PropType.string.isRequired,
  title: PropType.string.isRequired,
  price: PropType.string.isRequired,
  isStored: PropType.bool.isRequired,
};

export default Product;

const Styled = {
  ProductInfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    width: 280px;
    padding: 5px;
    align-items: center;
  `,
  ProductInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,
  ProductImageWrapper: styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;
  `,
  ProductImage: styled(BasicImage)`
    cursor: pointer;
    transition: all ease-in-out 0.1s;
    &:hover {
      transform: scale(1.05);
    }
  `,
  ProductName: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  ProductPrice: styled.span`
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
  `,
  CartButton: styled(BasicButton)`
    &:hover {
      opacity: 0.6;
    }
  `,
};
