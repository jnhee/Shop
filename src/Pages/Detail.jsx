import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { addItem } from "../store";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Detail(props) {

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) { return x.id == id })
  // let [alert, setAlert] = useState(true)
  let [num, setNum] = useState()
  let [tab, setTab] = useState(2)
  let dispatch = useDispatch()

  useEffect(() => {
    let watchedItem = JSON.parse(localStorage.getItem('watched') || '[]')
    watchedItem.push(찾은상품.id)
    watchedItem = [...new Set(watchedItem)]
    localStorage.setItem('watched', JSON.stringify(watchedItem))
  }, [])

  // =========================
  // 타이머알람, 인풋 기능
  // =========================
  // useEffect(() => {setTimeout(()=>{setAlert(false)}, 2000)
  //       return ()=>{clearTimeout(a)}}, [])
  // useEffect(() => {
  //   if (num === '') return;
  //   if (isNaN(num) == true) { alert('숫자만 입력해주세요.') }
  // }, [num])

  return (
    <div className="container">
      {/* {alert == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null} */}
      {/* <input onChange={(e) => { setNum(e.target.value) }} /> */}
      <div className="row">
        <div className="col-md-6">
          <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(addItem({ id: Number(id), name: 찾은상품.title, count: 1, })); toast.success('🛒장바구니에 상품이 담겼습니다.')
          }}>장바구니</button>
        </div>
      </div>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContents shoes={props.shoes} tab={tab} />
    </div>
  )
}
function TabContents({ tab, shoes }) {
  let [fade, setFade] = useState('')
  useEffect(() => {
    setTimeout(() => { setFade('end') }, 10)
    return () => { setFade('') }
  }, [tab])
  return (<div className={'start ' + fade}>{[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab]}</div>)
}

export default Detail;