
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Kennel.css"
// import { Animal } from "./animal/Animal"
// import { AnimalProvider } from "./animal/AnimalProvider"
// import { AnimalList } from "./animal/AnimalList"
import "./animal/Animal.css"
// import { Employee } from "./employee/Employee"
// import { EmployeeProvider } from "./employee/EmployeeProvider"
// import { EmployeeList } from "./employee/EmployeeList"
import "./employee/Employee.css"
// import { Location } from "./location/Location"
// import { LocationProvider } from "./location/LocationProvider"
// import { LocationList } from "./location/LocationList"
import "./location/Location.css"
// import { Customer } from "./customer/Customer"
// import { CustomerProvider } from "./customer/CustomerProvider"
// import { CustomerList } from "./customer/CustomerList"
import "./customer/Customer.css"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"


export const Kennel = () => (
    <>
        <Route render ={ () => {
            if (localStorage.getItem("kennel_customer")) {
                return (
                    <>
                    <Route render={props => <NavBar {...props} />} />
                    <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)



{/* <NavBar />
<ApplicationViews /> */}



{/* <h2>Nashville Kennels</h2>
    <small>Loving care when you're not there.</small>
    <address>
        <div>Visit Us at the Nashville North Location</div>
        <div>500 Puppy Way</div>
    </address>

    <h2>Animals</h2>
    <article className="animals">
    <AnimalProvider>
        <AnimalList />
    </AnimalProvider>
    </article>

    <h2>Employees</h2>
    <article className="employees">
    <EmployeeProvider>
        <EmployeeList />
    </EmployeeProvider>
    </article>

    <h2>Locations</h2>
    <LocationProvider>
        <LocationList />
    </LocationProvider>

    <h2>Customers</h2>
    <article className="customers">
    <CustomerProvider>
        <CustomerList />
    </CustomerProvider>
    </article> */}



    {/* <h2>Locations</h2>
    <article className="locations">
        <Location />
        <Location />
    </article> */}