import React, { Component } from 'react';
import SellerAssign from '../sellerAssignment/sellerAssignment'
import InventoryTaskManagement from '../InventoryMangement/invetoryTaskManagement'
class Task extends Component {
    state={
        management:''

    }
    handleInputChange = event => {
        this.setState({[event.target.name]: event.target.value})
        
      }
   
    render() {
        if(this.state.management === 'seller_Managment')
        {
            return(<SellerAssign management={this.state.management}></SellerAssign>)
        }
        else if(this.state.management === 'Inventory_Management'){
            return(<InventoryTaskManagement management={this.state.management}></InventoryTaskManagement>)
        }
        return (
            
            <form className="text-center">
            <select name="management"  className = "filter1 w-50"
            onChange={this.handleInputChange}
           
            
               > 
               <option>Select Management</option>
              <option value="seller_Managment" > Seller Management</option>
              <option  value="Inventory_Management" > Inventory Management</option>
              
            </select>

            {/* <button type ="button" className=" mb-1 btn btn-success btn-outline-read btn-sm my-0 ml-sm-2" onClick={()=>this.getFilterData({})}>Search</button> */}
        </form>

        );
    }
}

export default Task;