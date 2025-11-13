import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full mt-16">
      <ThreeDots
        height={80}
        width={80}
        color="#14b8a6" // Tailwind teal-500 tone
        radius="9"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
