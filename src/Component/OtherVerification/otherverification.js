import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';


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
    axios.get('http://192.168.1.62:4000/api/seller/other?offset='+this.state.offset+'&limit=20',{headers})
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
      this.setState({seller:res.data.data.rows, count:res.data.data.count})
      // console.log(res.data)
      // this.setState({seller: res.data})
    })
}

  getSearchData = () =>{
    console.log(this.state.searchBy)
    console.log(this.state.query)
    this.setState({seller: []})
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    axios.get(`http://192.168.1.62:4000/api/seller/other?${this.state.searchBy}=${this.state.query}`,{headers})
    .then((res)=> {
      // console.log(res.data.data.other_verification.google_link)
       this.setState({seller:res.data.data})
       
    })
  }

  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      this.props.history.push({pathname: '/editotherverification',
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
                <i className="fa fa-align-justify"></i> Other Verification Details
                <form className = "my-0 ml-sm-2" >
                    <select  name ="searchBy" defaultValue = {this.state.searchBy} onChange={this.handleInputChange}> 
                      <option value="id">ID</option>
                      <option value="name">Name</option>
                      <option value="contact">Contact</option>
                    </select>
                      
                      <input className="col-md-3 my-0 ml-sm-2 " id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?" />
                          
                      {/* <input id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?"> */}
                      {/* </input> */}
                    <button type ="button" className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getSearchData({})}>Search</button>
                </form>
       
              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="tablerow">
                    <th>Seller Id</th>
                    <th> Name</th>
                    <th> Contact</th>
                    <th> Google Link </th>
                    <th>
                       Costumer Care 1
                      <tr>
                        <td>Name</td>
                        <td>Remark</td>
                        <td>Verification Time</td>
                      </tr>
                      </th>
                    <th> Costumer Care 2
                    <tr>
                        <td>Name</td>
                        <td>Remark</td>
                        <td>Verification Time</td>
                      </tr>
                    </th>
                    <th>JustDial Link</th>
                    <th>Location Link</th>
                    <th>Physical Verification
                    <tr>
                        <td>Name</td>
                        <td>Remark</td>
                      </tr>
                    </th>
                    <th>Edit</th>
                  </tr>
                  </thead>
                   {seller !== null && seller.length > 0 ?   <tbody>
                  {seller.map((items)=>
                  
                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.seller_name}</td>
                    <td>{items.contact_no}</td>
                    <td>{(items.other_verification && items.other_verification.googleLink) || "No Link Provided"}</td>
                    <td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce1 && items.other_verification.customer_care.cce1.name) || "Not Given"}</td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce1 && items.other_verification.customer_care.cce1.remark) || "Not Given"}</td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce1 && items.other_verification.customer_care.cce1.verification_time) || "Not Given"}</td>
                    </td>
                    <td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce2 && items.other_verification.customer_care.cce2.name) || "Not Given"}</td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce2 && items.other_verification.customer_care.cce2.remark) || "Not Given"}</td>
                    <td>{(items.other_verification && items.other_verification.customer_care && items.other_verification.customer_care.cce2 && items.other_verification.customer_care.cce2.verification_time) || "Not Given"}</td>
                    </td>
                    <td>{(items.other_verification && items.other_verification.justdial_link) || "No Link Provided"}</td>
                    <td>{(items.other_verification && items.other_verification.location_link) || "No Link Provided"}</td>
                    <td>
                    <td>{(items.other_verification && items.other_verification.physical_verification && items.other_verification.physical_verification.name) || "Not Given"}</td>
                    <td>{(items.other_verification && items.other_verification.physical_verification && items.other_verification.physical_verification.remark) || "Not Given"}</td>
                    </td>
                    {/* <td>{items.inventory_docs.length > 0 ? "True" : "Flase"}</td>
                    <td>{items.cancelled_cheque.length > 0 ? "True" : "Flase"}</td> */}
                    {/* <td><Button onClick={()=>this.editSeller(items)} color="secondary">EDIT</Button></td> */}
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
                  </tr>
                    )
                  }
                  </tbody> : <div>NOt Found</div>}
                
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