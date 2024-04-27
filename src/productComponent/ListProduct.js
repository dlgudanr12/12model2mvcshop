import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, FormSelect, ListGroup, Row } from "react-bootstrap";
import userContext from "../context/Context";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";
import PageNavigator from "../commonComponent/PageNavigator";

const ListProduct=()=>{
    const user =JSON.parse(sessionStorage.getItem("user"));
    const active=Boolean(sessionStorage.getItem("active"));
  const menu=useContext(userContext);
  console.log("ListProduct menu : " + menu);

  let userRole = null;
  if(active===true){
    userRole = user.role;
  }

  const [resultPage,setResultPage]=useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const [totalCount,setTotalCount]=useState(1);
  const [searchCategory,setSearchCategory]=useState(0);
  const [listCategory,setListCategory]=useState( null);
  useEffect(()=>{
    console.log("ListProduct useEffect");
    callListProduct();
  },[]);
  
  const callListProduct=async()=>{
    try{
      const response = await axios.get("http://localhost:8000/productRest/reactGet/listProduct");
        console.log(response.data);
        setResultPage(response.data.resultPage);
        setCurrentPage(response.data.resultPage.currentPage);
        setTotalCount(response.data.resultPage.totalCount);
        setSearchCategory(response.data.search.searchCategory);
        setListCategory(response.data.listCategory);
    }catch(e){
      console.log(e);
    }
  }
  console.log("ListProduct.listCategory : "+JSON.stringify(listCategory));

  const fncGetList=async(currentPage)=>{
    try{
      const response = await axios.post(
        "http://localhost:8000/productRest/reactPost/listProduct",
        { currentPage : currentPage }
      );
      console.log(response.data);
      setResultPage(response.data.resultPage);
      setCurrentPage(response.data.resultPage.currentPage);
      setTotalCount(response.data.resultPage.totalCount);
      setSearchCategory(response.data.search.searchCategory);
      setListCategory(response.data.listCategory);

    }catch(e){
      console.log(e);
    }

  }
 
  // const login = async () => {
  //   console.log("login arrow function");

  //   let userId = document.getElementsByName("userId")[0].value;
  //   let password = document.getElementsByName("password")[0].value;
  //   console.log(userId, password);

  //   axios
  //     .post("http://localhost:8000/user/react/login", {
  //       userId: userId,
  //       password: password
  //     })
  //     .then((response) => {
  //       console.log(response.data);

  //       if (response.data!=null) {
  //         user.changeLogon(response.data);
  //         sessionStorage.setItem('active',true);
  //         sessionStorage.setItem('user',JSON.stringify(response.data));
  //         history.push("/");
  //       } else {
  //         alert("아이디,패스워드를 확인하시고 다시 로그인...");
  //       }
  //     });


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
              <Form.Select style={{ width: "200px", display: "inline" }}>
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
              {resultPage!==null ?(
              <userContext.Provider value={{resultPage, fncGetList}}>
                <Route path="/productRest/react/listProduct">
                  {/* <br/><Button onClick={()=>fncGetList(3)}>Page</Button> */}
                  <br />
                  <PageNavigator />
                </Route>
              </userContext.Provider>
              ):null}
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default ListProduct;