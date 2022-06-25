import { Col, Row, Space } from "antd"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../redux/selections";
import { loadCart } from "../../redux/slice";
import { Dispatch } from "../../redux/store";
import Cart from "./Cart";

const CartContainer = (): JSX.Element => {
  const cart = useSelector(cartSelector)
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    if (cart.items.length == 0){
      dispatch(loadCart())
    }
  })

  return (
    <Row gutter={16}>
      <Col span={14} offset={2}>
        <Space direction="vertical" size="large" className="w-100">
          {
            cart.items.map(e => <Cart key={e.id}
              productId={e.productId}
              image={e.image}
              id={e.id}
              name={e.name}
              quantity={e.quantity}
              total={e.total}
              price={0}/>)
          }
        </Space>
      </Col>
      <Col span={4}>
        <p className="f-bold text-danger">Tổng tiền: {cart.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
      </Col>
    </Row>
  )
}

export default CartContainer;