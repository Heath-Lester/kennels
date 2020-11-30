
import React, { useContext, useEffect } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import { Employee } from "./Employee"
import "./Employee.css"

export const EmployeeList = (props) => {

    const { employees, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    useEffect(() => {
        console.log("EmployeeList: Initial render before data")
        getLocations()
            .then(getEmployees)

    }, [])

    return (
        <div className="employees">
            <h1 className="employees">Employees</h1>
            <button onClick={() => props.history.push("/employees/create")}>
                Add Employee
            </button>
            <article className="employeeList">

            {
                employees.map(emp => {
                    const clinic = locations.find(c => c.id === emp.locationId)
                    
                    return <Employee 
                        key={emp.id} 
                        location={clinic} 
                        employee={emp} />
                })
            }
            </article>
        </div>
    )
}