import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  href = '#',
  onClick,
}) => {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl border-2 border-oak-border dark:border-white/10 bg-warm-cream dark:bg-white/5 p-5 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/30 w-full text-left"
      aria-label={`${title} 카테고리로 이동`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary dark:text-white shrink-0">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '36px', fontVariationSettings: "'wght' 600" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="text-primary dark:text-white text-xl font-extrabold">
          {title}
        </h3>
        <p className="text-primary/60 dark:text-white/50 text-base">
          {description}
        </p>
      </div>
    </Component>
  );
};
