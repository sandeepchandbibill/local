import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';


 import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
import Axios from 'axios';
 class EditMeasurement extends Component {
  state={
    id: '',
    sku_id: '',
    seller_id: '',
    measurement_type: '',
    measurement_value: '',
    pack_numbers: '',
    cashback_percent: '',
    discount_percent: null,
    bar_code: null,
    mrp: 0,
    tax: 0,
    has_images: '',
    status_type: '',           
    sku:  sessionStorage.getItem("measurement")
  
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  
  
  }

  submitFormEdit = e => {
    e.preventDefault()
    
    
      
      // fetch('https://binbill-admin-panel.binbill.com/api/seller/info/'+this.state.id,{
      Axios({
      method: 'post',
      url: 'http://192.168.1.62:4000/api/inventory/sku/'+this.state.id,
      data: JSON.stringify({
       
        sku_id: this.state.sku_id,
        seller_id: this.state.seller_id,
        measurement_type: this.state.measurement_type,
        measurement_value: this.state.measurement_value,
        pack_numbers: this.state.pack_numbers,
        cashback_percent: this.state.cashback_percent,
        discount_percent: this.state.discount_percent,
        bar_code: this.state.bar_code,
        mrp: this.state.mrp,
        tax: this.state.tax,
        has_images: this.state.has_images,
        status_type: this.state.status_type,          
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
  
    
     
    })
    
      .then(res=> {
        if(res.status === 200){
        
          
           return this.props.history.push({pathname: '/viewSKu'})
        }
    })
      .catch(err => console.log(err))
      
    
   
   
    
  }
  


   componentDidMount(){
    const d = JSON.parse(this.state.sku)
    this.setState({
        sku_id: d.sku_id,
        seller_id: d.seller_id,
        measurement_type: d.measurement_type,
        measurement_value: d.measurement_value,
        pack_numbers: d.pack_numbers,
        cashback_percent: d.cashback_percent,
        discount_percent: d.discount_percent,
        bar_code: d.bar_code,
        mrp: d.mrp,
        tax: d.tax,
        has_images: d.has_images,
        status_type: d.status_type, 
    })

   
   }
 
  location=()=>{
  const markers = "https://www.google.com/maps/search/?api=1&query="+this.state.latitude+","+this.state.longitude
    window.open(markers)
  }

  render() {
    const d = JSON.parse(this.state.sku)
    return (
        <div className="app flex-row ">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    
                    <Form>
                      <h1 className="align-items-center float-center">Edit Measurement</h1>
                     
                      
                      <Label>ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" disabled  defaultValue={d.id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>SkU ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="sku_id"   defaultValue={d.sku_id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Seller ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="seller_id"   defaultValue={d.seller_id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Measurement Type</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="measurement_type"  defaultValue={d.measurement_type}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Sub Category ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="sub_category_id"   defaultValue={d.sub_category_id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Title</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="title"   defaultValue={d.title}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>HSN Code</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="hsn_code"   defaultValue={d.hsn_code}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Image Name</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="image_name"   defaultValue={d.image_name}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      
                      <Label>Image Code</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="image_code"   defaultValue={d.image_code}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>MRP</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="mrp"   defaultValue={d.mrp}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Priority Index</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="priority_index"  defaultValue={d.priority_index}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <label>Has Measurements</label>
                      <InputGroup className="mb-3">
                        <select type="text" name="has_measurements"  defaultValue={d.has_measurements}
                        onChange ={this.onChange} >
                                <option value="true">True</option>
                                <option value="false"> False </option>
                                
                          </select>
                      </InputGroup>
                      <Label>Status Type</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="status_type"  defaultValue={d.status_type}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Paid Seller Commission</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="paid_seller_commission"   defaultValue={d.paid_seller_commission}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Unpaid Seller Commission</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="unpaid_seller_commission"   defaultValue={d.unpaid_seller_commission}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>


                      
                      
                       

                      <Row>
                        
                          <Button color="primary" className="px-2" onClick={this.submitFormEdit}>Submit</Button>
                        
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

export default withRouter(EditMeasurement)