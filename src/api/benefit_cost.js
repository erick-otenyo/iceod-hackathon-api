import { Router } from 'express'

const dbCredentials = {
    dbName: 'benefit_cost_analysis'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let benefit_cost = Router();

    //list all goats -> /api/goats
    benefit_cost.get('/input_requirement', (request, response) => {
        const List = []
        let i = 0;
        db.view('benefit_cost','input_req',{include_docs:true},(err, body) => {
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
                            project: doc.doc.project,
                            item: doc.doc.item
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

    benefit_cost.get('/comparison', (request, response) => {
        const List = []
        let i = 0;
        db.view('benefit_cost','comparison',{include_docs:true},(err, body) => {
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
                            project: doc.doc.project,
                            item: doc.doc.item
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

    return benefit_cost;
}

