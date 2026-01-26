import axios from 'axios';
import { API_BASE_URL } from '../constants/APIConstant';

// Include Authorization header from localStorage so protected admin endpoints accept the request

export const getAllContacts = () => {

  const token = localStorage.getItem('token');

  return axios.get(`${API_BASE_URL}/admin/contacts`, {
    
    headers: token ? { Authorization: `Bearer ${token}` } : {

    }

  });
};

export const deleteContact = (contactId) => {

  const token = localStorage.getItem('token');
  return axios.delete(`${API_BASE_URL}/admin/contacts/${contactId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}

  });
};
