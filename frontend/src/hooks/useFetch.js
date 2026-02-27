import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/authService';
import toast from 'react-hot-toast';

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Object} Fetch state and utilities
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    immediate = true,
    onSuccess,
    onError,
    showToast = true,
    ...fetchOptions
  } = options;

  const fetchData = useCallback(async (customUrl = null, customOptions = {}) => {
    const requestUrl = customUrl || url;
    const requestOptions = { ...fetchOptions, ...customOptions };

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(requestUrl, requestOptions);
      const result = response.data;

      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showToast) {
        toast.success('Data loaded successfully');
      }

      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, fetchOptions, onSuccess, onError, showToast]);

  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [immediate, url, fetchData]);

  const refetch = useCallback(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  const mutate = useCallback(async (mutationData, mutationOptions = {}) => {
    try {
      const result = await fetchData(null, {
        ...mutationOptions,
        data: mutationData,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
    fetchData,
  };
};

/**
 * Custom hook for POST requests
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options
 * @returns {Object} Request state and utilities
 */
export const usePost = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    showToast = true,
    successMessage = 'Operation completed successfully',
    ...postOptions
  } = options;

  const postData = useCallback(async (requestData, customUrl = null) => {
    const requestUrl = customUrl || url;
    
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(requestUrl, requestData, postOptions);
      const result = response.data;

      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showToast) {
        toast.success(successMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Request failed';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, postOptions, onSuccess, onError, showToast, successMessage]);

  return {
    data,
    loading,
    error,
    postData,
  };
};

/**
 * Custom hook for PUT requests
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options
 * @returns {Object} Request state and utilities
 */
export const usePut = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    showToast = true,
    successMessage = 'Update completed successfully',
    ...putOptions
  } = options;

  const putData = useCallback(async (requestData, customUrl = null) => {
    const requestUrl = customUrl || url;
    
    setLoading(true);
    setError(null);

    try {
      const response = await api.put(requestUrl, requestData, putOptions);
      const result = response.data;

      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showToast) {
        toast.success(successMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Update failed';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, putOptions, onSuccess, onError, showToast, successMessage]);

  return {
    data,
    loading,
    error,
    putData,
  };
};

/**
 * Custom hook for DELETE requests
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options
 * @returns {Object} Request state and utilities
 */
export const useDelete = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    onSuccess,
    onError,
    showToast = true,
    successMessage = 'Delete completed successfully',
    ...deleteOptions
  } = options;

  const deleteData = useCallback(async (customUrl = null) => {
    const requestUrl = customUrl || url;
    
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(requestUrl, deleteOptions);
      const result = response.data;

      setData(result);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showToast) {
        toast.success(successMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Delete failed';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, deleteOptions, onSuccess, onError, showToast, successMessage]);

  return {
    data,
    loading,
    error,
    deleteData,
  };
};

/**
 * Custom hook for file upload
 * @param {string} url - Upload endpoint URL
 * @param {Object} options - Upload options
 * @returns {Object} Upload state and utilities
 */
export const useFileUpload = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const {
    onSuccess,
    onError,
    showToast = true,
    successMessage = 'File uploaded successfully',
    onProgress,
    ...uploadOptions
  } = options;

  const uploadFile = useCallback(async (file, customUrl = null) => {
    const requestUrl = customUrl || url;
    
    setLoading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(requestUrl, formData, {
        ...uploadOptions,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...uploadOptions.headers,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
          
          if (onProgress) {
            onProgress(percentCompleted);
          }
        },
      });

      const result = response.data;
      setData(result);
      setProgress(100);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (showToast) {
        toast.success(successMessage);
      }

      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Upload failed';
      setError(errorMessage);
      setProgress(0);
      
      if (onError) {
        onError(err);
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, uploadOptions, onSuccess, onError, showToast, successMessage, onProgress]);

  return {
    data,
    loading,
    error,
    progress,
    uploadFile,
  };
};

export default {
  useFetch,
  usePost,
  usePut,
  useDelete,
  useFileUpload,
};
