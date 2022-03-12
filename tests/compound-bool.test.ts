import { ElasticSearchDynamicQuery } from '../lib/index';
import { DataTypeEnum } from '../lib/parser/enum';
import { EmptyCondition } from '../lib/exceptions/EmptyCondition';
import { faker } from '@faker-js/faker';

test('$eq (TEXT) Conditional Operator', async () => {
    const title = faker.lorem.word(2);

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $eq: title
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
                }
            ]
        }
    });
});

test('$eq (NUMBER) Conditional Operator', async () => {
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
    expect(query).toStrictEqual({
        bool: {
            must: [
                {
                    term: {
                        release_year: releaseYear
                    }
                }
            ]
        }
    });
});

test('$neq (TEXT) Conditional Operator', async () => {
    const title = faker.lorem.word(2);

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $neq: title
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
                }
            ]
        }
    });
});

test('$neq (NUMBER) Conditional Operator', async () => {
    const releaseYear = 2022;

    const command = {
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
                    term: {
                        release_year: releaseYear
                    }
                }
            ]
        }
    });
});

test('$in (TEXT) Conditional Operator', async () => {
    const casts = [faker.name.firstName(), faker.name.lastName()];

    const command = {
        casts: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $in: casts
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must: [
                {
                    terms: {
                        casts: casts
                    }
                }
            ]
        }
    });
});

test('$in (NUMBER) Conditional Operator', async () => {
    const releaseYears = [2021, 2025];

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $in: releaseYears
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must: [
                {
                    terms: {
                        release_year: releaseYears
                    }
                }
            ]
        }
    });
});

test('$nin (TEXT) Conditional Operator', async () => {
    const casts = [faker.name.firstName(), faker.name.lastName()];

    const command = {
        casts: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $nin: casts
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must_not: [
                {
                    terms: {
                        casts: casts
                    }
                }
            ]
        }
    });
});

test('$nin (NUMBER) Conditional Operator', async () => {
    const releaseYears = [2021, 2025];

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $nin: releaseYears
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must_not: [
                {
                    terms: {
                        release_year: releaseYears
                    }
                }
            ]
        }
    });
});

test('$like Conditional Operator', async () => {
    const title = faker.lorem.word(2);

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $like: title
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
                }
            ]
        }
    });
});

test('$nlike Conditional Operator', async () => {
    const title = faker.lorem.word(2);

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $nlike: title
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
                }
            ]
        }
    });
});

test('$nlike Conditional Operator', async () => {
    const title = faker.lorem.word(2);

    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $nlike: title
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
                }
            ]
        }
    });
});

test('$lt Conditional Operator', async () => {
    const releaseYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $lt: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            lt: releaseYear
                        }
                    }
                }
            ]
        }
    });
});

test('$lte Conditional Operator', async () => {
    const releaseYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $lte: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            lte: releaseYear
                        }
                    }
                }
            ]
        }
    });
});

test('$gt Conditional Operator', async () => {
    const releaseYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $gt: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gt: releaseYear
                        }
                    }
                }
            ]
        }
    });
});

test('$gte Conditional Operator', async () => {
    const releaseYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $gte: releaseYear
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gte: releaseYear
                        }
                    }
                }
            ]
        }
    });
});

test('$between (lt & gt) Conditional Operator', async () => {
    const releaseGtYear = 2016;
    const releaseLtYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $between: {
                    $gt: releaseGtYear,
                    $lt: releaseLtYear
                }
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gt: releaseGtYear,
                            lt: releaseLtYear
                        }
                    }
                }
            ]
        }
    });
});

test('$between (lt & gte) Conditional Operator', async () => {
    const releaseGtYear = 2016;
    const releaseLtYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $between: {
                    $gte: releaseGtYear,
                    $lt: releaseLtYear
                }
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gte: releaseGtYear,
                            lt: releaseLtYear
                        }
                    }
                }
            ]
        }
    });
});

test('$between (lte & gt) Conditional Operator', async () => {
    const releaseGtYear = 2016;
    const releaseLtYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $between: {
                    $gt: releaseGtYear,
                    $lte: releaseLtYear
                }
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gt: releaseGtYear,
                            lte: releaseLtYear
                        }
                    }
                }
            ]
        }
    });
});

test('$between (lte & gte) Conditional Operator', async () => {
    const releaseGtYear = 2016;
    const releaseLtYear = 2022;

    const command = {
        release_year: {
            type: DataTypeEnum.NUMBER,
            conditions: {
                $between: {
                    $gte: releaseGtYear,
                    $lte: releaseLtYear
                }
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            filter: [
                {
                    range: {
                        release_year: {
                            gte: releaseGtYear,
                            lte: releaseLtYear
                        }
                    }
                }
            ]
        }
    });
});

test('$exists Field Conditional Operator', async () => {
    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $exists: true
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must: [
                {
                    exists: {
                        field: 'title'
                    }
                }
            ]
        }
    });
});

test('$exists Not Field Conditional Operator', async () => {
    const command = {
        title: {
            type: DataTypeEnum.TEXT,
            conditions: {
                $exists: false
            }
        }
    }

    const builder = new ElasticSearchDynamicQuery(command);
    const query = builder.compoundQuery().build();
    expect(query).toStrictEqual({
        bool: {
            must_not: [
                {
                    exists: {
                        field: 'title'
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

