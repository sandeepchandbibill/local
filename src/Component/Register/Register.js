import React, {Component} from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';

class Register extends Component {
    state={
        name: "",
        uname : "",
        pass : "",
        role_type : 1,
        active : true


    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
      }
      FormSubmit = e => {
        e.preventDefault()
        fetch('http://localhost:4000/api/admin/users/register',{
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                uname : this.state.uname,
                pass : this.state.pass,
                role_type : this.state.role_type,
                active : this.state.active
             
            })
            
          })
            .then(res=> {
              if(res){
                alert("Register Successfully")
                
              return this.props.history.push({pathname: '/base/tables'})
              }
            })
            .catch(err => console.log(err))
            
          
      }
    render(){
        return(
            <div className="app flex-row ">
            <Container>
              <Row className="justify-content-center">
                <Col md="6">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        
                        <Form>
                          <h1 className="align-items-center float-center">Register</h1>
                          <p className="text-muted">Register Yourself</p>
                         
                          
                          
                            
                          <label>Name:</label>
                          <InputGroup className="mb-4">
                            <Input type="text" name="name"  
                            onChange ={this.onChange} />
                          </InputGroup>
    
                          <label>User Name:</label>
                          <InputGroup className="mb-3">
                            <Input type="text" name="uname"   
                            onChange ={this.onChange} />
                            
                            
                            
                            
                            
                           
                          </InputGroup>
                          
    
                          <label>Password</label>
                          <InputGroup className="mb-4">
                            <Input  type="password" name="pass" required  
                            onChange ={this.onChange} />
                            
                          </InputGroup>
                          
    
                          <label>Seller Type</label>
                          <InputGroup className="mb-3">
                            <select type="text" name="role_type"  
                            onChange ={this.onChange} >
                                    <option value="1">Admin</option>
                                    <option value="2"> B </option>
                                    <option value="3">C</option>
                                    <option value="4">D</option>
                                    
                              </select>
                          </InputGroup>
                          <Label>Status</Label>
                         
                          <InputGroup>
                          <select type="text" name="role_type"  
                            onChange ={this.onChange} >
                                    <option value="True">True</option>
                                    <option value="False"> False </option>
                                    
                                    
                              </select>
                          
                          </InputGroup>
                          
    
                          
                          <Row>
                            
                              <Button color="primary" className="px-2" onClick={this.FormSubmit}>Submit</Button>
                              
                            
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        )
    }

}
export default Register