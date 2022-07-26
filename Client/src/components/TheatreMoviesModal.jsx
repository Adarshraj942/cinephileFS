import React, { useEffect, useRef, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { UilTimes } from "@iconscout/react-unicons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moviePost } from "../api/MoviePostRequest";
import { uploadImage } from "../api/UploadRequest";

const TheatreMoviesModal = ({ modalOpened2, setModalOpened2, data }) => {
  const dispatch = useDispatch();
  const theatre = localStorage.getItem("theatreInfo");
  const theater = JSON.parse(theatre);
  console.log(theater.theatre._id);
  const [showtimes, setShowTimes] = useState([]);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [image, setImage] = useState(null);

  const onCheckBox = (e) => {
    if (e.target.checked === true) {
      let show = [...showtimes];

      show.push(e.target.value);
      setShowTimes(show); 
    } else if (e.target.checked === false) {
      let show = [...showtimes];
      show = show.filter((prev) => prev !== e.target.value);
      setShowTimes(show);
    }
  };

  console.log(showtimes);
  const [post, setPost] = useState({
    moviename: "",
    theaterId: "",
    desc: "",
    ticketcharge: "",
    releasedate: "",
    outdate: "",
  });

  const imageRef = useRef();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    const newPost = {
      moviename: post.moviename,
      theaterId: theater.theatre._id,
      showtimes: showtimes,
      desc: post.desc,
      ticketcharge: post.ticketcharge,
      releasedate: post.releasedate,
      outdate: post.outdate,
    
    };
    console.log(newPost);
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
    
      try {
      
        uploadImage(data);
      } catch (error) {
        console.log(error);
      }
    }
    moviePost(newPost)
    
    resetShare();
  };

  const resetShare = () => {
    setImage(null);
    setModalOpened2(false);
    setShowTimes([]);

    navigate("/theatremovies");
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size={"50%"}
      overlayBlur={3}
      opened={modalOpened2}
      onClose={() => setModalOpened2(false)}
    >
      <div
        style={{
          padding: "0.5rem",
          width: "75%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          className="infoInput"
          name="moviename"
          value={post.moviename}
          style={{ width: "95%", marginTop: "1rem" }}
          placeholder="Movie name"
          onChange={handleChange}
        />
        <input
          className="infoInput"
          name="desc"
          value={post.desc}
          onChange={handleChange}
          style={{ width: "95%", marginTop: "1rem" }}
          placeholder="Description"
        />
        <input
        type="Number"
          className="infoInput"
          value={post.ticketcharge}
          name="ticketcharge"
          onChange={handleChange}
          style={{ width: "95%", marginTop: "1rem" }}
          placeholder="Ticket Price"
        />

        <div style={{ padding: "5px" }}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"10:00 AM"}
            onChange={onCheckBox}
          />
          <label htmlFor="" style={{ marginLeft: "15px" }}>
            10:00 AM
          </label>
          <input
            type="checkbox"
            value={"2:00 PM"}
            name=""
            id=""
            style={{ marginLeft: "15px" }}
            onChange={onCheckBox}
          />
          <label htmlFor="" style={{ marginLeft: "15px" }}>
            2:00 PM
          </label>
          <input
            type="checkbox"
            value={"5:00 PM"}
            name=""
            id=""
            style={{ marginLeft: "15px" }}
            onChange={onCheckBox}
          />
          <label htmlFor="" style={{ marginLeft: "15px" }}>
            5:00 PM
          </label>
          <input
            type="checkbox"
            value={"9:00 PM"}
            name=""
            id=""
            style={{ marginLeft: "15px" }}
            onChange={onCheckBox}
          />
          <label htmlFor="" style={{ marginLeft: "15px" }}>
            9:00 PM
          </label>
        </div>

        <input
          type="date"
          name="releasedate"
          id="wer"
          onChange={handleChange}
          value={post.releasedate}
          className="infoInput"
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "2rem",
            marginTop: "1rem",
          }}
        />
        <input
          type="date"
          name="outdate"
          id=""
          value={post.outdate}
          onChange={handleChange}
          className="infoInput"
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "2rem",
            marginTop: "1rem",
          }}
          />
          {image && (
            <div className="previewImage" style={{width:"150px",height:"150px"}}>
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange}/>

        <button
          onClick={handleSubmit}
          className="button"
          style={{
            marginLeft: "1rem",
            height: "2rem",
            marginLeft: "auto",
            marginRight: "2rem",
            marginTop: "1rem",
            width: "50%",
          }}
        >
          Share
        </button>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default TheatreMoviesModal;
