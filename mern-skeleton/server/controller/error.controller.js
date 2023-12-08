function handleError(req, res, err) {
    console.error(err); 
    res.status(500).json({ error: 'Internal Server Error' }); // You can customize the response as needed
  }
  
  function getErrorMessage(errMsg) {
    console.error(errMsg);
    return errMsg.message || 'Internal Server Error'; // Return the error message or a default message
  }
  
  export default {
    handleError: handleError,
    getErrorMessage: getErrorMessage,
  };
  