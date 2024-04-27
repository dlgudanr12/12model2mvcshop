import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const DefaultComponent=()=>{
    const user =JSON.parse(sessionStorage.getItem("user"));
    const active=Boolean(sessionStorage.getItem("active"));
  let userRole = null;
  if(active===true){
    userRole = user.role;
  }

  return (
    <div className="ViewGood">
      
    </div>
  );
};

export default DefaultComponent;