interface IconProps {
  color?: string;
  width?: number;
  height?: number;
}

const NoticeIcon = ({ color = '#8F9094', width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 13v-2Z" />
      <path d="M11.6 16.8 a3 3 0 1 1-5.8-0.8" />
    </svg>
  );
};

export default NoticeIcon;
