import React, {Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import Map from '../Map/googlemap'
import Axios from 'axios'
class ModalForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
          modal: false,
          
        }
      }
     
    
      toggle = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      }
   
    // componentDidMount(){
    //   console.log(this.props.lat, this.props.log)
    // }
    
    render()
    {   const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>
        const label = this.props.buttonLabel
        let button = ''
        let title = ''

        if(label === 'Map'){
          
          button =<button className="btn"><i className="fa fa-map-marker" onClick={this.Move}></i> {title}</button>
          //  <FontAwesomeIcon
                   
          //         icon= {faMapMarker}
          //         size="lg"
          //         color="red"
                  
          //         style={{float: "left", marginRight:"10px"}}>{label}
          //         </FontAwesomeIcon>
          title = 'Store location'
        }
       
      
       
        // console.log("hi"+this.state.image)
        return(
            <div>
                {button}
                <Modal isOpen={this.state.modal} Move={this.Move} className={this.props.className}>
                    <ModalHeader toggle={this.Move} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                    <Map
                    
                    toggle={this.toggle}
                    markers={this.props.markers}
                    lat={this.props.lat}
                    log={this.props.log} />
          </ModalBody>
        </Modal>
      </div>
            
        )
    }
    

}
export default ModalForm