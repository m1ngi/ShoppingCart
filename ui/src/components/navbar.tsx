import { Col, Input, Menu, Row, Space } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons"
import { ChangeEvent, useEffect, useState } from "react";
import LoginModal from "./modals/loginModal";
import RegisterModal from "./modals/registerModal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "../redux/store";
import { updateFilter } from "../redux/slice";

const Navbar = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>()
  const [showLogin, setShowLogin] = useState<boolean>(false)
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [logged, setLogged] = useState<boolean>(true)

  const handleHideLoginForm = (): void => setShowLogin(false)
  const handleHideRegisterForm = (): void => setShowRegister(false)

  useEffect(() => {
    (
      async () => {
        const token = localStorage.getItem('jwt')

        if (token === null || token === '') {
          setLogged(true)
        } else {
          const response = await fetch('https://localhost:7244/api/auth/name', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          var result = await response.json()

          setName(result.name)
        }
      }
    )()
  }, [])

  useEffect(() => {
    if (localStorage.getItem('jwt') !== null){
      setLogged(false)
    }
  }, [name])

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateFilter(event.target.value))
  }

  const clearFilter = (): void => {
    dispatch(updateFilter(''))
  }


  return (
    <Row justify="center" className="w-100">
      <Col span={1} offset={3}>
      <Link className="" to="/" onClick={clearFilter}>
          <HomeFilled style={{fontSize: '32px', color: 'white'}}/>
        </Link>
      </Col>
      <Col span={14}>
        <Input onChange={handleFilterChange} placeholder="Tìm kiếm sản phẩm" name="filter"/>
      </Col>
      <Col span={2}>
        <Link to="cart" className="d-block text-center">
          <ShoppingCartOutlined style={{fontSize: '32px', color: 'white'}}/>
        </Link>
      </Col>
      <Col span={4}>
      {
          logged ? (
            <Row justify="center" gutter={8} align="middle">
              <Col span={8}>
              <a className="d-block text-center" onClick={() => setShowRegister(true)}>Đăng ký</a>
              </Col>
              <Col span={8}>
              <a className="d-block text-center" onClick={() => setShowLogin(true)}>Đăng nhập</a>
              </Col>
            </Row>
          ) : (
            <p className="text-white">Xin chào: {name}</p>
          )
        }
      </Col>
      <LoginModal name={setName} hide={handleHideLoginForm} show={showLogin}/>
      <RegisterModal name={setName} show={showRegister} hide={handleHideRegisterForm}/>
    </Row>
  )

}

export default Navbar;