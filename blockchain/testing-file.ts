import Blockchain from './blockchain';

let bc = new Blockchain()

for(let i = 0 ; i < 10 ; i++){
    let block = bc.addBlock(`Block ${i}`)
    console.log(block)
}