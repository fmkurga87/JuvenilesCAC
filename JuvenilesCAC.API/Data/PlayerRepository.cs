using System.Collections.Generic;
using System.Linq;
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

        public async Task<Player> Add(Player player)
        {
            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();

            return player;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
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

        public async Task<Photo> GetMainPhotoForPlayer(int playerId)
        {
            return await _context.Photos.Where(x => x.PlayerId == playerId).FirstOrDefaultAsync(p => p.Main);
        }

    }
}