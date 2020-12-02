
import React, { useState, useEffect } from "react"


export const EmployeeContext = React.createContext()

export const EmployeeProvider = (props) => {
    const [employees, setEmployees] = useState([])


    const getEmployees = () => {
        return fetch("http://localhost:8088/employees")
            .then(res => res.json())
            .then(setEmployees)
    }


    const addEmployee = employee => {
        return fetch("http://localhost:8088/employees", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(getEmployees)
    }


    const removeEmployee = employeeId => {
        return fetch(`http://localhost:8088/employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
    }


    return (
        <EmployeeContext.Provider value={{
            employees, addEmployee, getEmployees, removeEmployee
        }}>
            {props.children}
        </EmployeeContext.Provider>
    )
}