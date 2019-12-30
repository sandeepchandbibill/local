import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
class Tables extends Component {
  state= {
    payout:[],
     offset : 0,
     limit : 10,
     count: 0,
     val: 0,
     value:'',
     searchBy:'seller_id'
  }
  componentDidMount(){
    this.getPayoutData();
  }
  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  getPayoutData = ()=>{
    // axios.get('http://localhost:3000/rows')
    axios.get('http://192.168.1.62:4000/api/seller/payouts?offset='+this.state.offset+'&limit=10')
    .then((res)=> {
      this.setState({payout:res.data.data.rows})
      
     
      console.log(this.state.count)
      
  })
}

  editSeller = (items) =>{
    //console.log("Huiii......."+JSON.stringify(this.state.seller))
      this.props.history.push({pathname: '/editpayouts/',
      state:{detail: items }
    })
  }
  getSearchData = () =>{
    console.log(this.state.searchBy)
    console.log("Hiii...."+this.state.value)
    this.setState({payout:[]})
    axios.get(`http://192.168.1.62:4000/api/seller/payouts?seller_id=`+this.state.value)
    .then((res)=> {
      this.setState({payout:res.data.data.rows})
      console.log("Hello.."+res.data.data.rows)
    })

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
                <form className = "my-0 ml-sm-2">
                    <select  name ="searchBy" defaultValue = {this.state.searchBy} onChange={this.handleInputChange}> 
                      <option value="seller_id">ID</option>
                    </select>
                      <input className="col-md-3 my-0 ml-sm-2 " id = "value" type = 'text' defaultValue={this.state.value} onChange={this.handleInputChange} name="value" placeholder="What are you looking for?">
                      </input>
                    <button  type ="button"  className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getSearchData({})}>Search</button>
                </form>
              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                <thead>
                  <tr className="tablerow">
                    <th>Seller Id</th>
                    <th>Seller Active</th>
                    <th>Seller Bene Id</th>
                    <th>Seller Bene Group</th>
                    <th>Seller Transfer Mode</th>
                    <th>Seller Bene Name </th>
                    <th>Seller Email</th>
                    <th>Seller Phone</th>
                    <th>Seller Bank Account No.</th>
                    <th>Seller ifsc No.</th>
                    <th>Address</th>
                    <th>Seller city</th>
                    <th>Seller state</th>
                    <th>Edit</th>
                  </tr>
                  </thead>

                  {payout.map((items)=>
                  <tbody>
                  <tr key={items.id} className="myList">
                  <td>{items.seller_id}</td>
                    <td>{items.active.toString()}</td>
                    <td>{items.bene_id}</td>
                    <td>{items.bene_group}</td>
                    <td>{items.transfer_mode}</td>
                    <td>{items.bene_name}</td>
                    <td>{items.email}</td>
                    <td>{items.phone}</td>
                    <td>{items.bank_account > 0 ? items.bank_account.replace(/.(?=.{4})/g, 'x') : "Not Submitted"} </td>
                    <td>{items.ifsc}</td>
                    <td>{items.address1}</td>
                    <td>{items.city} </td>
                    <td>{items.state}</td>
                    
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
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