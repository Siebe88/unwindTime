/* eslint-disable no-restricted-globals */
import React from "react";
import "./Unwind.css";
import RelaxMethod from "./RelaxMethod";
import { getDistance } from "geolib";
import { useNavigate } from "react-router-dom";
import { GeolibInputCoordinates } from "geolib/es/types";
import { motion } from "framer-motion";
import { UnwindProps } from "../interfaces/interfaces";
import { formatTime } from "../Services/utils";

export default function Unwind(props: UnwindProps) {
  const { unwind } = props;
  const { location } = props;
  const { unwindID } = props;

  const navigate = useNavigate();

  const distanceBetween =
    location?.latitude && unwind?.location.latitude
      ? `Distance: ${getDistance(
          location as GeolibInputCoordinates,
          unwind?.location,
          1
        )} m  `
      : "~";

  const conClickToChat = () => {
    navigate(`/unwindchat/${unwindID}`, { state: { unwind } });
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
        cursor:'pointer'
      }}
      whileTap={{ scale: 0.9 }}
      className="unwind-event-container"
      onClick={conClickToChat}
    >
      <img
        className="profile-unwind-img"
        src={unwind?.createdBy.profilePic}
        alt=""
      />
      <div className="name-and-time-container">
        <p>{unwind?.createdBy.name} </p>
        <p>{`${formatTime(unwind?.from)} - ${formatTime(unwind?.till)}`}</p>
        <p> {distanceBetween} </p>
      </div>
      <RelaxMethod
        relaxMethod={unwind?.relaxMethod}
        classColor="favoriteMethod"
        onClickRelaxMethod={() => 1 + 1} // what is this??
      ></RelaxMethod>
    </motion.button>
  );
}
