const axios = require('axios');
const applyFilter = require('../../util').applyFilter;

const DataController = async(req, res) => {
    //variable declaration
    const data_urls = req.body.urls || "",
        filter = req.body.filter || null;
    let data = [];
   
    try {
         //fetch data from url list
        const requests = data_urls.map((url) => axios.get(url));
        const response = await Promise.all(requests)

        //combine the result to one data array
        response.forEach((d) => {
            data = data.concat(d.data)
        });

        //filter array of event
        data = applyFilter(data, filter);

        //return filtered array of event
        return res.json(data)
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({error: 'you have issues with the request! (see logs)'})
    }

}

module.exports = DataController;