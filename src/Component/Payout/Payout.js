import React,{Component, createContext} from 'react';
 import { withRouter} from 'react-router-dom';
 import { Button, Card, CardBody, CardGroup, Col, Container, Form, FormGroup, Label, InputGroup,Input, FormText, Row } from 'reactstrap';
import axios from 'axios'
import SSCI from '../Can/Can'
import './style.css'
import Select from 'react-select'
import ModalForm from '../ModularForm/Modularform'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
class EditSeller extends Component {

  state={ 
      errors: {} ,
      // bank_account1: '',
      seller :[],
      canelcheque:[],
      
     
  }
  componentDidMount(){
    this.getPayoutData();
  }
  componentDidCatch(){
    return this.props.history.push({pathname: '/base/tables'})
  }
  getPayoutData(){
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    // console.log("Hiii......"+this.props.location.state.seller_id)
        axios.get('http://192.168.1.62:4000/api/seller/payouts?seller_id='+this.props.location.state.seller_id, {headers})
    .then((res)=> {
      //  console.log(JSON.stringify(res.data.data.rows[0]));
        this.setState({seller:res.data.data.rows[0]})
        
       
    })
    
  }
  

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  validate =()=>{
    let errors = {};
    
     let formIsValid = true
      
      
      //regular expression for email validation
      var pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if ((!pattern.test(this.state.seller.email)) ) {
        formIsValid = false;
        
        errors["emailid"] = "*Please enter valid email-ID.";
        
      }
      if((this.state.seller.bank_account !== this.state.bank_account1) ){
        formIsValid = false;
        errors["bank_account"] = "Doesn't match please check it carefully"
      }
      if(!this.state.seller.transfer_mode){
        formIsValid = false;
        errors["transfer_Mode"] = "This is required"
      }
      if(!this.state.seller.ifsc){
        formIsValid = false;
        errors["ifsc"] = "This is required"
      }
      if(!this.state.seller.bene_id){
        formIsValid = false;
        errors["bene_id"] = "This is required"
      }
      if(!this.state.seller.bene_name){
        formIsValid = false;
        errors["bene_name"] = "This is required"
      }
      if(!this.state.seller.bene_group)
      {
        formIsValid = false;
        errors["bene_group"] = "This is required"
      }
      if(!this.state.seller.bene_id){
        formIsValid = false;
        errors["bene_id"] = "This is required"
      }
      if(!this.state.seller.phone){
        formIsValid = false;
        errors["phone"] = "This is required"
      }
      if(!this.state.seller.address1){
        formIsValid = false;
        errors["address1"] = "This is required"
      }
     
     
    
    this.setState({errors: errors})
    return formIsValid;
  
  }
 
  submitFormEdit = e => {
    e.preventDefault()
    if(this.validate()){
      fetch('http://192.168.1.62:4000/api/seller/payouts/' + this.props.location.state.seller_id, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              
                'x-auth-token': sessionStorage.getItem('token')
               
            },
            body: JSON.stringify({
                  seller_id: this.props.location.state.seller_id,
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
                  selectedOption: [],
              
              
            })
          })
            .then(res=> {
              return this.props.history.push({pathname: '/base/tables'})
                  
             
            })
            
