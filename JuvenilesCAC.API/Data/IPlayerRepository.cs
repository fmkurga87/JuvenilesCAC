using System.Collections.Generic;
using System.Threading.Tasks;
using JuvenilesCAC.API.Models;

namespace JuvenilesCAC.API.Data
{
    public interface IPlayerRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<Player>> GetPlayers();
         Task<Player> GetPlayer(int id);

    }
}