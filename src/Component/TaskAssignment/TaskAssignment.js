import React, { Component } from 'react'
import axios from 'axios'
import './tables.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Card, CardBody,Button, Label, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table, FormGroup } from 'reactstrap';
class Task extends Component {
    state= {
      seller:[],
      
       offset : 0,   //current page
       limit : 15,  //per page
       count: 0,
       query:'',
       searchBy:'id',
       options: [],
       users:[],
       id:''
      //  verifyUser: '1'
      
    }
    handleInputChange = event => {
      this.setState({[event.target.name]: event.target.value})
    }
    onChange(e) {
        // current array of options
        const options = this.state.options
        let index
    
        // check if the check box is checked or unchecked
        if (e.target.checked) {
          // add the numerical value of the checkbox to options array
          options.push(+e.target.value)
        } else {
          // or remove the value from the unchecked checkbox from the array
          index = options.indexOf(+e.target.value)
          options.splice(index, 1)
        }
    
        // update the state with the new array of options
        this.setState({ options: options })
        // console.log(this.state.options)
         
      }
    
    componentDidMount(){
      this.getSellerData();
      this.getFilterUser()
      
    }
  
    getSellerData = ()=>{
      let headers = {
        'x-auth-token': sessionStorage.getItem('token')
       }
    //    console.log(sessionStorage.getItem('token'))
      
      axios.get('http://192.168.1.62:4000/api/assign/jobs/seller?offset='+this.state.offset+'&limit=15',{ headers })
      // axios.get('http://localhost:3000/seller')
      .then((res)=>  {
        this.setState({seller:res.data.data.rows, count:res.data.data.count})
        // console.log(res.data)
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
    axios.get(`http://192.168.1.62:4000/api/assign/jobs/seller?${this.state.searchBy}=${this.state.query}`,{ headers })
    .then((res)=> {
      this.setState({seller:res.data.data})
      // console.log(res.data.data)
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
  
      submitForm = () => {
       
          axios({
              method: 'post',
              url:'http://192.168.1.62:4000/api/assign/jobs/users',
              headers: {
                'x-auth-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                seller_ids: this.state.options,
                user_id: this.state.id

              })
          }).then(res => {
              alert('Task assign successfully')
              console.log(this.state.options)
              console.log("hi"+this.state.id)
              console.log(res.data)
              this.props.history.push({pathname: '/base/tables/',
                  
    })
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
                      {/* <option value="contact_no_2">Alternate Contact</option> */}
                    </select>
                      
                      <input className="query" id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?" />
                          
                      {/* <input id = "query" type = 'text' defaultValue={this.state.query} onChange={this.handleInputChange} name="query" placeholder="What are you looking for?"> */}
                      {/* </input> */}
                    <button type ="button" className="button1" onClick={()=>this.getSearchData({})}>Search</button>
                </form>
               
                  
                  
                
  
                </CardHeader>
                <CardBody>
                <form className="text-center">
                      <select className = "filter1" > 
                        <option value="seller Managment" > Seller Management</option>
                        
                      </select>
  
                      {/* <button type ="button" className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getFilterData({})}>Search</button> */}
                  </form>
                  <br></br>
                  <Table className="able" hover bordered striped responsive size="sm">
                  <thead>
                  <tr className="tablerow">
                    <th>Seller Id</th>
                    <th> Name</th>
                    <th>Contact Number:</th>
                    <th>Assign Task</th>
                    
                    
                  </tr>
                  </thead>
                  
                  {seller.map((items)=>
                  <tbody>

                  <tr key={items.id} className="myList">
                    <td>{items.id}</td>
                    <td>{items.seller_name}</td>
                    <td>{items.contact_no}</td>
                    <td><input type="checkbox" value= {items.id} onChange={this.onChange.bind(this)}></input></td>
                    
                    
                    
                    {/* <td>{items.inventory_docs.length > 0 ? "True" : "Flase"}</td>
                    <td>{items.cancelled_cheque.length > 0 ? "True" : "Flase"}</td> */}
                    {/* <td><Button onClick={()=>this.editSeller(items)} color="secondary">EDIT</Button></td> */}
                   
                  </tr>
                  </tbody>
                  )
                }
                </Table>
                
                <Form>
                    <Col className="float-right" md="2">
                    <Label>Assign To:</Label>
                      <InputGroup className="mb-1">
                      <select type="text" name="id" onChange={this.handleInputChange}
                         ><option>Select a CE</option>
                                {this.state.users.map((user)=>(
                                    <option value={user.id}>{user.full_name}</option>
                                ))}
                               
                          </select>
                        
                      </InputGroup>
                      <Button color="primary"   onClick={this.submitForm}>Submit</Button>
                      </Col>
                      
                        
                          
                          
                        
                      
                
                </Form>
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
export default Task