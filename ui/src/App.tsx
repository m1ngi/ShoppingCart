import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import React from 'react';
import Navbar from './components/navbar';
import 'antd/dist/antd.css'
import ProductContainer from './components/products/productContainer';
import { Divider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './components/products/productDetail';
import CartContainer from './components/Carts/CartContainer';

const App = (): JSX.Element => {
  return (
    <Layout>
      <Header className='sticky'>
        <Navbar />
      </Header>
      <Content>
        <Divider />
        <Routes>
          <Route path='/' element={<ProductContainer />} />
          <Route path='products/:id' element={<ProductDetail />} />
          <Route path='cart' element={ <CartContainer /> }/>
        </Routes>
      </Content>
      <Footer></Footer>
    </Layout>

  )
}

export default App;
