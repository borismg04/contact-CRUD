const express = require("express");
const res = require("express/lib/response");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token("body", function (req, res) {
  console.log(req.body);
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :body - :response-time ms'))
const port = 3001;

app.listen(port,()=>{
  console.log(`Server running at http://localhost:${port}/`);
});

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Jesus Osorio",
    number: "601-123456",
  },
  {
    id: 3,
    name: "Boris Monroy",
    number: "350-123456",
  },
  {
    id: 4,
    name: "Cristian Moreno",
    number: "640-123456",
  },
  {
    id: 5,
    name: "NN",
    number: "999-999999",
  },
];

app.use(express.json());

// Ejercicio 1.1:
//Get mostar personas (JSON)
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

// Ejercicio 1.2: backend de la agenda telefónica, paso 2 
//Fecha 
const getDate = ()=>{
  const today=new Date();
  return today
}
//Mostrar la hora
app.get("/info", (req, res) => {
  res.json(
    `Phonebbok has info for ${persons.length} people \n ${getDate()}`);
});

//Ejercico 1.3: 

app.get("/api/persons/:id" , (req,res)=>{
  const id = req.params.id;
  const personData = persons.find((personData)=>{
    return personData.id === Number(id);
  })

  if(!personData){
    res.status(404).json({Message:"404 Not Found"})
  }else{
    res.json(personData)
  }
});

/*Ejercicio 1.4: Delete

app.delete("/api/persons/:id", (res,req)=>{
  const id=req.params.id;
  const personData=persons.find((personData)=>{
    return personData.id === Number(id);
  })

  if(personData){
    res.status(404).json({Messaje:"Not Found"})
  }else{
    res.json(personData)
  }
});*/

// Ejercicio 1.5: 

app.post("/api/persons", (req,res)=>{
  const id = Math.random(Math.random()*1000)
  const newPerson= {...req.body ,id}
  persons.push(newPerson)
  res.status(201).json({Message:"Contact Agree"})
})

// Ejercicio 1.6:

app.post('/api/persons',(req, res)=>{
  const id = Math.round(Math.random()*10000)
  const {name , number} = req.body
  const repeatContact = persons.find((person)=>{
    return person.name === name 

  })
  if(repeatContact){
    res.status(400).json({Message: "Nombre repetido"})
  }
  
  console.log(repeatContact)
  if(name === undefined || name.length === 0){
    res.status(400).json({Message: "Nombre no valido"})
  }else if(number === undefined || number.length === 0){
    res.status(400).json({Message: "Numero no valido"})
  }
  else{
    const nuevaPersona = {...req.body, id}
    persons.push(nuevaPersona)
    res.status(201).json({Message: "Contacto agregado!"})
  }
})

app.listen(port,()=>{
  console.log('Se inicio el servidor');
})


