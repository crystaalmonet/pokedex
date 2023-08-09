import React from "react";
import Card from "./Card";
import PokeInfo from "./PokeInfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Main=() => {
    const [callPokemon,setPokemon] = useState([])
    const [loading,setLoading] = useState(true);
    const [url,setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]= useState ();
    const [prevUrl,setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();


    const pokeCall = async() => {
        setLoading(true)
        const res=await axios.get(url);
        // console.log(res)
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    }

    const getPokemon=async(res)=>{
        res.map(async(item) => {
            // console.log(item.url)
            const result=await axios.get(item.url);
            console.log(result.data)
            setPokemon(state => {
                state=[...state,result.data]
                state.sort((a,b)=>a.id>b.id?1:-1)
                return state;
                console.log(callPokemon)
           } )

        })
    }

    useEffect(() => {
        pokeCall();
    },[url])
    return(
        <>
        <div className="container">
            <div className="left-content">
                <Card pokemon={callPokemon} loading={loading} infoPokemon={poke=>setPokeDex(poke)}/>

                <div className="btn-group">
                {prevUrl && <button onClick={()=>{
                    setPokemon([])
                    setUrl(prevUrl)
                }}>Previous</button>}

                {nextUrl && <button onClick={()=>{
                    setPokemon([])
                    setUrl(nextUrl)
                }}>Next</button>}
            </div>
            </div>
            <div className="right-content">
                <h1 className="right-title">Gotta Catch Em All!</h1>
            <PokeInfo data={pokeDex}/>
            </div>
        </div>
        </>
    )
}
export default Main;