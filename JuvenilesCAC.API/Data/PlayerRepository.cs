using System.Collections.Generic;
using System.Threading.Tasks;
using JuvenilesCAC.API.Models;
using Microsoft.EntityFrameworkCore;

namespace JuvenilesCAC.API.Data
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly DataContext _context;
        public PlayerRepository(DataContext context)
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

        public async Task<Player> GetPlayer(int id)
        {
            var player = await _context.Players.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return player;
        }

        public async Task<IEnumerable<Player>> GetPlayers()
        {
            var players = await _context.Players.Include(p => p.Photos).ToListAsync();
            return players;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}