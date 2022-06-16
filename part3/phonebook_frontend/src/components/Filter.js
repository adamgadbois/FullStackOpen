const Filter = ({search,handleSearchChange}) => {
    return(
      <div>
        <h2>Search</h2>
        <input
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    )
}

export default Filter