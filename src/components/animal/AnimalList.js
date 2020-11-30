
import React, { useContext, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalContext } from "./AnimalProvider"
import { Animal } from "./Animal"
import "./Animal.css"

export const AnimalList = (props) => {

    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getLocations()
            .then(getCustomers)
            .then(getAnimals)

    }, [])

    return (
        <div className="animals">
            <h1 className="employees">Animals</h1>
            <button onClick={() => props.history.push("/animals/create")}>
                Add Animal
            </button>
            <article className="animalList">
            {
                animals.map(anml => {
                    const owner = customers.find(c => c.id === anml.customerId)
                    const clinic = locations.find(l => l.id === anml.locationId)
                    
                    return <Animal key={anml.id}
                    location={clinic}
                    customer={owner}
                    animal={anml} />
                })
            }
            </article>
        </div>
    )
}