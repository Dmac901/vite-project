import { useReducer } from "react";
import "./SCalculator.css";


//define actions of calculator
const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR_ALL: 'clear',
  DEL_DIGIT: 'del-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
};

//Previous operand is often the result and top number of a basic calculator
//Current operand is bottom number of a basic calculator


//Progressing state based on actions
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
     //Overwrite is used to prevent adding digits after an operation. This resets calculator  
        if (state.overwrite) {
        return { ...state, currentoperand: payload.digit, overwrite: false };
      }
              //Only single digit of Zero allowed at front of operand
      if (payload.digit === '0' && state.currentoperand === '0') {
        return state;
      }
        //Only single decimal is allowed in operands
      if (payload.digit === '.' && state.currentoperand.includes('.')) {
        return state;
      }
      //Adds single digit payload
      return {
        ...state,
        currentoperand: `${state.currentoperand || ''}${payload.digit}`
      };
    case ACTIONS.CHOOSE_OPERATION:
        //Empty calculator returns does not do anything with only selecting an operation
      if (state.currentoperand == null && state.previousoperand == null) {
        return state;
      }
      //This adds an operation to the state and shifts currentoperand/number backwards to previousoperand.
      if (state.previousoperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousoperand: state.currentoperand,
          currentoperand: null
        };
        //This allows the operation to update even without any other digits
      }
      if (state.currentoperand == null) {
        return {
          ...state,
          operation: payload.operation
        };
      }
      //Default completion of operation and sets current opperand/number to null.
      return {
        ...state,
        previousoperand: evaluate(state),
        currentoperand: null,
        operation: payload.operation
      };

    case ACTIONS.CLEAR_ALL:
    //resets all states to empty array  
        return {};

    case ACTIONS.DEL_DIGIT:
     //Turns off overwrite if currentoperand is empty.
        if (state.overwrite) {
        return { ...state, overwrite: false, currentoperand: null };
      }
      //Can't delete a digit from nothing. So it ignores the press.
        if (state.currentoperand == null) {
        return state;
      }
        //Ensures that current operand is set to null for logic when last digit is removed
        if (state.currentoperand.length === 1) {
        return { ...state, currentoperand: null };
      }
      //removes last digit by slice
        return {
        ...state,
        currentoperand: state.currentoperand.slice(0, -1)
      };

    case ACTIONS.EVALUATE:
     //Makes sure everything has a value or returns present state.
        if (state.currentoperand == null || state.operation == null || state.previousoperand == null) {
        return state;
      }
      //Completes an operation by filling out the object and calling evaluate.
      //It then erases operation and previous operand
      return {
        ...state,
        previousoperand: null,
        overwrite: true,
        currentoperand: evaluate(state),
        operation: null
      };
// This is the default do nothing
    default:
      return state;
  }
}


function SCalculator() {
    //This starts to set up the calculate react component with JS variables declared. 
    //Dispatch is used to call an action
  const [{ currentoperand, previousoperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    //This helps set up the HTML for the calculator
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operation">{previousoperand} {operation}</div>
        <div className="current-operation">{currentoperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

//Sets up button clicks to recognize the string of and store the string as digit into the payload
function DigitButton({ dispatch, digit }) {
  return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>;
}

//Sets up button clicks to recognize the string used and store the string as operation into the payload
function OperationButton({ dispatch, operation }) {
  return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}>{operation}</button>;
}

//This is the actual math function
function evaluate({ currentoperand, previousoperand, operation }) {
  //Converts from strings to number data types
  const prev = parseFloat(previousoperand);
  const current = parseFloat(currentoperand);
//Makes sure nothing is null
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
//Math operations
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      if (current === 0) return 'Error'; // Avoids division by zero
      computation = prev / current;
      break;
    default:
      return '';
  }
  return computation.toString();
}

export default SCalculator;

//This is the CSS 
/*
  *, *::before, *::after {
    box-sizing: border-box;
}


.calculator-grid { 
    display:grid;
    margin:auto;
    padding:0;
    margin-top: 2rem;
    grid-template-columns: repeat(4,6rem);
    grid-template-rows: minmax(7rem, auto) repeat(5,6rem);
    background: linear-gradient(to right, #00aacc,#005656);
    width:24rem;
    border: 1px solid black
    }


.span-two {
    grid-column: span 2;
}

.output {
    grid-column: 1 / -1;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    padding: 0.75rem;
    word-wrap:break-word;
    word-break: break-all;
}

.output .previous-operation {
  color: rgba(255,255,255,.5);
}
.output .current-operation {
    color: rgba(255,255,255,.5);
    font-size: 2.5rem;
  }
.calculator-grid > button {
    cursor: pointer;
    font-size: 2rem;
    border: 1px solid white;
    outline:none;
    background-color: rgba(255,255,255,.5);
    margin:0;
}

.calculator-grid > button:hover, .calculator-grid > button:focus {

    background-color: rgba(255,255,255,.9);
}
    */