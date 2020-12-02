
import React, { useState, useEffect } from "react"


export const AnimalContext = React.createContext()

export const AnimalProvider = (props) => {
    const [animals, setAnimals] = useState([])


    const getAnimals = () => {
        return fetch("http://localhost:8088/animals")
            .then(res => res.json())
            .then(setAnimals)
    }


    const addAnimal = animal => {
        return fetch("http://localhost:8088/animals", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        })
            .then(getAnimals)
    }

    const getAnimalById = id => {
        return fetch(`http://localhost:8088/animals/${id}?_expand=location&_expand=customer`)
            .then(res => res.json())
    }

    const releaseAnimal = id => {
        return fetch(`http://localhost:8088/animals/${id}`, {
            method: "DELETE", 
        })
            .then(res => res.json())
    }

    return (
        <AnimalContext.Provider value={{
            animals, addAnimal, getAnimals, getAnimalById, releaseAnimal
        }}>
            {props.children}
        </AnimalContext.Provider>
    )
}