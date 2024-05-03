import { useContext } from "react";
import { Pagination } from "react-bootstrap";
import userContext from "../context/Context";

const PageNavigator=()=>{
  
  const {resultPage,fncGetList} = useContext(userContext);
  console.log(resultPage.currentPage+"/"+resultPage.pageUnit+"/"+resultPage.beginUnitPage+"/"+resultPage.endUnitPage);

  const pageFor=()=>{
    const result = [];
    for (let i=resultPage.beginUnitPage;i<=resultPage.endUnitPage;i++){
      result.push(
        <Pagination.Item key={i} onClick={() => fncGetList(i)}>{i}</Pagination.Item>
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