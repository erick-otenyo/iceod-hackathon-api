import { Router } from 'express'

const dbCredentials = {
    dbName: 'weightgainbenefit'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let weightgainbenefit = Router();

    //list all goats -> /api/goats
    weightgainbenefit.get('/', (request, response) => {
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
                                    treatment: doc.treatment,
                                    weight_increase: doc.weight_increase,
                                    expected_benefits:doc.weight_increase,
                                    expected_cost:doc.expected_cost,
                                    benefit_cost_ratio:doc.benefit_cost_ratio,
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
    weightgainbenefit.get('/:id', (request, response) => {
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
                        weight_increase: doc.weight_increase,
                        expected_benefits:doc.weight_increase,
                        expected_cost:doc.expected_cost,
                        benefit_cost_ratio:doc.benefit_cost_ratio,
                    }
                    response.json({ data: responseData });
                }

            });
        }
    });

    return weightgainbenefit;
}

