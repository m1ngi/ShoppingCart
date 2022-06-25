import { Input, Modal, Space } from "antd"
import { ChangeEvent, useState } from "react"
import { Credential } from "../../type"

const LoginModal: React.FC<{show: boolean, hide: () => void, name: (name: string) => void}> = ({show, hide, name}):JSX.Element => {
  const [credential, setCredential] = useState<Credential>({
    username: '',
    password: ''
  })

  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCredential({...credential, [event.target.name]: event.target.value})
  }

  const handleOk = async () => {
    setConfirmLoading(true)
    const response = await fetch('https://localhost:7244/api/auth/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential)
    });

    if (response.status === 200){
      const result = await response.json()
      name(result.name)
      show = false
      localStorage.setItem('jwt', result.jwt)
      hide()
    }

    setConfirmLoading(false)
  }
  
  return (
    <Modal visible={show} centered title="Đăng nhập"
      okText="Đăng nhập"
      cancelText="Hủy"
      onOk={handleOk}
      onCancel={hide}
      confirmLoading={confirmLoading}>
      <Space direction="vertical" size="middle" style={{width: '100%'}}>
        <Input size="large" name="username" placeholder="Tên đăng nhập" onChange={handleInputChange}/>
        <Input.Password visibilityToggle size="large" name="password" placeholder="Mật khẩu" type="text" onChange={handleInputChange}/>
      </Space>
    </Modal>
  )
}

export default LoginModal;