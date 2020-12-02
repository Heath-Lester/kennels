
import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalContext } from "./AnimalProvider"
import Animal from "./Animal"
import "./Animal.css"

export const AnimalList = ({ history }) => {

    const { animals, getAnimals } = useContext(AnimalContext)
    // const { locations, getLocations } = useContext(LocationContext)
    // const { customers, getCustomers } = useContext(CustomerContext)

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getAnimals()
            // .then(getCustomers)
            // .then(getLocations)

    }, [])

    return (
        <div className="animals">
            <h1 className="animals__title">Animals</h1>

            <button onClick={() => history.push("/animals/create")}>
                Make Reservation
            </button>

            <article className="animalList">
                {
                    animals.map(anml => {
                        // const owner = customers.find(c => c.id === anml.customerId)
                        // const clinic = locations.find(l => l.id === anml.locationId)

                        return <Animal key={anml.id}
                            // location={clinic}
                            // customer={owner}
                            animal={anml} />
                    })
                }
            </article>
        </div>
    )
}