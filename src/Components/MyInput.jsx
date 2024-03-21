import ButtonWithSVGIcon from "./ButtonWithSVGIcon.jsx";

export default function MyInput(props){
    return (
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <input type={props.type} placeholder="Entrez votre tache ici"/>
        </>
    );
}