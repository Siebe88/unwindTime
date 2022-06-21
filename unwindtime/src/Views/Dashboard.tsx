import "./Dashboard.css";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../Services/firebase";
import RelaxMethod from "../Components/RelaxMethod";
import { useSelector, useDispatch } from "react-redux";
import { switchFavo } from "../reducers/favoRelaxMethods";
import relaxMethods from "../Media/relaxMethodsSVG";
import { updateProfile } from "../Services/firestore";
import SetProfilePic from "../Components/SetProfilePic";
import { RelaxOption, State } from "../../Interfaces";

function Dashboard() {
  const [user, loadingAuth] = useAuthState(auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state setting
  const profile = useSelector((state: State) => state.profile.value);
  const favoRelaxMethods = useSelector(
    (state: State) => state.favoRelaxMethods
  );

  //BUG need to rework routing
  useEffect(() => {
    if (loadingAuth) return;
    if (!user) return navigate("/");
  }); //eslint-disable-line

  const clickEventSaveProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    updateProfile(profile, favoRelaxMethods as unknown as RelaxOption);
    return navigate("/unwinds");
  };

  const onClickRelaxMethod = (relaxMethod: RelaxOption) => {
    dispatch(switchFavo(relaxMethod));
  };

  return (
    <div className="dashboard-container">
      <SetProfilePic></SetProfilePic>

      <div className="relaxmethods-parent-container">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {" "}
          What are your favorite unwind activities?
        </h3>
        <div className="relaxmethods-container">
          {relaxMethods
            .sort((a: RelaxOption, b: RelaxOption) => a.id - b.id)
            .map((relaxMethod: RelaxOption) => {
              return (
                <RelaxMethod
                  key={relaxMethod.id}
                  relaxMethod={relaxMethod}
                  onClickRelaxMethod={onClickRelaxMethod}
                  classColor={
                    favoRelaxMethods.some(
                      (method: RelaxOption) => method.name === relaxMethod.name
                    )
                      ? "favoriteMethod"
                      : "nonfavoriteMethod"
                  }
                />
              );
            })}
        </div>
      </div>

      <button
      name="letsUnwindBtn"
        className="dashboard__btn go_button text-style-h-3 color-button-grey"
        onClick={clickEventSaveProfile}
      >
        {" "}
        Okay, let's unwind!
      </button>
      <button
      name='logoutBtn'
        className="dashboard__btn text-style-h-3 color-button-red"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
