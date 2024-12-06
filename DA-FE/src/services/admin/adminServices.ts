import axios from 'axios';
import { EAdmin } from '../../enums/Admin/EAdmin';
import { ADMIN_CLIENT_HOST } from '../../enums/Admin/EAdmin';

export class AdminServices {
  public static async loginAdmin(email: string, password: string) {
    try {
      const response = await axios.post(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_LOGIN}`,
        { email, password },
        {
          withCredentials: true,
        },
      );

      const access_token = response.data.data.access_token;

      localStorage.setItem('aToken', 'true');

      const interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('aToken');
          }
          return Promise.reject(error);
        },
      );

      console.log(`Session expired:::: ${interceptor}`);

      return access_token;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async fetchUsers() {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_USERS}`,
        {
          withCredentials: true,
        },
      );
      if (response) {
        return response.data.data.users;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public static async fetchUser(email: string) {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_USER}/${email}`,
        {
          withCredentials: true,
        },
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async createUser(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: string,
  ) {
    try {
      const response = await axios.post(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_USER}`,
        { firstName, lastName, username, email, password, role },
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async deleteUser(email: string) {
    try {
      const response = await axios.delete(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_DELETE_USER}/${email}`,
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async updateUser(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string,
  ) {
    try {
      const response = await axios.put(
        `
        ${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_UPDATE_USER}/${id}`,
        { firstName, lastName, username, email, role },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export class AdminWordServices {
  public static async fetchAllWords(page: number, limit: number) {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_WORDS}?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async fetchWord(id: number) {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_WORD}/${id}`,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch word: ${error.message}`);
    }
  }

  public static async createWord(
    word: string,
    meanings: string,
    definitionText: string,
    partOfSpeech: string,
    categoryNames: string,
    exampleText: string,
    dialect: string,
    ipaText: string,
    usageExample: string,
    synonyms: string,
    antonyms: string,
  ) {
    try {
      const response = await axios.post(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_WORD}`,
        {
          word,
          meanings,
          definitionText,
          partOfSpeech,
          categoryNames,
          exampleText,
          dialect,
          ipaText,
          usageExample,
          synonyms,
          antonyms,
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to create word: ${
          error.response?.data?.message || error.message
        }`,
      );
    }
  }

  public static async deleteWord(id: number) {
    try {
      const response = await axios.delete(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_DELETE_WORD}/${id}`,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete word: ${error.message}`);
    }
  }
}

export class AdminCategoryService {
  public static async fetchAllCategories() {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_CATEGORIES}`,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    } catch (err: any) {
      console.error(err);
    }
  }

  public static async fetchCategory(id: number) {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_CATEGORY}/${id}`,
        {
          withCredentials: true,
        },
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async createCategory(
    categoryName: string,
    categoryDescription: string,
  ) {
    try {
      const response = await axios.post(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_CATEGORY}`,
        { categoryName, categoryDescription },
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async deleteCategory(id: number) {
    try {
      const response = await axios.delete(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_DELETE_CATEGORY}/${id}`,
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // fetch last time a category was updated or created
  public static async lastTimeCategoryUpdated() {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_CATEGORIES}`,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async updateCategory(
    id: number,
    categoryName: string,
    categoryDescription: string,
  ) {
    try {
      const response = await axios.put(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_UPDATE_CATEGORY}/${id}`,
        { categoryName, categoryDescription },
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
