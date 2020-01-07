import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';


 import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
import Axios from 'axios';
 class EditSeller extends Component {
  state={
    brand_id: '',
    main_category_id:'',
    category_id : '', 
    title: '', 
    hsn_code:'', 
    mrp:'', 
    
    status_type:'', 
    image_name:'',
    priority_index:'',
    image_code:'',
    has_measurements:'', 
    paid_seller_commission:'',
    unpaid_seller_commission:'',
    sub_category_id:'',
    id: '',
   

   
   sku:  sessionStorage.getItem("skus")
  
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
        brand_id: this.state.brand_id,
        main_category_id:this.state.main_category_id,
        category_id : this.state.category_id, 
        title: this.state.title, 
        hsn_code:this.state.hsn_code, 
        mrp:this.state.mrp, 
        image_name: this.state.image_name,
        status_type:this.state.status_type, 
        
       
        priority_index:this.state.priority_index,
        image_code:this.state.image_code,
        has_measurements:this.state.has_measurements, 
        paid_seller_commission:this.state.paid_seller_commission,
        unpaid_seller_commission:this.state.unpaid_seller_commission,
        sub_category_id: this.state.sub_category_id
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
  submitFormtAndEditMeasurements=(e)=> {
    
    e.preventDefault()
  
      // fetch('http://localhost:3000/seller/'+ this.props.location.state.detail.id,{
      fetch('http://192.168.1.62:4000/api/inventory/sku/'+this.state.id,{
      method: 'post',
      
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        brand_id: this.state.brand_id,
        main_category_id:this.state.main_category_id,
        category_id : this.state.category_id, 
        title: this.state.title, 
        hsn_code:this.state.hsn_code, 
        mrp:this.state.mrp, 
        image_name: this.state.image_name,
        status_type:this.state.status_type, 
        
        
        priority_index:this.state.priority_index,
        image_code:this.state.image_code,
        has_measurements:this.state.has_measurements, 
        paid_seller_commission:this.state.paid_seller_commission,
        unpaid_seller_commission:this.state.unpaid_seller_commission,
        sub_category_id: this.state.sub_category_id
      })
    })
      .then(res=> {
        
        if(res.status === 200){
          return this.props.history.push({pathname: '/editmeasurement/'})


        }
        
          
  })
      
        
      
      .catch(err => console.log(err))
    }
    
  componentWillMount(){
    
      // remark: d.seller.remark
    
    
  }

   componentDidMount(){
    const d = JSON.parse(this.state.sku)
    this.setState({
        id: d.id,
        brand_id: d.brand_id,
        main_category_id:d.main_category_id,
        category_id : d.category_id, 
        title: d.title, 
        hsn_code:d.hsn_code, 
        mrp:d.mrp, 
        image_name: d.image_name,
        status_type:d.status_type, 
        
        priority_index:d.priority_index,
        image_code:d.image_code,
        has_measurements:d.has_measurements, 
        paid_seller_commission:d.paid_seller_commission,
        unpaid_seller_commission:d.unpaid_seller_commission,
        sub_category_id: d.sub_category_id
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
                      <h1 className="align-items-center float-center">Edit SKU Details</h1>
                     
                      
                      <Label>SkU ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" disabled  defaultValue={d.id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Brand ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="brand_id"   defaultValue={d.brand_id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Main Category ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="main_category_id"   defaultValue={d.main_category_id}
                        onChange ={this.onChange} />
                        
                        
                      </InputGroup>
                      <Label>Category ID</Label>
                      <InputGroup className="mb-3">
                        <Input type="text" name="category_id"  defaultValue={d.category_id}
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
                          <Button color="danger" className="px-2 ml-3" onClick={this.submitFormtAndEditMeasurements}>Submit & Go TO EDIT MEasurement</Button>
                        
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

export default withRouter(EditSeller)