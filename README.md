# Elasticsearch Dynamic Query Builder

A simple query builder, it will helps to develop DSL query for elasticsearch

## Installation

You can start it from npm. Go to your terminal and run this command from your project root directory.

```javascript
npm install elasticsearch-dynamic-query
```
After installation, import Elasticsearch Dynamic Query Builder in your file,

```javascript
const { ElasticSearchDynamicQuery } = require('elasticsearch-dynamic-query');
```
Now you are ready to build your queries by your logical command.

## Usage
Before build your query you need to develop your logical command based on your requirements. For building your logical command need to maintain a proper structure. Here is regular example,
```typescript
const command = {
    fieldName: {
        type: T // ID, TEXT, NUMBER, ARRAY, DATETIME,
        conditions: {
            $eq?: any;
            $neq?: any;
            $in?: string[] | number[];
            $nin?: string[] | number[];
            $like?: any;
            $nlike?: any;
            $lt?: string | number;
            $lte?: string | number;
            $gt?: string | number;
            $gte?: string | number;
            $exists?: boolean;
            $regex?: string;
            $between: {
                $lt?: string | number;
                $lte?: string | number;
                $gt?: string | number;
                $gte?: string | number;
            }
        }
    }
}
```
In your command you can pass multiple fields with type and conditions. Here is multiple accepatable data type and conditional operators.

#### Data type
This data type will be accept as `type` value in your field.
```typescript
export enum DataTypeEnum {
  ID = 'ID',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  ARRAY = 'ARRAY',
  DATETIME = 'DATETIME',
}
```
#### Conditonal Operator
This conditional operator will be accept as `conditions` value in your field.

| Operator | Description |
| -------- | ----------- |
| $eq      | Equal       |
| $neq     | Not Equal   |
| $in      | Included in an array |
| $nin     | Not included in an array |
| $like    | Match in text |
| $nlike   | Not match in text |
| $lt      | Less than |
| $lte     | Less than or equal to |
| $gt      | Greater than |
| $gte     | Greater than or equal to |
| $exists  | Exists field or not |
| $regex   | Supported regular expression |
| $between | Is between |

Initialize Elasticsearch Dynamic Query Builder:
```typescript
const builder = new ElasticSearchDynamicQuery(command);
```
#### List of Query
- [Compound Query](#compound-query)

##### Compound Query
Compound queries wrap other compound or leaf queries, either to combine their results and scores, to change their behaviour, or to switch from query to filter context. Currently this package support these query under Compound Query:
- [Bool Query](#bool-query)

##### Bool Query:
The default query for combining multiple leaf or compound query clauses, as `must`, `should`, `must_not`, or `filter` clauses. The must and should clauses have their scores combined — the more matching clauses, the better — while the must_not and filter clauses are executed in filter context. Below added example how to use Bool Query:
```typescript
const query = builder.compoundQuery().build();
```
In default, Compound Query Build Bool query so no need to pass any type under `compoundQuery()` to build dynamic query. But `compoundQuery(type)` can accept other type. 

This `.build()` function will generate a validate object using logical command 
```json
{
  "bool": {
    "must": [
      {
        "match": {
          "cast": "Antti"
        }
      }
    ],
    "filter": [
      {
        "range": {
          "release_year": {
            "lt": 2020,
            "gte": 2016
          }
        }
      }
    ]
  }
}
```

You can pass generated query to your searching index.

## Contributing

Pull requests are welcome. For any changes, please open an issue first to discuss what you would like to change.
