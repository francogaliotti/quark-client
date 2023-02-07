import React, { useState } from "react";
import "../../styles/Offer.css";

export const Offer = () => {
  const [unrealDropdown, setUnrealDropDown] = useState(false);
  const [unityDropdown, setUnityDropDown] = useState(false);
  
  return (
    <div className="offerPageContainer">
      <div className="offersContainer">
        <div className="singleOffer">
          <div
            className="front"
            onClick={() => setUnrealDropDown(!unrealDropdown)}
          >
            <img
              className="offerImg"
              src="https://quark.academy/pluginfile.php/2528/course/overviewfiles/Unreal.png"
              alt=""
            />
          </div>
          {unrealDropdown && (
            <div className="dropdown">
              <div className="level">Inicial</div>
              <div className="level">Intermedio</div>
              <div className="level">Bootcamp</div>
            </div>
          )}
        </div>
        <div className="singleOffer">
          <div
            className="front"
            onClick={() => setUnityDropDown(!unityDropdown)}
          >
            <img
              className="offerImg"
              src="https://quark.academy/pluginfile.php/1721/course/overviewfiles/Unity.png"
              alt=""
            />
          </div>
          {unityDropdown && (
            <div className="dropdown">
              <div className="level">Inicial</div>
              <div className="level">Intermedio</div>
              <div className="level">Bootcamp</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
