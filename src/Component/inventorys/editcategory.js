import React,{Component} from 'react';
 import { withRouter} from 'react-router-dom';


 import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, Row, Label } from 'reactstrap';
import Axios from 'axios';
 class EditMeasurement extends Component {
  state={
    category_id: '',
    category_name: "",
    category_name_hi: null,
    category_name_en: null,
    category_name_ta: null,
    category_name_bn: null,
    category_name_ml: null,
    category_name_te: null,
    category_name_gu: null,
    category_name_kn: null,
    category_name_mr: null,
    ref_id: '',
    type_category_form: null,
    category_form_1: null,
    category_form_2: null,
    category_level: '',
    category_image_name: null,
    status_type: '',
    brand_ids:[],
    dual_warranty_item: '',
    priority_index:'',
               


    sku:  sessionStorage.getItem("category")
  
  }
  
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  
  
  }

  submitFormEdit = e => {
    e.preventDefault()
    
    
      
      // fetch('https://binbill-admin-panel.binbill.com/api/seller/info/'+this.state.id,{
      Axios({
      method: 'post',
      url: 'http://192.168.1.62:4000/api/inventory/sku/category/'+this.state.category_id,
      data: JSON.stringify({
       
                category_name: this.state.category_name,
                category_name_hi: this.state.category_name_hi,
                category_name_en: this.state.category_name_en,
                category_name_ta: this.state.category_name_ta,
                category_name_bn: this.state.category_name_bn,
                category_name_ml: this.state.category_name_ml,
                category_name_te: this.state.category_name_te,
                category_name_gu: this.state.category_name_gu,
                category_name_kn: this.state.category_name_kn,
                category_name_mr: this.state.category_name_mr,
                ref_id: this.state.ref_id,
                type_category_form: this.state.type_category_form,
                category_form_1: this.state.category_form_1,
                category_form_2: this.state.category_form_2,
                category_level: this.state.category_level,
                category_image_name: this.state.category_image_name,
                status_type: this.state.status_type,
                brand_ids:this.state.brand_ids,
                dual_warranty_item: this.state.dual_warranty_item,
                priority_index:this.state.priority_index,         
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token')
      },
  
    
     
    })
    
      .then(res=> {
        if(res.status === 200){
        
          
           return this.props.history.push({pathname: '/viewMeasurement'})
        }
    })
      .catch(err => console.log(err))
      
    
   
   
    
  }
  


   componentDidMount(){
    const d = JSON.parse(this.state.sku)
    this.setState({
                category_name: d.category_name,
                category_name_hi: d.category_name_hi,
                category_name_en: d.category_name_en,
                category_name_ta: d.category_name_ta,
                category_name_bn: d.category_name_bn,
                category_name_ml: d.category_name_ml,
                category_name_te: d.category_name_te,
                category_name_gu: d.category_name_gu,
                category_name_kn: d.category_name_kn,
                category_name_mr: d.category_name_mr,
                ref_id: d.ref_id,
                type_category_form: d.type_category_form,
                category_form_1: d.category_form_1,
                category_form_2: d.category_form_2,
                category_level: d.category_level,
                category_image_name: d.category_image_name,
                status_type: d.status_type,
               
                dual_warranty_item: d.dual_warranty_item,
                priority_index:d.priority_index,         
    })
    if( d.brand_ids){
        this.setState({brand_ids:d.brand_ids.map(item=>item)})

    
    }
    else{
        this.setState({brand_ids:null})

    }

   
   }
 
 
  render() {
    const d = JSON.parse(this.state.sku)
    var brand
    if( d.brand_ids){
        
           brand= d.brand_ids.map(item=>
            item)
    
    }
    else{
         brand = null

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
                      <h1 className="align-items-center float-center">Edit Category</h1>
                      <Label>Category Id</Label>
                      <InputGroup className="mb-4">
                            <Input type="text" disabled defaultValue={d.category_id} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name"  defaultValue={d.category_name} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name hi</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_hi"  defaultValue={d.category_name_hi} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name en</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_en"  defaultValue={d.category_name_en} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name Ta</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_ta"  defaultValue={d.category_name_ta} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name Bn</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_bn"  defaultValue={d.category_name_bn} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name te</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_te"  defaultValue={d.category_name_te} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name Gu</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_gu"  defaultValue={d.category_name_gu} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Name Kn</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_name_kn"  defaultValue={d.category_name_kn} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>REF ID</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="ref_id"  defaultValue={d.ref_id} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Form</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="type_category_form"  defaultValue={d.type_category_form} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Form 1</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_form_1"  defaultValue={d.category_form_1} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Form 2</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_form_2"  defaultValue={d.category_form_2} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Level</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_level"  defaultValue={d.category_level} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Category Image Name</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="category_image_name"  defaultValue={d.category_image_name} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Status Type</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="status_type"  defaultValue={d.status_type} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Priority Index</Label>
                        <InputGroup className="mb-4">
                            <Input type="text" name="priority_index"  defaultValue={d.priority_index} 
                            onChange ={this.onChange} />
                        </InputGroup>
                        <Label>Brand Ids</Label>
                        {brand ? brand.map(item=>(
                            <InputGroup className="mb-4">
                            <Input type="text" name="brand_ids"  defaultValue={item} 
                            onChange ={this.onChange} />
                            </InputGroup>

                        )) :<InputGroup className="mb-4">
                        <Input type="text" name="brand_ids"  defaultValue='' 
                        onChange ={this.onChange} />
                        </InputGroup> }


                        

                     
                      
                     
                      
                      
                       

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