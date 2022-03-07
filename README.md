# Node/Express API

URL: https://https://express-api-library.herokuapp.com/

Header example:

```JSON
 'Content-Type': 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI...'
```

### Endpoints

#### **/api/books**

- Method - GET
- Authentication: YES
- Get all books

```JSON
[
	{
		"_id": "622557bc23239b89ffe150c3",
		"title": "Life of Pi",
		"author": "Yann Martel",
		"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292455-51rxEvLljUL.jpg?crop=1xw:0.972xh;center,top&resize=980:*",
		"genre": {
			"_id": "6225567023239b89ffe150a1",
			"name": "Action and Adventure"
		},
		"createdAt": "2022-03-07T00:54:20.145Z",
		"updatedAt": "2022-03-07T00:54:20.145Z",
		"__v": 0
	},
	{
		"_id": "622557fc23239b89ffe150ca",
		"title": "The Three Musketeers",
		"author": "Alexandre Dumas",
		"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292481-41TxXqToCCL.jpg?crop=0.952xw:1xh;center,top&resize=980:*",
		"genre": {
			"_id": "6225567023239b89ffe150a1",
			"name": "Action and Adventure"
		},
		"createdAt": "2022-03-07T00:55:24.169Z",
		"updatedAt": "2022-03-07T00:55:24.169Z",
		"__v": 0
	}
]
```

---

#### **/api/books**

- Method - POST
- Authentication: YES
- Add new book

```JSON
{
	"title": "Life of Pi",
	"author": "Yann Martel",
	"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292455-51rxEvLljUL.jpg?crop=1xw:0.972xh;center,top&resize=980:*",
	"genre": "6225567023239b89ffe150a1"
}
```

---

#### **/api/books/:id**

- Method - GET
- Authentication: YES
- Get a single book by id
- Example param: 622557bc23239b89ffe150c3

```JSON
{
    "_id": "622557bc23239b89ffe150c3",
    "title": "Life of Pi",
    "author": "Yann Martel",
    "imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292455-51rxEvLljUL.jpg?crop=1xw:0.972xh;center,top&resize=980:*",
    "genre": {
        "_id": "6225567023239b89ffe150a1",
        "name": "Action and Adventure"
      },
    "createdAt": "2022-03-07T00:54:20.145Z",
    "updatedAt": "2022-03-07T00:54:20.145Z",
    "__v": 0
  }
```

---

#### **/api/books/:id**

- Method - PUT
- Authentication: YES
- Update a book by id
- Example param: 622557bc23239b89ffe150c3

```JSON
{
    "title": "Life of Pi - Deluxe Edition",
}
```

- Result - the updated document

---

#### **/api/books/:id**

- Method - DELETE
- Authentication: YES
- Update a book by id
- Example param: 622557bc23239b89ffe150c3

