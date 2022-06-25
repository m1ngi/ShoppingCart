import { Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, productSelection } from "../../redux/selections";
import { loadCart, loadProduct } from "../../redux/slice";
import { Dispatch } from "../../redux/store";
import Product from "./product";

const ProductContainer = (): JSX.Element => {
  
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {
    dispatch(loadProduct())
  }, [])

  const products = useSelector(filterProduct)

  return (
    <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
      <Row gutter={[16, 24]}>
        {
          products.map(e => <Product key={e.id}
            name={e.name}
            price={e.price}
            image={e.image} id={e.id} />)
        }
      </Row>
    </div>
  )
}

export default ProductContainer;