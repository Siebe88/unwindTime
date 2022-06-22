import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import RelaxMethod from "./RelaxMethod";
import { Props, State } from "../../Interfaces";

let minDate = new Date().toISOString().slice(11, 16).toString();

function UnwindFilterBox({
  onClickRelaxMethod,
  selectedUnwind,
  handleTillTimeChange,
  handleFromTimeChange,
  fromUnwind,
  tillUnwind,
}: Props) {
  const favoRelaxMethods = useSelector(
    (state: State) => state.favoRelaxMethods
  );

  return (
    <div className="relaxmethods-selector-parent-container">
      <form action="">
        <h3 className="relaxmethodspicker-title text-style-h-3">
          {" "}
          How do you want to unwind?{" "}
        </h3>
        <div className="relaxmethods-selector-container">
          {favoRelaxMethods.map((relaxMethod) => {
            return (
              <RelaxMethod
                key={relaxMethod.id}
                relaxMethod={relaxMethod}
                onClickRelaxMethod={onClickRelaxMethod}
                classColor={
                  selectedUnwind?.name === relaxMethod.name
                    ? "favoriteMethod"
                    : "nonfavoriteMethod"
                }
              />
            );
          })}
        </div>
        <div className="timesetter-container">
          <h3 className="text-style-h-3 fromText">From:</h3>
          <input
            type="time"
            min={moment(fromUnwind).format('HH:mm')}
            defaultValue={moment(fromUnwind).format('HH:mm')}
            onChange={handleFromTimeChange}
            required
          ></input>
          <h3 className="text-style-h-3">To:</h3>
          <input
            type="time"
            defaultValue={moment(tillUnwind).format("HH:mm")}
            onChange={handleTillTimeChange}
            required
          ></input>
        </div>
      </form>
    </div>
  );
}

export default UnwindFilterBox;
