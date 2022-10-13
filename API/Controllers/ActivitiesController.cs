using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly DataContext _context;

    public ActivitiesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        var rtn = await _context.Activities!.ToListAsync();

        if (rtn is null)
            return NotFound();

        return Ok(rtn);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {        
        var rtn = await _context.Activities!.FindAsync(id);

        if (rtn is null)
            return NotFound();

        return Ok(rtn);
    }
}
