import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';

//  import './style.css';
 import {Link} from 'react-router-dom'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
 import ModalForm from '../ModularForm/Modularform'
 import SSCI from '../StUtcC/Stucc'
 import './style.css';
 import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
 class EditJob extends Component {
  state={
    id:this.props.location.state.detail.id,
    seller_name:this.props.location.state.detail.seller_name,
    address:this.props.location.state.detail.address,
    contact_no_2:this.props.location.state.detail.contact_no_2,
    email:this.props.location.state.detail.email,
    valid_till:this.props.location.state.detail.valid_till,
    seller_type_id:this.props.location.state.detail.seller_type_id,
    aadhar:this.props.location.state.detail.aadhar,
    pan_no:this.props.location.state.detail.pan_no,
    reg_no:this.props.location.state.detail.reg_no,
    gstin:this.props.location.state.detail.gstin,
    errors: {},
    // markers: "https://www.google.com/maps/search/@${this.props.location.state.detail.lat},${this.props.location.state.detail.log}"
    markers: "https://www.google.com/maps/search/?api=1&query="+this.props.location.state.detail.lat+","+this.props.location.state.detail.log,
      //  markers: 'https://www.google.com/maps/@${this.props.location.state.detail.lat},${this.props.location.state.detail.log},${10}z'
    aadhar_doc: ["https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+2 +"/images/"+1,
    "https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+2 +"/images/"+2],
    pan_doc: ["https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+1 +"/images/"+1,
    ],
    reg_doc: ["https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+4 +"/images/"+1],
    gst_doc: ["https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+5 +"/images/"+1]
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  validate =()=>{
    let errors = {};
    
     let formIsValid = true
    
      //regular expression for email validation
      var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!pattern.test(this.state.email)) {
        formIsValid = false;
        
        errors["emailid"] = "*Please enter valid email-ID.";
        
      }
    
    this.setState({errors: errors})
    return formIsValid;
  }
  submitFormEdit = e => {
    e.preventDefault()
    
    if(this.validate()){
      
      // fetch('http://localhost:3000/seller/'+ this.props.location.state.detail.id,{
      fetch('http://192.168.1.62:4000//api/seller/info/'+ this.props.location.state.detail.id,{
      method: 'put',
      
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seller_name: this.state.seller_name,
        address: this.state.address,
        email:this.state.email,
        contact_no_2: this.state.contact_no_2,
        valid_till: this.state.valid_till,
        seller_type_id:this.state.seller_type_id,
        aadhar: this.state.aadhar,
        pan_no: this.state.pan_no,
        reg_no: this.state.reg_no,
        gstin: this.state.gstin,
      })
})
      .then(res=> {
        if(res.status === 200){
          return this.props.history.push({pathname: '/payoutedit/',
          state: {seller_id: this.props.location.state.detail.id }})        }
      })
      .catch(err => console.log(err))
      
    }
}


   componentDidMount(){
     console.log(this.state.aadhar_doc)
   }
 
  location=()=>{
    console.log(this.props.location.state.detail.lat, this.props.location.state.detail.log)
    window.open(this.state.markers)
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
                      <h1 className="align-items-center float-center">Edit Seller </h1>
                      <SSCI className="text-muted" buttonLabel="image" docs={[
                        "https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.id+"/upload/"+1 +"/images/"+1,
                        "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      ]}></SSCI>
                      
                      <br></br>
                      {/* <InputGroup> */}
                      {/* <Modalforms  buttonLabel="Map" markers={markers}  lat={this.props.location.state.detail.lat} log={this.props.location.state.detail.log}></Modalforms></InputGroup> */}
                      
                      <Label>Seller Id</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" disabled  defaultValue={this.props.location.state.detail.id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      {/* <Label>Store location:</Label>
                      <InputGroup>
                     
                      </InputGroup> */}
                        
                      <label>Seller Name:</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="seller_name"  defaultValue={this.props.location.state.detail.seller_name}
                        onChange ={this.onChange} />
                      </InputGroup>

                      <label>Seller Address:</label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="address"   defaultValue={this.props.location.state.detail.address}
                        onChange ={this.onChange} />
                        {/* <a href={} className="btn"><i className="fa fa-map-marker" onClick={this.location}>
                          </i> </a> */}
                          <i onClick={this.open} className="fa fa-map-marker icon" onClick={this.location}>
                          </i>
                      </InputGroup>
                      

                      <label>Email</label>
                      <InputGroup className="mb-4">
                        <Input  type="text" name="email" required  defaultValue={this.props.location.state.detail.email}
                        onChange ={this.onChange} />
                        
                      </InputGroup>
                      <div className="errorMsg">{this.state.errors.emailid}</div>

                      <label>Alternate Contact</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="contact_no_2"  defaultValue={this.props.location.state.detail.contact_no_2}
                        onChange ={this.onChange} />
                      </InputGroup>

                      <label>Validity</label>
                      <InputGroup className="mb-3">
                        <Input type="date" name="valid_till" defaultValue={this.props.location.state.detail.valid_till}
                        onChange ={this.onChange} />
                      </InputGroup>

                      <label>Is Service</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="contact_no_2"  defaultValue={this.props.location.state.detail.is_service}
                        disabled/>
                      </InputGroup>

                      <label>Seller Type</label>
                      <InputGroup className="mb-3">
                        <select type="text" name="seller_type_id" disabled defaultValue={this.props.location.state.detail.seller_type_id}
                        onChange ={this.onChange} >
                                <option value="1">Verified</option>
                                <option value="2"> Non-Verified </option>
                                <option value="3">Non-BinBill</option>
                                <option value="4">Online</option>
                                <option value="5">OnHold</option>
                          </select>
                      </InputGroup>
                      

                      <label>Aadhar: {this.state.aadhar}</label>
                      <InputGroup className="mb-4">
                       
                        <ModalForm  aadhar = {this.props.location.state.detail.aadhar} name="aadhar" 
                        defaultValue={this.props.location.state.detail.aadhar} 
                        id={this.props.location.state.detail.aadhar} buttonLabel="aadhar"  
                        item={this.props.location.state.detail.aadhar}
                        docs={this.state.aadhar_doc}
                        onSome ={this.onChange.bind(this)}>
                          aadhar No:{this.state.aadhar}
                         </ModalForm>
                         {/* <Input type="text" name="aadhar"  defaultValue={this.state.aadhar}
                          onChange ={this.onChange} /> */}
                         
                        

                      </InputGroup>

                      <label>Pan Number: {this.state.pan_no}</label>
                      <InputGroup className="mb-4">
                        {/* <Input type="text" name="pan_no"  defaultValue={this.props.location.state.detail.pan_no}
                        onChange ={this.onChange} /> */}
                          <ModalForm  aadhar = {this.props.location.state.detail.pan_no} name="pan_no" 
                        defaultValue={this.props.location.state.detail.pan_no} 
                        id={this.props.location.state.detail.pan_no} buttonLabel="pan_no"  
                        item={this.props.location.state.detail.pan_doc}
                        docs={this.state.pan_doc}
                        onSome ={this.onChange.bind(this)}>
                          Pan Number: {this.state.pan_no}
                          
                         </ModalForm>
                         
                      </InputGroup>

                      <label>Reg Number: {this.state.reg_no}</label>
                      <InputGroup className="mb-4">
                        {/* <Input type="text" name="reg_no"  defaultValue={this.props.location.state.detail.reg_no}
                        onChange ={this.onChange} /> */}
                          <ModalForm  
                           name="reg_no" 
                        defaultValue={this.props.location.state.detail.reg_no} 
                        id={this.props.location.state.detail.reg_no} buttonLabel="reg_no"  
                        item={this.props.location.state.detail.reg_no}
                        docs={this.state.reg_doc}
                        onSome ={this.onChange.bind(this)}>
                          Reg No: {this.state.reg_no}
                          
                         </ModalForm>
                      </InputGroup>

                      <label>GSTIN: {this.state.gstin}</label>
                      <InputGroup className="mb-4">
                        {/* <Input type="text" name="gstin"  defaultValue={this.props.location.state.detail.gstin}
                        onChange ={this.onChange} /> */}
                          <ModalForm  
                           name="gstin" 
                        defaultValue={this.props.location.state.detail.gstin} 
                        id={this.props.location.state.detail.gstin} buttonLabel="gst_no"  
                        item={this.props.location.state.detail.gstin}
                        docs={this.state.gst_doc}
                        onSome ={this.onChange.bind(this)}>
                          Gst No: {this.state.gstin}
                          
                         </ModalForm>
                      </InputGroup>

                      

                      <Row>
                        
                          <Button color="primary" className="px-2" onClick={this.submitFormEdit}>Submit</Button>
                          {/* <Button color="danger" className="px-2 ml-3" onClick={this.submitFormEditAndPayout}>Submit & Go TO Payout</Button> */}
                        
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

export default withRouter(EditJob)