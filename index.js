const express = require('express');
const joi = require('joi');
const app = express();
const Port = process.env.PORT || 3000

const books =[
    {title:"harry Poter",id:1},
    {title:"Rich Dad Poor Dad",id:2},
    {title:"Think Like a Monk",id:3},
    {title:"Who will Cry when you die",id:4},
]
app.get('/',(req,res)=>{
        res.send("<h1>Hello World This is a Simple Test api</h1>");
});

app.get("/api/books",(req,res)=>{
    res.send(books);
})

app.get("/api/books/:id",(req,res)=>{
const book = books.find(c =>c.id === parseInt(req.params.id));
if(!book)res.status(404).send("<h1>Opps ! Can't Find What you search </h1>");
res.send(book);
})

app.post("/api/books",(req,res)=>{
   const {error} = validateBook(req.body);
   if(error){
    res.status(400).send(error.details[0].message);

   return;
   }

   const book = {
        id:books.length + 1,
        title:req.body.title,

    };
    books.push(book);
    res.send(book)
});

app.put("/api/books/:id",(req,res)=>{
    const book = books.find(c =>c.id === parseInt(req.params.id));
    if(!book) res.status(404).send("<h1>Opps ! Can't Find What you search </h1>");

    const {error} = validateBook(req.body);
    if(error){
      res.status(400).send(error.details[0].message);

     return;
    }

    book.title = req.body.title;
    res.send(book)

});

//app.delete('/api/books')

app.listen(Port,()=>{
    console.log("Server is listening at Port 3000")
})