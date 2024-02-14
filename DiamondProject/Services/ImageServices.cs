using System.IO;

namespace DiamondProject.Services
{
    public class ImageServices
    {
        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var currentDir = Directory.GetCurrentDirectory();
            currentDir = Path.Combine(currentDir, @"Upload\Images\");
            var fileName = DateTime.Now.Ticks + Path.GetExtension(file.FileName);
            string path = Path.Combine(currentDir, currentDir + fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
                stream.Flush();
            }
            return fileName;
        }

        public async Task<FileStream> GetImageAsync(string fileName)
        {
            fileName = @"Upload\Images\" + fileName;
            var image = File.OpenRead(fileName);
            return image;
        }
        public void DeleteImage(string fileName)
        {
            var currentDir = Directory.GetCurrentDirectory();
            currentDir = Path.Combine(currentDir, @"Upload\Images\");
            var path = Path.Combine(currentDir, currentDir + fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }
    }
}
