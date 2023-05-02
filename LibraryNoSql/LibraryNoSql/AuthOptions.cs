using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LibraryNoSql
{
    public class AuthOptions
    {
        public const string Issuer = "NoSQLLab";
        public const string Audience = "http://localhost";
        public static readonly TimeSpan Lifetime = TimeSpan.FromHours(3);
        private const string Key = "DOCKERWHALEDOCKERWHALE";
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
        }
    }
}
