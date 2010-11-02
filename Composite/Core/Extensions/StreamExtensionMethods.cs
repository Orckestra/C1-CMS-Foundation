using System;


namespace Composite.Core.Extensions
{
    internal static class StreamExtensionMethods
    {
        public static void CopyTo(this System.IO.Stream stream, System.IO.Stream toStream)
        {
            int offset = 0;
            int remaining = (int)stream.Length;
            const int chunkSize = 8192;
            
            byte[] data = new byte[chunkSize];
            while (remaining > 0)
            {
                int toRead = Math.Min(chunkSize, remaining);
                int read = stream.Read(data, 0, toRead);
                
                if (read <= 0) throw new System.IO.EndOfStreamException(String.Format("End of stream reached with {0} bytes left to read", remaining));
                
                toStream.Write(data, 0, read);
                
                remaining -= read;
                
                offset += read;
            }
        }
    }
}
