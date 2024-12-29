import React, { useState, useEffect } from 'react';
import { Archive, BookOpenCheck, Timer } from 'lucide-react';
import { fetchLastUpdatedTime } from '../FetchDateTime/FetchDateTime';
import { AdminCategoryService } from '../../services/admin/adminServices';

const CategoryDataComponent: React.FC = () => {
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);

  const updateLastUpdatedTime = async () => {
    try {
      const time = await fetchLastUpdatedTime();
      if (time !== null) {
        setLastUpdatedTime(time.toString());
      }
    } catch (error) {
      console.log(lastUpdatedTime);
      console.error('Error fetching last updated time:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await AdminCategoryService.fetchAllCategories();
      if (response) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    updateLastUpdatedTime();
    fetchCategories();
  }, []);

  const getTimeSinceLastUpdated = () => {
    if (categories.length > 0) {
      const latestCategory = categories.reduce((latest, category) => {
        return new Date(category.updatedAt) > new Date(latest.updatedAt)
          ? category
          : latest;
      });

      const lastUpdated = new Date(latestCategory.updatedAt);
      const now = new Date();
      const diffInMs = now.getTime() - lastUpdated.getTime();
      const diffInMinutes = Math.floor(diffInMs / 60000);

      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} hours ago`;
      }
    }
    return 'N/A';
  };

  const categoryData = [
    {
      id: 1,
      title: 'Total Categories',
      value: categories.length.toString(),
      icon: React.createElement(Archive, {
        className: 'text-blue-500 h-8 w-8',
      }),
    },
    {
      id: 2,
      title: 'Total Words',
      value: '1000',
      icon: React.createElement(BookOpenCheck, {
        className: 'text-blue-500 h-8 w-8',
      }),
    },
    {
      id: 3,
      title: 'Last Updated',
      value: getTimeSinceLastUpdated(),
      icon: React.createElement(Timer, { className: 'text-blue-500 h-8 w-8' }),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
      {categoryData.map((category) => (
        <div
          key={category.id}
          className="bg-white p-5 rounded-md shadow-lg col-span-1 md:w-full transition-all duration-200 ease-in-out"
        >
          <div className="text-xl font-semibold text-gray-800 mb-10">
            <div className="flex justify-between">
              <span className="whitespace-nowrap">{category.title}</span>
              {category.icon}
            </div>
          </div>
          <p className="text-2xl text-gray-800 font-semibold">
            {category.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryDataComponent;
