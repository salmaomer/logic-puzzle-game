export const registerUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:3211/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error in registerUser():', error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:3211/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), // <-- Make sure keys match backend
    });

    const data = await response.json();
    console.log("Login Response Data:", data); // Debug

    return {
      success: response.ok, // true if status 200-299
      ...data, // spread backend's actual response
    };
  } catch (error) {
    console.error('Error in loginUser():', error);
    throw error;
  }
};


export const verifyToken = async (token) => {
  try {
    const response = await fetch('http://localhost:3211/users/verify-token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error in verifyToken():', error);
    throw error;
  }
};
