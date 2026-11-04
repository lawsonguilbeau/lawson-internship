import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        right: "-15px",
        transform: "translateY(-50%)",
        width: "46px",
        height: "46px",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <i
        className="fa fa-chevron-right"
        style={{ fontSize: "14px", color: "#333", fontWeight: "bold" }}
      ></i>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "-15px",
        transform: "translateY(-50%)",
        width: "46px",
        height: "46px",
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <i
        className="fa fa-chevron-left"
        style={{ fontSize: "14px", color: "#333", fontWeight: "bold" }}
      ></i>
    </div>
  );
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
      );
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hot collections:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <div className="row w-100">
              {new Array(4).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <div
                        className="skeleton-box"
                        style={{ width: "100%", height: "200px" }}
                      ></div>
                    </div>
                    <div className="nft_coll_pp">
                      <div
                        className="skeleton-box"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <div
                          className="skeleton-box"
                          style={{ width: "80px", height: "20px" }}
                        ></div>
                      </h4>
                      <span>
                        <div
                          className="skeleton-box"
                          style={{ width: "40px", height: "15px" }}
                        ></div>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Slider {...settings} className="owl-carousel owl-theme">
              {collections.map((collection) => (
                <div key={collection.id} className="px-2">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
