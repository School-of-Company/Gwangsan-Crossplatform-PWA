import { clsx } from 'clsx';

interface LightProps {
  lightLevel?: number;
}

export default function Light({ lightLevel = 1 }: LightProps) {
  return (
    <div className="px-6 py-10">
      <h3 className="mb-6 text-titleSmall">밝기</h3>

      <div className="relative flex h-5 w-full justify-center rounded-xl bg-gray-200">
        <div className="absolute left-1 right-1 h-3 overflow-hidden rounded-xl">
          <div
            className={clsx('h-full rounded-xl')}
            style={{ width: `${Math.min(Math.max(lightLevel, 0), 100)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <span>{Math.ceil(lightLevel / 10)}단계</span>
      </div>
    </div>
  );
}