            .catch(err=> {
              return this.props.history.push({pathname: '/base/tables'})
            })
    }
  }
  //  componentDidMount(){
  //    console.log(this.props.location.state.detail)
  //  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  AddPayout=()=>{
    return this.props.history.push({pathname: '/addpayout/',
      state: {sellerid: this.props.location.state.seller_id }})
  }
  render() {
    var leng = 0;
    
    for(var i in this.state.seller){
      leng++;
      
    }
    
      if(leng  <= 0){
        
        return (
          <Container>
            <Row className="justify-content-center">
            <Col md="6">
              <h1>No Payout Exists Please Add Payout</h1>
              <Button color="primary" className="px-4" onClick={this.AddPayout}>Add Payout</Button>
            </Col>
            </Row>

          </Container>
          )

      }
     else if(!this.props.location.state.seller_id) {
       return(
         <p>Sorry, Something went wrong</p>
       )

     }
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
                    {/* <SSCI className="text-muted" buttonLabel="cheque" docs={[
                      "https://seller-stage.binbill.com/stores/"+this.props.location.state.seller_id+"/upload/"+5 +"/images/"+0
                    
                    ]}  name={this.state.seller.bene_name} 
                        Ifsc = {this.state.seller.ifsc} 
                        bank={this.state.seller.bank_account}></SSCI> */}
                    <FormGroup>
                          <Label for="SellerId">Seller Id<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text" disabled name="seller_id" defaultValue={this.props.location.state.seller_id} onChange={this.onChange} id="sellerid"  />
                    </FormGroup>
                    
                    <FormGroup>
                    <Label>Seller Status<span aria-hidden="true" className="required"> *</span></Label>
                    <InputGroup className="mb-3">
                      <select type="text" name="active" required defaultValue={this.state.seller.active}
                      onChange ={this.onChange} >
                              <option value="true">True</option>
                              <option value="false">False</option>  
                        </select>
                    </InputGroup>
                    </FormGroup>
                    <FormGroup>
                          <Label for="bene_id">Bene Id<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text" disabled name="bene_id" defaultValue={this.state.seller.bene_id}   id="bene_id" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.bene_id}</div>
                    <FormGroup>
                          <Label for="bene_name">Bene Name<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text"  name="bene_name" defaultValue={this.state.seller.bene_name  }     id="bene_name" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.bene_name}</div>
                    <FormGroup>
                          <Label for="bene_group">Bene Group<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text"  name="bene_group" defaultValue="SellersPayout"   id="bene_group" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.bene_group}</div>
                    <FormGroup>
                          <Label for="transfer_mode">Transfer Mode<span aria-hidden="true" className="required"> *</span></Label>
                          <InputGroup className="mb-3">
                      <select type="text" name="transfer_mode"  defaultValue={this.state.seller.transfer_mode}
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
                          <Input type="email"  name="email" defaultValue={this.state.seller.email}   id="email" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.emailid}</div>
                    <FormGroup>
                          <Label for="phone">Phone Number<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text"  name="phone" defaultValue={this.state.seller.phone }    id="phone" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.phone}</div>
                    <SSCI className="text-muted" buttonLabel="cheque" docs={[
                      "https://seller-stage.binbill.com/stores/"+this.props.location.state.seller_id+"/upload/"+5 +"/images/"+0
                    
                    ]}  name={this.state.seller.bene_name} 
                        Ifsc = {this.state.seller.ifsc} 
                        bank={this.state.seller.bank_account}></SSCI>
                    <FormGroup>
                          <Label for="bank_account">Bank Account Number<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text" disabled name="bank_account" defaultValue={this.state.seller.bank_account   }    id="bank_account" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.bank_account}</div>
                    <FormGroup>
                          <Label for="bank_account">Confirm Bank Account Number</Label>
                          <Input type="text"  name="bank_account1"   id="bank_account1" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                          <Label for="ifsc">IFSC Number<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text"  name="ifsc" defaultValue={this.state.seller.ifsc}   id="ifsc" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.ifsc}</div>
                    <FormGroup>
                          <Label for="vpa">VPA</Label>
                          <Input type="text"  name="vpa" defaultValue={this.state.seller.vpa}    id="vpa" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                          <Label for="card_no">Card Number</Label>
                          <Input type="text"  name="card_no" defaultValue={this.state.seller.card_no}   id="card_no" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                          <Label for="address1">Address<span aria-hidden="true" className="required"> *</span></Label>
                          <Input type="text"  name="address1" defaultValue={this.state.seller.address1}   id="address1" onChange={this.onChange}  />
                    </FormGroup>
                    <div className="errorMsg">{this.state.errors.address1}</div>
                    <FormGroup>
                          <Label for="address2">Alternative Address</Label>
                          <Input type="text"  name="address2" defaultValue={this.state.seller.address2}   id="address2" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup>
                          <Label for="city">City</Label>
                          <Input type="text"  name="city" defaultValue={this.state.seller.city}   id="city" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                          <Label for="state">State</Label>
                          <Input type="text"  name="state" defaultValue={this.state.seller.state}   id="state" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                          <Label for="pincode">Pincode</Label>
                          <Input type="text"  name="pincode" defaultValue={this.state.seller.pincode} id="pincode" onChange={this.onChange}  />
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
                      <Col xs="5">
                        <Button color="primary" className="px-4" onClick={this.submitFormEdit}>Submit</Button>
                        
                      </Col>
                      {/* <Col xs ="5">
                      <ModalForm id={this.state.id} buttonLabel="cancel_cheque" docs={this.state.canelcheque} />
                      </Col> */}
                     
                     
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>)
     } 
    
  
  }


export default withRouter(EditSeller)