interface IconProps {
    color?: string;
    width?: number;
    height?: number;
}

const PlusCircleIcon = ({ color = 'black', width = 33, height = 32 }: IconProps) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.5 0C7.67785 0 0.5 7.17785 0.5 16C0.5 24.8222 7.67785 32 16.5 32C25.3222 32 32.5 24.8222 32.5 16C32.5 7.17785 25.3222 0 16.5 0ZM16.5 2.46154C23.9917 2.46154 30.0385 8.50831 30.0385 16C30.0385 23.4917 23.9917 29.5385 16.5 29.5385C9.00831 29.5385 2.96154 23.4917 2.96154 16C2.96154 8.50831 9.00831 2.46154 16.5 2.46154ZM15.2692 8.61539V14.7692H9.11539V17.2308H15.2692V23.3846H17.7308V17.2308H23.8846V14.7692H17.7308V8.61539H15.2692Z"
                fill={color}
            />
        </svg>
    );
};

export default PlusCircleIcon;
