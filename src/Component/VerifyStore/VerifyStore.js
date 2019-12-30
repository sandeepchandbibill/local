import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, Form, Label, InputGroup, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import ModalForm from '../StUtcC/Stucc'
// import Select from "react-multiselect-checkboxes";
import Select from 'react-select'
const options = [
  { value: "Aadhar", label: "Aadhar is not provided" },
  { value: "Pan", label: "Pan is not Provided" },
  { value: "Account Number", label: "Account Number is not Provided" }
];
class Tables extends Component {
  state= {
    payout:[],
     offset : 0,
     limit : 5,
     count: 0,
     val: 0,
     value:'',
     searchBy:'seller_id',
     users:[],
     id:'',
     selectedOption: []
     
    
  }
  componentDidMount(){
    this.getPayoutData();
    this.getFilterUser()
    
  }
  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  getPayoutData = ()=>{
    let headers = {
     'x-auth-token': sessionStorage.getItem('token')
    }
    console.log(sessionStorage.getItem('token'))
    // axios.get('http://localhost:3000/rows')
    axios.get('http://192.168.1.62:4000/api/seller/verify?offset='+this.state.offset+'&limit=5', { headers })
    .then((res)=> {
      this.setState({payout:res.data.data.rows, count:res.data.data.count})
  })
}

  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      this.props.history.push({pathname: '/editpayouts/',
      state:{detail: items }
    })
  }
  getSearchData = () =>{
    this.setState({payout: []})
    axios.get(`http://192.168.1.62:4000/api/seller/verify?seller_id=`+this.state.value)
    .then((res)=> {
      this.setState({payout:res.data.data.rows[0]})
      console.log("Hello.."+res.data.data.rows)
    })

  }
  getFilterUser = () =>{
        
    let headers = {
        'x-auth-token': sessionStorage.getItem('token')
       }
    axios.get(`http://192.168.1.62:4000/api/assign/jobs/users?role_type=3`,{ headers })
    .then((res)=> {
      this.setState({users:res.data.data.rows})
     
    })
  }
  submitForm = (sellerid) => {
       const sell = sellerid.toString().split().map(parseInt);
    axios({
        method: 'post',
        url:'http://192.168.1.62:4000/api/assign/jobs/users',
        headers: {
          'x-auth-token': sessionStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          seller_ids: sell,
          user_id: this.state.id

        })
    }).then(res => {
        alert('Task assign successfully')
        console.log("ff", sell)
        console.log("hi"+this.state.id)
        console.log(res.data)
        this.props.history.push({pathname: '/base/tables/',
            
})
    })
}
submitRejectForm(sellerid){
  axios({
    // method: 'post',
    // url:'http://192.168.1.62:4000/api/assign/jobs/users',
    // headers: {
    //   'x-auth-token': sessionStorage.getItem('token'),
    //   'Content-Type': 'application/json'
    // },
    data: JSON.stringify({
      seller_ids: sellerid,
      selectedOption: this.state.selectedOption

    })
  }).then((res)=>console.log(res.data))
}
Accept=(item)=>{
  axios({
    method: 'post',
    url:'http://192.168.1.62:4000/api/seller/'+this.item + '/action'
    ,
    headers: {
      'x-auth-token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      seller_id: item

    })
    
  })
  console.log(item)
}
  render() {
    const {payout} =this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Seller Details
                {/* <form className = "my-0 ml-sm-2">
                    <select  name ="searchBy" defaultValue = {this.state.searchBy} onChange={this.handleInputChange}> 
                      <option value="seller_id">ID</option>
                    </select>
                      <input className="col-md-3 my-0 ml-sm-2 " id = "value" type = 'text' defaultValue={this.state.value} onChange={this.handleInputChange} name="value" placeholder="What are you looking for?">
                      </input>
                    <button  type ="button"  className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getSearchData({})}>Search</button>
                </form> */}
              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                <thead>
                  <tr className="tablerow">
                    <th>Seller Id</th>
                    <th>Seller Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Aadhar </th>
                    <th>PAN</th>
                    <th>REG. Doc</th>
                    <th>GST</th>
                    <th>Utility Bill</th>
                    <th>Cancel Cheque</th>
                    
                    <th>Shop Image </th>
                    
                      
                        
                        <th>Actions</th>
                        
                   
                  </tr>
                  </thead>

                  {payout.map((items)=>

                  <tbody>
                  <tr key={items.id} className="myList">
                  <td>{items.id}</td>
                  <td>{items.seller_name}</td>
                  <td>{items.address}</td>
                  <td>{items.contact_no}</td>
                  <td>{items.email}</td>
                  <td >{items.aadhar != null ? items.aadhar : "Not Submitted"}</td>
                  <td >{items.pan_no != null ? items.pan_no : "Not Submitted"}</td>
                  <td >{items.reg_no != null ? items.reg_no : "Not Submitted"}</td>
                  <td >{items.gstin  != null ? items.gstin : "Not Submitted"}</td>
                  <td><ModalForm  buttonLabel="utility_bill"  
                         docs={["https://seller-stage.binbill.com/stores/"+items.id+"/upload/"+1 +"/images/"+1]}/></td>
                  <td><ModalForm  buttonLabel="cancel_bill"  
                         docs={["https://seller-stage.binbill.com/stores/"+ items.id+"/upload/"+5 +"/images/"+0]}/></td>
                         <td><ModalForm  buttonLabel="image_shop"  
                         docs= {["https://seller-stage.binbill.com/stores/"+items.id+"/upload/"+0 +"/images/"+0]}/></td>
                  
                    
                    
                    <td>
                      <Label>Accept</Label>
                      <br></br>
                      <Button onClick= {()=>this.Accept(items.id)}  size="xs" color="primary" style={{float: "center",  marginTop: "10px"}} >Accept</Button>
                      <br></br>
                       <Form>
                     
                    <Label>Assign To:</Label>
                      <InputGroup className="mb-1">
                      <select type="text" name="id" onChange={this.handleInputChange}
                         >   <option >select C.E</option>
                                {this.state.users.map((user)=>(
                                    <option value={user.id}>{user.full_name}</option>
                                ))}
                               
                          </select>
                        
                      </InputGroup>
                      <InputGroup>
                      <Button color="primary" size="xs" style={{float: "left",  marginTop: "10px"}}    onClick={()=>this.submitForm(items.id)}>Submit</Button></InputGroup>
                     
                      
                      
                        
                          
                          
                        
                      
               
                </Form>
                <br></br>
                {/* <Form>  
                    <Label>Reject</Label>
                   
                    <Select 
                        value={this.selectedOption}
                        onChange={this.handleChange}
                        options={options}
                        isMulti
                      />
                     
                       
                      <Button color="primary" size="xs" style={{float: "left",  marginTop: "10px"}}   onClick={()=>this.submitRejectForm(items.id)}>Submit</Button>

                      </Form>  */}
                      </td>
                    
                     

                
                  </tr>
                  </tbody>
                  )
                }
                </Table>
                <nav>
                <Pagination>
                    <PaginationItem><PaginationLink previous tag="button" onClick={()=> this.state.offset >= 10 ? this.getPayoutData(this.state.offset = (this.state.offset) - 10) :""}>Prev</PaginationLink></PaginationItem>
                    {/* <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=0)}>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=20)}>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=40)}>3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=60)}>4</PaginationLink></PaginationItem> */}
                    <PaginationItem><PaginationLink next tag="button" onClick={()=> this.state.offset <= this.state.count ? this.getPayoutData(this.state.offset = (this.state.offset) + 10) : ""}>Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tables;