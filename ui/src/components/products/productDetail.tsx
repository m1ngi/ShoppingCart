import { Button, Col, Divider, Image, Input, Row, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface ProductProp {
  id: number
  name: string
  author: string
  description: string
  image: string
  price: number
}

const ProductDetail = (): JSX.Element => {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductProp | undefined>()
  const [quantity, setQuantity] = useState<number>(1)

  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch(`https://localhost:7244/api/products/${id}`, {
        method: 'GET'
      });

      if (response.status === 200){
        setProduct(await response.json() as ProductProp)
      }
    }
    loadProduct();
  }, [id])

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === '' || event.target.value === '0'){
      setQuantity(1)
    } else {
      setQuantity(parseInt(event.target.value))
    }
  }

  const handleUpdateQuantityButton = (n: number) => {
    if (quantity === 1 && n === -1)
      return;

    setQuantity(quantity + n)
  }

  const addItem = async () => {
    const response = await fetch('https://localhost:7244/api/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        productId: product?.id,
        quantity: quantity
      })
    })

    if (response.status === 204){
      alert("Thêm thành công");
    }
  }


  return (
    <div style={{paddingRight: '5%', paddingLeft: '5%'}}>
      <Row gutter={12}>
        <Col span={10} offset={2}>
          <Image src={product?.image}/>
        </Col>
        <Col span={10}>
          <Row gutter={8}>
            <Col span={4}>
              Tác giả
            </Col>
            <Col span={12}>
              {product?.author}
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={4}>
              Giá
            </Col>
            <Col span={12}>
              {product?.price}
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={4}>
              Mô tả
            </Col>
            <Col span={12}>
              {product?.description}
            </Col>
          </Row>
          <Divider />
          <Space direction="horizontal">
            <Button onClick={() => {handleUpdateQuantityButton(-1)}}> - </Button>
            <Input value={quantity} min="1" onChange={handleQuantityChange}/>
            <Button onClick={() => {handleUpdateQuantityButton(1)}}> + </Button>
            <Button danger onClick={addItem}>Thêm vào giỏ hàng</Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetail;