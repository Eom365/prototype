namespace ProductCard.Api.Services;

public class FileStorage
{
    private readonly string _root;

    public FileStorage(IWebHostEnvironment environment)
    {
        _root = Path.Combine(environment.ContentRootPath, "data", "files");
        Directory.CreateDirectory(_root);
    }

    public async Task<string> SaveAsync(IFormFile file, CancellationToken cancellationToken)
    {
        var extension = Path.GetExtension(file.FileName);
        if (extension.Length > 8 || extension.Any(ch => !char.IsLetterOrDigit(ch) && ch != '.'))
            extension = "";

        var storedName = Guid.NewGuid().ToString("N") + extension.ToLowerInvariant();
        var path = Path.Combine(_root, storedName);
        await using var stream = File.Create(path);
        await file.CopyToAsync(stream, cancellationToken);
        return storedName;
    }

    public string FullPath(string storedName)
    {
        var safeName = Path.GetFileName(storedName);
        return Path.Combine(_root, safeName);
    }

    public void Delete(string storedName)
    {
        var path = FullPath(storedName);
        if (File.Exists(path))
            File.Delete(path);
    }
}
