
import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = () => {

    const { animals, getAnimals } = useContext(AnimalContext)

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getAnimals()

    }, [])

    return (
        <div className="animals">
            {
                animals.map(anml => <Animal key={anml.id} animal={anml} />)
            }
        </div>
    )
}