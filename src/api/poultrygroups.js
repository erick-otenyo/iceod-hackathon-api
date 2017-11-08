import { Router } from 'express'

const dbCredentials = {
    dbName: 'poultrygroups'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let poultrygroups = Router();

    //list all goats -> /api/goats
    poultrygroups.get('/', (request, response) => {
        const groupsList = []
        let i = 0;
        db.list((err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total # of groups under research  -> ' + len);
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
                                    name: doc.name,
                                    male: doc.male,
                                    female: doc.female,
                                    total: doc.total_direct,
                                };


                                groupsList.push(responseData);
                                i++;
                                if (i >= len) {
                                    response.json({ data: groupsList });
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
    poultrygroups.get('/:id', (request, response) => {
        const id = request.params.id
        if (id != "") {
            db.get(id, (err, doc) => {
                if (err) {
                    response.json({ error: err.error });
                    return;
                } else {
                    const responseData = {
                        id: doc._id,
                        name: doc.name,
                        male: doc.male,
                        female: doc.female,
                        total: doc.total_direct,
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });



    return poultrygroups;
}

