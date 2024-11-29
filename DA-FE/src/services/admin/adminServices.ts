import axios from 'axios';
import { EAdmin } from '../../enums/Admin/EAdmin';
import { ADMIN_CLIENT_HOST } from '../../enums/Admin/EAdmin';

export class AdminServices {
  public static async loginAdmin(email: string, password: string) {
    console.log(`${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_LOGIN}`);
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
            console.log('Token expired');
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
  public static async fetchAllWords() {
    try {
      const response = await axios.get(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_WORDS}`,
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
      console.log(response.data);
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
    categoryName: string,
    exampleText: string,
    dialect: string,
    ipaText: string,
    usageExample: string,
    synonyms: string,
    antonyms: string,
  ) {
    try {
      console.log(`Request URL: ${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_WORD}`);
      console.log('Request Payload:', {
        word,
        meanings,
        definitionText,
        partOfSpeech,
        categoryName,
        exampleText,
        dialect,
        ipaText,
        usageExample,
        synonyms,
        antonyms,
      });

      const response = await axios.post(
        `${ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_WORD}`,
        {
          word,
          meanings,
          definitionText,
          partOfSpeech,
          categoryName,
          exampleText,
          dialect,
          ipaText,
          usageExample,
          synonyms,
          antonyms,
        },
      );

      console.log('Response Data:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error creating word:', error.response?.data || error.message);
      throw new Error(`Failed to create word: ${error.response?.data?.message || error.message}`);
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
