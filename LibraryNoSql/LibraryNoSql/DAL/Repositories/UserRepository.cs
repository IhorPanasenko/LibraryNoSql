using LibraryNoSql.DAL.Interfaces;
using LibraryNoSql.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

namespace LibraryNoSql.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoCollection<User> collection;
        public UserRepository(IConfiguration configuration)
        {
            var connString =
           configuration.GetConnectionString("MongoDBConnection");
            collection = new MongoClient(connString)
            .GetDatabase("LibraryDB")
            .GetCollection<User>("User");
        }

        public User Insert(User user)
        {
            var existingUser = GetByLogin(user.Login);
            if (existingUser != null)
                throw new Exception("User with same login already exists");

            user.Id = Guid.NewGuid();
            user.Password = HashPassword(user.Password);
            collection.InsertOne(user);
            return user;
        }
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
        public IReadOnlyCollection<User> GetAll()
        {
            return collection
            .Find(x => true)
            .ToList();
        }
        public User GetById(Guid id)
        {
            return collection
            .Find(x => x.Id == id)
            .FirstOrDefault();
        }
        public User GetByLogin(string login)
        {
            return collection
            .Find(x => x.Login == login)
           .FirstOrDefault();
        }
        public User GetByLoginAndPassword(string login, string password)
        {
            return collection
            .Find(x => x.Login == login &&
            x.Password == HashPassword(password))
            .FirstOrDefault();
        }
        public async void CreateIndexes()
        {
            await collection.Indexes
            .CreateOneAsync(new CreateIndexModel<User>(Builders<User>.IndexKeys.Ascending(_ => _.Id)))
            .ConfigureAwait(false);

            await collection.Indexes
            .CreateOneAsync(new CreateIndexModel<User>(Builders<User>.IndexKeys.Ascending(_ => _.Login)))
            .ConfigureAwait(false);
        }

        User IUserRepository.Update(UpdateUserModel updateUser)
        {
            var user = GetById(updateUser.Id);
            if (user == null)
                throw new Exception("User with this id does not exist");

            if(updateUser.Password != null)
            {
                updateUser.Password = HashPassword(updateUser.Password);
            }

            var updateDefination = new List<UpdateDefinition<User>>();
            var filter = Builders<User>.Filter.Eq("_id", updateUser.Id);

            foreach (PropertyInfo prop in typeof(UpdateUserModel).GetProperties())
            {
                Console.WriteLine("{0} = {1}", prop.Name, prop.GetValue(updateUser, null));

                if (prop.GetValue(updateUser, null) != null)
                {
                    if (prop.Name.ToLower() == "id")
                    {
                        continue;
                    }

                    updateDefination.Add(Builders<User>.Update.Set(prop.Name.ToLower(), prop.GetValue(updateUser, null)));
                }
            }

            var combinedUpdate = Builders<User>.Update.Combine(updateDefination);

            var result = collection.UpdateOne(filter, combinedUpdate);
            user = GetById(updateUser.Id);
            return user;
        }
    }
}
