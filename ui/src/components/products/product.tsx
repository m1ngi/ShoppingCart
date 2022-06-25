import { Button, Card, Col, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";
import { ProductProp } from "../../type";

const Product: React.FC<ProductProp> = ({name, id, image, price}): JSX.Element => {

  return (
    <Col span={6}>
      <Card hoverable
        
        cover={<img src={image} alt={name}/>}
      >
        <Space direction="vertical" size="large" className="w-100">
          <Meta title={name} />
          <Meta title={<h3 className="text-danger text-center">{price.toLocaleString('vi', {style: 'currency', currency: 'VND'})}</h3>} />
          <Meta style={{justifyContent: 'center'}} title={<Link to={`products/${id}`} className="text-center d-block w-50">
            <Button size="large" >Xem chi tiết</Button>
          </Link>} />
          </Space>
      </Card>
    </Col>
  )
}

export default Product;