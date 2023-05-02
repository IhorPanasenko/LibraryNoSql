using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LibraryNoSql.Models
{
    public class Book
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = String.Empty;

        [BsonElement("pages")]
        public int Pages { get; set; }

        [BsonElement("author")]
        public string Author { get; set; } = String.Empty;

        [BsonElement("given_to_user_id")]
        public Guid? GivenToUserId { get; set; }
    }
}
