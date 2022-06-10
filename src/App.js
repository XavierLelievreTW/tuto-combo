import React from "react";
import './App.css';
import TwCombo from './tw_combo';

const LIST_ELEMENT = [
  {code: 'CODE1', value: 'Value 1'},
  {code: 'CODE2', value: 'Value 2'},
  {code: 'CODE3', value: 'Value 3'},
  {code: 'CODE4', value: 'Value 4'},
  {code: 'CODE5', value: 'Value 5'}
];

function App() {
  
  const [getElement, setElement] = React.useState({code: '', value: ''});

  const handleStatusChange = (element) => {
    console.log("1-"+element.value);
    setElement(element);
  }

  return (
    <div className="App">
      <span>{getElement.value}</span>
      <TwCombo
        style={{ left:"70px", top:"90px", width:"180px", position:"absolute" }} 
        style_list={{ width:"190px", height:"200px" }} 
        list={LIST_ELEMENT} onChange={handleStatusChange}
        defautElement={LIST_ELEMENT[1]}
        />
    </div>
  );
}

export default App;
