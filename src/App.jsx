import { use, useEffect, useState } from 'react';
import './App.css'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.jsx';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './Pages/Detail.jsx';
import Cart from './Pages/Cart.jsx';
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery({
    queryKey: ['getName'],
    queryFn: () => axios.get('https://codingapple1.github.io/userdata.json').then(a => a.data)
  })
  

  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/detail/1') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto txt_wh'>
            {result.isPending && '로딩'}
            {result.isError && '에러'}
            {result.isSuccess && result.data.name}
            </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container>
              <Row>
                {shoes.map(function (a, i) {
                  return (<Card shoes={shoes[i]} i={i} />)
                })}
              </Row>
            </Container>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                })
            }}>버튼</button>
          </>
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

function Card(props) {
  const navigate = useNavigate();
  return (
    <Col onClick={() => { navigate('/detail/' + props.shoes.id); }} style={{ cursor: 'pointer' }}>
      <img className='product-img' src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App
