interface ItemFormProgressBarProps {
  step: number;
}

const ItemFormProgressBar = ({ step }: ItemFormProgressBarProps) => {
  const totalSteps = 3;
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full bg-blue-300 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ItemFormProgressBar;
