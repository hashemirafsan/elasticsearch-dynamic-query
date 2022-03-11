import { ElasticSearchQueryBuilder } from '../lib/index';
import { DataTypeEnum } from '../lib/parser/enum';

const command = {
    // title: {
    //     type: DataTypeEnum.TEXT,
    //     conditions: {

    //     }
    // }
    release_year: {
        type: DataTypeEnum.NUMBER,
        conditions: {
            $eq: 2020,
            // $lt: 2020,
            // $lte: 2020,
            // $gte: 2016
        }
    },
    rating: {
        type: DataTypeEnum.TEXT,
        conditions: {
            $eq: "TV-Y7"
        }
    }
    // show_id: {
    //     type: DataTypeEnum.ID,
    //     conditions: {
    //         $eq: 's18',
    //         // $neq: 's35',
    //         // $nin: ['s35', 's18']
    //     }
    // },
    // type: {
    //     type: DataTypeEnum.TEXT,
    //     conditions: {
    //         $eq: 'TV Show'
    //     }
    // }
}

test('Redis DESTROY', async () => {
    const builder = new ElasticSearchQueryBuilder(command);
    const query = builder.compoundQuery().build();
    console.log(JSON.stringify(query));
});
