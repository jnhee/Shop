import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {return x.id == id})
  // let [alert, setAlert] = useState(true)
  let [num, setNum] = useState()

  // useEffect(() => {setTimeout(()=>{setAlert(false)}, 2000)
  //       return ()=>{clearTimeout(a)}}, [])

  useEffect(()=>{
    if (num === '') return;
    if (isNaN(num) == true){alert('숫자만 입력해주세요.')}},[num])

  return (
    <div className="container">
      {/* {alert == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null} */}
      <input onChange={(e)=>{setNum(e.target.value)}} />
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}

export default Detail;