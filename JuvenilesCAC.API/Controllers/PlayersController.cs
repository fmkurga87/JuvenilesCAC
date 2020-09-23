using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JuvenilesCAC.API.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using JuvenilesCAC.API.Dtos;
using System.Security.Claims;
using System;
using JuvenilesCAC.API.Models;

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

        [HttpGet("{id}", Name = "GetPlayer")]
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

        [HttpPost("new")]
        public async Task<IActionResult> AddPlayer(PlayerForCreateDto playerForCreateDto) 
        {
            // TODO: Validar si existe el jugador, basarse en lo siguiente:
            /*userForRegisterDto.username = userForRegisterDto.username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.username))
            {
                return BadRequest("Ya existe un usuario con ese nombre");
            }*/

            var playerToCreate = _mapper.Map<Player>(playerForCreateDto);

            var createdPlayer = await _repo.Add(playerToCreate);

            var playerToReturn = _mapper.Map<PlayerForDetailedDto>(createdPlayer);

            // Video 131
            return CreatedAtRoute("GetPlayer", new {controller = "Players", id = createdPlayer.Id}, playerToReturn);
        }

    }
}