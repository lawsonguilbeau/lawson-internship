import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchItemDetails() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
      );
      setItem(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItemDetails();
    window.scrollTo(0, 0);
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                // Skeleton Loading State
                <>
                  <div className="col-md-6 text-center">
                    <div
                      className="skeleton-box"
                      style={{
                        width: "100%",
                        height: "400px",
                        borderRadius: "8px",
                      }}
                    ></div>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "300px",
                          height: "40px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "150px",
                          height: "30px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div
                        className="skeleton-box"
                        style={{
                          width: "100%",
                          height: "80px",
                          marginBottom: "30px",
                        }}
                      ></div>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <div
                            className="skeleton-box"
                            style={{
                              width: "100px",
                              height: "20px",
                              marginBottom: "10px",
                            }}
                          ></div>
                          <div className="item_author">
                            <div
                              className="skeleton-box"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            ></div>
                            <div style={{ marginLeft: "15px" }}>
                              <div
                                className="skeleton-box"
                                style={{ width: "120px", height: "20px" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Dynamic Render State
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={item.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{item.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </div>
                      <p>{item.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={item.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.ownerId}`}>
                                {item.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${item.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={item.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${item.creatorId}`}>
                                {item.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
