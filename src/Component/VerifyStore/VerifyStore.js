import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, Form, Label, InputGroup, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import ModalForm from '../StUtcC/Stucc'
import './table.css'
import Select from 'react-select'
import Multiselect from 'react-bootstrap-multiselect'
// const options = [
//   { value: "Aadhar", label: "Aadhar is not provided" },
//   { value: "Pan", label: "Pan is not Provided" },
//   { value: "Account Number", label: "Account Number is not Provided" }
// ];
class Tables extends Component {
  state= {
    payout:[],
     offset : 0,
     limit : 5,
     count: 0,
     val: 0,
     value:'',
     query:'',
     searchBy:'id',
     users:[],
     id:'',
     selectedOption: null,
     option: [],
     reason:'',
     clearable: true
     
    
  }
  componentDidMount(){
    this.getPayoutData();
    this.getFilterUser();
    this.getRejectReasons()
    
    
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
getRejectReasons(){
  let headers = {
    'x-auth-token': sessionStorage.getItem('token')
   }
  axios.get("http://192.168.1.62:4000/api/seller/reject",{headers}).then((res)=> {
    this.setState({option:res.data.data})
     console.log('gg'+ JSON.stringify(this.state.option))
  })
 
}


  getSearchData = () =>{
    this.setState({payout: []})
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    axios.get(`http://192.168.1.62:4000/api/seller/info?${this.state.searchBy}=${this.state.query}`,{ headers })
    .then((res)=> {
      this.setState({payout:res.data.data})
      console.log("Hello.."+res.data.data)
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
submitRejectForm(id){
  let result = this.state.selectedOption.map(({ value }) => value)
  console.log("hi", result)
  console.log("helli"+id)
  axios({
    method: 'post',
    url:'http://192.168.1.62:4000/api/seller/'+id+'/reject',
   
    headers: {
      'x-auth-token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
                    
    reject_array: result

    })
  }).then((res)=>console.log(res.data))
 
  // var output =  this.state.selectedOption.map(function(obj) {
  //   return Object.keys(obj).sort().map(function(key) { 
  //     return obj[key];
  //   });
  // });
  // var merged = [].concat.apply([], output);
  // console.log("hi", merged)
  
}
Accept=(item)=>{
  axios({
    method: 'post',
    url:'http://192.168.1.62:4000/api/seller/'+item + '/action'
    ,
    headers: {
      'x-auth-token': sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      seller_id: item

    })
    
  }).then(res=> {
    alert("updated")
    this.props.history.push({pathname: '/base/tables/'})
  })
  console.log(item)
}
  render() {
    let options = this.state.option.map(function (city) {
      return { value: city.id, label: city.title };
    })
    const {payout} =this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Seller Details
                <form >
                    <select className = "search" name ="searchBy" defaultValue = {this.state.searchBy} onChange={this.handleInputChange}> 
                      <option value="id">ID</option>
                      <option value="name">Name</option>
                      <option value="contact_no">Contact</option>
                      
                    </select>
                      
                      <input className="query" id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?" />
                          
                      {/* <input id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?"> */}
                      {/* </input> */}
                    <button type ="button" className="button1" onClick={()=>this.getSearchData({})}>Search</button>
                </form>
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
                  {payout !== null && payout.length > 0 ?   <tbody>
                  {payout.map((items)=>

                  
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
                <Form>  
                    <Label>Reject</Label>
                    
                   
                      <Select
                        
                        onChange={this.handleChange}
                        options={options}
                        
                        isMulti
                        
                      />
                      {/* <select   name="reason" onChange={this.handleChange} >
                        <option>Select Reason</option>
                        {this.state.option.map((item)=>(
                        <option value={item}>
                         {item}
                         </option>
                         ))}
                        
                      </select> */}
                     
                   
                     
                       
                      <Button color="primary" size="xs" style={{float: "left",  marginTop: "10px"}}   onClick={()=>this.submitRejectForm(items.id)}>Submit</Button>

                      </Form> 
                      </td>
                    
                     

                
                  </tr>
                  
                  )
                }</tbody>: <h2>Not Found</h2>}
                </Table>
                <nav>
                <Pagination>
                    <PaginationItem><PaginationLink previous tag="button" onClick={()=> this.state.offset >= 10 ? this.getPayoutData(this.state.offset = (this.state.offset) - 10) :""}>Prev</PaginationLink></PaginationItem>
    
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