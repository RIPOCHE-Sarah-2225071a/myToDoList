import Calendar from "react-calendar";
import {useState} from "react";

export default function Item(props) {

    const [calendrier, setCalendrier] = useState(false);

    const afficherCalendrier = (e) => {
        e.preventDefault();
        setCalendrier(prevState => !prevState);
    }

    function supprimerItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.supprimer(props.id); // Transmet l'ID pour le supprimer
    }

    function modifierItem(e) {
        e.preventDefault();
        const nouveauTexte = e.target.parentNode.parentNode.querySelector(".texte").value;
        // eslint-disable-next-line react/prop-types
        props.modifier(props.id, nouveauTexte); // Transmet l'ID et le texte a modifier
    }

    function finirItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.finir(props.id, props.fini); // Transmet l'ID et le statut de la tache
    }

    function changerDate(date) {
        // eslint-disable-next-line react/prop-types
        props.changementDate(props.id, date.toLocaleDateString());
        setCalendrier(false);
    }

    return (
        <li>
            <form onSubmit={modifierItem}> {/* Permet d'enregistrer les modifications meme si on clique pas sur le crayon */}
                {/* eslint-disable-next-line react/prop-types */}
                <input type="checkbox" defaultChecked={props.fini} onChange={finirItem}/>
                {/* eslint-disable-next-line react/prop-types */}
                <input className="texte" defaultValue={props.texte}/>
                {/* eslint-disable-next-line react/prop-types */}
                <p className="date">{props.date}</p>
                <button onClick={afficherCalendrier}>
                    <img src="images/calendar-days-svgrepo-com.svg" alt="choisirDate"></img>
                </button>
                <button type={"submit"} onClick={modifierItem}>
                    <img src="images/pencil-svgrepo-com.svg" alt="modifier"></img>
                </button>
                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={supprimerItem}>
                    <img src="images/red-trash-can-icon.svg" alt={"poubelle"}></img>
                </button>
                {/* eslint-disable-next-line react/prop-types */}
                {calendrier && <Calendar className="calendrier"  defaultValue={props.date} onChange={changerDate}></Calendar>}
            </form>
        </li>
    );
}