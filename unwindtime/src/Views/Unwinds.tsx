import "./Unwinds.css";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";

import UnwindFilterBox from "../Components/UnwindFilterBox";
import  CreateUnwind  from "../Media/UnwindActionButtons/createUnwind.svg";
import  List  from "../Media/UnwindActionButtons/list.svg";
import  Map  from "../Media/UnwindActionButtons/map.svg";
import { useNavigate } from "react-router-dom";
import Unwind from "../Components/Unwind";
import UnwindsMap from "../Components/UnwindsMap";

import { useCollection } from "react-firebase-hooks/firestore";

import { createNewUnwind } from "../Services/unwinds";

import { collection, DocumentData, query, where } from "firebase/firestore";
import { db } from "../Services/firebaseConnection";

import {RelaxOption, State, EventHandler} from "../../Interfaces"
import moment from "moment";

function Unwinds() {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  const [showMap, setShowMap] = useState(false);

  const [fromUnwind , setFromUnwind] = useState(moment(new Date()).format('HH:mm'));
  const [tillUnwind, setTillUnwind] = useState(
    moment(new Date()).add(15, "minutes").format('HH:mm'));  //todo replace with Format

  //Get's realtime new unwinds from firebase
  const queryUnwinds = query(
    collection(db, "unwinds"),
    where("till", ">", fromUnwind)
  );
  const [unwinds, loading, error] = useCollection< DocumentData>(queryUnwinds, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const profile = useSelector((state:State) => state.profile.value);
  const location = useSelector((state:State) => state.location.value);

  // set selected unwind method
  const [selectedUnwind, setSelectedUnwind] = useState({name : ""});

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate("/");
  }, []); //eslint-disable-line

  const createUnwind = () => {
    const unwind = {
      relaxMethod: selectedUnwind,
      from: fromUnwind,
      till: tillUnwind,
      location: location,
    };

    createNewUnwind(profile, unwind);
  };

  const onClickRelaxMethod = (relaxMethod:RelaxOption) => {
    
    selectedUnwind.name !== relaxMethod.name
      ? setSelectedUnwind(relaxMethod)
      : setSelectedUnwind({name: ""});
  };

  function handleTillTimeChange(event:EventHandler) {
    const dateValue = moment(tillUnwind).format("YYYY-MM-DD");
    const newValue = moment(dateValue + " " + event.target.value);
  
    setTillUnwind(newValue.format('HH:mm'));
  }

  function handleFromTimeChange(event:EventHandler) {
    const dateValue = moment(fromUnwind).format("YYYY-MM-DD");
    const newValue = moment(dateValue + " " + event.target.value);
    setFromUnwind(newValue.format('HH:mm'));
  }

  return (
    <div className="unwinds-parent-container">
      <UnwindFilterBox
        onClickRelaxMethod={onClickRelaxMethod}
        selectedUnwind={selectedUnwind}
        handleTillTimeChange={handleTillTimeChange}
        handleFromTimeChange={handleFromTimeChange}
        fromUnwind={fromUnwind}
        tillUnwind={tillUnwind}
      ></UnwindFilterBox>
      <div className="unwindActions-container">
        {selectedUnwind.hasOwnProperty('name') ? (
          <motion.button
            whileHover={{ scale: 2.2 }}
            onClick={createUnwind}
            className="action-button"
          >
            {" "}
            <img src={CreateUnwind} />{" "}
          </motion.button>
        ) : (
          <></>
        )}
        <button className="action-button">
          {" "}
          <img src={List} onClick={() => setShowMap(false)} />{" "}
        </button>
        <button className="action-button">
          {" "}
          <img src={Map} onClick={() => setShowMap(true)} />{" "}
        </button>
      </div>
      <div className="unwinds-container">
        <div className="unwinds-status-container">
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
        </div>
        {showMap ? (
          location.lat && !loading ? (
            <UnwindsMap
              location={location}
              unwinds={unwinds ? unwinds.docs.filter(
                (unwind) =>
                
                  !selectedUnwind.hasOwnProperty('name') ||
                
                  unwind.data().relaxMethod.name === selectedUnwind.name
              ) : undefined}
            ></UnwindsMap>
          ) : (
            <></>
          )
        ) : (
          unwinds && (
            <div>
              {unwinds.docs
                .filter(
                  (unwind) =>
                    !selectedUnwind.name ||
                    unwind.data().relaxMethod.name === selectedUnwind.name
                )
                .map((unwind) => (
                  <Unwind
                    key={unwind.id}
                    unwind={unwind.data()}
                    unwindID={unwind.id}
                    location={location}
                  ></Unwind>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Unwinds;
