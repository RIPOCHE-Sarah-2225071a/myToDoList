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
        props.onClick(props.id); // Transmet l'ID pour le supprimer
    }

    function modifierItem(e) {
        e.preventDefault();
        const newText = e.target.parentNode.parentNode.querySelector(".texte").value;
        const newDate = e.target.parentNode.parentNode.querySelector(".date").value;
        // eslint-disable-next-line react/prop-types
        props.onChange(props.id, newText, newDate); // Transmet l'ID et le texte a modifier
    }

    function finirItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.onConfirm(props.id, props.fini); // Transmet l'ID et le statut de la tache
    }

    function changerDate(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.changeDate(props.id);
        // eslint-disable-next-line react/prop-types
        props.calendrier(true);
    }

    return (
        <li>
            <form>
                {/* eslint-disable-next-line react/prop-types */}
                <input type="checkbox" defaultChecked={props.fini} onChange={finirItem}/>
                {/* eslint-disable-next-line react/prop-types */}
                <input className="texte" defaultValue={props.text}/>
                {/* eslint-disable-next-line react/prop-types */}
                <input type="date" className="date" defaultValue={props.date}/>
                <button onClick={afficherCalendrier}>
                    <img src="images/calendar-days-svgrepo-com.svg" alt="choisirDate"></img>
                </button>
                <button onClick={modifierItem}>
                    <img src="images/pencil-svgrepo-com.svg" alt="editer"></img>
                </button>
                {/* eslint-disable-next-line react/prop-types */}
                <button onClick={supprimerItem}>
                    <img src="images/red-trash-can-icon.svg" alt={"poubelle"}></img>
                </button>
                {calendrier && <Calendar className="calendar"></Calendar>}
            </form>
        </li>
    );
}