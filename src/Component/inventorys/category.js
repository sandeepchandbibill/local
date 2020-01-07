import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';
import './Tables.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Tables extends Component {
  state= {
    Category:[],
    
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
    axios.get('http://192.168.1.62:4000/api/inventory/sku/category?offset='+this.state.offset+'&limit=20', {headers})
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
    
      this.setState({Category:res.data.data.rows, count:res.data.data.count})
      
      // this.setState({seller: res.data})
    })
}

  getSearchData = () =>{
    let headers = {
      'x-auth-token': sessionStorage.getItem('token')
     }
    console.log(this.state.searchBy)
    console.log(this.state.query)
    this.setState({Category: []})
    axios.get(`http://192.168.1.62:4000/api/seller/info?${this.state.searchBy}=${this.state.query}`,{ headers })
    .then((res)=> {
      this.setState({Category:res.data.data})
      // console.log(res.data.data)
    })
  }



  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      
    sessionStorage.setItem("category",JSON.stringify(items))
      
    this.props.history.push({pathname: '/editCat'
  })

  }
  render() {
    const {Category} =this.state;
     
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
                    <th>Category Id</th>
                    <th>Category Name</th>
                    <th>Brand Id</th>
                    <th>Reg Id</th>
                    <th>Status Type</th>
                     <th>Dual Warranty</th>
                     <th>Priority Index</th>
                     <th>Category Level</th>
                     <th>Category Image Name</th>
                     <th>Edit</th>
                  </tr>
                  </thead>
                  {Category !== null && Category.length > 0 ?   <tbody>
                    {Category.map((items)=>
                  
                  <tr key={items.category_id} className="myList">
                    <td>{items.category_id}</td>
                    <td>{items.category_name}</td>
                    
                    <td>
                    {items.brand_ids ? items.brand_ids.map(item=>(
                        <span>{item},</span>
                        )) : 'null'}
                    </td>
                      <td>{items.ref_id}</td>
                    <td>{items.status_type}</td>
                    <td>{items.dual_warranty_item}</td>
                    <td>{items.priority_index}</td>
                    <td>{items.category_level}</td>
                    <td>{items.category_image_name}</td>
                 
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
                  </tr>
                
                  )
                }
                      </tbody> : <h2>Not Found</h2> }
                </Table>
                
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button" onClick={()=> this.state.offset >= 10 ? this.getSellerData(this.state.offset = (this.state.offset) - 10) :""}>Prev</PaginationLink></PaginationItem>
                    
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