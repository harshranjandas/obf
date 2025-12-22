import React from 'react';

export type ArrowRightIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  title?: string;
};

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  size = 16,
  color,
  title,
  style,
  ...props
}) => {
  const mergedStyle = color ? { ...style, color } : style;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      style={mergedStyle}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M13 8.00006L5 8.00006"
        stroke="currentColor"
        strokeLinecap="square"
      />
      <path
        d="M8.9668 3.98369L13.0001 7.99969L8.9668 12.0164"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ArrowRightIcon;
