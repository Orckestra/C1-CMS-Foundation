using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Caching;
using System.Web.Hosting;
using System.Xml;
using System.Xml.Xsl;
using Composite.Core.Application;
using Composite.Core.Extensions;
using Composite.Core.IO;


namespace Composite.Core.WebClient.Presentation
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OutputTransformationManager
    {
        private const string _contextItemKey = "AdministrativeOutputTransformationHttpModule.TransformationList";

        /// <exclude />
        public static void Activate()
        {
            EnsureResponseFilter();
           
        }


        /// <exclude />
        public static void RegisterTransformation(string transformationPath, int position)
        {
            HttpContext context = HttpContext.Current;
            if (context.Items.Contains(_contextItemKey) == false) throw new InvalidOperationException("Activate must be called first");

            List<Transformation> transformations = (List<Transformation>)context.Items[_contextItemKey];
            transformations.Add(new Transformation { TransformationPath = transformationPath, Position = position });
        }


        internal static IEnumerable<string> GetTransformationsInPriority()
        {
            HttpContext context = HttpContext.Current;
            if (context.Items.Contains(_contextItemKey) == false) throw new InvalidOperationException("Activate must be called first");

            List<Transformation> transformations = (List<Transformation>)context.Items[_contextItemKey];
            foreach (Transformation transformation in transformations.OrderBy(f => f.Position))
            {
                yield return transformation.TransformationPath;
            }
        }



        private static void EnsureResponseFilter()
        {
            HttpContext context = HttpContext.Current;

            if (context.Items.Contains(_contextItemKey) == false)
            {
                context.Response.Filter = new XslTransformationStream(context.Response.Filter);

                context.Items.Add(_contextItemKey, new List<Transformation>());
            }
        }




        #region Helper classes
        private class Transformation
        {
            public string TransformationPath { get; set; }
            public int Position { get; set; }
        }

        private class XslTransformationStream : Stream
        {
            public XslTransformationStream(Stream outputStream)
            {
                _buffer = new MemoryStream(8192);
                _responseOutputStream = outputStream;
            }

            private readonly Stream _responseOutputStream;
            private readonly MemoryStream _buffer;


            /*
             * Moth knows about the ugly parameters, please refactor!
             * We should probably supply XSLT params by webcontrol markup...
             */

            public static MemoryStream Transform(MemoryStream buffer, String mode, String browser, String platform)
            {
                List<string> xsltFilePaths = GetTransformationsInPriority().ToList();

                if (xsltFilePaths.Count == 0)
                {
                    return buffer;
                }

                // Detection doctype
                buffer.Seek(0, SeekOrigin.Begin);
                string line;

                using (var reader = new StreamReader(buffer, Encoding.UTF8, true, 1024, true))
                {
                    line = reader.ReadLine();
                }
                var doctype = line.Contains("<!DOCTYPE");
                buffer.Seek(0, SeekOrigin.Begin);


                var readerSettings = new XmlReaderSettings
                {
                    XmlResolver = null,
                    DtdProcessing = DtdProcessing.Parse,
                    CheckCharacters = false
                };

                MemoryStream outputStream = null;

                int xsltCount = xsltFilePaths.Count;

                for (int i = 0; i < xsltCount; i++)
                {
                    string xsltFilePath = xsltFilePaths[i];
                    bool isFirst = (i == 0);

                    MemoryStream inputStream = isFirst ? buffer : outputStream;
                    inputStream.Position = 0;
                    outputStream = new MemoryStream();
                        
                    /*
                        * Hardcoding a parameter for masterfilter.xsl
                        * TODO: parametersetup in webcontrol markup!
                        */

                    var transformer = GetCachedTransformation(xsltFilePath);

                    var argList = new XsltArgumentList();
                    if ( !string.IsNullOrEmpty ( mode )) {
	                    argList.AddParam("mode", "", mode );
	                }
	                if ( !string.IsNullOrEmpty ( browser )) {
	                    argList.AddParam("browser", "", browser );
	                }
                    if (!string.IsNullOrEmpty(platform))
                    {
                        argList.AddParam("platform", "", platform);
                    }
                    argList.AddParam("version", "", RuntimeInformation.ProductVersion.ToString());
                    argList.AddParam("doctype", "", doctype.ToString());
                    argList.AddParam("appVirtualPath", "", GetAppRootPath());

                    var reader = XmlReader.Create(inputStream, readerSettings);
                    var writer = XmlWriter.Create(outputStream, transformer.OutputSettings);
                    
                    try
                    {
                        transformer.Transform(reader, argList, writer);
                    }
                    catch (XmlException xmlException)
                    {
                        string tempFilePath = TempDirectoryFacade.GetTempFileName(".xml");

                        inputStream.Position = 0;
                        string markup;
                        using (var sr = new C1StreamReader(inputStream))
                        {
                            markup = sr.ReadToEnd();
                        }
                        
                        C1File.WriteAllText(tempFilePath, markup); 

                        throw new InvalidOperationException(
                            $"Incorrect xml markup, source saved in '{tempFilePath}'", 
                            xmlException);
                    }
                }

                Verify.That(outputStream != null, "NullRef");

                return outputStream;
            }

            private static XslCompiledTransform GetCachedTransformation(string xsltFilePath)
            {
                string transformationCacheKey = "Compiled" + xsltFilePath;
                var cache = HostingEnvironment.Cache;

                XslCompiledTransform transformer = cache[transformationCacheKey] as XslCompiledTransform;
                if (transformer == null)
                {
                    lock (typeof (XslTransformationStream))
                    {
                        transformer = cache[transformationCacheKey] as XslCompiledTransform;
                        if (transformer == null)
                        {
                            transformer = XsltServices.GetCompiledXsltTransform(xsltFilePath);
                            cache.Add(transformationCacheKey,
                                transformer,
                                new CacheDependency(xsltFilePath),
                                DateTime.MaxValue,
                                TimeSpan.FromDays(1.0),
                                CacheItemPriority.Default,
                                null);
                        }
                    }
                }
                return transformer;
            }


            private static string GetAppRootPath()
            {
                string appPath = HostingEnvironment.ApplicationVirtualPath;

                if (appPath.EndsWith("/") || appPath.EndsWith(@"\"))
                {
                    appPath = appPath.Remove(appPath.Length - 1, 1);
                }

                return appPath;
            }

            public override void Write(byte[] buffer, int offset, int count)
            {
                if (_buffer.CanWrite)
                    _buffer.Write(buffer, offset, count);
            }

            public override void Close()
            {
                var httpContext = HttpContext.Current;

                try
                {
                    if (!_buffer.CanRead || (_buffer.Length == 0))
                    {
                        return;
                    }

                    MemoryStream output = _buffer;

                    if (httpContext.Response.StatusCode == 200)
                    {
                        try
                        {
                            string mode = CookieHandler.Get("mode");
                            string browser = "undefined";
                            string platform = "undefined";

                            string userAgent = httpContext.Request.UserAgent;

                            if (!userAgent.IsNullOrEmpty())
                            {
                                if (userAgent.IndexOf("Gecko", StringComparison.Ordinal) > -1 /*&& !userAgent.Contains("Trident")*/)
                                {
                                    browser = "mozilla";
                                }
                                else
                                {
                                    browser = "explorer";
                                }
                                if (userAgent.IndexOf("Windows NT", StringComparison.Ordinal) > -1)
                                {
                                    platform = "vista";
                                }
                                else if (userAgent.IndexOf("OS X", StringComparison.Ordinal) > -1)
                                {
                                    platform = "osx";
                                }
                                else
                                {
                                    platform = "default";
                                }
                            }

                            output = Transform(_buffer, mode, browser, platform);
                        }
                        catch (Exception ex)
                        {
                            Log.LogCritical("AdministrativeOutputTransformationHttpModule", ex);
                            throw;
                        }
                    }

                    if(output.Position != 0)
                    {
                        output.Seek(0, SeekOrigin.Begin);
                    }
                    output.WriteTo(_responseOutputStream);
                }
                finally
                {
                    _responseOutputStream.Close();
                }
            }

            public override bool CanRead => _responseOutputStream.CanRead;

            public override bool CanSeek => _responseOutputStream.CanSeek;

            public override bool CanWrite => _responseOutputStream.CanWrite;

            public override long Length => _responseOutputStream.Length;

            public override long Position
            {
                get { return _responseOutputStream.Position; }
                set { _responseOutputStream.Position = value; }
            }

            public override long Seek(long offset, SeekOrigin origin)
            {
                return _responseOutputStream.Seek(offset, origin);
            }

            public override void SetLength(long value)
            {
                _responseOutputStream.SetLength(value);
            }

            public override void Flush()
            {
                _responseOutputStream.Flush();
            }

            public override int Read(byte[] buffer, int offset, int count)
            {
                return _responseOutputStream.Read(buffer, offset, count);
            }
        }
        #endregion
    }
}
