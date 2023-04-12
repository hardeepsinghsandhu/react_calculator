import "./style.css"
import { useReducer } from "react";

function App() {

  function reducer(state,{type, payload}){
   switch(type){
    
    case 'add-digit':
      if(state.overwrite){
        return {
          ...state,
          currentOperand: payload,
          overwrite:false
        }
      }
      if(payload==='0' && state.currentOperand==='0') return state;
      if(state.currentOperand==null && payload==='.') 
      return {
        ...state,
        currentOperand:'0.'
      };
      if(payload==='.' && state.currentOperand.includes('.')) return state;
      return {
        ...state,
        currentOperand:`${state.currentOperand || ''}${payload}`
      }

    case 'clear':
        return {}

    case 'choose-operation':
        if(state.currentOperand== null && state.previousOperand==null) return state;  
        if(state.currentOperand == null)
          return {
            ...state,
            operation: payload
          }
        if(state.previousOperand == null){
          return {
            ...state,
            operation:payload,
            previousOperand: state.currentOperand,
            currentOperand:null
          }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload,
          currentOperand: null
        }
    
    case 'evaluate':
          if(
            state.operation==null ||
            state.currentOperand==null ||
            state.previousOperand==null
          ){
            return state;
          }  
          
          return {
            ...state,
            overwrite: true,
            previousOperand: null,
            operation: null,
            currentOperand: evaluate(state)
          }
          
    case 'delete-digit':
            if(state.overwrite){
              return{
                ...state,
                overwrite:false,
                currentOperand:null
              }
            }
            if(state.currentOperand == null){
              return state;
            }
            if(state.currentOperand.length === 1){
              return{
                ...state,
                currentOperand:null
              }
            }

            return {
              ...state,
              currentOperand: state.currentOperand.slice(0,-1)
            }
    
   } 
  }

  function evaluate({currentOperand,previousOperand,operation}){
    const prev=parseFloat(previousOperand);
    const current=parseFloat(currentOperand);
    if(isNaN(prev)||isNaN(current)) return '';
    let computation='';
    switch(operation){
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;        
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
    }
    let result = computation.toFixed(2)
    return result.toString();
  }
  
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{});

  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>      
      </div>
      <button className='span-two' onClick={()=>dispatch({type:'clear'})}>AC</button>
      <button onClick={()=>dispatch({type:'delete-digit'})}>DEL</button>
      <button onClick={()=>dispatch({type:'choose-operation',payload:'÷'})}>÷</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'1'})}>1</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'2'})}>2</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'3'})}>3</button>
      <button onClick={()=>dispatch({type:'choose-operation',payload:'*'})}>*</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'4'})}>4</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'5'})}>5</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'6'})}>6</button>
      <button onClick={()=>dispatch({type:'choose-operation',payload:'+'})}>+</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'7'})}>7</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'8'})}>8</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'9'})}>9</button>
      <button onClick={()=>dispatch({type:'choose-operation',payload:'-'})}>-</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'.'})}>.</button>
      <button onClick={()=>dispatch({type:'add-digit',payload:'0'})}>0</button>
      <button className='span-two' onClick={()=>dispatch({type:'evaluate'})}>=</button>
    </div>
  );
}

export default App;
