import React, { useState, Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button,
  CardText,
  Card,
  CardBody,
  CardTitle,
  Input
} from 'reactstrap';

class Photo extends Component{
  state = {
    items :  this.props.docs,
    activeIndex: 0,
    setActiveIndex: 0,
    aadhar: this.props.change



  }
 
  next = () => {
    
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({activeIndex: nextIndex})
  }
   previous = () => {
    
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({activeIndex: nextIndex})
  }
  
   goToIndex = (newIndex) => {
    
    this.setState({activeIndex: newIndex})
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
    
  }
  submitInput= ()=>{
    this.setState({aadhar: this.state.aadhar})
    console.log(this.state.aadhar)
    
  }
 render(){
  const slides = this.state.items.map((item) => {
    
    
    return (

      // <CarouselItem
      //   onExiting={() => setAnimating(true)}
      //   onExited={() => setAnimating(false)}
      //   key={item.src}
      // >
      <CarouselItem
      
      key={item}
    >
        <img width="500px" height="400px" src={item} alt={item.altText} />
        
      </CarouselItem>
    );
  });
  if(this.props.id){
    
  }
  return (
    <Card>
            <Carousel
        activeIndex={this.state.activeIndex}
        next={this.next}
        previous={this.previous}
        >
        <CarouselIndicators items={this.state.items} activeIndex={this.activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        <CardBody>
        <CardTitle className="align-items-center">{this.props.name} </CardTitle>
            
            <CardText>
               <Input type="text" name={this.props.name} defaultValue={this.props.value} onChange ={this.props.onSome} ></Input>
              {/* <Button outline color="success" className="float-left" size="lg" onClick= {this.submitInput}>Accept</Button> */}
              
              {/* <Button outline color="danger" className="float-right" size="lg">Reject</Button> */}
            </CardText>
          </CardBody>
    </Card>
    
    
  );
  
 }
 
}

  

  

  

 

 


export default Photo;

