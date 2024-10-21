import * as React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import './test.css';
import { BsFileMedical } from "react-icons/bs";
import { TbVaccine } from "react-icons/tb";
import { MdOutlineBiotech } from "react-icons/md";
import Vet_1 from "../../media/doctores/vet_1.JPG";
import Free1 from "../../media/freeMedia/5.png";



const Test = () => {
    const [move, setMove] = React.useState(false);
    const [move2, setMove2] = React.useState(false);
    const [move3, setMove3] = React.useState(false);

    const handleMouseToggle = (isEnter) => setMove(isEnter);
    const handleMouseToggle2 = (isEnter) => setMove2(isEnter);
    const handleMouseToggle3 = (isEnter) => setMove3(isEnter);

    return (
        <div className="example-container">
            <img src={Free1} style={{height:500, borderRadius:0, border:"0px solid white", userSelect:"none"}}></img>

            <motion.div
                style={{ position: 'absolute', bottom: 40, left: 40, grid: "1fr 1fr / 1fr", width:190, height:230, alignContent: "center", justifyItems: "center"}}
                animate={{ scale: move ? 1.2 : 1 }}
                onClick={() => setMove(!move)}
                onMouseEnter={() => handleMouseToggle(true)}
                onMouseLeave={() => handleMouseToggle(false)}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
                <p className='titleMini' style={{width:190, textAlign:'center'}}>Tecnología <br></br>de punta</p>
                <MdOutlineBiotech style={{color: "white", fontSize: "6em"}}></MdOutlineBiotech>
            </motion.div>
            <motion.div
                style={{ position: 'absolute', bottom: 30, right: 30, grid: '1fr /  60% 40%', height: 90, width: 210, alignContent: "center", justifyItems: "center" }}
                animate={{ scale: move2 ? 1.2 : 1 }}
                onClick={() => setMove2(!move2)}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                onMouseEnter={() => handleMouseToggle2(true)}
                onMouseLeave={() => handleMouseToggle2(false)}
            >
                <p className='titleMini'>Consulta General</p>
                <BsFileMedical style={{color: "white", fontSize: "2.5em", gridColumn:2}}/>

            </motion.div>
            <motion.div
                style={{ position: 'absolute', top: 20, right: 50, height: 170, width: 170, grid: "1fr 1fr / 1fr", alignContent: "center", justifyItems: "center" }}
                animate={{ scale: move3 ? 1.2 : 1 }}
                onClick={() => setMove3(!move3)}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                onMouseEnter={() => handleMouseToggle3(true)}
                onMouseLeave={() => handleMouseToggle3(false)}
            >
                <p className='titleMini'>Servicio de vacunacion</p>
                <TbVaccine style={{color: "white", fontSize: "3.5em", gridColumn:1}}></TbVaccine>
            </motion.div>
        </div>
    );
};

export default Test;