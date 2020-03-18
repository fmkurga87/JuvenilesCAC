using System.Collections.Generic;
using System.Linq;
using JuvenilesCAC.API.Models;
using Newtonsoft.Json;

namespace JuvenilesCAC.API.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if (!context.Players.Any()) 
            {
                var playerData = System.IO.File.ReadAllText("Data/PlayerSeedData.json");
                var players = JsonConvert.DeserializeObject<List<Player>>(playerData);
                foreach (var player in players)
                {
                    context.Players.Add(player);
                }
                context.SaveChanges();
            }
        }
    }
}