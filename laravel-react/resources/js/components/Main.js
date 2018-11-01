import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddAnswer from './AddAnswer';
import axios from 'axios';

var ques = {};
ques[1] = {'id' : 1, 'question_text': 'What\'s your name?'};
ques[2] = {'id' : 2, 'question_text': 'This question 2?'};
ques[3] = {'id' : 3, 'question_text': 'This question 3?'};
ques[4] = {'id' : 4, 'question_text': 'This question 4?'};
ques[5] = {'id' : 5, 'question_text': 'This question 5?'};

/* Main Component */
class Main extends Component {

  constructor() {
  
    super();
    //Initialize the state in the constructor
    this.state = {
        answers: [],
        questions:[],
        currentProduct: null
    
    }
     this.handleAddAnswer = this.handleAddAnswer.bind(this);
  }
  /*componentDidMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /* fetch API in action */
    this.setState({ questions: [{'id':1, 'question_text': 'q1'}, {'id':2, 'question_text': 'q2'}] });

    fetch('/api/answers')
        .then(response => {
            return response.json();
        })
        .then(answers => {
            //Fetched product is stored in the state
            this.setState({ answers });
        });


  }

  renderAnswers() {
    const listStyle = {
        listStyle: 'none',
        fontSize: '18px',
        lineHeight: '1.8em',
    }
return this.state.answers.map(answer => {
    return (
        /* When using list you need to specify a key
         * attribute that is unique for each list item
        */
        <li style={listStyle} key={answer.answer_id}>
            <p>{ answer.question_text } </p>
            <p>{ answer.answer_text } </p>
        </li>  
    );
})
}

  handleClick(product) {

      //handleClick is used to set the state
      this.setState({currentProduct:product});
  
  }

   handleAddAnswer(answer) {
     
    //product.price = Number(product.price);
    console.log('Handle Add Answer');
    console.log(answer);
    answer['question_text'] = 'Js post test';
    answer['user_id'] = 1;
    
    /*Fetch API for post request */
    fetch( 'api/answers/', {
        method:'POST',
        /* headers are important*/
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(answer)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        var newArray = this.state.answers.slice(); 
        //console.log(data);    
        newArray.push(data);
        console.log(newArray);     
        this.setState({answers:newArray})
        /*this.setState((prevState)=> ({
            answers: prevState.answers.concat(data),
            currentAnswer : data
        }))*/
    })
    
    
 //update the state of products and currentProduct
  }  

  handleDelete() {
    
    const currentProduct = this.state.currentProduct;
    fetch( 'api/products/' + this.state.currentProduct.id, 
        { method: 'delete' })
        .then(response => {
          /* Duplicate the array and filter out the item to be deleted */
          var array = this.state.products.filter(function(item) {
          return item !== currentProduct
        });
      
        this.setState({ products: array, currentProduct: null});
   
    });
  }
  
  handleUpdate(product) {
 
    const currentProduct = this.state.currentProduct;
    fetch( 'api/products/' + currentProduct.id, {
        method:'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        return response.json();
    })
    .then( data => {
        /* Updating the state */
        var array = this.state.products.filter(function(item) {
          return item !== currentProduct
      })
        this.setState((prevState)=> ({
            products: array.concat(product),
            currentProduct : product
        }))
    }) 
  }


  render() {

   const mainDivStyle =  {
        display: "flex",
        flexDirection: "row"
    }
    
    const divStyle = {
       
        justifyContent: "flex-start",
        padding: '10px',
        width: '35%',
        background: '#f0f0f0',
        padding: '20px 20px 20px 20px',
        margin: '30px 10px 10px 30px'
        
    }

    return (
        <div>
          <div style= {mainDivStyle}>
            <div style={divStyle}>
                <h3> All questions </h3>
                  <ul>
                    { this.renderAnswers() }
                  </ul> 
                  
            </div> 
            <AddAnswer onAdd={this.handleAddAnswer}/> 
          </div>
              
        </div>
      
    );
  }
}

export default Main;

/* The if statement is required so as to Render the component 
 * on pages that have a div with an ID of "root";  
 */ 

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}