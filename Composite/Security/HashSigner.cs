namespace Composite.Security
{
	public static class HashSigner
	{
        private const int _privateKey = 180226750;

        public static HashValue GetSignedHash(string content)
        {
            int hashCode = content.GetHashCode();

            return new HashValue(hashCode ^ _privateKey); 
        }



        public static bool ValidateSignedHash(string content, HashValue hashValue)
        {
            HashValue newHashValue = GetSignedHash(content);

            return newHashValue.Equals(hashValue);
        }
	}
}
