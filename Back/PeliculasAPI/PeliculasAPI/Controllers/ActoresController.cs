﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;

namespace PeliculasAPI.Controllers
{
    [Route("api/actores")]
    [ApiController]
    public class ActoresController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contendor = "actores"; 

        public ActoresController(ApplicationDbContext context,
            IMapper mapper, IAlmacenadorArchivos almacenadorArchivos) 
        {
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;
        }
        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Actores.AsQueryable();
            await HttpContext.InsertarParametrosPaginacionCabecera(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actores);
        }

        [HttpGet("buscarPorNombre/{nombre}")]
        public async Task<ActionResult<List<PeliculaActorDTO>>> BuscarPorNombre(string nombre = "")
        {
            if (string.IsNullOrWhiteSpace(nombre)) { return new List<PeliculaActorDTO>(); }
            return await context.Actores
                .Where(x => x.Nombre.Contains(nombre))
                .OrderBy(x => x.Nombre)
                .Select(x => new PeliculaActorDTO { Id = x.Id, Nombre = x.Nombre, Foto = x.Foto})
                .Take(5)
                .ToListAsync();


        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();

            } 
            return mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreacionDTO actorCreacionDTO)
        {
           var actor = mapper.Map<Actor>(actorCreacionDTO);
           if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await almacenadorArchivos.GuardarArchivo(contendor, actorCreacionDTO.Foto);
            }
           context.Add(actor);
           await context.SaveChangesAsync();
           return NoContent();
        }

        [HttpPut("{id:int}")]

        public async Task<ActionResult> Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x =>x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            actor = mapper.Map(actorCreacionDTO, actor);
            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await almacenadorArchivos.EditarArchivo(contendor, actorCreacionDTO.Foto, actor.Foto);
            }
            await context.SaveChangesAsync();
            return NoContent();


        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if(actor == null)
            {
                return NotFound();
            }
            context.Remove(actor);
            await context.SaveChangesAsync();
            await almacenadorArchivos.BorrarArchivo(actor.Foto, contendor);
            return NoContent();
        }

    }
}
