// axios.get('http://localhost:8000/api/coffee-products/')
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err))

axios.post('http://localhost:8000/api/coffee-products/', {
    name: "js test",
    description: "adasdasdas",
    price: 12,
    category: 4
})
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

