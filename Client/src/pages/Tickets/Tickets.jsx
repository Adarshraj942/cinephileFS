import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SimpleBottomNavigation from "../../components/MainNav";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SinglePost from "../../components/singlePost/SinglePost";
import { Container } from "@mantine/core";
import { getMovies } from "../../api/TicketRequest";
const Tickets = () => {
  const [posts, setPost] = useState([]);
  useEffect(async () => {
    const { data } = await getMovies();
    setPost(data);
  }, []);
  return (
    <div className="Movies">
      <Header />
      <div className="Movie">
        <Container>
          <span className="pageTitle">
            New Release_ {posts.length === 0 && <span>not found...!</span>}
          </span>

          <div className="trending">
            {posts &&
              posts.map((post, id) => {
                return (
                  <div className="media">
                    <div className="Post">
                      <img
                        src={
                          post.image
                            ? process.env.REACT_APP_PUBLIC_FOLDER + post.image
                            : ""
                        }
                        //  onClick={handleClick}
                        alt="no image"
                      />

                      <div className="PostReact"></div>

                      <div className="details">
                        <span>
                          <b>{post.moviename}</b>
                        </span>
                        <span> {post.desc}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <CustomPagination />
        </Container>
        <SimpleBottomNavigation />
      </div>
    </div>
  );
};

export default Tickets;
