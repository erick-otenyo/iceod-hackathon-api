import { Router } from 'express'

const dbCredentials = {
    dbName: 'weightgains'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let weightgains = Router();

    //list all goats -> /api/goats
    weightgains.get('/', (request, response) => {
        const weightList = []
        let i = 0;
        db.list((err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total #  under research  -> ' + len);
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
                                    treatment: doc.treatment,
                                    weights: doc.weight
                                }
                                weightList.push(responseData);
                                i++;
                                if (i >= len) {
                                    response.json({ data: weightList });
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
    weightgains.get('/:id', (request, response) => {
        const id = request.params.id
        if (id != "") {
            db.get(id, (err, doc) => {
                if (err) {
                    response.json({ error: err.error });
                    return;
                } else {
                    const responseData = {
                        id: doc._id,
                        treatment: doc.treatment,
                        weights: doc.weight
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });

    return weightgains;
}

