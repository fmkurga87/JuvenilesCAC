using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JuvenilesCAC.API.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using JuvenilesCAC.API.Dtos;
using System.Security.Claims;
using System;

namespace JuvenilesCAC.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IPlayerRepository _repo;
        private readonly IMapper _mapper;
        public PlayersController(IPlayerRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _repo.GetPlayers();

            var playersToReturn = _mapper.Map<IEnumerable<PlayerForListDto>>(players);

            return Ok(playersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer(int id)
        {
            var player = await _repo.GetPlayer(id);

            var playerToReturn = _mapper.Map<PlayerForDetailedDto>(player);

            return Ok(playerToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, PlayerForUpdateDto playerForUpdateDto) 
        { 
            // TODO: Ver si validamos que existe el jugador.
            
            var playerFromRepo = await _repo.GetPlayer(id);

            _mapper.Map(playerForUpdateDto, playerFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Hubo una falla al actualizar el jugador {id}");
        }

    }
}