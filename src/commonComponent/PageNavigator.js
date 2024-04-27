import { useContext } from "react";
import { Button, Col, Container, Form, ListGroup, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import userContext from "../context/Context";

const PageNavigator=()=>{
  
  const {resultPage,fncGetList} = useContext(userContext);
  console.log(resultPage);
  console.log(resultPage.currentPage+"/"+resultPage.pageUnit+"/"+resultPage.beginUnitPage+"/"+resultPage.endUnitPage);
  console.log(fncGetList);

  const pageFor=()=>{
    const result = [];
    for (let i=resultPage.beginUnitPage;i<=resultPage.endUnitPage;i++){
      result.push(
        <Pagination.Item onClick={() => fncGetList(i)}>{i}</Pagination.Item>
      );
    }
    return result;
  }
  return (
    <div className="ViewGood">
      <Pagination style={{ textAlign: "center" }}>
        {resultPage.currentPage > resultPage.pageUnit ? (
          <Pagination.Item
            onClick={() => fncGetList(resultPage.beginUnitPage - 1)}
          >
            ◀이전
          </Pagination.Item>
        ) : null}

        {pageFor()}

        {resultPage.endUnitPage < resultPage.maxPage ? (
          <Pagination.Item
            onClick={() => fncGetList(resultPage.endUnitPage + 1)}
          >
            이후▶
          </Pagination.Item>
        ) : null}
      </Pagination>
    </div>
  );
};

export default PageNavigator;