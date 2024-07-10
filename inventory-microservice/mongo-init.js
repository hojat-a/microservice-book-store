print('***************************Running mongo-init.js...');
db = db.getSiblingDB('inventory'); 
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: "readWrite",
      db: 'inventory'
    }
  ]
});
print('************************User creation completed.');