export default function Item(props) {

    function supprimerItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.onClick(props.id); // Transmet l'ID pour le supprimer
    }

    function modifierItem(e) {
        e.preventDefault();
        // eslint-disable-next-line react/prop-types
        props.onChange(props.id, props.name); // Transmet l'ID et le texte a modifier
    }

    return (
        <li>
            <form onSubmit={supprimerItem} onChange={modifierItem}>
                {/* eslint-disable-next-line react/prop-types */}
                <input type="checkbox" value={props.fini}/>
                {/* eslint-disable-next-line react/prop-types */}
                <input value={props.name} />
                {/* eslint-disable-next-line react/prop-types */}
                <button>X</button>
            </form>
        </li>
    );
}