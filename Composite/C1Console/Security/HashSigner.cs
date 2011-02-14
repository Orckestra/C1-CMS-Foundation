namespace Composite.C1Console.Security
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class HashSigner
	{
        private const int _privateKey = 180226750;

        /// <exclude />
        public static HashValue GetSignedHash(string content)
        {
            int hashCode = content.GetHashCode();

            return new HashValue(hashCode ^ _privateKey); 
        }



        /// <exclude />
        public static bool ValidateSignedHash(string content, HashValue hashValue)
        {
            HashValue newHashValue = GetSignedHash(content);

            return newHashValue.Equals(hashValue);
        }
	}
}
