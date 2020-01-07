import React, { Component } from 'react';
import Axios from 'axios'
import { Card, CardBody,Button, CardHeader, Col, Row, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
class getusers extends Component {
    state={
        users: []
    }
    componentDidMount(){
        this.getUsers();

    }
    getUsers(){
     Axios({
         method: 'get',
         url:'http://192.168.1.62:4000/api/seller/payouts',
         headers: {
             'Content-Type': 'application/Json',
            'x-auth-token': sessionStorage.getItem('token')
         }
     }).then(res=>{
         this.setState({users: res.data.data})
     }).catch(err=>{
         alert('something went wrong')
     })
    }
    editSeller = (items) =>{
        
          sessionStorage.getItem('user', JSON.stringify(items))
          this.props.history.push({pathname: '/editUser'
        })
      }
    render() {

        return (
            <Row>
                <Col>
                <Card>
                    <CardHeader>
                             <i className="fa fa-align-justify"></i> User Details
                    </CardHeader>
                    <CardBody>
                        <Table  className="able" hover bordered striped responsive size="sm">
                            <thead>
                                <tr className="tablerow">
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                       Mobile No
                                    </th>
                                    <th>
                                        Role Type
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(user=>(
                                    <React.Fragment key={user.id}>
                                        <tr className="myList">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><FontAwesomeIcon className="mt-3" onClick={()=>this.editSeller(user)}  icon= {faEdit} color="blue" /></td>
                                         
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>

                        </Table>
                    </CardBody>
                </Card>

                </Col>
            </Row>
        );
    }
}

export default getusers;