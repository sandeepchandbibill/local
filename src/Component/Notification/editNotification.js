import React, {Component} from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Form, FormGroup, Label, InputGroup,Input, FormText, Row } from 'reactstrap';
import axios from 'axios'
import './notification.css'
import swal from 'sweetalert';  
class Editnot extends Component{
      state= {
    active: 'true',
    title: this.props.location.state.detail.title,
    message: this.props.location.state.detail.message,
    description: this.props.location.state.detail.description,
    link: this.props.location.state.detail.link,
    image_url:this.props.location.state.detail.image_url,
    schedule_time:this.props.location.state.detail.schedule_time,
    notification_type:'2',
    api_url:'',
      }
      
      onChange = e => {
            this.setState({[e.target.name]: e.target.value})
          }
    
    change1 = e =>{
        this.setState({api_url:'1'})
    }

    change2 = e =>{
        this.setState({api_url:'0'})
    }
    // validate =()=>{
    //   let errors = {};

    //   let formIsValid = true


    //     if(!this.state.title){
    //       formIsValid = false;
    //       errors["title"] = "This is required"
    //     }
    //     if(!this.state.message){
    //       formIsValid = false;
    //       errors["message"] = "This is required"
    //     }
    //     if(!this.state.image_url)
    //     {
    //       formIsValid = false;
    //       errors["image_url"] = "This is required"
    //     }
    //     if(!this.state.schedule_time){
    //       formIsValid = false;
    //       errors["schedule_time"] = "This is required"
    //     }
    //     if(!this.state.active){
    //       formIsValid = false;
    //       errors["active"] = "This is required"
    //     }
    //   this.setState({errors: errors})
    //   return formIsValid;
    
    // }
    submitFormEdit = e => {
      e.preventDefault()
    //   if(this.validate()){
         
            axios({
                method: 'post',
                url:'http://192.168.1.62:4000/api/notification/bulk/send?id='+this.props.location.state.detail.id,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('token')
                  },
                  data: JSON.stringify({
                
                    title: this.state.title,
                    message: this.state.message,
                    description: this.state.description,
                    link:this.state.link,
                    image_url:this.state.image_url,
                    schedule_time: this.state.schedule_time,
                    active: this.state.active,
                    notification_type: this.state.notification_type,
                    api_url: this.state.api_url,
                  })
            })
   
          .then(res=> {
            // if(res.status === 200){
                // console.log("hi"+JSON.stringify(res.data))
                // console.log("yo", this.state.title)
               alert("successfully updated")
                return this.props.history.push({pathname: '/viewschedulednotification'})
           
          })
          .catch(err => console.log(err))
    
    }

 
render(){
    return(
        <div className="app flex-row ">
          <Container>
            <Row className="justify-content-center">
              <Col md="7">
                <CardGroup>
                  <Card className="p-4">
                    

                    <CardBody>
                      <Form>
                      <FormGroup>
                              <Label for="id">ID <span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text" disabled name="id" defaultValue={this.props.location.state.detail.id}   onChange={this.onChange} />
                        </FormGroup>
                      
                        <FormGroup>
                              <Label for="title">Title <span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text" name="title" defaultValue={this.props.location.state.detail.title} id="title"  onChange={this.onChange} />
                        </FormGroup>

                        <FormGroup>
                              <Label for="message">Message <span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text"  name="message" defaultValue={this.props.location.state.detail.message} id="message" onChange={this.onChange}  />
                        </FormGroup>

                        <FormGroup>
                              <Label for="description">Description <span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text"  name="description" defaultValue={this.props.location.state.detail.description}  id="description" onChange={this.onChange}  />
                        </FormGroup>

                        <FormGroup>
                              <Label for="link">Link<span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text" name="link" defaultValue={this.props.location.state.detail.link}    id="link" onChange={this.onChange}  />
                        </FormGroup>
                      

                        <FormGroup>
                              <Label for="image_url">Image URL <span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text"  name="image_url" defaultValue={this.props.location.state.detail.image_url}    id="image_url" onChange={this.onChange}  />
                        </FormGroup>
                       

                        <FormGroup>
                              <Label for="schedule_time">Scheduled Time<span aria-hidden="true" className="required"> *</span></Label>
                              <Input type="text"  name="schedule_time" defaultValue={this.props.location.state.detail.schedule_time}    id="schedule_time" onChange={this.onChange}  />
                        </FormGroup>
                        <FormGroup>
                        <Label>Notigication Scheduling<span aria-hidden="true" className="required"> *</span></Label>
                        <InputGroup className="mb-3">
                        <select type="text" name="api_url" required 
                        onChange ={this.onChange} >
                            <option>Select Type</option>
                                <option value="0">TEST API</option>
                                <option value="1">PROD API</option>  
                          </select>
                        </InputGroup>
                        </FormGroup>

                        <FormGroup>
                        <Label>Active<span aria-hidden="true" className="required"> *</span></Label>
                        <InputGroup className="mb-3">
                        <select type="text" name="active" required defaultValue={this.props.location.state.detail.active}
                        onChange ={this.onChange} >
                                <option value="true">True</option>
                                <option value="false">False</option>  
                          </select>
                        </InputGroup>
                        </FormGroup>

                        <Row>
                        <Col xs="5">
                          <Button color="primary" className="px-4" onClick={this.submitFormEdit}>Submit</Button>
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
    )
}
}
export default Editnot
