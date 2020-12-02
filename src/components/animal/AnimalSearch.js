
import React, { useContext } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"


export const AnimalSearch = props => {
    
    const { setTerms } = useContext(AnimalContext)

    return (
        <>
            Animal Search:
            <input type="text"
                className="imput--wide"
                onKeyUp={
                    (keyEvent) => setTerms(keyEvent.target.value)
                }
                placeholder="Search for an animal..." />
        </>
    )
}