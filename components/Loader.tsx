export const Loader: React.FC<{ style?: string }> = ({ style }) => {
  return (
    <div
      className={`absolute flex items-center justify-center w-full h-screen bg-inherit ${style}`}
    >
      <div className="loader"></div>
    </div>
  );
};
