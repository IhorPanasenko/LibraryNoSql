using LibraryNoSql.Models;
using MongoDB.Bson;

namespace LibraryNoSql.DAL.Interfaces
{
    public interface IBookRepository
    {
        public Book Insert(Book book);

        public ICollection<Book> GetByUser(Guid userId);

        public Book GetById(Guid id);

        public IReadOnlyCollection<Book> GetAll();

        public void Delete(Guid bookId);

        public Book GiveBookToUser(Guid bookId, Guid userId);

        public Book RetrieveBookFromUser(Guid bookId);

        public Book Update(UpdateBookModel book);
    }
}
