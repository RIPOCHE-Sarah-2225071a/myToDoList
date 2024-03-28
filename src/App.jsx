import {useRef, useState, useEffect } from 'react'
import './App.css'
import Item from "./Components/Item.jsx";
import 'react-calendar/dist/Calendar.css';

function App() {
    const [index, setIndex] = useState(0);
    let [maListe, setMaListe] = useState([])
    const inputs = useRef([]);

    useEffect(() => {
        const tachesEnregistrees = JSON.parse(localStorage.getItem('tache'));
        if (tachesEnregistrees) {
            setMaListe(tachesEnregistrees);
        }
    }, []);
    const ajouterInputs = el => {
        if (el && !inputs.current.includes(el)){
            inputs.current.push(el);
        }
    }

    const enleverInputs = () => {
        for (let i = 0; i<inputs.current.length; i++){
            inputs.current[i].value = "";
        }
    }

    const ajouterToDo = (e) => {
        e.preventDefault();
        setIndex(prevState => prevState + 1);
        let tache = {id:index, texte:inputs.current[1].value, fini:false, date:null}
        setMaListe([...maListe, tache]);
        enleverInputs();
        localStorage.setItem('tache', JSON.stringify(maListe));
    };

    const supprimerToDo = (tacheId) => {
        setMaListe(maListe.filter(tache => tache.id !== tacheId));
        localStorage.setItem('tache', JSON.stringify(maListe));
    };

    const modifierToDo = (tacheId, texte) => {
        setMaListe(maListe.map(tache => tache.id === tacheId ? {...tache, texte:texte} : tache));
        localStorage.setItem('tache', JSON.stringify(maListe))
    };

    const changerDate = (tacheId, date) => {
        setMaListe(maListe.map(tache => tache.id === tacheId ? {...tache, date:date} : tache));
        localStorage.setItem('tache', JSON.stringify(maListe))
    }

    const finirToDo = (tacheId) => {
        setMaListe(maListe.map(tache => tache.id === tacheId ? {...tache, fini:!tache.fini} : tache));
        localStorage.setItem('tache', JSON.stringify(maListe))
    };

    return (
        <>
            <h1>To Do List</h1>
            <p>{maListe.filter(tache => tache.fini === true).length} / {maListe.length} taches terminées</p>
            {/* Partie d'ajout de tache */}
            <form>
                <input ref={ajouterInputs} type="hidden" value={maListe.length}/>
                <input ref={ajouterInputs} type="text" placeholder="Entrez votre tache ici"/>
                <button onClick={ajouterToDo} className="plus">
                    <img src="images/plus-icon.svg" />
                </button>
            </form>
            {/* Partie visualisation de taches */}
            <ul>
                {maListe.map((tache, i) => (
                        <Item
                            key={i}
                            id={tache.id}
                            texte={tache.texte}
                            changementDate={changerDate}
                            date={tache.date}
                            supprimer={supprimerToDo}
                            modifier={modifierToDo}
                            finir={finirToDo}
                            fini={tache.fini}
                            calendrier={tache.calendrier}
                        />
                    ))}
            </ul>
        </>
    )
}


export default App
