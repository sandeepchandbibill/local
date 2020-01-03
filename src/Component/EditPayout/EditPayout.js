import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';
 import './style.css';
 import SSCI from '../Can/Can'
//  import Select from 'react-select'
//  import ModalForm from '../ModularForm/Modularform'
 import { Button, Card, CardBody, CardGroup,FormGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
//  const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
 class EditPayout extends Component {
  state={
    active: this.props.location.state.detail.active,
    seller_id:this.props.location.state.detail.seller_id,
    bene_id: this.props.location.state.detail.bene_id,
    bene_group:this.props.location.state.detail.bene_group,
    transfer_mode:this.props.location.state.detail.transfer_mode,
    bene_name:this.props.location.state.detail.bene_name,
    email:this.props.location.state.detail.email,
    phone:this.props.location.state.detail.phone,
    bank_account:this.props.location.state.detail.bank_account,
    ifsc:this.props.location.state.detail.ifsc,
    vpa:this.props.location.state.detail.vpa,
    card_no:this.props.location.state.detail.card_no,
    address1:this.props.location.state.detail.address1,
    address2:this.props.location.state.detail.address2,
    city:this.props.location.state.detail.city,
    state:this.props.location.state.detail.state,
    pincode:this.props.location.state.detail.pincode,
    errors: {} ,
    bank_account1: '',
    canelcheque:[],
    selectedOption: [],
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  validate =()=>{
    let errors = {};
    
    
     let formIsValid = true
    
      //regular expression for email validation
      var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (pattern.test(this.state.email)===false) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
      if(this.state.bank_account !== this.state.bank_account1){
        formIsValid = false;
        errors["bank_account"] = "Doesn't match please check it carefully"
      }
      if(!this.state.transfer_mode){
        formIsValid = false;
        errors["transfer_Mode"] = "This is required"
      }
      if(!this.state.ifsc){
        formIsValid = false;
        errors["ifsc"] = "This is required"
      }
      if(!this.state.bene_id){
        formIsValid = false;
        errors["bene_id"] = "This is required"
      }
      if(!this.state.bene_name){
        formIsValid = false;
        errors["bene_name"] = "This is required"
      }
      if(!this.state.bene_group)
      {
        formIsValid = false;
        errors["bene_group"] = "This is required"
      }
      if(!this.state.bene_id){
        formIsValid = false;
        errors["bene_id"] = "This is required"
      }
      if(!this.state.phone){
        formIsValid = false;
        errors["phone"] = "This is required"
      }
      if(!this.state.address1){
        formIsValid = false;
        errors["address1"] = "This is required"
      }
     
     
    
    this.setState({errors: errors})
    return formIsValid;
  
  }
  componentDidCatch(){
    return this.props.history.push({pathname: '/base/tables'})
  }
  submitFormEdit = e => {
    e.preventDefault()
    if(this.validate()){
      alert("updated!!")
      // fetch('http://localhost:3000/rows/'+this.props.location.state.detail.seller_id,{
      fetch('http://192.168.1.62:4000/api/seller/payouts/'+this.props.location.state.detail.seller_id,{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        
            'x-auth-token': sessionStorage.getItem('token')
          
        },
        body: JSON.stringify({
         active: this.state.active,
          bene_id: this.state.bene_id,
          bene_group: this.state.bene_group,
          transfer_mode: this.state.transfer_mode,
          bene_name:this.state.bene_name,
          email:this.state.email,
          phone: this.state.phone,
          bank_account: this.state.bank_account,
          ifsc: this.state.ifsc,
          vpa:this.state.vpa,
          card_no: this.state.card_no,
          address1:this.state.address1,
          address2:this.state.address2,
          city:this.state.city,
          state:this.state.state,
          pincode:this.state.pincode,
          
          
         
        })
      })
        .then(res=> {
          if(res.status === 200){
          return this.props.history.push({pathname: '/payout'})
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
                      <h1 className="align-items-center">Edit Seller Payout</h1>
                      
                      
                      <br></br>

                      <FormGroup>
                            <Label for="SellerId">Seller Id<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" disabled name="seller_id" defaultValue={this.props.location.state.detail.seller_id} onChange={this.onChange} id="sellerid"  />
                      </FormGroup>
                      
                      <FormGroup>
                            <Label for="bene_id">Bene Id<span aria-hidden="true" className="required"> *</span></Label>
                            <Input  type="text"   name="bene_id" defaultValue={this.props.location.state.detail.bene_id } id="bene_id" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.bene_id}</div>
                      <FormGroup>
                      <Label>Seller Status<span aria-hidden="true" className="required"> *</span></Label>
                      <InputGroup className="mb-3">
                        <select type="text" name="active" required defaultValue={this.props.location.state.detail.active}
                        onChange ={this.onChange} >
                                <option value="true">True</option>
                                <option value="false">False</option>  
                          </select>
                      </InputGroup>
                      </FormGroup>

                      <FormGroup>
                            <Label for="bene_name">Bene Name<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required  name="bene_name" defaultValue={this.props.location.state.detail.bene_name}  id="bene_name" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.bene_name}</div>

                      <FormGroup>
                            <Label for="bene_group">Bene Group<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required disabled  name="bene_group" defaultValue="SellersPayout"  id="bene_group" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.bene_group}</div>

                      <FormGroup>
                            <Label for="transfer_mode">Transfer Mode<span aria-hidden="true" className="required"> *</span></Label>
                            <InputGroup className="mb-3">
                        <select type="text" name="transfer_mode"  defaultValue={this.props.location.state.detail.transfer_mode}
                        onChange ={this.onChange} >
                                
                                <option value="banktransfer">Bank Transfer</option>
                                <option value="paytm"> Paytm </option>
                                <option value="upi">UPI</option>
                          </select>
                      </InputGroup>
                            {/* <Input type="text" required name="transfer_mode" defaultValue={this.props.location.state.detail.transfer_mode }  id="transfer_mode" onChange={this.onChange}  /> */}
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.transfer_Mode}</div>

                      <FormGroup>
                            <Label for="email">Email<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="email"  name="email" defaultValue={this.props.location.state.detail.email }  id="email" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.emailid}</div>

                      <FormGroup>
                            <Label for="phone">Phone Number<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required  name="phone" defaultValue={this.props.location.state.detail.phone }  id="phone" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.phone}</div>

                      <SSCI className="text-muted" buttonLabel="cheque" docs={[
                        "https://seller-stage.binbill.com/stores/"+this.props.location.state.detail.seller_id+"/upload/"+5 +"/images/"+0
                      
                      ]} name={this.props.location.state.detail.bene_name} 
                      Ifsc = {this.props.location.state.detail.ifsc} 
                      bank={this.props.location.state.detailbank_account}></SSCI>
                      
                      <FormGroup>
                            <Label for="bank_account">Bank Account Number<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required  name="bank_account"  defaultValue={this.props.location.state.detail.bank_account  }  id="bank_account" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.bank_account}</div>

                      



                      <FormGroup>
                            <Label for="bank_account">Confirm Bank Account Number<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text"   name="bank_account1"   id="bank_account1" onChange={this.onChange}  />
                      </FormGroup>

                      <FormGroup>
                            <Label for="ifsc">IFSC Number<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required  name="ifsc" defaultValue={this.props.location.state.detail.ifsc }  id="ifsc" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.ifsc}</div>

                      <FormGroup>
                            <Label for="vpa">VPA</Label>
                            <Input type="text"  name="vpa" defaultValue={this.props.location.state.detail.vpa }  id="vpa" onChange={this.onChange}  />
                      </FormGroup>

                      <FormGroup>
                            <Label for="card_no">Card Number</Label>
                            <Input type="text"  name="card_no" defaultValue={this.props.location.state.detail.card_no }  id="card_no" onChange={this.onChange}  />
                      </FormGroup>

                      <FormGroup>
                            <Label for="address1">Address<span aria-hidden="true" className="required"> *</span></Label>
                            <Input type="text" required name="address1" defaultValue={this.props.location.state.detail.address1 }  id="address1" onChange={this.onChange}  />
                      </FormGroup>
                      <div className="errorMsg">{this.state.errors.address1}</div>

                      <FormGroup>
                            <Label for="address2">Alternative Address</Label>
                            <Input type="text"  name="address2" defaultValue={this.props.location.state.detail.address2 }  id="address2" onChange={this.onChange} />
                      </FormGroup>

                      <FormGroup>
                            <Label for="city">City</Label>
                            <Input type="text"  name="city" defaultValue={this.props.location.state.detail.city }  id="city" onChange={this.onChange}  />
                      </FormGroup>

                      <FormGroup>
                            <Label for="state">State</Label>
                            <Input type="text"  name="state" defaultValue={this.props.location.state.detail.state }  id="state" onChange={this.onChange}  />
                      </FormGroup>

                      <FormGroup>
                            <Label for="pincode">Pincode</Label>
                            <Input type="text"  name="pincode" defaultValue={this.props.location.state.detail.pincode }  id="pincode" onChange={this.onChange}  />
                      </FormGroup>
                      <FormGroup>
                        {/* <Label>Cancelled Cheque</Label>
                        
                        <ModalForm id={this.state.id} buttonLabel="cancel_cheque" docs={this.state.canelcheque} /> */}
                      
                      </FormGroup>
                      <FormGroup>
                      {/* <Select
                          value={this.selectedOption}
                          onChange={this.handleChange}
                          options={options}
                          isMulti
                        /> */}

                      </FormGroup>

                      <Row>
                        <Col xs="6">
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
    );
  }
}

export default withRouter(EditPayout)
// .replace(/.(?=.{4})/g, 'x') bank account masking