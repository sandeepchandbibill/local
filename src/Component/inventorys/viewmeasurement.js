import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';
import './Tables.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Tables extends Component {
  state= {
    Sku:[],
    
     offset : 0,   //current page
     limit : 10,  //per page
     count: 0,
     query:'',
     searchBy:'id',
     verifyUser: '1'
    
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
    axios.get('http://192.168.1.62:4000/api/inventory/sku/measurement?offset='+this.state.offset+'&limit=20', {headers})
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
    
      this.setState({Sku:res.data.data.rows, count:res.data.data.count})
      console.log(res.data.data.rows)
      // this.setState({seller: res.data})
    })
}

  getSearchData = () =>{
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    console.log(this.state.searchBy)
    console.log(this.state.query)
    this.setState({Sku: []})
    axios.get(`http://192.168.1.62:4000/api/seller/info?${this.state.searchBy}=${this.state.query}`,{ headers })
    .then((res)=> {
      this.setState({Sku:res.data.data})
      // console.log(res.data.data)
    })
  }



  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      
    sessionStorage.setItem("measurement",JSON.stringify(items))
      
    this.props.history.push({pathname: '/editmeasurement'
  })

  }
  render() {
    const {Sku} =this.state;
  
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> SKU Details
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
                
              


              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="tablerow">
                      <th>ID</th>
                    <th>SKU Id</th>
                    <th> Seller id</th>
                    <th> Measurement Type</th>
                    <th >Measurement Value</th>
                    
                    <th>Pack Numbers</th>
                    <th> Cashback Percent </th>
                    <th> Discount Percent</th>
                    <th>Bar Code</th>
                    <th>MRP</th>
                    <th>tax</th>
                    <th>Has Images</th>
                   
                    <th>Status Type</th>
                    
                    <th>Edit</th>
                  </tr>
                  </thead>
                  {Sku !== null && Sku.length > 0 ?   <tbody>
                    {Sku.map((items)=>
                  
                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.sku_id}</td>
                    <td>{items.seller_id}</td>
                    <td>{items.measurement_type}</td>
                    <td>{items.measurement_value}</td>
                    <td>{items.pack_numbers}</td>
                    <td>{items.cashback_percent}</td>
                    <td>{items.discount_percent}</td>
                    <td>{items.bar_code}</td>
                    <td>{items.mrp}</td>
                    <td>{items.tax}</td>
                    <td>{items.has_images > 0 ? "True" : "False"}</td>
                    <td>{items.status_type}</td>
                    
                    
                  
                    {/* <td>{items.inventory_docs.length > 0 ? "True" : "False"}</td>
                    <td>{items.cancelled_cheque.length > 0 ? "True" : "False"}</td> */}
                    {/* <td><Button onClick={()=>this.editSeller(items)} color="secondary">EDIT</Button></td> */}
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
                  </tr>
                
                  )
                }
                      </tbody> : <h2>Not Found</h2> }
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