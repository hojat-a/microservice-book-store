print('***************************Running mongo-init.js...');
db = db.getSiblingDB('users'); 
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: "readWrite",
      db: 'users'
    }
  ]
});
print('************************User creation completed.');
