interface SlideIndicatorProps {
  total: number;
  current: number;
  onPress?: (idx: number) => void;
}

const SlideIndicator = ({ total, current, onPress }: SlideIndicatorProps) => (
  <div className="mt-4 flex flex-row items-center justify-center gap-2">
    {Array.from({ length: total }).map((_, idx) => {
      const dot = (
        <div
          key={idx}
          className={`rounded-full ${idx === current ? 'h-3 w-3 bg-lime-500' : 'h-2 w-2 bg-gray-300'}`}
        />
      );
      return onPress ? (
        <button key={idx} type="button" onClick={() => onPress(idx)}>
          {dot}
        </button>
      ) : (
        dot
      );
    })}
  </div>
);

export { SlideIndicator };
