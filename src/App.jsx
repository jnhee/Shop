import { useState } from 'react';
import './App.css'
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.jsx';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './Pages/Detail.jsx';

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className='App'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
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
          </>
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
      </Routes>
    </div>
  )
}

function Card(props) {
  return (
    <Col>
      <img className='product-img' src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App
