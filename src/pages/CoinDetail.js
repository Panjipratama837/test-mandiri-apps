import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CoinDetail() {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = "Coin Detail";
    axios
      .get(`https://api.coinpaprika.com/v1/coins/${params.id}`)
      .then((res) => {
        setCoin(res.data);
        setLoading(false);
      })

      .catch((err) => {
        setNotFound(true);
        setLoading(false);
      });
  }, [params.id]);

  return (
    <section className="coin-list">
      <div className="container bg-white p-3 container-coin">
        <h3 className="pb-3 text-primary">Coin Detail</h3>
        {loading ? (
          <div
            className="spinner-border text-primary text-center"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            {notFound ? (
              <div className="alert alert-danger" role="alert">
                Coin not found
              </div>
            ) : (
              <div className="row pb-3">
                <div className="col-6 col-md-4">
                  <p>ID</p>
                  <p>Name</p>
                  <p>Symbol</p>
                  <p>Type</p>
                  <p>Active</p>
                  <p>Is New ?</p>
                </div>

                <div className="col-6 col-md-8">
                  <p>
                    <b>{coin.id}</b>
                  </p>
                  <p>
                    <b>{coin.name}</b>
                  </p>
                  <p>
                    <b>{coin.symbol}</b>
                  </p>
                  <p>
                    <b>{coin.type}</b>
                  </p>
                  <p>
                    <b>{coin.is_active ? "True" : "False"}</b>
                  </p>
                  <p>
                    <b>{coin.is_new ? "True" : "False"}</b>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CoinDetail;
