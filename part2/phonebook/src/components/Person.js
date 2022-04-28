const Person = ({ person, deletePerson}) => {
    const handleClick = (event) => {
      if (window.confirm(`Delete ${person.name}`)){
        deletePerson(person.id)
      } else{
        console.log("cancelled")
      }
    }
    return (
      <li>{person.name} {person.number} <button onClick={handleClick}>delete</button></li>
    )
}

export default Person