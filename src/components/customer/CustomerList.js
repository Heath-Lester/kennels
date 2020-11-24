
import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { Customer } from "./Customer"
import "./Customer.css"


export const CustomerList = () => {

    const { customers, getCustomers } = useContext(CustomerContext)


    useEffect(() => {
        console.log("CustomerList: Initial render before data")
        getCustomers()
    }, [])




    return (
        <div className="customers">
            {
                customers.map(cstmr => <Customer key={cstmr.id} customer={cstmr} />)
            }
        </div>
    )
}