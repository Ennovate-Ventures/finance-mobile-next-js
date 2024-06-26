import { FadeLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className="flex flex-row justify-center items-center">
      <FadeLoader color="black" />
    </div>
  );
}

export default LoadingSpinner;
