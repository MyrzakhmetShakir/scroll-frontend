import React, { useEffect, useState } from "react";
import Func from "./Func";
import axios from 'axios';



function Image() {

    const [select, setSelect] = useState('photo');
    const [query, setQuery] = useState('nature');
    const [value, setValue] = useState('');

    const [photoes, setPhotoes] = useState([]);
    const [screen, setScreen] = useState([]);

    const [ready, setReady] = useState(false);
    const [load, setLoad] = useState(true)
   
    useEffect(()=>{
        console.log(ready);
        if(ready) {
            for(let i=0; i<15; i++) {
                let random = Math.floor(Math.random()*201);
                setScreen((prev)=>{
                    return [...prev, photoes[random]]; })
                }
        }
        }, [ready])

        window.addEventListener('scroll', function kuka(event) { 
            if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight-1000)) {
                setReady(true)
            }  else {
               setTimeout(()=>{setReady(false)}, 2000); 
            }       
        })
 
   useEffect(()=>{
        let inp = {name: query, sel: select};
        setPhotoes([]);
        setScreen([]);
        setLoad(false)
        axios
            .post('https://scroll-api.onrender.com/post', inp)
            .then(response=>{
                setPhotoes([...response.data])
                for(let i=0; i<15; i++) {
                    let random = Math.floor(Math.random()*201);  
                    setScreen((prev)=>{
                        return [...new Set([...prev, response.data[random]])]}); 
                }
                setLoad(true)   
            })
            .catch(er=>{console.log(er);})
   }, [query, select]) 
    
    return <div className="main">
        
        <h1 id="text" className="header-text">Pixabay.com API - Infinite Scroll & SEARCH</h1>
        <p className="copyright">Infinite Scroll © Myrzakhmet</p>
        
        <div className="loader" id = "loader" hidden = {load}>
            <img src = "loader.svg"  alt = "loader"/>
        </div>

        <div className="photo-container">
            <Func
                s={select}
                q={query}
                v = {value}
                funcChange = {setValue}
                funcClick = {setQuery}
                funcSelect = {setSelect}
            />
            <a id = "arrow" href = "#text"><i id = "arrows" className="fa-solid fa-arrow-up"></i></a>
            {screen.map((photo, index)=>{
                return photo && <a id={photo.id} key={index} href={photo.pageURL} target="_blank" rel="noreferrer">
                <img src={photo.largeImageURL} alt={photo.tags} title={photo.tags}/>
                </a>
                
            })}
            
        </div>
        
    </div>
}

export default Image;   