import {useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonWithSVGIcon from "./Components/ButtonWithSVGIcon.jsx";
import MyInput from "./Components/MyInput.jsx";
import Item from "./Components/Item.jsx";
import Calendar from 'react-calendar'

function App() {
    //localStorage.removeItem('tache')
   /* let [maListe, setMaListe] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("maListe");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });*/
    let [maListe, setMaListe] = useState([])
    const inputs = useRef([]);

    const addInputs = el => {
        if (el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const ajouterToDo = (e) => {
        e.preventDefault();
        let tache = {id:inputs.current[0].value, text:inputs.current[1].value, fini:false}
        setMaListe([...maListe, tache]);
        clearInputs();
        localStorage.setItem('tache', JSON.stringify([...maListe, tache]));
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
        console.log(texte)
        setMaListe(maListe.map(tache => tache.id === tacheId ? {...tache, text:texte} : tache));
        console.log(maListe)
        localStorage.setItem('tache', JSON.stringify(maListe))
    };

    const finirToDo = (tacheId) => {
        setMaListe(maListe.map(tache => tache.id === tacheId ? {...tache, fini:!tache.fini} : tache));
        localStorage.setItem('tache', JSON.stringify(maListe))
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tache'));
        if (storedTasks) {
            setMaListe(storedTasks);
        }
    }, []);

    function handleClick() {
        //alert(maListe.length);
    }


    return (
        <>
            { /* TODO : Ajouter le local storage */}
            { /* TODO : Ajouter le calendrier */}
            { /* TODO : Ajouter les beaux SVG */}
            <h1>To Do List</h1>
            <p>{maListe.filter(tache => tache.fini === true).length} / {maListe.length} taches terminées</p>
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
                        text={tache.text}
                        onClick={supprimerToDo}
                        onChange={modifierToDo}
                        onConfirm={finirToDo}
                        fini={tache.fini}
                    />
                ))}
            </ul>
            {/*<Calendar />*/}
        </>
    )
}


export default App
