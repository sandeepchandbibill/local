import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form } from 'reactstrap'
import Photo from '../Photo/Photo'
import Axios from 'axios'
class ModalForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
          modal: false,
          image: []
        }
      }
      componentDidMount(){
       
          this.setState({image: this.props.docs})
          

        
      }
      
      toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      }
   
    
    render()
    {   const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        const label = this.props.buttonLabel
        let button = ''
        let title = ''

        if(label === 'aadhar'){
            button = <Button
                    color="warning"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                    </Button>
            title = 'Aadhar'
        }else if(label ==='pan_no') {
          button = <Button
                    color="warning"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                  </Button>
          title = 'PAN NO'
        }
        else if(label ==='reg_no') {
          button = <Button
                    color="success"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                  </Button>
          title = 'REG NO'
        }
       
        else if (label === 'gst_no'){
          button = <Form>
              <Button
            color="warning"
            onClick={this.toggle}
            style={{float: "left", marginRight:"10px"}}>{label}
          </Button>
          </Form>
        title = 'GST NO'

        }
        

        // console.log("hi"+this.state.image)
        return(
            <div>
                {button}
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                    <Photo
                    
                    name={this.props.name}
                    value= {this.props.defaultValue}
                    toggle={this.toggle}
                    names={this.props.id}
                  onSome={this.props.onSome}
                    docs={this.state.image} />
                    {this.props.children}
          </ModalBody>
        </Modal>
      </div>
            
        )
    }
    

}
export default ModalForm