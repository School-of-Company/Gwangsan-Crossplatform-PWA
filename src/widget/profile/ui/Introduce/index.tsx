interface IntroduceProps {
  specialty?: string[];
  introduce?: string;
}

export default function Introduce({ specialty, introduce }: IntroduceProps) {
  return (
    <div className="px-6">
      <h3 className="mb-6 text-titleSmall">소개</h3>
      <div className="mb-3 flex flex-row gap-3">
        {specialty &&
          specialty.length > 0 &&
          specialty.map((v, i) => {
            return (
              <span
                className="rounded-[30px] border border-gray-300 px-3 py-2 text-gray-300"
                key={i}>
                {v}
              </span>
            );
          })}
      </div>
      <p>{introduce}</p>
    </div>
  );
}
