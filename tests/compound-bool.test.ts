import { ElasticSearchDynamicQuery } from '../lib/index';
import { DataTypeEnum } from '../lib/parser/enum';
import { EmptyCondition } from '../lib/exceptions/EmptyCondition';
import { faker } from '@faker-js/faker';

test('$eq Conditional Operator', async () => {
    const title = faker.lorem.word(2);
    const releaseYear = 2020;

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $eq: title
            }
        },
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $eq: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must: [
                {
                    match: {
                        title: title
                    }
                },
                {
                    term: {
                        release_year: releaseYear
                    }
                }
            ]
        }
    });
});

test('$neq Conditional Operator', async () => {
    const title = faker.lorem.word(2);
    const cast  = faker.name.firstName();
    const releaseYear = 2022;

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $neq: title
            }
        },
        cast: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $neq: cast
            }
        },
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $neq: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must_not: [
                {
                    match: {
                        title: title
                    }
                },
                {
                    match: {
                        cast: cast
                    }
                },
                {
                    term: {
                        release_year: releaseYear
                    }
                }
            ]
        }
    });
});

test('Empty Condition', async () => {
    const releaseYear = 2020;

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {}
        },
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $eq: releaseYear
            }
        }
    }

    const query = () => {
        const builder = new ElasticSearchDynamicQuery(command);
        return builder.compoundQuery().build()
    };

    expect(query).toThrow(EmptyCondition)
});

