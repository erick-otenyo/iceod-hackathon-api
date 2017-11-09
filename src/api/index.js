import { version } from '../../package.json';
import { Router } from 'express';
import goats from './goats'
import broodsites from './broodsites'
import poultrygroups from './poultrygroups'
import weightgains from './weightgains'
import weanercalves from './weanercalves'
import weightgainbenefit from './weightgainbenefit'
import irrigationforage from './irrigationforage'
import amaranthgroups from './amaranthgroups'


export default ({ config, cloudant }) => {
	let api = Router();

	api.use('/goats', goats({ config, cloudant }));
	api.use('/broodsites', broodsites({ config, cloudant }));
	api.use('/poultrygroups', poultrygroups({ config, cloudant }));
	api.use('/weightgains', weightgains({ config, cloudant }));
	api.use('/weanercalves', weanercalves({ config, cloudant }));
	api.use('/weightgainbenefit', weightgainbenefit({ config, cloudant }));
	api.use('/irrigationforage', irrigationforage({ config, cloudant }));
	api.use('/amaranthgroups', amaranthgroups({ config, cloudant }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
