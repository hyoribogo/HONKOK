interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size: 'small' | 'medium' | 'large';
  status?: 'none' | 'online' | 'offline';
  className?: string;
}

const sizesConfig = {
  small: 'w-10 h-10',
  medium: 'w-12 h-12',
  large: 'w-14 h-14'
};

const statusSizesConfig = {
  small: 'w-2 h-2 bottom-[0.1rem] right-[0.1rem]',
  medium: 'w-3 h-3 bottom-[0.01rem] right-[0.01rem]',
  large: 'w-4 h-4 bottom-0 right-0'
};

const onlineConfig = {
  online: 'bg-sub-lime',
  offline: 'bg-gray-300'
};

const Avatar = ({
  size,
  status = 'none',
  className,
  ...props
}: AvatarProps) => {
  return (
    <div className="relative inline-block">
      <img
        {...props}
        className={`${sizesConfig[size]} rounded-full object-contain ${className} border-[1px] border-gray-100`}
      />
      {status !== 'none' && (
        <div
          className={`absolute rounded-full ${statusSizesConfig[size]} ${onlineConfig[status]}`}
        />
      )}
    </div>
  );
};

export default Avatar;