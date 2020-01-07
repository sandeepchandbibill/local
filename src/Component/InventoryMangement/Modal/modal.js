import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form } from 'reactstrap'
import Data from '../data/data'

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

        if(label === 'view'){
            button = <Button
            outline color="success"
                    onClick={this.toggle}
                   >{label}
                    </Button>
            title = 'Aadhar'
        }
     
       
       
        

        // console.log("hi"+this.state.image)
        return(
            <div>
                {button}
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                    <Data>
                    
                   </Data>
          </ModalBody>
        </Modal>
      </div>
            
        )
    }
    

}
export default ModalForm