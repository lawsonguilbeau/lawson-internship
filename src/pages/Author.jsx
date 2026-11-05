import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { authorId } = useParams();
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const fetchAuthorProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setAuthorData(data);
      setFollowersCount(data.followers || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching author profile:", error);
      setLoading(false);
    }
  }, [authorId]);

  useEffect(() => {
    fetchAuthorProfile();
    window.scrollTo(0, 0);
  }, [fetchAuthorProfile]);

  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
      setIsFollowing(false);
    } else {
      setFollowersCount(followersCount + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {loading ? (
                  // Skeleton Loading State for Profile Header
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div
                          className="skeleton-box"
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <div className="profile_name">
                          <h4>
                            <div
                              className="skeleton-box"
                              style={{
                                width: "180px",
                                height: "24px",
                                marginBottom: "10px",
                              }}
                            ></div>
                            <span className="profile_username">
                              <div
                                className="skeleton-box"
                                style={{ width: "100px", height: "16px" }}
                              ></div>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authorData?.authorImage} alt="" />
                        <div className="profile_name">
                          <h4>
                            {authorData?.authorName}
                            <span className="profile_username">
                              @{authorData?.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authorData?.address}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <h4>{followersCount} followers</h4>
                        <button
                          className="btn-main"
                          onClick={handleFollowClick}
                        >
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-12">
                <AuthorItems author={authorData} loading={loading} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
