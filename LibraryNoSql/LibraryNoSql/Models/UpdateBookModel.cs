using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace LibraryNoSql.Models
{
    public class UpdateBookModel
    {
        [Required]
        public Guid Id { get; set; }

        public string? Title { get; set; }
        public int Pages { get; set; }
        public string? Author { get; set; }
    }
}
