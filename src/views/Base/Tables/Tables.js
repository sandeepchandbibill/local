import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';
import './Tables.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Tables extends Component {
  state= {
    seller:[],
    
     offset : 0,   //current page
     limit : 10,  //per page
     count: 0,
     query:'',
     searchBy:'id',
    //  verifyUser: '1'
    
  }
  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  componentDidMount(){
    this.getSellerData();
  }

  getSellerData = ()=>{
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
     console.log(sessionStorage.getItem('token'))
    console.log(headers)
    axios.get('http://192.168.1.62:4000/api/seller/info?offset='+this.state.offset+'&limit=20',{ headers })
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
      this.setState({seller:res.data.data.rows, count:res.data.data.count})
      // console.log(res.data.data.rows)
      // this.setState({seller: res.data})
    })
}

  getSearchData = () =>{
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    console.log(this.state.searchBy)
    console.log(this.state.query)
    this.setState({seller: []})
    axios.get(`http://192.168.1.62:4000/api/seller/info?${this.state.searchBy}=${this.state.query}`,{ headers })
    .then((res)=> {
      this.setState({seller:res.data.data})
      // console.log(res.data.data)
    })
  }

  getFilterData = (val) =>{
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    console.log(this.state.verifyUser)
    this.setState({seller: []})
    axios.get(`http://192.168.1.62:4000/api/seller/info?verified_whitelist_status=${val}`,{ headers })
    .then((res)=> {
      this.setState({seller:res.data.data})
      // console.log(res.data.data)
    })
  }

  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      sessionStorage.setItem('mydata',JSON.stringify(items))
      this.props.history.push({pathname: '/editseller',
      state:{detail: items }
    })
  }
  render() {
    const {seller} =this.state;
  
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
                      <option value="contact_no_2">Alternate Contact</option>
                    </select>
                      
                      <input className="query" id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?" />
                          
                      {/* <input id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?"> */}
                      {/* </input> */}
                    <button type ="button" className="button1" onClick={()=>this.getSearchData({})}>Search</button>
                </form>
                
                <form className="float-right">
                    <select className = "filter1" name ="verifyUser" defaultValue = {this.state.verifyUser} onChange={(e)=>{
                      this.getFilterData(e.target.value)
                    }}> 
                      <option value="1" > Verified and White Listed</option>
                      <option value="3"> Verified and  Non-White Listed</option>
                      <option value="4"> Non-Verified and  White Listed</option>
                      <option value="2"> Non-Verified and Non-White Listed</option>
                      <option value="5"> On-Hold</option>
                    </select>

                    {/* <button type ="button" className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getFilterData({})}>Search</button> */}
                </form>


              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="tablerow">
                    <th>Seller Id</th>
                    <th> Name</th>
                    <th> Address</th>
                    <th> Contact</th>
                    <th>Alternate Contact</th>
                    <th> Email </th>
                    <th> Validity</th>
                    <th> Type</th>
                    <th>Aadhar Card</th>
                    <th>Pan Card</th>
                    <th>Registration</th>
                    <th>GST</th>
                    {/* <th>Inventory</th>
                    <th>Cancel Check</th> */}
                    <th>Edit</th>
                  </tr>
                  </thead>
                  { this.state.seller ?  <h2>Not Found</h2> :  <div>
                    {seller.map((items)=>
                  <tbody>
                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.seller_name}</td>
                    <td>{items.address}</td>
                    <td>{items.contact_no}</td>
                    <td>{items.contact_no_2}</td>
                    <td>{items.email}</td>
                    <td>{items.valid_till}</td>
                    <td>{items.seller_type_id}</td>
                    <td >{items.aadhar > 0 ? "True" : "False"}</td>
                    <td >{items.pan_no > 0 ? "True" : "False"}</td>
                    <td >{items.reg_no > 0 ? "True" : "False"}</td>
                    <td >{items.gstin > 0 ? "True" : "False"}</td>
                    {/* <td>{items.inventory_docs.length > 0 ? "True" : "False"}</td>
                    <td>{items.cancelled_cheque.length > 0 ? "True" : "False"}</td> */}
                    {/* <td><Button onClick={()=>this.editSeller(items)} color="secondary">EDIT</Button></td> */}
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
                  </tr>
                  </tbody>
                  )
                }
                     </div>}
                </Table>
                
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button" onClick={()=> this.state.offset >= 10 ? this.getSellerData(this.state.offset = (this.state.offset) - 10) :""}>Prev</PaginationLink></PaginationItem>
                    {/* <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=0)}>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=20)}>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=40)}>3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=60)}>4</PaginationLink></PaginationItem> */}
                    <PaginationItem><PaginationLink next tag="button" onClick={()=> this.state.offset <= this.state.count ? this.getSellerData(this.state.offset = (this.state.offset) + 10) : ""}>Next</PaginationLink></PaginationItem>
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