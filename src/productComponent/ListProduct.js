import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import userContext from "../context/Context";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";
import PageNavigator from "../commonComponent/PageNavigator";

const ListProduct = () => {
  const menu = useContext(userContext);
  console.log("ListProduct menu : " + menu);

  const [resultPage, setResultPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(currentPage);
  const [totalCount, setTotalCount] = useState(1);
  const [searchCategory, setSearchCategory] = useState(0);
  const [listCategory, setListCategory] = useState(null);
  const [list, setList] = useState();
  const [loadingPage,setLoadingPage]=useState(0);
  const searchCategoryName=useRef(0);

  let no = 0;
  useEffect(() => {
    console.log("ListProduct useEffect");
    // setTimeout(() => fncGetList(currentPage), 100);
    // setTimeout(() => fncScrollList(currentPage + 1), 200);
    // setTimeout(() => fncScrollList(currentPage + 2), 300);
    // setTimeout(() => setCurrentPage2(currentPage + 2), 400);
    fncGetList(currentPage);
  }, [currentPage,loadingPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const fncGetList = async (currentPage) => {
    try {
      const response = await axios.post(
        "http://192.168.0.31:8000/productRest/reactPost/listProduct",
        { currentPage: currentPage, searchCategory: searchCategory
           }
      );

      setResultPage(response.data.resultPage);
      setCurrentPage(response.data.resultPage.currentPage);
      setTotalCount(response.data.resultPage.totalCount);
      setSearchCategory(response.data.search.searchCategory);
      setListCategory(response.data.listCategory);
      setList(response.data.list);

      startEvent();
      window.scrollTo({
        top: 0,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log("ListProduct.listCategory : " + JSON.stringify(listCategory));

  const searchButton=()=>{
    console.log("searchCategoryName.current.value :"+searchCategoryName.current.value);
    setSearchCategory(searchCategoryName.current.value);
    setLoadingPage(loadingPage+1);
  }

  const startEvent = () => {
    fncScrollList(currentPage + 1).then(
      fncScrollList(currentPage + 2).then(
        setCurrentPage2(currentPage + 3))
    );
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fncScrollList(currentPage2); // 스크롤이 페이지 하단에 도달하면 데이터를 추가로 불러옴
      console.log("currentPage2+1 : " + (currentPage2));
      setCurrentPage2(currentPage2 + 1);
    }
  };

  const fncScrollList = async (currentPage) => {
    try {
      const response = await axios.post(
        "http://192.168.0.31:8000/productRest/reactPost/listProduct",
        { currentPage: currentPage, searchCategory: searchCategory }
      );

      setSearchCategory(response.data.search.searchCategory);
      setList((prevList) => [...prevList, ...response.data.list]);

    } catch (e) {
      console.log(e);
    }
  };

  const fncListProductRow = () => {
    const result = [];
    console.log(list);
    result.push(
      <Row>
        {list &&
          list.map((product, index) => (
            <Col>
              <Card key={product.prodNo} style={{ width: "26rem", }}>
                <Container key={index}>
                  <Card.Header>
                    <h3>{" " + (no += 1)+ ", " +product.prodNo + ", " + product.prodName}</h3>
                  </Card.Header>
                  <Row>
                    <Col>
                      <Card.Img
                        src={
                          "/resource/images/uploadFiles/" + product.fileList[0]
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
    );
    return result;
  };

  return (
    <div className="ViewGood">
      <Form>
        <Container>
          <Form.Group className="mb-3">
            <Form.Label>
              <h3>상품 관리</h3>
            </Form.Label>
          </Form.Group>

          <Row>
            <Col>
              전체 {totalCount} 건수, 현재 {currentPage} 페이지{" "}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Select
                defaultValue={"0"}
                style={{ width: "200px", display: "inline" }}
                ref={searchCategoryName}
              >
                <option value={"0"} selected={searchCategory === "0"}>
                  전체
                </option>
                {/* {listCategory && listCategory.map((category, index) => (
                <option key={index} value={category.categoryNo} selected={searchCategory===category.categoryNo}>{category.categoryName}</option>
                ))} */}
                {listCategory &&
                  listCategory.map((category) => (
                    <option
                      key={category.categoryNo}
                      value={category.categoryNo}
                      selected={searchCategory === category.categoryNo}
                    >
                      {category.categoryName}
                    </option>
                  ))}
              </Form.Select>{" "}
              {menu === "manage" ? (
                <Link to="/categoryRest/react/addCategory">
                  <Button>카테고리 추가</Button>
                </Link>
              ) : null}{" "}
              {menu === "manage" ? (
                <Link to="/categoryRest/react/updateCategoryView">
                  <Button>수정</Button>
                </Link>
              ) : null}
            </Col>
            <Col style={{display:"flex",justifyContent: "right"}}>
              <Button onClick={searchButton}>검색</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              {resultPage !== null ? (
                <userContext.Provider value={{ resultPage, fncGetList }}>
                  <br />
                  <Route path="/productRest/react/listProduct">
                    {/* <br/><Button onClick={()=>fncGetList(3)}>Page</Button> */}
                    <PageNavigator />
                  </Route>
                </userContext.Provider>
              ) : null}
            </Col>
          </Row>

          {fncListProductRow()}

          <Row>
            <Col>
              {resultPage !== null ? (
                <userContext.Provider value={{ resultPage, fncGetList }}>
                  <br />
                  <Route path="/productRest/react/listProduct">
                    {/* <br/><Button onClick={()=>fncGetList(3)}>Page</Button> */}
                    <PageNavigator />
                  </Route>
                </userContext.Provider>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default ListProduct;
