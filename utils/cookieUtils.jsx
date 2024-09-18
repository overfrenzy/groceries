export const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Check if this cookie starts with the given name
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); // Return cookie value
      }
    }
    
    return null; // If no cookie found, return null
  };
  