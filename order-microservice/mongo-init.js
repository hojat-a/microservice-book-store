print('***************************Running mongo-init.js...');
db = db.getSiblingDB('orders'); 
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: "readWrite",
      db: 'orders'
    }
  ]
});
print('************************User creation completed.');