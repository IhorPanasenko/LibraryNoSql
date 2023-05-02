﻿using LibraryNoSql.Models;
using MongoDB.Bson;

namespace LibraryNoSql.DAL.Interfaces
{
    public interface IUserRepository
    {
        public User Insert(User user);
        public IReadOnlyCollection<User> GetAll();
        public User GetById(ObjectId id);
        public User GetByLogin(string login);
        public User GetByLoginAndPassword(string login, string password);
    }
}
