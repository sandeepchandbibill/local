import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Image from '../CancelCheque/StoreImage'
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

        
         if(label === 'cancel_bill'){
          button = <Button
          color="primary"
          size="sm"
          onClick={this.toggle}
          style={{float: "left", marginRight:"10px", marginTop: "10px"}}>{label}
          
        </Button>
        title= "Cancelled Cheque"
        }
       
        
        else if(label === 'cheque'){
          button = 
            <i class="fa fa-picture-o" aria-hidden="true" color="primary"
            size="sm"
            onClick={this.toggle}
            style={{float: "right", marginRight:"10px", marginTop: "10px"}}
            > Cancelled Cheque

            </i>
          
        }

        // console.log("hi"+this.state.image)
        return(
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                    <Image
                    
                    toggle={this.toggle}
                    
                    name={this.props.name} 
                    Ifsc = {this.props.Ifsc} 
                    bank={this.props.bank}
                    docs={this.state.image} />
          </ModalBody>
        </Modal>
      </div>
            
        )
    }
    

}
export default ModalForm