import { useCallback, useRef, useState } from "react";

export const useAxisAttributes = (initAttribute) => {
  const ref = useRef(null);
  const [attr, setAttr] = useState(initAttribute);
  const getValue = useCallback((item) => item[attr], [attr]);
  const dispatchClick = () => {
    ref.current.setState(prev => ({...prev, isOpen: true}))
  };
  const onChange = useCallback(
    ({ value }) => {
      setAttr(value);
    },
    [setAttr]
  );
  return { ref, state: [attr, setAttr], getValue, dispatchClick, onChange };
};
