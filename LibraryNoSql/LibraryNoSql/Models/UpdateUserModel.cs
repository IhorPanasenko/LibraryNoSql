using System.ComponentModel.DataAnnotations;

namespace LibraryNoSql.Models
{
    public class UpdateUserModel
    {
        [Required]
        public Guid Id { get; set; }
        public string? Role { get; set; }
    }
}
