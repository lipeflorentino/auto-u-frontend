import emailIcon from '../../assets/icons/mail.png';

const sizeClasses = {
  xs: 'h-4 w-4',
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-10 w-10',
};

type IconProps = {
    name: keyof typeof iconMap; 
    size: keyof typeof sizeClasses;
    alt?: string;
    className?: string;
    style?: object
}

const iconMap = {
  email: emailIcon,
};

const Icon = ({ name, size = 'md', alt, className = '', style }: IconProps) => {
  const src = iconMap[name];

  if (!src) {
    console.error(`Ícone "${name}" não encontrado.`);
    return null; // adicionar fallback
  }
  
  const sizeStyle = typeof size === 'number' || size.includes('px') || size.includes('rem')
    ? { width: size, height: size }
    : {};

  const selectedSizeClass = sizeClasses[size] || '';

  return (
    <img
      src={src}
      alt={alt || `${name} icon`}
      className={`inline-block object-contain ${selectedSizeClass} ${className}`}
      style={{ ...sizeStyle, ...style }}
    />
  );
};

export default Icon;