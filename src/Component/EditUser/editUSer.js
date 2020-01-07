import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';

class editUSer extends Component {
    state={
        id:'',
        full_name: '',
        email : '' ,
        
        role_type : '',
        mobile_no: '',

        user: sessionStorage.getItem("user"),
        errors: {},
    }
    componentDidMount(){
        const d = JSON.parse(this.state.user)
        this.setState({
            id: d.id,
            full_name: d.full_name,
            email: d.email,
            role_type: d.role_type,
            mobile_no: d.mobile_no
        })
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
      }
      validate =()=>{
        let errors = {};
        
         let formIsValid = true
        
         
          var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                if (!pattern.test(this.state.email) && !this.state.email) {
            formIsValid = false;
            
            errors["emailid"] = "*Please enter valid email-ID.";
            
          }
         if(this.state.mobile_no.length > 10)
         {
          formIsValid = false;
            
          errors["mobile"] = "*Please enter valid mobile number.";

         }
       
        
        this.setState({errors: errors})
        return formIsValid;
      
      }
      FormSubmit = e => {
        e.preventDefault()
        if(this.validate()){
        fetch('http://192.168.1.62:4000/api/admin/users/register',{
            method: 'POST',
            
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              full_name: this.state.full_name,
              email : this.state.email,
              
              role_type : this.state.role_type,
              mobile_no: this.state.mobile_no
             
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
            
          
      }
    render() {
        return (
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
                         
                          
                          
                          <label>Id</label>
                          <InputGroup className="mb-4">
                            <Input type="text" name="id"  
                            onChange ={this.onChange}
                             />
                          </InputGroup>
                          <label>Name:</label>
                          <InputGroup className="mb-4">
                            <Input type="text" name="name"  
                            onChange ={this.onChange} />
                          </InputGroup>
    
                          <label>Email:</label>
                          <InputGroup className="mb-3">
                            <Input type="text" name="uname"   
                            onChange ={this.onChange} />
                            
                            
                            
                            
                            
                           
                          </InputGroup>
                          <div className="errorMsg">{this.state.errors.emailid}</div>
    
                         

                          <label>Mobile No</label>
                          <InputGroup className="mb-4">
                            <Input  type="text" name="mobile_no" required  
                            onChange ={this.onChange} />
                            
                          </InputGroup>
                          <div className="errorMsg">{this.state.errors.mobile}</div>
                          <label>User Type</label>
                          <InputGroup className="mb-3">
                            <select type="text" name="role_type"  
                            onChange ={this.onChange} >
                                     <option>Select Role Type</option>
                                    <option value="1"> Super Admin</option>
                                    <option value="2"> Admin </option>
                                    <option value="4">CE</option>
                                    {/* <option value="4">D</option> */}
                                    
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
        );
    }
}

export default editUSer;