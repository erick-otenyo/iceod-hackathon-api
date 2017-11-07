import { Router } from 'express'

const dbCredentials = {
    dbName: 'broodsites'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let broodsites = Router();

    //list all goats -> /api/goats
    broodsites.get('/', (request, response) => {
        const sitesList = []
        let i = 0;
        db.list((err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total # of brooding sites  under research  -> ' + len);
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
                                    location: doc.location,
                                    contact_person:doc.contact_person
                                };
                                sitesList.push(responseData);
                                i++;
                                if (i >= len) {
                                    response.json({ data: sitesList });
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

    //get site  by id
    broodsites.get('/:id', (request, response) => {
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
                        location: doc.location,
                        contact_person:doc.contact_person
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });



    return broodsites;
}

