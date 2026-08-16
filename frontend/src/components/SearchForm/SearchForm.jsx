import { useState } from "react";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!keyword.trim()) {
      return;
    }

    onSearch(keyword);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Search events in Los Angeles"
        value={keyword}
        onChange={(evt) => setKeyword(evt.target.value)}
        required
      />

      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
