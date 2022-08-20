# easy-firestore
This package will help you in getting and adding data with firebase

## Installation
```
npm i easy-firestore

or 

yarn add easy-firestore
```

## API Reference

### Get all documents in a collection

```
import {useDocs} from "easy-firestore/hooks"

const {data, numberOfData, dataLoading} = useDocs(db, collectionName)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `db`      | | **Required**. Your firestore database |
| `collectionName`| `string`| **Required**. Your collection name|
| `data`| `array` | All data in the collection|
| `numberOfData`| `number`| Number of items in your collection|
| `dataLoading`| `boolean`| Tells you if the process of getting data is done or not|


#### Example

```
const {data: products, numberOfData: numberOfProducts, dataLoading: productsLoading} = useDocs(db, "products")

products.forEach(product => (
  console.log(product.id)
))
```
### Get all documents that matched to a condition in a collection

```
import {useWhereDocs} from "easy-firestore/hooks"

const {data, numberOfData, dataLoading} = useWhereDocs(db, collectionName, whereToLookInTheDocument, whereToLookValue)
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `db`      | | **Required**. Your firestore database |
| `collectionName`| `string`| **Required**. Your collection name|
| `whereToLookInTheDocument`| `string`| **Required**. The field of the document that has to match to the condition|
| `whereToLookValue`| `number or string`| **Required**. The value we will use to check if it matched with the document field|
| `data`| `array` | All data in the collection|
| `numberOfData`| `number`| Number of items in your collection|
| `dataLoading`| `boolean`| Tells you if the process of getting data is done or not|


```
const {data: users, numberOfData: numberOfUsers, dataLoading: usersLoading} = useWhereDocs(db, "users", "city", "senegal")

users.forEach(user => (
  console.log(user.firstname)
))
