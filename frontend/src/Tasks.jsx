import {useState, useEffect} from 'react'
export default function Tasks (props) {
    //store firstnames from user database
    const [firstNames, setFirstNames] = useState([])
    //get first names everytime component mounts
    useEffect(() => {
getFirstName()
    }, [])
    //sending get request to get firstnames from data we receive
async function getFirstName () {
    //try catch block
    try{
        //fetch endpoint for get request
    const response = await fetch('/api/login')
    //if response fails send eroor
    if(!response.ok) {
        throw new Error('response failed')
    }
    //parse response
    const data = await response.json()
    console.log(data)
    //store array with firstnames in variable
    const names = data.map(users => users.firstName)
    //create a set for unique names 
    const uniqueNames = new Set(names)
    //turn set into array
    const namesArray = Array.from(uniqueNames)
    //set first names to new array 
    setFirstNames(namesArray)
    } catch(error) {
        //log thrown error if response fails
        console.log(error)
    }
}
//sending delete request to delete user onclick passing in our user when mapping through firstnammes
async function deleteUser (name) {
    //try catch block
    try {
        //fetch endpoint for delete request with method delete, content-type headers, and body stringifying our passed in user
        const response = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        })
        //if response fails throw error
        if(!response.ok){
            throw new Error('response failed')
        }
        //parse data
        const data = await response.json()
        console.log(data)
        //set firstnames to new array filtering out our passed in user from our original
        setFirstNames(old => old.filter(user => user !== name))
    } catch(error) {
        //log thrown error
        console.log(error)
    }
}
   return (
    <div>
    <div id = 'firstnames'>
        {/* map our array we set with out first names */}
       {firstNames.map((user, index) => (
        <div key = {index}>
            {/* display each first name and add task/delete button underneath names */}
            <div id = 'name-buttons'>
<h2>{user.toUpperCase()}</h2>
<div id = 'user-buttons'>
    {/* add task button */}
<button>Add Task</button>
{/* invoke delete user when delete button clicked */}
<button onClick ={() => deleteUser(user)}>Delete user</button>
</div>
</div>
</div>
       ))}
       </div>
       </div>
   );
}