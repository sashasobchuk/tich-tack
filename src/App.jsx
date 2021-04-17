import React, {useRef, useState} from 'react';
import './App.css'


const Modal =(props)=>{
    return (
        <div className='modal' style={{display:props.modal[0]}}>
        <h1>  {props.modal[1]}</h1>
            <input type="button" onClick={()=>{props.setModal([ ['none'],[]])}} value='наступна гра'/>
    </div>)
}
const App = () => {

    let [state, setState] = useState(Array(9).fill(null))
    let [n, setN] = useState(0)
    let [name1, setName1] = useState('name1')
    let [name2, setName2] = useState('name2')
    let [firstDisplay, setFirstDisplay] = useState(true)
    let [score,setScore]=useState([0,0])
    let [modal,setModal] = useState(['none','нічия'])


    const winCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    const isWiner = setTimeout(()=>{
        /** checking on no_winer */
        function isSeted(element, index, array) {
            return element !== null;
        }
        // console.log(state)
        if (state.every(  isSeted )){
            setState(Array(9).fill(null));setN(0)
            setModal(['block','нічия'])
            return
        }
            /** cheking on winner */
        for (let i =0;i<winCombination.length;i++){
            const [a, b, c] = winCombination[i];
            if( state[a] && state[a] === state[b] && state[a] === state[c]){
                (n % 2 === 0)
                ? setScore([[Number(score[0])+Number(1)],score[1]])
                : setScore([score[0],[Number(score[1])+Number(1)]])
                console.log('win')
                setModal(['block',` виграв ${n % 2 === 0 ? name1: name2}`])

                setState(Array(9).fill(null));setN(0)
                break
            }else{}
        }
    },10)

    const  clickHandler=(index)=> {
       if(state[index] ===null) {
           let newState = [...state];
           newState[index] = (n % 2 === 0) ? "x" : "o"
           setState(newState)
           setN(n + 1)
           setTimeout(()=> isWiner,100)
       }else { }
    }
    if(firstDisplay){
        let nextHandler =()=>{
            setFirstDisplay(false)
        }
        let changeNameHandler1 =(e)=>{
            setName1(e.currentTarget.value)
        }
        let changeNameHandler2 =(e)=>{
            setName2(e.currentTarget.value)
        }
        return (<div className='firstDisplay'>
               <h1> names: </h1>
            <input type="text" placeholder='name1' value={name1} onChange={changeNameHandler1}/><br/>
            <input type="text" placeholder='name2' value={name2} onChange={changeNameHandler2}/><br/>
            <input type="button" value='next' onClick={ nextHandler}/>

        </div>)
    }
    return (
        <div className='fullPage'>

            <div className='game'>
                {state.map((item,index)=>(
                    <div onClick={()=>{clickHandler(index)}} key={index} className='item'><span> {state[index]}</span>  </div>))}
            </div>

            <div className="count"> score:
                <div> {name1} : {score[0]/2} </div>
                <div> {name2} : {score[1]/2} </div>
            </div>
            <Modal modal={modal} setModal={setModal.bind(this)}/>

        </div>
    );
};

export default App;
