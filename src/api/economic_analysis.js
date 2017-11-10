import { Router } from 'express'

const dbCredentials = {
    dbName: 'economic_analysis'
};

export default ({ config, cloudant }) => {

    //use projects db
    const db = cloudant.use(dbCredentials.dbName);

    let economic_analysis = Router();

    //list all goats -> /api/goats
    economic_analysis.get('/acreages', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','acreages',{include_docs:true},(err, body) => {
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
                            species: doc.doc.grass_species,
                            period: doc.doc.period
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

    economic_analysis.get('/livestock_units', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','livestock_units',{include_docs:true},(err, body) => {
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
                            species: doc.doc.grass_species,
                            biomass: doc.doc.biomass,
                            no_of_tlu: doc.doc.no_of_tlu,
                            carrying_capacity:doc.doc.carrying_capacity
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

    economic_analysis.get('/unit_cost', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','unit_cost',{include_docs:true},(err, body) => {
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
                            item: doc.doc.item,
                            unit_cost_range: doc.doc.unit_cost_range,
                            average_unit: doc.doc.average_unit,

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

    economic_analysis.get('/input_cost', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','input_cost',{include_docs:true},(err, body) => {
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
                            species: doc.doc.grass_species,
                            activity: doc.doc.activity
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

    economic_analysis.get('/cash_flow', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','cash_flow',{include_docs:true},(err, body) => {
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
                            species: doc.doc.grass_species,
                            biomass: doc.doc.biomass,
                            average_unit_cost: doc.doc.average_unit_cost,
                            total_revenue: doc.doc.total_revenue,
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

    economic_analysis.get('/cost_benefit', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','cost_benefit',{include_docs:true},(err, body) => {
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
                            species: doc.doc.grass_species,
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

    economic_analysis.get('/milk_yield', (request, response) => {
        const List = []
        let i = 0;
        db.view('eco_analysis','milk_yield',{include_docs:true},(err, body) => {
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
                            livestock_type: doc.doc.livestock_type,
                            milk_yield: doc.doc.milk_yield
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


    return economic_analysis;
}

