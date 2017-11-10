import { Router } from 'express'

const dbCredentials = {
    dbName: 'grass_seeds'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let grass_seeds = Router();

    //list all goats -> /api/goats
    grass_seeds.get('/recipients', (request, response) => {
        const List = []
        let i = 0;
        db.list({ include_docs: true }, (err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total # of groups under research  -> ' + len);
                if (len == 0) {
                    response.json({ "data": [] })
                }
                else {
                    body.rows.forEach(doc => {
                        const responseData = {
                            species: doc.doc.grass_seed,
                            recipients: doc.doc.recipients
                        };
                        List.push(responseData);
                        i++;
                        if (i >= len) {
                            response.json({ data: List });
                            console.log('ending response...');
                            response.end();
                        }


                    });
                }
            }
        });
    });

    return grass_seeds;
}

