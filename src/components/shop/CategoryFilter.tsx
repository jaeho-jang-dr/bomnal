"use client";

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onSelect: (id: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
    return (
        <div className="w-full overflow-x-auto hide-scrollbar pb-4 pt-2 px-4">
            <div className="flex gap-3 min-w-max">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`flex h-10 items-center gap-2 rounded-xl px-5 shadow-sm transition-transform active:scale-95 cursor-pointer border ${selectedCategory === cat.id
                            ? "bg-text-main text-white border-transparent"
                            : "bg-white dark:bg-gray-800 text-text-main dark:text-gray-200 border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        <span className="text-sm font-bold">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
