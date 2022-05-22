import { useSelector } from 'react-redux';
import styled from 'styled-components';

import CartListContainer from 'components/CartsList/CartListContainer';
import CheckedItemsController from 'components/CheckBox/CheckedItemsController';
import { BasicDivideLine, Flex } from 'components/shared/basics';
import TotalPrice from 'components/TotalPrice/TotalPrice';

function Carts() {
  const { carts, checkedCarts } = useSelector((state) => state.carts);
  const { products } = useSelector((state) => state.products);

  const findById = (objectArray, id) =>
    objectArray.find((object) => object.id === id);

  const storedProducts = carts
    .map((cart) => cart.id)
    .map((id) => ({
      ...findById(products, id),
      quantity: findById(carts, id).quantity,
    }));
  const checkedProducts = checkedCarts
    .map((cart) => cart.id)
    .map((id) => ({
      ...findById(products, id),
      quantity: findById(carts, id).quantity,
    }));

  const totalPrice = Number(
    storedProducts?.reduce((acc, cur) => acc + +cur.price * +cur.quantity, 0)
  ).toLocaleString('ko-kr');

  const totalQuantity = Number(
    storedProducts?.reduce((acc, cur) => acc + +cur.quantity, 0)
  ).toLocaleString('ko-kr');

  return (
    <Style.Container>
      <Style.Header>
        <Style.Title>장바구니</Style.Title>
        <BasicDivideLine weight="bold" mv="20" />
      </Style.Header>

      <Style.CartListContainer justify="space-between">
        <Style.CartListWrapper>
          <CheckedItemsController checkedCarts={checkedCarts} />
          <span>{`든든배송 상품(${totalQuantity}개)`}</span>
          <BasicDivideLine weight="bold" color="lightgray" mv="10" />
          <CartListContainer
            storedProducts={storedProducts}
            checkedProducts={checkedProducts}
          />
        </Style.CartListWrapper>
        <TotalPrice total={totalPrice} quantity={totalQuantity} />
      </Style.CartListContainer>
    </Style.Container>
  );
}

export default Carts;

const Style = {
  Container: styled.section`
    padding: 24px 300px;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  `,
  Title: styled.h2`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  `,
  CartListContainer: styled(Flex)`
    padding: 0 20px;
  `,
  CartListWrapper: styled.div`
    width: 60%;
  `,
};
