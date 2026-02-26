import GwangsanImage from '~/shared/assets/png/Gwangsan.png';

interface GwangsanProps {
  gwangsan?: number;
}

export default function Gwangsan({ gwangsan }: GwangsanProps) {
  return (
    <div className="flex flex-col gap-6 px-6">
      <h3 className="text-titleSmall">광산</h3>
      <div className="flex flex-row items-center justify-around rounded-2xl bg-gray-200 px-11 py-6">
        <img
          src={GwangsanImage.uri}
          alt="광산"
          width={57}
          height={52}
          className="object-contain"
        />
        <span className="font-cafe24 text-titleMedium text-sub2-700">{gwangsan} 광산</span>
      </div>
    </div>
  );
}
