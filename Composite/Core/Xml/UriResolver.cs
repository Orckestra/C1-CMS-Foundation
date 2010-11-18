using System;
using System.IO;
using System.Net;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    internal static class UriResolver
    {
        public static Stream GetStream(string inputUri)
        {
            Uri resolvedUri = ResolveUri(inputUri);

            if (resolvedUri.Scheme == "file")
            {
                return new C1FileStream(resolvedUri.LocalPath, FileMode.Open, FileAccess.Read, FileShare.Read);
            }
            else
            {
                WebRequest request = WebRequest.Create(resolvedUri);

                WebResponse response = request.GetResponse();

                return response.GetResponseStream();
            }
        }



        public static Uri ResolveUri(string inputUri)
        {
            Uri uri = new Uri(inputUri, UriKind.RelativeOrAbsolute);
            
            if (!uri.IsAbsoluteUri && (uri.OriginalString.Length > 0))
            {
                uri = new Uri(Path.GetFullPath(inputUri));
            }
            
            return uri;
        }        
    }
}
