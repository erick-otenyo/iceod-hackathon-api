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
        const List = []
        let i = 0;
        db.list({include_docs:true},(err, body) => {
            if (!err) {
                const len = body.rows.length;
                console.log('total # of groups under research  -> ' + len);
                if (len == 0) {
                    response.json({ "data": [] })
                }
                else {
                    body.rows.forEach(doc => {
                        const responseData = {
                            id: doc.doc.id,
                            name: doc.doc.name,
                            location: doc.doc.location,
                            contact_person:doc.doc.contact_person
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

