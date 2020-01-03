import React, { Component } from 'react';
import axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table } from 'reactstrap';





class ProgressJobs extends Component {
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
    axios.get('http://192.168.1.62:4000/api/assign/jobs/progress',{ headers })
    // axios.get('http://localhost:3000/seller')
    .then((res)=>  {
      this.setState({seller:res.data.data.rows})
      console.log(res.data.data)
      // this.setState({seller: res.data})
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
                    <th>Id</th>
                    <th>Admin Id</th>
                    <th>Seller Id</th>
                    <th>Seller Name</th>
                    <th>User Id</th>
                    <th>Task Assign To</th>
                    
                    
                  </tr>
                  </thead>
                  
                  {seller.map((items)=>
                  <tbody>

                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.admin_id}</td>
                    <td>{items.seller_id}</td>
                    <td>{items.seller_name}</td>
                    <td>{items.user_id}</td>
                    <td>{items.user_name}</td>
                    
                    
                  </tr>
                  </tbody>
                  )
                }
                </Table>
                
               
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProgressJobs;