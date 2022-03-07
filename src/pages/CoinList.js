import ReactPaginate from "react-paginate";
import "./CoinList.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Coin List";
    axios
      .get("https://api.coinpaprika.com/v1/coins/")
      .then((res) => {
        setCoins(res.data.slice(0, 100));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  console.log(coins);

  const handleDelete = (id) => {
    const newCoins = coins.filter((coin) => coin.id !== id);
    setCoins(newCoins);
  };

  const coinsPerPage = 4;
  const pagesVisited = pageNumber * coinsPerPage;

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.id.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  });

  const displayCoins = filteredCoins
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coin) => {
      return (
        <tr key={coin.id}>
          <th scope="row">
            <Link to={`/CoinList/${coin.id}`} className="coin-id">
              {coin.id}
            </Link>
          </th>
          <td>{coin.name}</td>
          <td>{coin.symbol}</td>
          <td>{coin.rank}</td>
          <td>{coin.type}</td>
          <td>{coin.is_active ? "True" : "False"} </td>
          <td>
            <button
              onClick={() => {
                window.confirm("Are you sure?") && handleDelete(coin.id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  const displaySelect = filteredCoins.map((coin) => {
    return (
      <option key={coin.id} value={coin.id}>
        {coin.name}
      </option>
    );
  });

  const pageCount = Math.ceil(coins.length / coinsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  console.log(select);

  // filter by select
  const filteredCoinsBySelect = filteredCoins.filter((coin) => {
    return coin.id === select;
  });

  const displayCoinsBySelect = filteredCoinsBySelect.map((coin) => {
    return (
      <tr key={coin.id}>
        <th scope="row">
          <Link to={`/CoinList/${coin.id}`} className="coin-id">
            {coin.id}
          </Link>
        </th>
        <td>{coin.name}</td>
        <td>{coin.symbol}</td>
        <td>{coin.rank}</td>
        <td>{coin.type}</td>
        <td>{coin.is_active ? "True" : "False"} </td>
        <td>
          <button
            onClick={() => {
              window.confirm("Are you sure?") && handleDelete(coin.id);
            }}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <section className="coin-list">
      <div className="container bg-white p-3 container-coin">
        <h3 className="pb-3 text-primary">Coin List</h3>

        <div className="row pb-3">
          <div className="col-4 col-md-2">
            <select
              defaultValue={""}
              className="form-select"
              aria-label="Default select example"
              value={coins.id}
              onChange={handleSelect}
            >
              <option value="allCoins">Select</option>
              {displaySelect}
            </select>
          </div>

          <div className="col-8 col-md-4">
            <form className="form d-flex">
              <i className="bi bi-search"></i>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive-sm">
            <table className="table table-striped table-borderless">
              <thead className="table-head text-white">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">rank</th>
                  <th scope="col">Type</th>
                  <th scope="col">Active</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {select === "" && displayCoins}
                {select !== null && displayCoinsBySelect}
                {select === "allCoins" && displayCoins}
              </tbody>
            </table>
          </div>
        )}

        <ReactPaginate
          previousLabel="&lt;"
          nextLabel="&gt;"
          breakLabel="..."
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={changePage}
          containerClassName="pagination justify-content-end"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          breakClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </section>
  );
}

export default CoinList;
