
import React, { useContext, useRef, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"


export const EmployeeForm = (props) => {

    const { addEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { animals, getAnimals } = useContext(AnimalContext)
    

    const name = useRef(null)
    const location = useRef(null)
    const animal = useRef(null)


    useEffect(() => {
        getAnimals().then(getLocations)
    }, [])


    const constructNewEmployee = () => {
        const locationId = parseInt(location.current.value)
        const animalId = parseInt(animal.current.value)
        const employeeName = name.current.value

        if (locationId === 0 || animalId === 0 || name === "") {
            window.alert("Please select a location and animal, and provide in a name")
        } else {
            addEmployee({
                name: name.current.value,
                locationId,
                animalId
            })
                .then(() => props.history.push("/employees"))
        }
    }


    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name: </label>
                    <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Caretaker for: </label>
                    <select defaultValue="" name="animal" ref={animal} id="employeeAnimal" className="form-control" >
                        <option value="0">Select an animal</option>
                        {animals.map(e => (
                            <option key={e.id} value="e.id">
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEmployee()
                }}
                className="btn btn-primary">
                Save Employee
            </button>

        </form>
    )
}