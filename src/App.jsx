import {useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonWithSVGIcon from "./Components/ButtonWithSVGIcon.jsx";
import MyInput from "./Components/MyInput.jsx";
import Item from "./Components/Item.jsx";
import Calendar from 'react-calendar'

function App() {
    let [maListe, setMaListe] = useState([])
    const inputs = useRef([]);

    const addInputs = el => {
        if (el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const ajouterToDo = (e) => {
        e.preventDefault();
        setMaListe([...maListe, {id:inputs.current[0].value, name:inputs.current[1].value, fini:false}]);
        console.log(maListe);
        clearInputs();
    };

    const clearInputs = () => {
        for (let i = 0; i<inputs.current.length; i++){
            inputs.current[i].value = "";
        }
    }

    const supprimerToDo = (tacheId) => {
        setMaListe(maListe.filter(tache => tache.id !== tacheId));
    };

    const modifierToDo = (tacheId, texte) => {
        setMaListe(maListe.map(tache => tache.id === tacheId ? {id:tacheId, name:texte, fini:tache.fini} : tache));
    };

    const confirmerToDo = () => {
        alert('la tache est finie');
    };

    function handleClick() {
        //alert(maListe.length);
    }


    return (
        <>
            <h1>To Do List</h1>
            {/* TODO : Ajouter le x/y taches terminées */}
            {/* Partie d'ajout de tache */}
            <form action="submit" onSubmit={ajouterToDo}>
                <input ref={addInputs} type="hidden" value={maListe.length}/>
                <input ref={addInputs} type="text" placeholder="Entrez votre tache ici"/>

                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={handleClick} className="plus">
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src={"/images/plus_icon"} />
                </button>
            </form>
            {/* Partie visualisation de taches */}
            <ul>
                {maListe.map((tache, i) => (
                    <Item
                        key={i}
                        id={tache.id}
                        name={tache.name}
                        onClick={supprimerToDo}
                        onChange={modifierToDo}
                    />
                ))}
            </ul>
            {/*<Calendar />*/}

        </>
    )
}


export default App
