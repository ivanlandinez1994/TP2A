const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:admin123@cluster0-hl2jl.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

function connectToBD(nameBd, colection){
    return new Promise((resolve,reject)=>{
        client.connect()
        .then(function(result){
            let coleccion = result.db(nameBd).collection(colection);
            resolve(coleccion);
        })
        .catch((err)=>{
            reject(err);
        })
    })
}

async function printBd(nameBd, colectionPrint, cantRegistros){
    let coleccion = await connectToBD(nameBd, colectionPrint)
    coleccion.find().limit(cantRegistros).toArray()
    .then((result)=>{
        console.log(result);
        client.close();
    })
    .catch((err)=>{
        console.log(err);
        client.close();
    })
}

function printRegistros(){
    printBd("sample_mflix","users",1)
}

async function asyncInsert(nameBd, colectionPrint){
    let coleccion = await connectToBD(nameBd, colectionPrint)
    const newUser = {
        _id: "59b99db4cfa9a34dcd7885f9f9f9",
        name: "Ivan Stark",
        email: "ivan@stark.com",
        password: "putobrand"
    }
    coleccion.insertOne(newUser)
    .then(function(){
        console.log("Usuario se ingreso correctamente")
        client.close()
    })
    .catch((err)=>{
        console.log(chalk.red(err))
        client.close()
    })
}

async function asyncEdit(nameBd, colectionPrint){
    let coleccion = await connectToBD(nameBd, colectionPrint);
    coleccion.updateOne({name: "Ivan Stark"}, {$set: {email: "Stark@gmail.com"}})
    .then(function(){
        console.log("Usuario se actualizo correctamente")
        client.close()
    })
    .catch((err)=>{
        console.log(chalk.red(err))
        client.close()
    })
}

async function asyncDelete(nameBd, colectionPrint){
    let lista = await connectToBD(nameBd, colectionPrint);
    lista.deleteOne({name: "Ivan Stark"})
    .then(function(){
        console.log("Usuario se elimino correctamente");
        client.close();
    })
    .catch((err)=>{
        console.log(chalk.red(err))
        client.close();
    })
}

//-----------Llamadores de funciones, Descomentar la que se quiera ejecutar antes de ejecutar--------------//
//printRegistros("sample_mflix", "users")
//asyncInsert("sample_desafio2", "users")
//asyncEdit("sample_mflix", "users")
//asyncDelete("sample_mflix", "users")

//Se tiene en cuenta que se podrian agregar parametros para la edicion de parametros de manera dinamica.

