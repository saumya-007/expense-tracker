import { BsSearch } from "react-icons/bs";

const SearchBar = ({updateSearchTerm}) => {
  const changeHandler = (e) => {
    const currentInputValue = e.target.value;
      updateSearchTerm(currentInputValue)
  }
  return (
    <>
      <input type='text' placeholder="Search Expense" onChange={changeHandler}/>
      <button><BsSearch onClick={changeHandler}/></button>
    </>
  );
};

export default SearchBar;
