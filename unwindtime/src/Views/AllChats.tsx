import "./AllChats.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Services/firebase";
import { useNavigate } from "react-router-dom";
import Unwind from "../Components/Unwind";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../Services/firebaseConnection";
import {State} from '../../Interfaces'

function AllChats() {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();
  const profile = useSelector((state:State) => state.profile.value);
  const location = useSelector((state:State) => state.location.value);

  //Get's realtime new unwinds from firebase
  const queryUnwinds = query(
    collection(db, "unwinds"),
    where("attachedUsers", "array-contains", profile.uid)
  );
  const [unwinds, loading, error] = useCollection(queryUnwinds, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate("/");
  }, []); //eslint-disable-line

  return (
    <div className="allchats-container">
      <div className="unwinds-status-container">
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
      </div>
      {profile.uid && unwinds && (
        <div>
          {unwinds.docs.map((unwind) => (
            <Unwind
              key={unwind.id}
              unwind={unwind.data()}
              unwindID={unwind.id}
              location={location}
            ></Unwind>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllChats;
