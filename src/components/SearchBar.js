import React from 'react';

const SearchBar = (props) => {

  const handleSearchInputChanges = (e) => {
    e.preventDefault();
    props.search(e.target.value,e.target.name);
  }

    return (
        <div className="searchForm">
        <form>
          <input
            className="form-control"
            placeholder={props.placeholder}
            name={props.name}
            type="text"
            onChange={handleSearchInputChanges}
          />
        </form>
      </div>
    );
};

export default SearchBar;