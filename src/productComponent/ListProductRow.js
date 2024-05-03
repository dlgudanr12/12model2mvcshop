import { useContext, useEffect, useState } from "react";
import userContext from "../context/Context";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const ListProductRow=()=>{
    const {list,currentPage} = useContext(userContext);
    let no=0;
    let currentPage2=currentPage;
    const [list2,setList2]=useState(list);
    
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[currentPage2]);

  const fncScrollList=async(currentPage)=>{
    try{
      const response = await axios.post(
        "http://localhost:8000/productRest/reactPost/listProduct",
        { currentPage: currentPage }
      );
      console.log("ListProductRow : "+response.data);
      setList2((prevList) => [...prevList, ...response.data.list]);

    }catch(e){
      console.log(e);
    }
  }

  
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fncScrollList(currentPage2 + 1); // 스크롤이 페이지 하단에 도달하면 데이터를 추가로 불러옴
    }
  };

    return (
      <div className="ViewGood">
        <Row>
          {list2 &&
            list2.map((product, index) => (
              <Col>
                <Card style={{ width: "26rem" }}>
                  <Container key={index}>
                    <Card.Header>
                      <h3>{" " + (no+=1) + ", " + product.prodName}</h3>
                    </Card.Header>
                    <Row>
                      <Col>
                        <Card.Img
                          src={
                            "/resource/images/uploadFiles/" +
                            product.fileList[0]
                          }
                        />
                      </Col>
                      <Col>
                        <p>{" 가격 :" + product.price}</p>
                        <p> 등록일</p>
                        <p>{" " + product.regDate}</p>
                        {product.prodQuantity !== 0 ? <p> 판매 중</p> : null}
                        {product.prodQuantity === 0 ? <p> 재고 없음</p> : null}
                        <p>{" 재고 : " + product.prodQuantity} 개</p>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
}
export default ListProductRow;