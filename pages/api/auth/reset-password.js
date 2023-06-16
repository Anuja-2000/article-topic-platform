const handler = async(req, res) => {

    console.log(req.body);
    // Set up CORS headers with options

    const method = 'GET';
    const url = `https://6w0yznyace.execute-api.eu-north-1.amazonaws.com/prod/products`;
    const option = {
        method: method,
    
    }

// Set up CORS headers with options
  try{
        const response = await fetch(url,option);
        const finalData1 = await response.json();


      } catch (error) {
         console.error(error)
         return res.status(error.status || 500).end(error.message);
    }
    try{
        const response = await fetch(`https://6w0yznyace.execute-api.eu-north-1.amazonaws.com/prod/reset`, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
              'Content-Type': 'application/json'
            }
          });

    
            return res.status(200).json(response);
          } catch (error) {
             console.error(error)
             return res.status(error.status || 500).end(error.message);
        }

        
       

      
}
  
export default handler;