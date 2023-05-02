using LibraryNoSql.DAL.Interfaces;
using LibraryNoSql.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Net;
using System.Reflection;

namespace LibraryNoSql.DAL.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly IMongoCollection<Book> bookCollection;
        private readonly IMongoCollection<User> userCollection;
        public BookRepository(IConfiguration configuration)
        {
            var connString = configuration.GetConnectionString("MongoDBConnection");

            bookCollection = new MongoClient(connString)
            .GetDatabase("LibraryDB")
            .GetCollection<Book>("Book");

            userCollection = new MongoClient(connString)
            .GetDatabase("LibraryDB")
            .GetCollection<User>("User");
        }


        public Book Insert(Book book)
        {
            book.Id = Guid.NewGuid();
            bookCollection.InsertOne(book);
            return book;
        }
        public ICollection<Book> GetByUser(Guid userId)
        {
            return bookCollection
            .Find(x => x.GivenToUserId == userId)
            .ToList();
        }
        public Book GetById(Guid id)
        {
            return bookCollection
            .Find(x => x.Id == id)
            .FirstOrDefault();
        }
        public IReadOnlyCollection<Book> GetAll()
        {
            return bookCollection
            .Find(x => true)
            .ToList();
        }
        public void Delete(Guid bookId)
        {
            bookCollection.DeleteOne((x) => x.Id == bookId);
        }
        public Book GiveBookToUser(Guid bookId, Guid userId)
        {
            var book = GetById(bookId);
            if (book == null)
                throw new Exception("Book with this id does not exist");
            var user = userCollection.Find(x => x.Id == userId).FirstOrDefault();

            if (user == null)
                throw new Exception("User with this id does not exist");

            if (book.GivenToUserId != Guid.Empty && book.GivenToUserId != null)//&& book.GivenToUserId.ToString() != "")
                throw new Exception("Book is already given to user number " + book.GivenToUserId);

            var filter = Builders<Book>.Filter.Eq("_id", bookId);
            var update = Builders<Book>.Update.Set("given_to_user_id", userId);

            var result = bookCollection.UpdateOne(filter, update);
            return book;
        }
        public Book RetrieveBookFromUser(Guid bookId)
        {
            var book = GetById(bookId);
            if (book == null)
                throw new Exception("Book with this id does not exist");

            var filter = Builders<Book>.Filter.Eq("_id", bookId);
            var update = Builders<Book>.Update.Set("given_to_user_id", Guid.Empty);

            var result = bookCollection.UpdateOne(filter, update);
            return book;
        }
        public async void CreateIndexes()
        {
            await bookCollection.Indexes
            .CreateOneAsync(new CreateIndexModel<Book>(Builders<Book>.IndexKeys.Ascending(_ => _.Id)))
            .ConfigureAwait(false);
        }

        public Book Update(UpdateBookModel updateBook)
        {
            var book = GetById(updateBook.Id);
            if (book == null)
                throw new Exception("Book with this id does not exist");

            var updateDefination = new List<UpdateDefinition<Book>>();
            var filter = Builders<Book>.Filter.Eq("_id", updateBook.Id);

            foreach (PropertyInfo prop in typeof(UpdateBookModel).GetProperties())
            {
                Console.WriteLine("{0} = {1}", prop.Name, prop.GetValue(updateBook, null));

                if(prop.GetValue(updateBook, null) != null)
                {
                    if(prop.Name.ToLower() == "id")
                    {
                        continue;
                    }

                    updateDefination.Add(Builders<Book>.Update.Set(prop.Name.ToLower(), prop.GetValue(updateBook, null)));
                }
            }

            var combinedUpdate = Builders<Book>.Update.Combine(updateDefination);

            var result = bookCollection.UpdateOne(filter, combinedUpdate);
            book = GetById(updateBook.Id);
            return book;
        }        
    }
}

/*
 {
  "bookId": "24f6518d-539e-428a-88ae-65e5bd370bc4",
  "userId": "332a5c6e-3307-4c8d-96f8-de1051976c9f"
}
 */