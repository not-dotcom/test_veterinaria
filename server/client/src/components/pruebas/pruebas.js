import React, { useState, useEffect } from 'react';
import './pruebas.css';

function Pruebas() {
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState('fade show');

    const handleToggleDivs = () => {
        setFadeClass('fade'); // Start fade out
        setTimeout(() => {
            setVisibleIndex(prevIndex => (prevIndex + 1) % 3);
            setFadeClass('fade show'); // Start fade in
        }, 200); // Match the duration of the CSS transition
    };

    return (
        <div className='mainGrid'>
            <button
                style={{ backgroundColor: "cyan", color: "black", borderRadius: "29px" }}
                onClick={handleToggleDivs}
            >
                Desplazar
            </button>
            {visibleIndex === 0 && <div className={`container1 ${fadeClass}`} id='1'>Primero</div>}
            {visibleIndex === 1 && <div className={`container2 ${fadeClass}`} id='2'>Segundo</div>}
            {visibleIndex === 2 && <div className={`container3 ${fadeClass}`} id='3'>Tercero</div>}
        </div>
    );
}

export default Pruebas;