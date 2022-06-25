import { Input, Modal, Space } from "antd"
import { ChangeEvent, useState } from "react"
import { IdentityResponse } from "../../type"

interface localState {
  username: string
  password: string
  repeatPassword: string
  name: string
}

const inititalState: localState = {
  username: '',
  password: '',
  repeatPassword: '',
  name: ''
}

const RegisterModal: React.FC<{show: boolean, hide: () => void, name: (name: string) => void}> = ({show, hide, name}): JSX.Element => {
  const [data, setData] = useState<localState>(inititalState)
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setData({...data, [event.target.name]: event.target.value})
  }
  
  const handleOk = async (): Promise<void> => {
    setLoading(true)
    const response = await fetch('https://localhost:7244/api/auth/register', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response)
      setLoading(false)

    if (response.status === 200){
      const result: IdentityResponse = await response.json()

      if (result.jwt !== ''){
        setData(inititalState)
        localStorage.setItem('jwt', result.jwt)
        name(result.name)
        hide()
      }
    }
  }
  
  return (
    <Modal visible={show}
      onCancel={hide}
      onOk={handleOk}
      centered
      confirmLoading={loading}
      okText="Đăng ký"
      cancelText="Hủy"
      title="Đăng ký"
    >
      <Space direction="vertical" size="middle" style={{width: '100%'}}>
        <Input onChange={handleInputChange} placeholder="Tên đăng nhập" name="username" type="text" />
        <Input.Password onChange={handleInputChange} visibilityToggle placeholder="Mật khẩu" name="passowrd"/>
        <Input.Password onChange={handleInputChange} visibilityToggle placeholder="Nhắc lại mật khẩu" name="repeatPassword" />
        <Input onChange={handleInputChange} type="text" name="name" placeholder="Tên người dùng "/>
      </Space>
    </Modal>
  )
}

export default RegisterModal;