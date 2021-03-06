using System.Collections.Generic;
using System.Threading.Tasks;
using JuvenilesCAC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JuvenilesCAC.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) 
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            //Si es mas que 0 se guardo algo (y se guardo bien).
            return await _context.SaveChangesAsync() > 0;
        }
    }
}