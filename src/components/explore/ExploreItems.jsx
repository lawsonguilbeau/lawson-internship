import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    if (!expiryDate) return;

    const updateTimer = () => {
      const now = Date.now();
      const difference = expiryDate - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, expired: true });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds, expired: false });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  if (timeLeft.expired) {
    return <div className="de_countdown">Expired</div>;
  }

  return (
    <div className="de_countdown">
      {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  async function fetchExploreItems(filter = "") {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
      );
      setExploreItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching explore items:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExploreItems();
  }, []);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    fetchExploreItems(filterValue);
  };

  const loadMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <div className="row w-100">
          {new Array(8).fill(0).map((_, index) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={index}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div
                    className="skeleton-box"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  ></div>
                </div>
                <div className="nft__item_wrap">
                  <div
                    className="skeleton-box"
                    style={{ width: "100%", height: "230px" }}
                  ></div>
                </div>
                <div className="nft__item_info">
                  <h4>
                    <div
                      className="skeleton-box"
                      style={{ width: "100px", height: "20px" }}
                    ></div>
                  </h4>
                  <div
                    className="skeleton-box"
                    style={{ width: "60px", height: "15px" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {exploreItems.slice(0, visibleCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorId}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                {item.expiryDate && <Countdown expiryDate={item.expiryDate} />}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visibleCount < exploreItems.length && (
            <div className="col-md-12 text-center">
              <Link
                to=""
                id="loadmore"
                className="btn-main lead"
                onClick={(e) => {
                  e.preventDefault();
                  loadMoreItems();
                }}
              >
                Load more
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExploreItems;
