import { Button, Container, NavDropdown, Navbar,Nav } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Top = () => {
  const user =JSON.parse(sessionStorage.getItem("user"));
  let active=Boolean(sessionStorage.getItem("active"));
  let userRole=null;
  if(active===true){
    userRole = user.role;
  }

  const logoutButton = () => {
    console.log("logoutButton");
    sessionStorage.clear();
    active = Boolean(sessionStorage.getItem("active"));
    console.log("logoutButton active : "+active);
    window.location.reload();
  };

  return (
    <div className="ViewGood">
      {active !== true ? (
        <Navbar expand="md" className="bg-body-tertiary">
          <Container>
            <Navbar.Text className="me-auto">
              <Link to="/">Model2 MVC Shop</Link>
            </Navbar.Text>
            <Navbar.Text className="ml-auto">
              <Link to="/user/json/addUserView">회원가입</Link>{" "}
              <Link to="/user/react/login">로 그 인</Link>
            </Navbar.Text>
          </Container>
        </Navbar>
      ) : (
        <Navbar expand="md" className="bg-body-tertiary">
          <Container>
            <Nav className="me-auto">
              <Navbar.Brand>
                <Link to="/">Model2 MVC Shop</Link>
              </Navbar.Brand>
              <NavDropdown title="회원관리" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/user/json/getUser">개인정보조회</Link>
                </NavDropdown.Item>
                {userRole === "admin" ? (
                  <NavDropdown.Item>
                    <Link to="/user/json/listUser">회원정보조회</Link>
                  </NavDropdown.Item>
                ) : null}
                <NavDropdown.Divider />
                <NavDropdown.Item>etc...</NavDropdown.Item>
              </NavDropdown>

              {userRole === "admin" ? (
                <NavDropdown title="판매상품관리" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/productRest/json/addProduct">판매상품등록</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/productRest/react/listProduct/manage">판매상품관리</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/purchaseRest/json/listDelivery">배송 관리</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>etc...</NavDropdown.Item>
                </NavDropdown>
              ) : null}

              <NavDropdown title="상품구매" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/productRest/react/listProduct">상품검색</Link>
                </NavDropdown.Item>
                {userRole === "user" ? (
                  <NavDropdown.Item>
                    <Link to="/purchaseRest/json/listPurchase">
                      구매이력조회
                    </Link>
                  </NavDropdown.Item>
                ) : null}
                {userRole === "user" ? (
                  <NavDropdown.Item>
                    <Link to="/basketRest/json/listBasket">장바구니</Link>
                  </NavDropdown.Item>
                ) : null}
                <NavDropdown.Item>
                  <Link to="/json/history">최근본상품</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>etc...</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Navbar.Text className="ml-auto">
              <Button variant="outline-primary" onClick={logoutButton}>
                로그아웃
              </Button>
            </Navbar.Text>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default Top;