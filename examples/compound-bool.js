const { ElasticSearchDynamicQuery } = require('elasticsearch-dynamic-query');

function example1() {
    const command = {
        title: {
            type: 'TEXT',
            conditions: {
                $eq: title
            }
        }
    }
    
    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    console.log(query);
    // bool: {
    //     must: [
    //         {
    //             match: {
    //                 title: title
    //             }
    //         }
    //     ]
    // }
}

function example2() {
    const releaseYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $eq: releaseYear
            }
        }
    }
    
    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    console.log(query);
    // bool: {
    //     must: [
    //         {
    //             term: {
    //                 release_year: releaseYear
    //             }
    //         }
    //     ]
    // }
}