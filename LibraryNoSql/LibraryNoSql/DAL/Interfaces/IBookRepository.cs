using LibraryNoSql.Models;
using MongoDB.Bson;

namespace LibraryNoSql.DAL.Interfaces
{
    public interface IBookRepository
    {
        public Book Insert(Book book);

        public ICollection<Book> GetByUser(ObjectId userId);

        public Book GetById(ObjectId id);

        public IReadOnlyCollection<Book> GetAll();

        public void Delete(ObjectId bookId);

        public Book GiveBookToUser(ObjectId bookId, ObjectId userId);

        public Book RetrieveBookFromUser(ObjectId bookId);
    }
}
