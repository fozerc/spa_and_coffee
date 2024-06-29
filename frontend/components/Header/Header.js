import axios from "axios";

export const Header = () => {
    return `
        <div>
            hello
        <div/>
    `
}

const employeesUrl = "http://localhost:8000/api/employee/"

axios.get(employeesUrl)
    .then((res) => {console.log(res)})
    .catch((err) => console.log(err))

const getEmployees = () => {
    return axios.get(employeesUrl).then( response => {
        let employees = response.data

        employees.forEach(employee => {
            console.log(employee.user)
        })
    }).catch(error => {
        console.log(error)
    })
}

getEmployees()
