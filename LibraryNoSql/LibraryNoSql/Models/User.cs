using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace LibraryNoSql.Models
{
    public class User
    {
        [BsonId]
        public Guid Id { get; set; }

        [BsonElement("login")]
        public string Login { get; set; } = String.Empty;

        [BsonElement("password")]
        public string Password { get; set; } = String.Empty;
    }
}
