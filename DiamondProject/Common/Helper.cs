using System.Text.RegularExpressions;

namespace DiamondProject.Common
{
    public static class Helper
    {
        static Regex ConvertToUnsign_rg = null;
        public static string GetPathName(string name)
        {
            if(ReferenceEquals(ConvertToUnsign_rg, null))
            {
                ConvertToUnsign_rg = new Regex("p{IsCombiningDiacriticalMarks}+");
            }
            var temp = name.Normalize(System.Text.NormalizationForm.FormD);
            var unsginText = ConvertToUnsign_rg.Replace(temp, string.Empty).Replace("đ", "d").Replace("Đ", "D").ToLower();
            return unsginText.Replace(' ', '-');
        }
    }
}
