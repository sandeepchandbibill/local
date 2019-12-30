import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import './login.css'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
 

class Login extends Component {
  state ={
    uname:'',
    pass:'',
    UserRole:'1',
    message:''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  Login=()=>{
      const body = JSON.stringify({
      uname:this.state.uname,
      pass:this.state.pass,
      role_type:this.state.UserRole
    })
    fetch('http://192.168.1.62:4000/api/admin/users/authenticate',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },body
    })
      .then(res=> res.json())
        .then(res=>{
            if(res.data != null){
                  sessionStorage.setItem("roleType", this.state.UserRole);
                  sessionStorage.setItem("token",res.data.token);
                  return this.props.history.push({pathname: '/dashboard'})
            }
            else{
              this.setState({message:"Please Check Username Password Carefully" })
            }
          })
      .catch(err => console.log(err))
    }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <p className="message">{this.state.message}</p>
                    <Form> 
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="uname" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="pass" onChange={this.onChange} />
                      </InputGroup>
                      <label className="label">User Type</label>
                      <InputGroup className="role">
                        <select type="text" name="UserRole" 
                        onChange ={this.onChange} >
                                <option value="1">Super Admin</option>
                                <option value="2"> Admin </option>
                                <option value="4">Costumer Executive</option>
                          </select>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" onClick={this.Login} className="px-4">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
{/* <Provider globalState={this.state.UserRole}></Provider> */}

export default Login;
