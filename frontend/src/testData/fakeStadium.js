
export default function fakeStadium (){
    const testStadium = require("./classroom.json")
    const id = Math.floor(Math.random()*(100-0))
    return testStadium[id]
}