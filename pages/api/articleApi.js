const handler = async(req, res) => {

    const method = 'GET';
    const {id} = req.query;
    const url = `https://6w0yznyace.execute-api.eu-north-1.amazonaws.com/prod/article?id=${id}`;
    const option = {
        method: method,
    
    }

    // Set up CORS headers with options
    try{
            const response = await fetch(url,option);
            const finalData = await response.json();
            return res.status(200).json(finalData);
          } catch (error) {
             console.error(error)
             return res.status(error.status || 500).end(error.message);
        }
}
  
export default handler;