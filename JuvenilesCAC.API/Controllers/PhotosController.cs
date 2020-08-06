using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using JuvenilesCAC.API.Data;
using JuvenilesCAC.API.Dtos;
using JuvenilesCAC.API.Helpers;
using JuvenilesCAC.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace JuvenilesCAC.API.Controllers
{
    [Authorize]
    [Route("api/players/{playerId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPlayerRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        public Cloudinary _cloudinary;
        
        public PhotosController(IPlayerRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            // Video 107
            Account acc = new Account (
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        // Video 108. Ver bien por que se hacia esto.
        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        // Para la etiqueta [FromForm] ver el video 109
        public async Task<IActionResult> AddPhotoForPlayer(int playerId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            // Para asegurarnos que actualizamos los datos del usuario que esta logueado. Video 101
            /*if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.getp(userId);*/

            var playerFromRepo = await _repo.GetPlayer(playerId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) 
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!playerFromRepo.Photos.Any(u => u.Main))
                photo.Main = true;

            playerFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll()) 
            {
                // Video 108.
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new {playerId = playerId, id = photo.Id}, photoToReturn);
            }

            return BadRequest("No se pudo agregar la foto");
        }


        // Video 113
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int playerId, int id)
        {
            var player = await _repo.GetPlayer(playerId);

            if (!player.Photos.Any(p => p.Id == id))
                return BadRequest("La foto no pertenece al jugador");

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.Main)
                return BadRequest("La foto ya es la principal");

            var currentMainPhoto = await _repo.GetMainPhotoForPlayer(playerId);
            currentMainPhoto.Main = false;

            photoFromRepo.Main = true;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("No se pudo establecer la foto como principal");
        }

        // Video 120
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int playerId, int id)
        {
            var player = await _repo.GetPlayer(playerId);

            if (!player.Photos.Any(p => p.Id == id))
                return BadRequest("La foto no pertenece al jugador");

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.Main)
                return BadRequest("No se puede borrar la principal del jugador");

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok") {
                    _repo.Delete(photoFromRepo);
                }
            }
            else 
            {
                _repo.Delete(photoFromRepo);
            }
            

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Hubo un problema al eliminar la foto.");
        }
        
    }
}