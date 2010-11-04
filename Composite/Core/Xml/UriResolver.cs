using System;
using System.Net;
using Composite.Core.IO;


namespace Composite.Core.Xml
{
    internal static class UriResolver
    {
        public static System.IO.Stream GetStream(string inputUri)
        {
            Uri resolvedUri = ResolveUri(inputUri);

            if (resolvedUri.Scheme == "file")
            {
                return new FileStream(resolvedUri.LocalPath, System.IO.FileMode.Open, System.IO.FileAccess.Read, System.IO.FileShare.Read);
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
                uri = new Uri(System.IO.Path.GetFullPath(inputUri));
            }
            
            return uri;
        }        
    }
}
