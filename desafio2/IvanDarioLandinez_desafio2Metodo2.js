const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:admin123@cluster0-hl2jl.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

client.connect()
.then(function (result){
    let coleccion = result.db("sample_mflix").collection("users");
    coleccion.find().limit(1).toArray()
    .then((resolve)=>{
        console.log(resolve)
    })
    .catch((x)=>{
        console.log(chalk.red(x))
    })
    return coleccion;
})
.then(function (result){
    const newUser = {
        _id: "59b99db4cfa9a34dcd7885f9f9f9",
        name: "Ivan Stark",
        email: "ivan@stark.com",
        password: "putobrand"
    }
    result.insertOne(newUser)
    .then(()=>{
        console.log("Usuario se ingreso correctamente")
    })
    .catch((err)=>{
        console.log(chalk.red(err))
    })
    return result;
})
.then(function (result){
    result.updateOne({name: "Ivan Stark"}, {$set: {email: "Stark@gmail.com"}})
    .then(function (result){
        console.log(chalk.yellow("Usuario actualizado correctamente"));
    })
    .catch((err)=>{
        console.log(chalk.red(err))
    })
    return result;
})
.then(function (result){
    result.deleteOne({name: "Ivan Stark"})
    .then(function (result){
        console.log(chalk.yellow("Usuario eliminado correctamente"));
        client.close();
    })
    .catch((err)=>{
        console.log(chalk.red(err))
    })
})
.catch((err)=>{
    console.log(chalk.red(err));
});