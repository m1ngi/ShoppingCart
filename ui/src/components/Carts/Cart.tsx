import { Button, Col, Input, Row, Space } from "antd"
import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { updateItem } from "../../redux/slice"
import { Dispatch } from "../../redux/store"

export interface CartProp{
  id: number
  productId: number
  image: string
  name: string
  quantity: number
  total: number
  price: number
}

export interface CartItemUpdate{
  id: number
  quantity: number
}


const Cart: React.FC<CartProp> = (item):JSX.Element => {
  const dispatch = useDispatch<Dispatch>()

  const updateInServer = async (id: number, quantity: number): Promise<boolean> => {
    const response = await fetch('https://localhost:7244/api/cart/items', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({id: id, quantity: quantity})
    })

    return response.status === 204
  }

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if(event.target.value !== ''){
      const newQuantity = parseInt(event.target.value)
      if(await updateInServer(item.id, newQuantity)){
        dispatch(updateItem({id: item.id, quantity: newQuantity}))
      }
      else {
        alert("Một lỗi nào đấy đã xảy ra")
      }
    }
  }

  const handleUpdateQuantityButton = async (n: number): Promise<void> => {
    if (item.quantity === 1 && n === -1)
      return;

    const newQuantity = item.quantity + 1
    if(await updateInServer(item.id, newQuantity)){
      dispatch(updateItem({id: item.id, quantity: item.quantity + n}))
    }
    else {
      alert("Một lỗi nào đấy đã xảy ra")
    }
  }

  return (
    <Row>
      <Col span={5}>
        <img src={item.image} className="img-thumbnail" alt={item.name}/>
      </Col>
      <Col span={15}>
        <Space direction="vertical">
          <Link to={`products/${item.productId}`}>
            <h3>{item.name}</h3>
          </Link>
          <p className="text-danger f-bold">Thành tiền: {item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</p>
          <Space direction="horizontal">
            <Button danger onClick={() => {handleUpdateQuantityButton(-1)}}> - </Button>
            <Input onChange={handleInputChange} name="quantity" value={item.quantity}/>
            <Button danger onClick={() => {handleUpdateQuantityButton(1)}}> + </Button>
          </Space>
        </Space>
      </Col>
      <Col span={4}>
        <Button danger>Xóa</Button>
      </Col>
    </Row>
  )
}

export default Cart;