export default function ButtonWithSVGIcon(props){
    function handleClick() {
        // eslint-disable-next-line react/prop-types
        if (props.name === "plus"){
            // eslint-disable-next-line react/prop-types
            //alert(props.maListe.length);
            // eslint-disable-next-line react/prop-types
            props.maListe.add()
        }
        else {
            alert('hahah');
        }
    }

    return (
        <>
            {/* eslint-disable-next-line react/prop-types */}
            <button onClick={handleClick} className={props.name}>
                {/* eslint-disable-next-line react/prop-types */}
                <img src={"/images/" + props.icon} />
            </button>
        </>
    );
}