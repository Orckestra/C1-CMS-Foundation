using System.IO;


namespace Composite.Core.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class StreamUtils
    {
        /// <exclude />
        public static void CopyStream(Stream input, Stream output)
        {
            byte[] buffer = new byte[8192];

            while (true)
            {
                int read = input.Read(buffer, 0, buffer.Length);

                if (read <= 0) return;

                output.Write(buffer, 0, read);
            }
        }
    }
}
