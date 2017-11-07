
import Cloudant from 'cloudant'
import dotenv from 'dotenv'

dotenv.load();

const getDBCredentialsUrl = (jsonData) => {
	var vcapServices = JSON.parse(jsonData);
	// Pattern match to find the first instance of a Cloudant service in
	// VCAP_SERVICES. If you know your service key, you can access the
	// service credentials directly by using the vcapServices object.
	for (var vcapService in vcapServices) {
		if (vcapService.match(/cloudant/i)) {
			return vcapServices[vcapService][0].credentials.url;
		}
	}
}

let cloudant_url;

//When running on Bluemix, this variable will be set to a json object
//containing all the service credentials of all the bound services

if (process.env.VCAP_SERVICES) {
	cloudant_url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
} else {
	cloudant_url = process.env.cloudant_url
}

export default callback => {
	// connect to cloudant cluster, then pass it to `callback`:
	const cloudant = Cloudant(cloudant_url);

	callback(cloudant);
}
