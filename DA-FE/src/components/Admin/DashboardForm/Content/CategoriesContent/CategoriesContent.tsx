import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ChevronUp, Plus, Search } from 'lucide-react';
import { Input, Pagination, Modal, message } from 'antd';
import { AdminCategoryService } from '../../../../../services/admin/adminServices';
import { ICategoriesContentProps } from '../../../../../types/Dashboard/Contents/CategoriesContentProps';
import formatDateTime from '../../../../../utils/Format/FormatDateTime';
import { Confirm } from '../../../../../utils/ToastData/Toast';
import CategoryDataComponent from '../../../../../utils/Data/CategoryDataComponent';

const { TextArea } = Input;

const CategoriesContent: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [titleTable, setTitleTable] = React.useState('Add Category');
  const [category, setCategory] = React.useState({
    id: '',
    categoryName: '',
    categoryDescription: '',
  });
  const [categories, setCategories] = React.useState<ICategoriesContentProps[]>(
    [],
  );

  const fetchCategories = async () => {
    try {
      const response = await AdminCategoryService.fetchAllCategories();
      if (response) {
        setCategories(response.categories);
        return response.categories;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategory = async (id: number) => {
    try {
      const response = await AdminCategoryService.fetchCategory(id);
      if (response) {
        setCategory({
          id: response.id,
          categoryName: response.categoryName,
          categoryDescription: response.categoryDescription,
        });
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await AdminCategoryService.createCategory(
        category.categoryName,
        category.categoryDescription,
      );
      if (response) {
        message.success('Category created successfully');
        fetchCategories();
        setShowModal(false);
        setCategory({ id: '', categoryName: '', categoryDescription: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = async (id: number) => {
    await fetchCategory(id);
    setShowModal(true);
    setTitleTable('Edit Category');
  };

  const handleUpdateCategory = async (id: number) => {
    try {
      const response = await AdminCategoryService.updateCategory(
        id,
        category.categoryName,
        category.categoryDescription,
      );
      if (response) {
        message.success('Category updated successfully');
        fetchCategories();
        setShowModal(false);
        setCategory({ id: '', categoryName: '', categoryDescription: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await AdminCategoryService.deleteCategory(id);
      if (response) {
        message.success('Category deleted successfully');
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async (id: number, name: string) => {
    const result = await Confirm(
      `Are you sure you want to delete this category ${name}?`,
      'error',
    );
    if (result.isConfirmed) {
      handleDeleteCategory(id);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setTitleTable('Add Category');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <CategoryDataComponent />

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search category."
            className="shadow-md px-2 py-2 pl-10 rounded-md border w-full md:w-64"
          />
          <Search className="absolute left-2 top-2 text-gray-500 w-6 h-6" />
        </div>
        <button
          className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 ease-linear w-full md:w-auto"
          onClick={handleShowModal}
        >
          <Plus className="mr-2 w-5 h-5" />
          Add Category
        </button>
        <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              {titleTable}
            </h3>
            <form
              action=""
              className="flex flex-col gap-5"
              onSubmit={
                titleTable === 'Add Category'
                  ? handleSubmit
                  : (e) => {
                      e.preventDefault();
                      handleUpdateCategory(parseInt(category.id));
                    }
              }
            >
              <Input
                placeholder="Category Name"
                name="categoryName"
                value={category.categoryName}
                onChange={(e) =>
                  setCategory({ ...category, categoryName: e.target.value })
                }
              />
              <TextArea
                rows={2}
                placeholder="Category Description"
                name="categoryDescription"
                value={category.categoryDescription}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    categoryDescription: e.target.value,
                  })
                }
              />

              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="p-2 rounded-md shadow-sm bg-blue-500 hover:bg-indigo-500 transition-all duration-300 text-white w-24"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {/* Category table */}
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2">
                Category
                <button>
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                </button>
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Category Description
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Added By
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Updated By
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Created At
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Update At
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className="border-b border-gray-200">
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {index + 1}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {category.categoryName}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {category.categoryDescription}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {category.createdBy}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {category.updatedBy}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {formatDateTime(category.createdAt || '')}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  {formatDateTime(category.updatedAt || '')}
                </td>
                <td className="py-3 px-5 text-left font-semibold text-gray-700">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200 ease-linear ml-3"
                    onClick={() => handleEditCategory(category.id)}
                  >
                    <Pencil className="" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-all duration-200 ease-linear ml-3"
                    onClick={() =>
                      handleConfirmDelete(
                        category.id,
                        category.categoryName || '',
                      )
                    }
                  >
                    <Trash2 className="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination current={1} total={10} />
        </div>
      </div>
    </>
  );
};

export default CategoriesContent;
