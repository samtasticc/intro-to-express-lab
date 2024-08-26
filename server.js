const express = require('express')
const app = express()

// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.

app.get('/', (req, res) => {
    res.send('Hey there.')
    // console.log('testing')
})

app.get('/greetings/Delilah', (req, res) => {
    res.send('Hey there, Delilah.')
    console.log('testing')
})

// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
// the colon ':' allows you to enter items in the browser
app.get('/roll/:itemNumber', (req, res) => {
    const itemNumber = req.params.itemNumber
    // if statement before the response. 
    if (isNaN(itemNumber) || itemNumber <= 0) {
        // handle error
        res.status(400).send(`You must specify a number.`)
    } else {
        res.send(`You rolled a ${itemNumber}`)
    }    
})



// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.
app.get('/collectibles/:index', (req, res) => {
    const collectibles = [
        {name: 'shiny ball', price: 5.95 },
        {name: 'autographed picture of a dog', price: 10 },
        {name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99}
    ];
    const index = Number(req.params.index)
    const collectible = collectibles[index];
    if (isNaN(index) || index < 0 || index >= collectibles.length)  {
        res.send(`This item is not yet in stock. Check back soon.`)
    } else {
        res.send(`So you want the ${collectible.name}? For ${collectible.price} it can be yours!`)
    }
}) 

// 4. Filter Shoes by Query Parameters
// Task: Create a route /shoes that filters the list of shoes based on query parameters.
app.get('/shoes', (req, res) => {
    const shoes = [
        {name: 'Birkenstocks', price: 50, type: 'sandal'},
        {name: 'Air Jordans', price: 500, type: 'sneaker'},
        {name: 'Air Mahomeses', price: 501, type: 'sneaker'},
        {name: 'Utility Boots', price: 20, type: 'boot'},
        {name: 'Velcro Sandals', price: 15, type: 'sandal'},
        {name: 'Jet Boots', price: 1000, type: 'boot'},
        {name: 'Fifty-Inch Heels', price: 175, type: 'heel'},
    ]
    const minPrice = req.query.minprice 
    const maxPrice = req.query.maxprice
    // const type = req.query.shoes.type
    // const noParams = req.query.shoes
    // const filter = req.query.filter
    // console.log(filter)
    if (minPrice) {
        // whatever filter logic to exclude all shoes below this price
        const filtered = shoes.filter((shoe) => {
            return shoe.price >= minPrice
        }) 
        res.send(filtered)
        return;
    }

    if (maxPrice) {
        const filtered = shoes.filter((shoe) => {
            return shoe.price <= maxPrice
        })
        res.send(filtered)
        return;
    }
    res.send(shoes)
    
// min-price: Excludes shoes below this price.
// max-price: Excludes shoes above this price.
// type: Shows only shoes of the specified type.
// No parameters: Responds with the full list of shoes.

})
// you need this for the local host to work!! it has to be on the bottom.
app.listen(3000, () => {
    console.log('Listening on port 3000')
})


