import {useRef, useState, useEffect, useId } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ButtonWithSVGIcon from "./Components/ButtonWithSVGIcon.jsx";
import MyInput from "./Components/MyInput.jsx";
import Item from "./Components/Item.jsx";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function App() {
    //localStorage.removeItem('tache')
   /* let [maListe, setMaListe] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("maListe");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });*/
    const [index, setIndex] = useState(0);
    let [maListe, setMaListe] = useState([])
    const inputs = useRef([]);
    const [calendrier, setCalendrier] = useState(true);

    const addInputs = el => {
        if (el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const ajouterToDo = (e) => {
        e.preventDefault();
        setIndex(prevState => prevState + 1);
        let tache = {id:index, text:inputs.current[1].value, fini:false, date:null}
        setMaListe([...maListe, tache]);
        clearInputs();
        localStorage.setItem('tache', JSON.stringify(maListe));
    };

    const clearInputs = () => {
        for (let i = 0; i<inputs.current.length; i++){
            inputs.current[i].value = "";
        }
    }

    const supprimerToDo = (tacheId) => {
        setMaListe(maListe.filter(tache => tache.id !== tacheId));
        localStorage.setItem('tache', JSON.stringify(maListe));
    };

    const modifierToDo = (tacheId, texte, date) => {
        console.log(texte)
        setMaListe(maListe.map(tache => tache.id === tacheId ? {id:tache.id, text:texte, fini:tache.fini, date:date} : tache));
        console.log(maListe.map(tache => tache.id === tacheId ? {id:tache.id, text:texte, fini:tache.fini, date:date} : tache));
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

    return (
        <>
            { /* TODO : Ajouter le calendrier */}
            { /* TODO : Regler le pb d'id */}
            <h1>To Do List</h1>
            <p>{maListe.filter(tache => tache.fini === true).length} / {maListe.length} taches terminées</p>
            {/* Partie d'ajout de tache */}
            <form>
                <input ref={addInputs} type="hidden" value={maListe.length}/>
                <input ref={addInputs} type="text" placeholder="Entrez votre tache ici"/>
                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={ajouterToDo} className="plus">
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src="images/plus-icon.svg" />
                </button>
            </form>
            {/* Partie visualisation de taches */}
            <ul>
                {maListe.map((tache, i) => (
                        <li>
                        <Item
                            key={i}
                            id={tache.id}
                            text={tache.text}
                            date={tache.date}
                            onClick={supprimerToDo}
                            onChange={modifierToDo}
                            onConfirm={finirToDo}
                            fini={tache.fini}
                            calendrier={tache.calendrier}
                        />
                        </li>
                    ))}
            </ul>
        </>
    )
}


export default App
