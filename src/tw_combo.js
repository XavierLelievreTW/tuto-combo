import React from "react";
import './tw_combo.css';
import arbo_open from "./Images/arbo_open.png"

const TwComboRow = (props) => {

    const handleClickElement = (event) => {
        //event.preventDefault();
        console.log("clic 1");
        props.onClickElement(props.element);
    }

    return (
        <tr>
            <td className="tw_combo_row_td" onClick={handleClickElement}>
                <span>{props.element.value}</span>
            </td>
        </tr>
    );
}

const TwComboList = React.memo((props) => {

    const rows = [];
    props.list.forEach((element) => {
        rows.push(
            <TwComboRow 
                element={element}
                key={element.code}
                onClickElement={props.onClickElement}
            />
        );
    });

    return (
        <table className="tw_combo_list_table">
            {rows}
        </table>
    );
});

const TwComboLabel = (props) => {

    const handleClickList = (event) => {
        props.onClickList();
    }

    return (
        <div className="tw_combo_label_div" onClick={handleClickList}>
            <span className="tw_combo_label_span">{props.label}</span>
            <img src={arbo_open} alt="" className="tw_combo_label_img"/>
        </div>
    );
}

const initialValue = {
    element:{
        code:"",
        value:""
    },
    isListOpen:false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'selectElement':
            console.log("selectElement " + action.element.code);
            return {
                ...state,
                //[action.payload.key]: action.payload.value,
                element:action.element,
                isListOpen:false,
            };
        case 'setList':
            return {
                ...state,
                isListOpen:action.isListOpen
                //[action.payload.key]: action.payload.value,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
};

const TwCombo = (props) => {
    const ref = React.useRef();
    const [init,setInit] = React.useState(true);
    const [state, dispatch] = React.useReducer(reducer, initialValue);
    const onChange = props.onChange;
    const eltDefaut = props.defautElement;

    const handleInit = React.useCallback(() => {
        console.log("callback");
        if (init === false)
            return;
        console.log("callback2");
        if (onChange !== undefined) 
            onChange(eltDefaut);
        setInit(false);
        dispatch({
            type: 'selectElement',
            element:eltDefaut 
            });            
        console.log("callback3");
        },[init,eltDefaut,onChange]);

    React.useEffect(() => {
        handleInit();
    }, [handleInit]);

    React.useEffect(() => {
        const checkIfClickedOutside = e => {
          // If the liste is open and the clicked target is not within the liste,
          // then close the liste
          if (state.isListOpen && ref.current && !ref.current.contains(e.target)) {
            dispatch({
                type: 'setList',
                isListOpen:false
                });            
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside);
        }
      }, [state.isListOpen]) 

    const handleClickElement = (element) => {
        console.log("clic 11");
        if (onChange !== undefined) 
            onChange(element);
        dispatch({
            type: 'selectElement',
            element:element
            //payload: { key: element, value: element },
            });            
    }

    const handleClickList = () => {
        if (state.isListOpen === true)
            dispatch({
                type: 'setList',
                isListOpen:false
                });            
        else
            dispatch({
                type: 'setList',
                isListOpen:true
                });            
}

    const getListClassName = () => {
        let buffer = "tw_combo_div";
        if (state.isListOpen === false)
            buffer += " article_hide";
        return buffer;
    }

    return (
        <div style={props.style} className="tw_combo" ref={ref}>
            <TwComboLabel label={state.element.value} onClickList={handleClickList} />
            <div className={getListClassName()} style={props.style_list} >
                <TwComboList list={props.list} onClickElement={handleClickElement} />
            </div>
        </div>
    );
}

export default TwCombo;
