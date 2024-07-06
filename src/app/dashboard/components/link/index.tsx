import Link, { LinkProps } from "next/link";
import { ReactNode, FC } from "react";

interface CustomLinkButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

const CustomLinkButton: FC<CustomLinkButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} className='bg-blue-500 px-4 py-1 rounded text-white hover:opacity-75'>
      {children}
    </Link>
  );
};

export default CustomLinkButton;
