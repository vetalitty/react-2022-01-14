import { connect } from 'react-redux';

import Button from '../button';
import { decrement, increment, remove } from '../../redux/actions';

function Basket({ orderProducts, total, decrement, increment, remove }) {
  return (
    <div data-id="basket">
      <p>Basket</p>
      {orderProducts.map((p) => (
        <div key={p.product.id}>
          <p>{p.product.name}</p>
          <p>
            {p.amount}x{p.product.price}$
          </p>
          <p>subtotal {p.subtotal}$</p>
          <Button onClick={decrement} icon="minus" />
          <Button onClick={increment} icon="plus" />
          <Button onClick={remove}>Remove</Button>
        </div>
      ))}
      <p>Total: {total}$</p>
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const products = props.restaurants.flatMap((r) => r.menu);
  const orderProducts = Object.keys(state.order)
    .filter((productId) => state.order[productId] > 0)
    .map((productId) => products.find((product) => product.id === productId))
    .map((product) => ({
      product,
      amount: state.order[product.id],
      subtotal: state.order[product.id] * product.price,
    }));

  const total = orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0);
  return {
    orderProducts,
    total,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  console.log(props);
  return {
    decrement: () => dispatch(decrement(props.product.id)),
    increment: () => dispatch(increment(props.product.id)),
    remove: () => dispatch(remove(props.product.id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
