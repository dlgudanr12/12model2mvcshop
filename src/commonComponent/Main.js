import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Main=()=>{
  const user =JSON.parse(sessionStorage.getItem("user"));
  const active=Boolean(sessionStorage.getItem("active"));
  let userRole=null;
  if(active===true){
    userRole = user.role;
    console.log("main user : "+userRole);
  }

  return (
    <div className="ViewGood">
      <Container>
        <Form>
          <Row>
            <Col xs={3}>
              <ListGroup>
                <ListGroup.Item active disabled>
                  회원관리
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/user/json/getUser">개인정보조회</Link>
                </ListGroup.Item>
                {userRole === "admin" ? (
                  <ListGroup.Item>
                    <Link to="/user/json/listUser">회원정보조회</Link>
                  </ListGroup.Item>
                ) : null}
              </ListGroup>
              <br />
              {userRole === "admin" ? (
                <ListGroup>
                  <ListGroup.Item active disabled>
                    판매상품관리
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/productRest/json/addProduct">판매상품등록</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/productRest/manage/listProduct">판매상품관리</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/purchaseRest/json/listDelivery">배송 관리</Link>
                  </ListGroup.Item>
                </ListGroup>
              ) : null}
              <br />
              <ListGroup>
                <ListGroup.Item active disabled>
                  상품구매
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/productRest/react/listProduct">상품검색</Link>
                </ListGroup.Item>

                {userRole === "user" ? (
                  <ListGroup.Item>
                    <Link to="/purchaseRest/json/listPurchase">
                      구매이력조회
                    </Link>
                  </ListGroup.Item>
                ) : null}

                {userRole === "user" ? (
                  <ListGroup.Item>
                    <Link to="/basketRest/json/listBasket">장바구니</Link>
                  </ListGroup.Item>
                ) : null}

                <ListGroup.Item>
                  <Link to="/json/history">최근본상품</Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col xs={6}>
              {active !== true ? (
                <Container>
                  <Row style={{ backgroundColor: "lightgray" }}>
                    <Col md={6}>
                      <br />
                      <h1>Model2 MVC Shop</h1>
                      <br />
                      <p>로그인 후 사용가능...</p>
                      <p>로그인 전 검색만 가능합니다.</p>
                      <p>회원가입 하세요.</p>

                      <div>
                        <Link to="/user/json/addUserView">
                          <Button variant="primary">회원가입</Button>
                        </Link>{" "}
                        <Link to="/user/react/login">
                          <Button variant="primary">로 그 인</Button>
                        </Link>
                      </div>
                      <br />
                    </Col>
                  </Row>
                </Container>
              ) : (
                <Container>
                  <Row style={{ backgroundColor: "lightgray" }}>
                    <Col md={6}>
                      <br />
                      <h1>Model2 MVC Shop</h1>
                      <br />
                      <p>
                        J2SE , DBMS ,JDBC , Servlet & JSP, Java Framework ,
                        HTML5 , UI Framework 학습 후 Mini-Project 진행
                      </p>
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Main;