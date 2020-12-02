
import React, { useContext, useRef, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"


export const AnimalForm = (props) => {

    const { addAnimal, animals, updateAnimal, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    const [animal, setAnimal] = useState({})

    const editMode = props.match.params.hasOwnProperty("animalId")


    const handleControlledInputChange = event => {
        const newAnimal = Object.assign({}, animal)
        newAnimal[event.target.name] = event.target.value
        setAnimal(newAnimal)
    }


    const getAnimalInEditMode = () => {
        if (editMode) {
            const animalId = parseInt(props.match.params.animalId)
            const selectedAnimal = animals.find(a => a.id === animalId) || {}
            setAnimal(selectedAnimal)
        }
    }


    const name = useRef(null)
    const location = useRef(null)
    const breed = useRef(null)
    const customer = useRef(null)


    useEffect(() => {
        getAnimals().then(getLocations).then(getCustomers)
    }, [])

    useEffect(() => {
        getAnimalInEditMode()
    }, [animals])


    const constructNewAnimal = () => {
        const locationId = parseInt(location.current.value)
        const customerId = parseInt(customer.current.value)
        const animalName = name.current.value

        if (locationId === 0 || customerId === 0 || name === "" || breed === "") {
            window.alert("Please select a location and customer and provide a name and breed")
        } else {
            if (editMode) {
                updateAnimal({
                    id: animal.id,
                    name: animal.name,
                    breed: animal.breed,
                    locationId: locationId,
                    treatment: animal.treatment,
                    customerId: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/animals"))
            } else {
                addAnimal({
                    name: name.current.value,
                    breed: breed.current.value,
                    locationId,
                    customerId
                })
                    .then(() => props.history.push("/animals"))
            }
        }
    }


    return (
        <form className="animalForm">
            <h2 className="animalForm__title">New Animal</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input type="text" id="animalName" ref={name} required autoFocus className="form-control"
                        placeholder="Animal name"
                        prototype="varchar"
                        defaultValue={animal.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal breed: </label>
                    <input type="text" id="animalBreed" ref={breed} required autoFocus className="form-control"
                        placeholder="Animal breed"
                        prototype="varchar"
                        defaultValue={animal.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select defaultValue="" name="location" ref={location} id="animalLocation" className="form-control"
                        prototype="int"
                        value={animal.locationId}
                        onChange={handleControlledInputChange}>

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
                    <label htmlFor="treatment">Treatments: </label>
                    <textarea type="text" name="treatment" className="form-control"
                        prototype="varchar"
                        value={animal.treatment}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="customer">Assign to Customer: </label>
                    <select defaultValue="" name="customer" ref={customer} id="animalCustomer" className="form-control"
                        prototype="int"
                        value={animal.customerId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a customer</option>
                        {customers.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewAnimal()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Appointment"}
            </button>
        </form>
    )
}