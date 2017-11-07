import { Router } from 'express'

const dbCredentials = {
    dbName: 'goats'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let goats = Router();

    //list all goats -> /api/goats
    goats.get('/', (request, response) => {
        const goatdistList = []
        let i = 0;
        db.list((err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total # of counties under research  -> ' + len);
                if (len == 0) {
                    response.json({ "data": [] })
                }
                else {
                    body.rows.forEach(doc => {
                        db.get(doc.id, {
                            revs_info: true
                        }, (err, doc) => {
                            if (!err) {
                                const responseData = {
                                    id: doc._id,
                                    county: doc.county,
                                    distribution: doc.distribution
                                };


                                goatdistList.push(responseData);
                                i++;
                                if (i >= len) {
                                    response.json({ data: goatdistList });
                                    console.log('ending response...');
                                    response.end();
                                }
                            } else {
                                console.log(err);
                            }
                        });
                    });
                }
            }
        });


    });

    //get county goat dist by id
    goats.get('/:id', (request, response) => {
        const id = request.params.id
        if (id != "") {
            db.get(id, (err, doc) => {
                if (err) {
                    response.json({ error: err.error });
                    return;
                } else {
                    const responseData = {
                        id: doc._id,
                        county: doc.county,
                        distribution: doc.distribution
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });



    return goats;
}

