
let data = require('./data');

let myObj = data.split("\n");
let calculado = myObj
    .filter(item => item.includes('Flexbox Video'))
    .map(item => item.slice(item.indexOf('"')+1,item.lastIndexOf('"')))
    .map(time => {
        const parts = time.split(':')
        .map(part => parseFloat(part));
         switch(parts.length){
            case 3:
                return ((parts[0]*60)*60) + (parts[1]*60) + parts[2];
            case 2:
                return ((parts[0]*60) + parts[1]);
            default:
                return array[0] ;
        }
    })
    .reduce((total,seconds)=>total+seconds);
console.log(calculado);