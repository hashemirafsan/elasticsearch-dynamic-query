const command = {
    title: {
        type: 'TEXT',
        conditions: {
            $like: 'Chupke'
        }
    },
    release_year: {
        type: 'NUMBER',
        conditions: {
            // $eq: 2020,
            // $lt: 2020,
            // $lte: 2020,
            // $gte: 2016,
            $in: [1970, 1975]
        }
    },
    // show_id: {
    //     type: 'ID',
    //     conditions: {
    //         // $eq: 's18',
    //         // $neq: 's35',
    //         $nin: ['s35', 's18']
    //     }
    // },
    // type: {
    //     type: 'TEXT',
    //     conditions: {
    //         $eq: 'TV Show'
    //     }
    // }
}

const query = {}

const elasticKey = {
    must: 'must',
    mustNot: 'must_not',
    should: 'should',
    filter: 'filter'
}

const subjectKey = {
    term: 'term',
    terms: 'terms',
    match: 'match'
}

function setKey(key) {
    if (!query.hasOwnProperty(key)) {
        query[key] = [];
    }
}

function _eq(property, value) {
    const { must } = elasticKey;
    const { term } = subjectKey;
    setKey(must, term);

    query[must].push({
        term: {
            [property]: value
        }
    }) 
}

function _neq(property, value) {
    const { mustNot } = elasticKey;
    const { term } = subjectKey;
    setKey(mustNot, term);

    query[mustNot].push({
        term: {
            [property]: value
        }
    }) 
}

function _like(property, value) {
    const { must } = elasticKey;
    const { match } = subjectKey;
    setKey(must, match);

    query[must].push({
        match: {
            [property]: value
        }
    }) 
}

function _in(property, value) {
    const { must } = elasticKey;
    const { terms } = subjectKey;
    setKey(must, terms);

    query[must].push({
        terms: {
            [property]: value
        }
    })  
}

function _nin(property, value) {
    const { mustNot } = elasticKey;
    const { terms } = subjectKey;
    setKey(mustNot, terms);

    query[mustNot].push({
        terms: {
            [property]: value
        }
    })  
}

function _lt(property, value) {
    const { filter } = elasticKey;
    const { terms } = subjectKey;
    setKey(filter, terms);

    query[filter].push({
        range: {
            [property]: {
                lt: value
            }
        }
    })  
}

function _lte(property, value) {
    const { filter } = elasticKey;
    const { terms } = subjectKey;
    setKey(filter, terms);

    query[filter].push({
        range: {
            [property]: {
                lte: value
            }
        }
    })  
}

function _gt(property, value) {
    const { filter } = elasticKey;
    const { terms } = subjectKey;
    setKey(filter, terms);

    query[filter].push({
        range: {
            [property]: {
                gt: value
            }
        }
    })  
}

function _gte(property, value) {
    const { filter } = elasticKey;
    const { terms } = subjectKey;
    setKey(filter, terms);

    query[filter].push({
        range: {
            [property]: {
                gte: value
            }
        }
    })  
}


function parseCommand(command) {

    Object.keys(command).forEach(property => {
        const conditions = command[property].conditions;
        Object.keys(conditions).forEach(logic => {
            if (logic === '$eq') {
                if (command[property].type === 'NUMBER' || command[property].type === 'ID') {
                    _eq(property, conditions[logic])
                }

                if (command[property].type === 'TEXT') {
                    _like(property, conditions[logic])
                }
            }

            if (logic === '$neq') _neq(property, conditions[logic])

            if (logic === '$in') _in(property, conditions[logic])

            if (logic === '$nin') _nin(property, conditions[logic])

            if (logic === '$like') _like(property, conditions[logic])

            if (logic === '$lt') _lt(property, conditions[logic])

            if (logic === '$lte') _lte(property, conditions[logic])

            if (logic === '$gt') _gt(property, conditions[logic])

            if (logic === '$gte') _gte(property, conditions[logic])
        })
    })

    return query;
}

console.log(JSON.stringify(parseCommand(command)));