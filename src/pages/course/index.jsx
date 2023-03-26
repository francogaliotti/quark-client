import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IFrameComponent } from "../../components/iFrameComponent";

export const Course = ({ setColapseDisabled }) => {
  const { id } = useParams();

  useEffect(() => {
    setColapseDisabled(true);
    return () => {
      setColapseDisabled(false);
    };
  }, []);

  return (
    <>
      <IFrameComponent url={`course/view.php?id=${id}`} />
    </>
  );
};
