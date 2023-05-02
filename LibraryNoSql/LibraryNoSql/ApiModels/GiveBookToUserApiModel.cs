using MongoDB.Bson;

namespace LibraryNoSql.ApiModels
{
    public class GiveBookToUserApiModel
    {
        public ObjectId bookId { get; set; }
        public ObjectId userId { get; set; }
    }
}
