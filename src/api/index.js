import { version } from '../../package.json';
import { Router } from 'express';
import goats from './goats'
import broodsites from './broodsites'


export default ({ config, cloudant }) => {
	let api = Router();

	api.use('/goats', goats({ config, cloudant }));
	api.use('/broodsites', broodsites({ config, cloudant }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
