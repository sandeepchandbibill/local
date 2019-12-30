import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';
 import {Link} from 'react-router-dom'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
 import ModalForm from '../ModularForm/Modularform'
 import swal from 'sweetalert';

 import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
 class EditOtherVerification extends Component {
  state={
    id:this.props.location.state.detail.id,
    seller_name:this.props.location.state.detail.seller_name,
    contact_no:this.props.location.state.detail.contact_no,
    googleLink:(this.props.location.state.detail &&  this.props.location.state.detail.other_verification && this.props.location.state.detail.other_verification.googleLink) || "",
    cce1Name: (this.props.location.state.detail && this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce1 && this.props.location.state.detail.other_verification.customer_care.cce1.name) || "", 
    cce1Remark: (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce1 && this.props.location.state.detail.other_verification.customer_care.cce1.remark) || "",
    cce1VerifyTime: (this.props.location.state.detail && this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce1 && this.props.location.state.detail.other_verification.customer_care.cce1.verification_time) || "",
    cce2Name: (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce2 && this.props.location.state.detail.other_verification.customer_care.cce2.name) || "", 
    cce2Remark: (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce2 && this.props.location.state.detail.other_verification.customer_care.cce2.remark) || "",
    cce2VerifyTime: (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.customer_care && this.props.location.state.detail.other_verification.customer_care.cce2 && this.props.location.state.detail.other_verification.customer_care.cce2.verification_time) || "",
    justDialLink:(this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.justdial_link) || "",
    locationLink:(this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.location_link) || "",
    phy_name : (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.physical_verification &&this.props.location.state.detail.other_verification.physical_verification.name)|| "",
    phy_remark : (this.props.location.state.detail &&  this.props.location.state.detail.other_verification &&this.props.location.state.detail.other_verification.physical_verification &&this.props.location.state.detail.other_verification.physical_verification.remark) || "", 
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }


   componentDidMount(){
   }

   submitDetails = e => {
       const body =  JSON.stringify({
        googleLink :this.state.googleLink,
        justdial_link: this.state.justDialLink,
        location_link: this.state.locationLink,
        physical_verification: {
              name: this.state.phy_name,
              remark: this.state.phy_remark
              },
          customer_care:{
              cce1:{
                  name: this.state.cce1Name,
                  remark: this.state.cce1Remark,
                  verification_time: this.state.cce1VerifyTime,
              },
              cce2:{
                  name: this.state.cce2Name,
                  remark: this.state.cce2Remark,
                  verification_time: this.state.cce2VerifyTime,
              },
          },  
      });
      console.log(body);
    fetch('http://192.168.1.62:4000/api/seller/other/'+this.state.id,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },body
      })
        .then(res=> {
          if(res.status === 200){
          return this.props.history.push({pathname: '/otherverification',
        state: {seller_id: this.props.location.state.detail.id }})
          }
        })
        .catch(err => console.log(err))
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
                      <h1 className="align-items-center float-center">Other Verification Details</h1>
                      <p className="text-muted">Edit the seller Info</p>
                      {/* <InputGroup> */}
                      {/* <Modalforms  buttonLabel="Map" markers={markers}  lat={this.props.location.state.detail.lat} log={this.props.location.state.detail.log}></Modalforms></InputGroup> */}
                      
                      <Label>Seller Id</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" disabled 
                        defaultValue={this.state.id} />
                      </InputGroup>
                      {/* <Label>Store location:</Label>
                      <InputGroup>
                     
                      </InputGroup> */}
                        
                      <label>Seller Name:</label>
                      <InputGroup className="mb-4">
                        <Input type="text" disabled  
                        defaultValue={this.state.seller_name} />
                      </InputGroup>

                      <label>Seller Contact</label>
                      <InputGroup className="mb-3">
                        <Input type="text"  disabled
                        defaultValue={this.state.contact_no} />
                      </InputGroup>
                      
                      <label>Google Link</label>
                      <InputGroup className="mb-4">
                        <Input  type="text" name="googleLink"  
                        onChange ={this.onChange}
                        defaultValue={this.state.googleLink} />
                      </InputGroup>

                      <label>Costumer Care 1 Name</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce1Name"  
                        onChange ={this.onChange}
                        defaultValue={this.state.cce1Name}  />
                      </InputGroup>

                      <label>Costumer Care 1 Remark</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce1Remark"  
                        onChange ={this.onChange} 
                        defaultValue={this.state.cce1Remark} />
                      </InputGroup>

                      <label>Costumer Care 1 Verification Time</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce1VerifyTime"  
                        onChange ={this.onChange} 
                        defaultValue={this.state.cce1VerifyTime} />
                      </InputGroup>

                      <label>Costumer Care 2 Name</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce2Name"  
                        onChange ={this.onChange} 
                        defaultValue={this.state.cce2Name} />
                      </InputGroup>

                      <label>Costumer Care 2 Remark</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce2Remark"  
                        onChange ={this.onChange}
                        defaultValue={this.state.cce2Remark}  />
                      </InputGroup>

                      <label>Costumer Care 2 Verification Time</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="cce2VerifyTime"  
                        onChange ={this.onChange}
                        defaultValue={this.state.cce2VerifyTime}  />
                      </InputGroup>

                      <label>JustDial Link</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="justDialLink"  
                        onChange ={this.onChange}
                        defaultValue={this.state.justDialLink}  />
                      </InputGroup>

                      <label>Location Link</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="locationLink"  
                        onChange ={this.onChange}
                        defaultValue={this.state.locationLink}  />
                      </InputGroup>

                      <label>Physical Verification Name</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="phy_name"  
                        onChange ={this.onChange}
                        defaultValue={this.state.phy_name} />
                      </InputGroup>

                      <label>Physical Verification Remark</label>
                      <InputGroup className="mb-4">
                        <Input type="text" name="phy_remark"  
                        onChange ={this.onChange}
                        defaultValue={this.state.phy_remark} />
                      </InputGroup>

                      <Row>
                          <Button color="primary" className="px-2" onClick={this.submitDetails}>Submit</Button>
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

export default withRouter(EditOtherVerification)