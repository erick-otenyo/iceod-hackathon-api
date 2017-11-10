import { Router } from 'express'

const dbCredentials = {
    dbName: 'chicksupply'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let chicksupply = Router();

    //list all goats -> /api/goats
    chicksupply.get('/', (request, response) => {
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
                            county: doc.doc.county,
                            category: doc.doc.category,
                            supply:doc.doc.supply
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
    chicksupply.get('/:id', (request, response) => {
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
                        category: doc.category,
                        supply:doc.supply
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });



    return chicksupply;
}

