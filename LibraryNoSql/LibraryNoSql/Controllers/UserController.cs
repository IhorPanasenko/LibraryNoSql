using LibraryNoSql.ApiModels;
using LibraryNoSql.DAL.Interfaces;
using LibraryNoSql.DAL.Repositories;
using LibraryNoSql.Models;
using LibraryNoSql.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LibraryNoSql.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(UserApiModel model)
        {
            var existing = userRepository.GetByLogin(model.Login);
            if (existing != null)
                return BadRequest(new
                {
                    Error = "User with this login already exist. Please enter unique name"
                });
            var dbUser = userRepository.Insert(new User()
            {
                Login = model.Login,
                Password = model.Password,
                Role = "User"
            });
            return Ok(dbUser);
        }

        [HttpGet]
        [Route("getAll")]
        public IActionResult GetAll()
        {
            var users = userRepository.GetAll();
            return Ok(users);
        }
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] UserApiModel model)
        {
            var user = userRepository.GetByLoginAndPassword(model.Login, model.Password);

            if (user == null)
            {
                return BadRequest(new
                {
                    Error = "User does not exist"
                });
            }

            var identity = GetIdentity(user.Login, user.Role, user.Id);
            var token = JwtTokenizer.GetEncodedJWT(identity, AuthOptions.Lifetime);
            return new JsonResult(new
            {
                JWT = token
            });
        }
        [HttpPut]
        [Route("Update")]
        public IActionResult Update(UpdateUserModel updateUser)
        {
            return Ok(userRepository.Update(updateUser));
        }
        private ClaimsIdentity GetIdentity(string login, string role, Guid id)
        {
            var claims = new List<Claim>
            {
                new Claim("Name", login),
                new Claim("Role", role),
                new Claim("Id", id.ToString())
            };

            ClaimsIdentity claimsIdentity = new
            ClaimsIdentity(claims, "Token",
            ClaimsIdentity.DefaultNameClaimType,
            ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }

        [HttpGet("GetById")]
        public IActionResult GetById(Guid id)
        {
            return Ok(userRepository.GetById(id));
        }

        [HttpGet("GetByLogin")]
        public IActionResult GetByLogin(string login)
        {
            return Ok(userRepository.GetByLogin(login));
        }
    }
}
