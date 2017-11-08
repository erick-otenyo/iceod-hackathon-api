import { Router } from 'express'

const dbCredentials = {
    dbName: 'weanercalves'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let weanercalves = Router();

    //list all goats -> /api/goats
    weanercalves.get('/', (request, response) => {
        const List = []
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
                                    feed_diet: doc.feed_diet,
                                    parameters: doc.parameters
                                }
                                List.push(responseData);
                                i++;
                                if (i >= len) {
                                    response.json({ data: List });
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
    weanercalves.get('/:id', (request, response) => {
        const id = request.params.id
        if (id != "") {
            db.get(id, (err, doc) => {
                if (err) {
                    response.json({ error: err.error });
                    return;
                } else {
                    const responseData = {
                        id: doc._id,
                        feed_diet: doc.feed_diet,
                        parameters: doc.parameters
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });

    return weanercalves;
}

