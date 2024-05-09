import { useEffect, useState } from "react";

const useCountDown = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    if (remainingSeconds <= 0) return;
    const countDownInterval = setInterval(() => {
      setRemainingSeconds(remainingSeconds - 1);
    }, 1000);

    return () => clearInterval(countDownInterval);
  }, [remainingSeconds]);

  const start = (second: number) => {
    setRemainingSeconds(second);
  };
  
  return {remainingSeconds, start}
};

export default useCountDown;
