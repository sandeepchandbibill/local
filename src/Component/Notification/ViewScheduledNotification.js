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
    axios.get('http://192.168.1.62:4000/api/notification/view?offset='+this.state.offset+'&limit=20',{ headers })
    
    .then((res)=>  {
      this.setState({seller:res.data.data.rows, count:res.data.data.count})
      
    })
}




  editSeller = (items) =>{
    
      
      this.props.history.push({pathname: '/editsmsnotification',
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
                
                   

              </CardHeader>
              <CardBody>
                <Table className="able" hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="tablerow">
                    <th>Id</th>
                    <th> Title</th>
                    <th> Message</th>
                    <th> Description</th>
                    <th>link</th>
                    <th> Image_url </th>
                    <th> schedule_time</th>
                    <th> Active</th>
                    <th>scheduled By:</th>
                   
                    <th>Edit</th>
                  </tr>
                  </thead>
                <tbody>
                    {seller.map((items)=>
                  
                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.title}</td>
                    <td>{items.message}</td>
                    <td>{items.description}</td>
                    <td>{items.link}</td>
                    <td>{items.image_url}</td>
                    <td>{items.schedule_time}</td>
                    <td>{items.active ? "True" : "False"}</td>
                    <td>{items.scheduled_by}</td>
                  
                    <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(items)}  icon= {faEdit} color="blue" /></td>
                  </tr>
                
                  )
                }
                </tbody>
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