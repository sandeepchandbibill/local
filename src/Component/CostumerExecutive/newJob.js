import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class NewJob extends Component {
  state= {
    seller:[],
    //  offset : 0,   //current page
    //  limit : 10,  //per page
    //  count: 0,
    //  query:'',
    //  searchBy:'id',
    // //  verifyUser: '1'
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
     console.log(headers)
    axios.get('http://192.168.1.62:4000/api/jobs/new',{ headers })
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
      this.setState({seller:res.data.data})
      console.log(res.data.data)
      // this.setState({seller: res.data})
    })
}

  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      this.props.history.push({pathname: '/editjobs',
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
                  )}
                </Table>

                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button" onClick={()=> this.state.offset >= 10 ? this.getSellerData(this.state.offset = (this.state.offset) - 10) :""}>Prev</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=0)}>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=20)}>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=40)}>3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button" onClick={()=> this.getSellerData(this.state.offset=60)}>4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button" onClick={()=> this.state.offset <= this.state.count ? this.getSellerData(this.state.offset = (this.state.offset) + 10) : ""}>Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NewJob;