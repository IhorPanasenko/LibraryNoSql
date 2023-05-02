using MongoDB.Bson;

namespace LibraryNoSql.ApiModels
{
    public class GiveBookToUserApiModel
    {
        public Guid bookId { get; set; }
        public Guid userId { get; set; }
    }
}
