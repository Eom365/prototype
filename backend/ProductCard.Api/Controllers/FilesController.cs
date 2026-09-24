using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductCard.Api.Data;
using ProductCard.Api.Services;

namespace ProductCard.Api.Controllers;

[ApiController]
[Route("api/files")]
public class FilesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly FileStorage _files;

    public FilesController(AppDbContext db, FileStorage files)
    {
        _db = db;
        _files = files;
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var file = await _db.ProductFiles.AsNoTracking().FirstOrDefaultAsync(item => item.Id == id);
        if (file == null)
            return NotFound(new { message = "Файл не найден" });

        var path = _files.FullPath(file.StoredName);
        if (!System.IO.File.Exists(path))
            return NotFound(new { message = "Файл не найден на диске" });

        return PhysicalFile(path, file.ContentType);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var file = await _db.ProductFiles.FirstOrDefaultAsync(item => item.Id == id);
        if (file == null)
            return NotFound(new { message = "Файл не найден" });

        _files.Delete(file.StoredName);
        _db.ProductFiles.Remove(file);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
