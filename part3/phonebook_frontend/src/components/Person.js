const Person = ({ person, deletePerson}) => {
    const handleClick = (event) => {
      if (window.confirm(`Delete ${person.name}`)){
        deletePerson(person)
      } else{
        console.log("Cancelled Deletion")
      }
    }
    return (
      <li>{person.name} {person.number} <button onClick={handleClick}>delete</button></li>
    )
}

export default Person