````
- Result - the deleted document's ID
```JSON
{
    "_id": "622557bc23239b89ffe150c3",
}
````

---

#### **/api/books/search?title="search term"**

- Method - POST
- Authentication: YES
- Search for match in books names (titles)
- Example url:

```JSON
https://express-api-library.herokuapp.com/api/books/search?title=pi
```

```JSON
[
    {
      "_id": "622557bc23239b89ffe150c3",
      "title": "Life of Pi",
      "author": "Yann Martel",
      "imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292455-51rxEvLljUL.jpg?crop=1xw:0.972xh;center,top&resize=980:*",
      "genre": {
          "_id": "6225567023239b89ffe150a1",
          "name": "Action and Adventure"
      },
      "createdAt": "2022-03-07T00:54:20.145Z",
      "updatedAt": "2022-03-07T00:54:20.145Z",
      "__v": 0
    }
]
```

---

#### **/api/genres/**

- Method - GET
- Authentication: YES
- Get all genres

```JSON
[
	{
		"_id": "6225567023239b89ffe150a1",
		"name": "Action and Adventure",
		"books": [
			"622557bc23239b89ffe150c3",
			"622557fc23239b89ffe150ca"
		],
		"createdAt": "2022-03-07T00:48:48.326Z",
		"updatedAt": "2022-03-07T00:55:24.286Z",
		"__v": 2
	},
	{
		"_id": "6225567b23239b89ffe150a4",
		"name": "Classics",
		"books": [
			"6225583623239b89ffe150d2",
			"6225586323239b89ffe150d9"
		],
		"createdAt": "2022-03-07T00:48:59.111Z",
		"updatedAt": "2022-03-07T00:57:07.897Z",
		"__v": 2
	}
]
```

---

#### **/api/genres/**

- Method - POST
- Authentication: YES
- Add a new genre

```JSON
{
	"name": "Action and Adventure",
}
```

---

#### **/api/genres/:id**

- Method - GET
- Authentication: YES
- Get all books from this genre
- Example param: 6225567023239b89ffe150a1

```JSON
{
	"_id": "6225567023239b89ffe150a1",
	"name": "Action and Adventure",
	"books": [
		{
			"_id": "622557bc23239b89ffe150c3",
			"title": "Life of Pi",
			"author": "Yann Martel",
			"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292455-51rxEvLljUL.jpg?crop=1xw:0.972xh;center,top&resize=980:*",
			"genre": "6225567023239b89ffe150a1",
			"createdAt": "2022-03-07T00:54:20.145Z",
			"updatedAt": "2022-03-07T00:54:20.145Z",
			"__v": 0
		},
		{
			"_id": "622557fc23239b89ffe150ca",
			"title": "The Three Musketeers",
			"author": "Alexandre Dumas",
			"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292481-41TxXqToCCL.jpg?crop=0.952xw:1xh;center,top&resize=980:*",
			"genre": "6225567023239b89ffe150a1",
			"createdAt": "2022-03-07T00:55:24.169Z",
			"updatedAt": "2022-03-07T00:55:24.169Z",
			"__v": 0
		}
	],
	"createdAt": "2022-03-07T00:48:48.326Z",
	"updatedAt": "2022-03-07T00:55:24.286Z",
	"__v": 2
}
```

---

#### **/api/genres/search**

- Method - POST
- Authentication: YES
- Search for match in genres name
- Example url:

```JSON
https://express-api-library.herokuapp.com/api/genres/search?genre=comic
```

```JSON
[
	{
		"_id": "6225569123239b89ffe150a7",
		"name": "Comic Book or Graphic Novel",
		"books": [
			{
				"_id": "6225589823239b89ffe150e1",
				"title": "Watchmen",
				"author": "Alan Moore",
				"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292885-41ZJD5Dw5KL.jpg?crop=1.00xw:0.962xh;0,0.0200xh&resize=980:*",
				"genre": "6225569123239b89ffe150a7",
				"createdAt": "2022-03-07T00:58:00.332Z",
				"updatedAt": "2022-03-07T00:58:00.332Z",
				"__v": 0
			},
			{
				"_id": "622558bb23239b89ffe150e8",
				"title": "The Boy, the Mole, the Fox and the Horse",
				"author": "Charlie Mackesy",
				"imageUrl": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1572292943-418D9yYGB3L.jpg?crop=0.900xw:1.00xh;0.0916xw,0&resize=980:*",
				"genre": "6225569123239b89ffe150a7",
				"createdAt": "2022-03-07T00:58:35.772Z",
				"updatedAt": "2022-03-07T00:58:35.772Z",
				"__v": 0
			}
		],
		"createdAt": "2022-03-07T00:49:21.463Z",
		"updatedAt": "2022-03-07T00:58:35.888Z",
		"__v": 2
	}
]
```

---

#### **/api/users/register**

- Method - POST
- Authentication: NO
- Register new user
- Example body

```JSON
{
  "email": "user@test.com",     // Valid email address
  "password": "123456"          // Minimum 6 characters length
  "repeatPassword": 123456
}
```

Result

```JSON
{
	"_id": "622567e74a3b7262a98c4e1b",
	"email": "user@test.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjU2N2U3NGEzYjcyNjJhOThjNGUxYiIsImlhdCI6MTY0NjYxODU5OSwiZXhwIjoxNjQ2NzA0OTk5fQ.G_msN0ErY4FBTCxbSiNZALTOSqBoTRlomJA1PkfACMc"
}
```

---

#### **/api/users/login**

- Method - POST
- Authentication: NO
- Login to system
- Example body

```JSON
{
  "email": "user@test.com",
  "password": "123456"
}
```

Result

```JSON
{
	"_id": "622567e74a3b7262a98c4e1b",
	"email": "user@test.com",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjU2N2U3NGEzYjcyNjJhOThjNGUxYiIsImlhdCI6MTY0NjYxODU5OSwiZXhwIjoxNjQ2NzA0OTk5fQ.G_msN0ErY4FBTCxbSiNZALTOSqBoTRlomJA1PkfACMc"
}
```

---

#### **/api/users/change-password**

- Method - POST
- Authentication: YES
- Change password
- Example body

```JSON
{
  "currentPassword": "123456",
  "newPassword": "987654321"
}
```
