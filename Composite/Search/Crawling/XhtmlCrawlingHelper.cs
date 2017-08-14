using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Routing;
using Composite.Core.Routing.Pages;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data.Types;
using Composite.Functions;


namespace Composite.Search.Crawling
{
    internal class XhtmlCrawlingHelper
    {
        private const int FunctionExecutionTimeout = 5000;

        private readonly IList<string> _textParts = new List<string>();

        public IEnumerable<string> TextParts => _textParts;

        private IPage _page;

        private readonly StringBuilder _currentFragment = new StringBuilder();

        public void SetPageContext(IPage page)
        {
            _page = page;
        }

        public bool CrawlFunctionParameters { get; set; }

        /// <summary>
        /// Crawls xhtml content and extracts text parts
        /// </summary>
        /// <param name="xhtml"></param>
        public bool CrawlXhtml(string xhtml)
        {
            try
            {
                var doc = XhtmlDocument.Parse(xhtml);

                CrawlXhtml(doc);

                CompleteTextFragment();

                return true;
            }
            catch (Exception ex)
            {
                Log.LogError(nameof(XhtmlCrawlingHelper), ex);

                _currentFragment.Clear();
                return false;
            }
        }

        private void CrawlXhtml(XhtmlDocument document) => ProcessNode(document.Body);

        private void AppendToCurrentTextFragment(string text)
        {
            _currentFragment.Append(text);
        }

        private void CompleteTextFragment()
        {
            if (_currentFragment.Length == 0) return;

            var str = _currentFragment.ToString();
            if (!string.IsNullOrWhiteSpace(str))
            {
                _textParts.Add(str);
            }

            _currentFragment.Clear();
        }

        private void ProcessNode(XNode node)
        {
            if (node is XText textNode)
            {
                AppendToCurrentTextFragment(textNode.Value);
                return;
            }

            if (node is XElement element)
            {
                ProcessElement(element);
            }
        }

        private void ProcessElement(XElement element)
        {
            if (element.Name.Namespace == Namespaces.Function10
                && element.Name.LocalName == "function")
            {
                ProcessFunctionCall(element);
                return;
            }

            if (element.Name.LocalName == "script" || element.Name.LocalName == "noscript")
            {
                return;
            }

            if (element.Name.LocalName == "a")
            {
                // TODO: process "href" attribute for page/data references
            }

            bool isInlineElement = XhtmlPrettifier.InlineElements.Contains(
                new XhtmlPrettifier.NamespaceName {
                    Name = element.Name.LocalName,
                    Namespace = ""
                });

            bool isFragmentContinuation = element.Name.LocalName != "br"
                    && (element.Name.LocalName == "body" || isInlineElement);

            if (!isFragmentContinuation)
            {
                CompleteTextFragment();
            }

            foreach (var childNode in element.Nodes())
            {
                ProcessNode(childNode);
            }

            if (!isFragmentContinuation)
            {
                CompleteTextFragment();
            }
        }

        private void ProcessFunctionCall(XElement functionNode)
        {
            var functionName = functionNode.GetAttributeValue("name");
            if(functionName == null) return;

            IFunction function;
            try
            {
                if (!FunctionFacade.TryGetFunction(out function, functionName))
                {
                    return;
                }
            }
            catch
            {
                return;
            }

            if (CrawlFunctionParameters)
            {
                foreach (var paramElement in functionNode.Elements())
                {
                    var parameterName = paramElement.GetAttributeValue("name");
                    if (parameterName == null) continue;

                    var profile = function.ParameterProfiles.FirstOrDefault(p => p.Name == parameterName);
                    if (profile != null)
                    {
                        if (profile.Type == typeof(XhtmlDocument) 
                            || profile.Type == typeof(Lazy<XhtmlDocument>))
                        {
                            ProcessElement(paramElement);
                        }

                        // TODO: handle the other parameter types
                    }
                }
            }

            var returnType = function.ReturnType;
            if (returnType == typeof(XhtmlDocument)
                || function.ReturnType == typeof(string))
            {
                var functionResult = TryExecuteFunction(functionNode, FunctionExecutionTimeout);
                if (functionResult is XhtmlDocument document)
                {
                    CrawlXhtml(document);
                }

                if (functionResult is string str)
                {
                    if (str.TrimStart().StartsWith("<html"))
                    {
                        CrawlXhtml(str);
                    }
                    else
                    {
                        AppendToCurrentTextFragment(str);
                    }
                }
            }
            
        }

        private object TryExecuteFunction(XElement functionNode, int timeoutMs)
        {
            object result = null;

            var cts = new CancellationTokenSource();
            var executeTask = Task.Run(() => result = TryExecuteFunction(functionNode), cts.Token);
            executeTask.Wait(timeoutMs);

            if(executeTask.Status == TaskStatus.Running)
            {
                cts.Cancel();
            };

            return result;
        }


        private object TryExecuteFunction(XElement functionNode)
        {
            try
            {
                var tree = FunctionFacade.BuildTree(functionNode);

                using (new FakeHttpContext())
                {
                    if (_page != null)
                    {
                        PageRenderer.CurrentPage = _page;
                        C1PageRoute.PageUrlData = new PageUrlData(_page);
                    }
                    PageRenderer.RenderingReason = RenderingReason.BuildSearchIndex;

                    return tree.GetValue(new FunctionContextContainer
                    {
                        SuppressXhtmlExceptions = false
                    });
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        private class FakeHttpContext : IDisposable
        {
            private readonly HttpContext _originalContext;

            public FakeHttpContext()
            {
                _originalContext = HttpContext.Current;

                HttpContext.Current = new HttpContext(
                    new HttpRequest("", "http://contoso.com", ""),
                    new HttpResponse(new StringWriter())
                );
            }

            public void Dispose()
            {
                HttpContext.Current = _originalContext;
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~FakeHttpContext()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
