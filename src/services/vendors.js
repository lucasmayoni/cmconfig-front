import axios from 'axios'

const searchVendors = function (parameters) {
    let params = "model="+parameters.searchTxt;
    if(typeof parameters.page !== 'undefined')
        params += "&page="+parameters.page;
    return axios.get('http://local.cmconfig.com/api/v1/modems?' + params)
}

const addVendor = function (parameters) {
    let params = {
        name : parameters.vsi_model,
        vendor: parameters.vsi_vendor,
        version : "V1"
    };
    return axios.post('http://local.cmconfig.com/api/v1/modems', params);

}

export default {
    searchVendors,
    addVendor
}
