# book-store

## Architecture
![architecture](https://github.com/hojat-a/microservice-book-store/blob/develop/book-store-microservice.png)

### gateway service

#### responsibilities: 
  - authentication (using JWT)
  - authorization (using Role-base access control)
  - validation
  - protocol conversion
  
#### database:
  - Redis for token invalidation

#### future improvements:
  - replace redis with a SQL-base database
  - add refresh token
  - add token revocation 

### user service

#### responsibilities: 
- user management
  
#### database:
- Mongodb to store user data

#### future improvements:
  - add password management Apis like forget pass / change pass

### inventory service

#### responsibilities: 
  - products management
  - cart management
  - inventory management

#### database:
  - Redis for managing cart, cache and lock
  - mongodb to store products data

### order service

#### responsibilities: 
  - orders management
  - payment

#### database:
  - Redis for lock
  - mongodb to store orders data

### Algorithms
#### favorite books (best seller)
add a score key in database and increase the score after each successful payment. (you can implement a review service for scoring and commenting as an extra method to calculate the popularity)
#### cart
use the redis as an in-memory key-value database and its hash data type for fast cart operations
#### inventory management
most challenging part of the project
you should reserve the products quantity during the payment process. So you have to lock the products, reserve them for client and increment the stock after successful payment process.
3 different situation can occur during the payment that you should consider in your scenario:

  1- successful payment : 

    - reserve the products
    - create a new order 
    - pay successfully
    - update the order
    - decrement the stock asynchronously
    - increment the score asynchronously
    - remove the cart data asynchronously
  
  2 - unsuccessful payment

    - reserve the products
    - create a new order 
    - pay unsuccessfully
    - update the order
    - remove the reservation asynchronously
  
  3- client close the browser without any action

    - reserve the product
    - create a new order
    - expire the reservation after a certain time