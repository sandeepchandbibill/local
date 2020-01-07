import React,{Component, createContext} from 'react';
 import { withRouter} from 'react-router-dom';
 import { Button, Card, CardBody, CardGroup, Col, Container, Form, FormGroup, Label, InputGroup,Input, FormText, Row } from 'reactstrap';
import axios from 'axios'


class EditSeller extends Component {

  state={ 
      errors: {} ,
      // bank_account1: '',
      seller :[],
      canelcheque:[],
      data: sessionStorage.getItem("skus"),
      id: ''
      
     
  }

  componentDidMount(){
    // console.log('hi'+this.state.id)
    this.getPayoutData();
    const d = JSON.parse(this.state.data)
    this.setState({
      id: d.id
    })
  }
 
  getPayoutData(){
    
    
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    // console.log("Hiii......"+this.props.location.state.seller_id)
        axios.get('http://192.168.1.62:4000/api/inventory/sku/measurement?id='+this.state.id, {headers})
    .then((res)=> {
       console.log(JSON.stringify(this.state.id));
        this.setState({seller:res.data.data.rows[0]})
        
       
    })
    
  }
  

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
 
 
  submitFormEdit = e => {
    e.preventDefault()
    
      fetch('https://binbill-admin-panel.binbill.com/api/seller/payouts/'+this.state.id, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                  seller_id: this.state.id,
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
                  remark: this.state.remark,
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
  
  //  componentDidMount(){
  //    console.log(this.props.location.state.detail)
  //  }
 
  AddPayout=()=>{
    return this.props.history.push({pathname: '/addpayout/',
     })
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
              <h1>No Measurement Exists Please Add Measurement</h1>
              <Button color="primary" className="px-4" onClick={this.AddPayout}>Add Measurement</Button>
            </Col>
            </Row>

          </Container>
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
                    <h1 className="align-items-center">Edit Measurement</h1>
                   
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
    </div>)
     } 
    
  
  }


export default withRouter(EditSeller)