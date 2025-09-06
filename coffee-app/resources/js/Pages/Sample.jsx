import { useEffect } from "react";

const Sample = () => {
  useEffect(() => {
    console.log('component mouted');
    return () => {
      console.log('component unmouted');
    };
  }, []);

  return (
    <>
      <div>これはサンプルです</div>
    </>
  )
}

export default Sample;