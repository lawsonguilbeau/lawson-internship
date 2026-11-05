import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTopSellers() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
      );
      setTopSellers(data);
    } catch (error) {
      console.error("Error fetching top sellers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? // Skeleton loading state (renders 12 placeholder items matching the original count)
                  new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
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
                      <div className="author_list_info">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "100px",
                            height: "20px",
                            marginBottom: "6px",
                          }}
                        ></div>
                        <div
                          className="skeleton-box"
                          style={{ width: "60px", height: "16px" }}
                        ></div>
                      </div>
                    </li>
                  ))
                : // Dynamic data state
                  topSellers.map((author, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>
                          {author.authorName}
                        </Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
