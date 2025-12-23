import ArrowRightIcon from '../icons/ArrowRightIcon';
import clsx from 'clsx';

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
  }
> = ({ children, onClick, variant = 'primary', type = 'button', ...props }) => {
  const baseClasses =
    'flex items-center gap-2 bg-brand text-white font-semibold uppercase tracking-wide py-[4px] pr-[4px] pl-6';
  const variantClasses =
    variant === 'primary'
      ? 'text-[14px] rounded-[10px]'
      : 'text-[11px] rounded-xl';

  const iconClasses =
    variant === 'primary' ? 'w-[46px] h-[46px]' : 'w-[28px] h-[28px]';

  return (
    <button
      className={clsx(baseClasses, variantClasses)}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}{' '}
      <span
        className={clsx(
          iconClasses,
          'flex items-center justify-center bg-white rounded-xl text-brand'
        )}
      >
        <ArrowRightIcon size={variant === 'primary' ? 20 : 16} />
      </span>
    </button>
  );
};

export default Button;
