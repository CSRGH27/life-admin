import { TextField } from "@material-ui/core";
import React from "react";

const SearchFilter = ({ wages, setFilterWages }) => {
  const handleSearch = (e) => {
    const value = e.currentTarget.value;
    const filteredData = wages.filter(
      (wage) =>
        wage.company.toLowerCase().includes(value.toLowerCase()) ||
        wage.year == value ||
        wage.month == value ||
        wage.month + "/" + wage.year == value
    );
    setFilterWages(filteredData);
  };

  return (
    <TextField
      onChange={handleSearch}
      color="secondary"
      id="standard-search"
      label="Rechercher"
      type="search"
    />
  );
};

export default SearchFilter;
      