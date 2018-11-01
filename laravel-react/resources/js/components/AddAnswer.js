import React, { Component } from 'react';

class AddAnswer extends Component {
 
    constructor(props) {
      super(props);
         /* Initialize the state. */
         this.state = {
            newAnswer: {
                answer_text: ''
            }
          }
       
      //Boilerplate code for binding methods with `this`
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
     
    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
       
      /*Duplicating and updating the state */
      var state = Object.assign({}, this.state.newAnswer); 
      state[key] = e.target.value;
      this.setState({newAnswer: state });
    }
   /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
      //preventDefault prevents page reload   
      e.preventDefault();
      /*A call back to the onAdd props. The current
       *state is passed as a param
       */
      this.props.onAdd(this.state.newAnswer);
    }
   
    render() {
      const divStyle = {
          /*Code omitted for brevity */ }
       
      return(
        <div> 
          <h2> Answer here </h2>
          <div style={divStyle}> 
          /*when Submit button is pressed, the control is passed to 
           *handleSubmit method 
           */
          <form onSubmit={this.handleSubmit}>
            <label> Answer here: 
             { /*On every keystroke, the handeInput method is invoked */ }
              <input type="text" onChange={(e)=>this.handleInput('answer_text',e)} />
            </label>
             
           { /* Input fields for Price and availability omitted for brevity */}
   
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>)
    }
  }
   
  export default AddAnswer;