import { ElasticSearchDynamicQuery } from '../lib/index';
import { DataTypeEnum } from '../lib/parser/enum';

const command = {
    title: {
        type: DataTypeEnum.TEXT,
        conditions: {
            $eq: 'Bir'
        }
    },
    release_year: {
        type: DataTypeEnum.NUMBER,
        conditions: {
            // $regex: "ki*"
            // $exists: false
            // $eq: 2020,
            // $lt: 2020,
            // $gte: 2021,
            $between: {
                $lt: 2020,
                $gte: 2016
            }
            // $lte: 2020,
            // $gte: 2016
            // $in: [2020, 2022],
            // $nin: [2021, 2022]
        }
    },
    // rating: {
    //     type: DataTypeEnum.TEXT,
    //     conditions: {
    //         $regex: "TV-Y7"
    //     }
    // }
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
    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    console.log(JSON.stringify(query));
});
