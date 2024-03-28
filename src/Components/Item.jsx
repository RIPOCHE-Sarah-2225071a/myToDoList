export default function Item(props) {

    function supprimerItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.onClick(props.id); // Transmet l'ID pour le supprimer
    }

    function modifierItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        alert(props.text)
        props.onChange(props.id, props.text); // Transmet l'ID et le texte a modifier
    }

    function finirItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.onConfirm(props.id, props.fini); // Transmet l'ID et le statut de la tache
    }

    return (
        <li>
            <form onSubmit={supprimerItem}>
                {/* eslint-disable-next-line react/prop-types */}
                <input type="checkbox" defaultChecked={props.fini} onChange={finirItem}/>
                {/* eslint-disable-next-line react/prop-types */}
                <input defaultValue={props.text} onChange={modifierItem}/>
                {/* eslint-disable-next-line react/prop-types */}
                <button>X</button>
            </form>
        </li>
    );
}