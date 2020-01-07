import React, { Component } from 'react'
import axios from 'axios'
import './abc.css'
import Register from '../Register/Register'
import Modal from './Modal/modal'
import { Card, CardBody,Button, Label, CardHeader, Col, Pagination, PaginationItem, PaginationLink, InputGroupAddon,InputGroupText,Form,Input, InputGroup, Row, Table, FormGroup } from 'reactstrap';
import SellerTaskAssignment from '../sellerAssignment/sellerAssignment';
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
       id:'',
      _refs : {},
       comment:[],
       management: this.props.management,
       result : {}
      
    }
    handleInputChange = event => {
      this.setState({[event.target.name]: event.target.value})
      
    }
    handle = (event) =>{
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
        console.log(this.state.options)
         
      }
      onChanges = () => {
        var comment = Object.keys(this.state._refs).map(
          key => this.state._refs[key] && this.state._refs[key].value
        )
        this.setState({
          comment: Object.assign(comment, [comment])
        });
       console.log(comment)
      };
    
    componentDidMount(){
      this.getSellerData();
      this.getFilterUser()
      
    }
    
    
    getSellerData = ()=>{
      let headers = {
        'x-auth-token': sessionStorage.getItem('token')
       }
    //    console.log(sessionStorage.getItem('token'))
      
      axios.get('http://192.168.1.62:4000/api/assign/jobs/inventory?offset='+this.state.offset+'&limit=15',{ headers })
      // axios.get('http://localhost:3000/seller')
      .then((res)=>  {
        this.setState({seller:res.data.data, count:res.data.data.count})
        // console.log(res.data)
        // this.setState({seller: res.data})
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
       

        

//  var result = Object.assign({}, [this.state.options]);
//  var comment = Object.assign({}, [this.state.comment]);
var result =Object.assign(...this.state.comment.map((k, i) => ({[k]: this.state.options[i]})))
          console.log(result);

        // console.log(comment);
        // console.log("ref", this.state._refs)
          // axios({
          //     method: 'post',
          //     url:'http://192.168.1.62:4000/api/assign/jobs/inventory/users',
          //     headers: {
          //       'x-auth-token': sessionStorage.getItem('token'),
          //       'Content-Type': 'application/json'
          //     },
          //     data: JSON.stringify({
          //       job_ids: this.state.options,
          //       user_id: this.state.id

          //     })
          // }).then(res => {
          //     alert('Task assign successfully')
          //     console.log(this.state.options)
          //     console.log("hi"+this.state.id)
          //     console.log(res.data)
           
 
          // })
      }
      delteSku= (id)=>
      {
        axios.delete("").then(res=>{
          alert("successfully deleted")
          
        })
        
     
        
      }
      ViewSku=(id)=>{
        sessionStorage.setItem('id', JSON.stringify(id))
        if(id)
        {
          return(
            <Register></Register>
          )
        }
      
      }
    render() {
      console.log("hi", this.state.comment)
      const {seller} =this.state;
    
     
     
     if(this.state.management === 'Seller_Management')
     {
       return(
       <SellerTaskAssignment></SellerTaskAssignment>

       )
     }
    
      return (
        <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Inventory Task Assign
                
                <form className="text-center  ">
                      <select name="management"  className = "filter1 w-50 "
                      onChange={this.handleInputChange}
                    
                      
                        > 
                        <option>Select Management</option>
                        
                        <option  value="Seller_Management" > Seller Management</option>
                        
                      </select>

                  {/* <button type ="button" className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getFilterData({})}>Search</button> */}
              </form>
             
                
                
              

              </CardHeader>
              <CardBody>
                
            
                <br></br>
                <Table className="able" hover bordered striped responsive size="sm">
                <thead>
                <tr className="tablerow">
                  <th>Id</th>
                  <th>Job ID</th>
                  <th>JOB Date</th>
                  <th>Job TIme</th>
                  
                 
                  <th>View</th>
                  <th>Delete</th>
                  
                  
                </tr>
                </thead>
                
                {seller.map((items,index)=>
                
                <tbody>
                 <React.Fragment  key={items.id}>
                 <tr className="myList">
                  <td>{index}</td>
                <td>{items.id}</td>
                  <td>{items.created_at.slice(0,10)}</td>
                  <td>{items.created_at.slice(11,19)}</td>
                  <td>{items.comments}</td>
                  
                  <td >
                    
                    
                   
                     <div className=" text-center">
                        
                        <input  type="checkbox"  value= {items.id} onChange={this.onChange.bind(this)}></input>
                        <input type="text" ref={ref => (this.state._refs[items.id] = ref)} onChange={this.onChanges.bind(this)} defaultValue={null} placeholder="comments" ></input>
                            
                     
                    </div>

                    
                    
                    
                    
                    </td>
                    <td>
                    {/* <Label>Assign To:</Label>
                    <InputGroup className="mb-1">
                    <select type="text" name="id" onChange={this.handleInputChange}
                       ><option>Select a CE</option>
                              {this.state.users.map((user)=>(
                                  <option value={user.id}>{user.full_name}</option>
                              ))}
                             
                    </select>
                    <br></br>
                    </InputGroup>
                    <InputGroup>
                          <Button  outline color="success" size="xs">Assign to</Button>
                    </InputGroup> */}
                   <div className="text-center">
                   <Modal  buttonLabel="view"></Modal>

                   </div>
                    
                    

                      
                    
                   
                    </td>
                    <td>
                    <div className="text-center">
                        <Button onClick={()=>this.delteSku(items.id)} outline color="success" size="xs">Delete</Button>

                   </div>
                    </td>
                  
                  
                  
                  
                </tr>
                 </React.Fragment>
                
                </tbody>
                )
              }
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
              
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
        
       
      );
    }
  }
export default Task