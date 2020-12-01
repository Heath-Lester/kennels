
import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "./LocationProvider"
import { Location } from "./Location"
import "./Location.css"


export const LocationList = (props) => {
    // This state changes when `getLocations()` is invoked below
    const { locations, getLocations } = useContext(LocationContext)
    const { animals, getAnimals } = useContext(AnimalContext)
    const { employees, getEmployees } = useContext(EmployeeContext)
    /*
        What's the effect this is reponding to? Component was
        "mounted" to the DOM. React renders blank HTML first,
        then gets the data, then re-renders.
    */
    useEffect(() => {
        console.log("LocationList: Initial render before data")
        getLocations().then(getEmployees).then(getAnimals)
    }, [])

    /*
        This effect is solely for learning purposes. The effect
        it is responding to is that the location state changed.
    */
    useEffect(() => {
        console.log("LocationList: Location state changed")
        console.log(locations)
    }, [locations])

    return (
        <div className="locations">
            {
                locations.map(loc => {
                    loc.employees = employees.filter(e => e.locationId === loc.id)
                    loc.animals = animals.filter(a => a.locationId === loc.id)

                    return <article key={`location--${loc.id}`} className="card location" style={{ width: `18rem` }}>
                        <section className="card-body">
                            <Link className="card-body"
                                to={{
                                    pathname: `/locations/${loc.id}`,
                                    state: { chosenLocation: loc }
                                }}>
                                    <h2 className="card-title">{loc.name}</h2>
                                </Link>
                        </section>
                        <section>
                            {`${loc.employees.length} ${loc.employees.lenght === 1 ? "employee" : "employees"}`}
                        </section>
                        <section>
                            {`${loc.animals.length} ${loc.animals.lenght === 1 ? "animal" : "animals"}`}
                        </section>
                    </article>  
                })
            }
        </div>
    )
}