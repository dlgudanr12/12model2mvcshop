import axios from "axios";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import userContext from "../context/Context";
import logo_spring from "../resource/logo-spring.png";

const LoginView = () => {
  console.log("LoginView");
  const user = useContext(userContext);
  console.log(user);

  let history = useHistory();

  const login = async () => {
    console.log("login arrow function");

    let userId = document.getElementsByName("userId")[0].value;
    let password = document.getElementsByName("password")[0].value;
    console.log(userId, password);

    axios
      .post("http://192.168.0.31:8000/user/react/login", {
        userId: userId,
        password: password
      })
      .then((response) => {
        console.log(response.data);

        if (response.data!=null) {
          user.changeLogon(response.data);
          sessionStorage.setItem('active',true);
          sessionStorage.setItem('user',JSON.stringify(response.data));
          history.push("/");
        } else {
          alert("아이디,패스워드를 확인하시고 다시 로그인...");
        }
      });
  };

  return (
    <div className="ViewGood">
      <Container
        style={{
          borderStyle: "solid",
          borderWidth: "5px",
          borderColor: "#FBBE4B",
        }}
      >
        <Row>
          <Col>
            <Container xs={12} md-auto>
              <Image src={logo_spring} alt="logo_spring" fluid />
            </Container>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Container
              style={{ textAlign: "center", backgroundColor: "lightgray" }}
            >
              <br />
              <br />
              <h1>Logon</h1>
              아이디 : <input type="text" name="userId" />
              <br />
              <br />
              비밀번호 : <input type="password" name="password" />
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button onClick={login}>로그인</Button>
                </Col>
              </Row>
              <br />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginView;
