using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.C1Console.Security;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Localization;
using Composite.Core.Logging;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Streams;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core;
using Composite.Core.Configuration;


namespace Composite.Plugins.Functions.FunctionProviders.XsltBasedFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum OutputXmlSubType
    {
        /// <exclude />
        XHTML = 0,

        /// <exclude />
        XML = 1
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ConfigurationElementType(typeof(XsltBasedFunctionProviderData))]
    public sealed class XsltBasedFunctionProvider : IDynamicTypeFunctionProvider
    {
        private FunctionNotifier _functionNotifier;


        /// <exclude />
        public XsltBasedFunctionProvider()
        {
            DataEventSystemFacade.SubscribeToStoreChanged<IXsltFunction>(OnDataChanged, false);
        }



        /// <exclude />
        public FunctionNotifier FunctionNotifier
        {
            set { _functionNotifier = value; }
        }



        /// <exclude />
        public IEnumerable<IFunction> DynamicTypeDependentFunctions
        {
            get
            {
                return
                    (from f in DataFacade.GetData<IXsltFunction>().ToList()
                     select new XsltXmlFunction(f) as IFunction).ToList();
            }
        }



        /// <exclude />
        public IEnumerable<IFunction> Functions => Enumerable.Empty<IFunction>();



        private void OnDataChanged(object sender, StoreEventArgs storeEventArgs)
        {
            if (!SystemSetupFacade.SetupIsRunning)
            {
                _functionNotifier.FunctionsUpdated();
            }
        }



        /// <exclude />
        public static void ResolveImportIncludePaths(XContainer doc)
        {
            IEnumerable<XElement> imports = doc.Descendants().Where(
                f => f.Name == Namespaces.Xsl + "import" 
                  || f.Name == Namespaces.Xsl + "include");

            foreach (XElement import in imports)
            {
                XAttribute hrefAttribute = import.Attribute("href");
                if (hrefAttribute != null && hrefAttribute.Value.StartsWith("~/"))
                {
                    hrefAttribute.Value = PathUtil.Resolve(hrefAttribute.Value);
                }
            }
        }




        private sealed class XsltXmlFunction : IFunction
        {
            private readonly IXsltFunction _xsltFunction; // go through XsltFunction instead of this
            private IEnumerable<ParameterProfile> _parameterProfiles;
            private volatile IEnumerable<NamedFunctionCall> _functionCalls;
            private readonly object _lock = new object();
            private bool _subscribedToFileChanges;
            private readonly Hashtable<CultureInfo, XslCompiledTransform> _xslTransformations = new Hashtable<CultureInfo, XslCompiledTransform>();


            public XsltXmlFunction(IXsltFunction xsltFunction)
            {
                _xsltFunction = xsltFunction;
            }



            public object Execute(ParameterList parameters, FunctionContextContainer context)
            {
                Guid xsltFunctionId = this._xsltFunction.Id;

                if (_functionCalls == null)
                {
                    lock (_lock)
                    {
                        if (_functionCalls == null)
                        {
                            _functionCalls = RenderHelper.GetValidatedFunctionCalls(xsltFunctionId);
                        }
                    }
                }

                TransformationInputs transformationInput = RenderHelper.BuildInputDocument(_functionCalls, parameters, false);

                XDocument newTree = new XDocument();

                using (XmlWriter writer = new LimitedDepthXmlWriter(newTree.CreateWriter()))
                {
                    var transformArgs = new XsltArgumentList();
                    XslExtensionsManager.Register(transformArgs);

                    if (transformationInput.ExtensionDefinitions != null)
                    {
                        foreach (IXsltExtensionDefinition extensionDef in transformationInput.ExtensionDefinitions)
                        {
                            transformArgs.AddExtensionObject(extensionDef.ExtensionNamespace.ToString(), extensionDef.EntensionObjectAsObject);
                        }
                    }

                    var xslTransformer = GetXslCompiledTransform();
                    xslTransformer.Transform(transformationInput.InputDocument.CreateReader(), transformArgs, writer);
                }

                if (this._xsltFunction.OutputXmlSubType == nameof(OutputXmlSubType.XHTML))
                {
                    return new XhtmlDocument(newTree);
                }

                return newTree.Root;
            }



            private XslCompiledTransform GetXslCompiledTransform()
            {
                var currentCultureInfo = LocalizationScopeManager.CurrentLocalizationScope;
                XslCompiledTransform xslCompiledTransform;

                if (_xslTransformations.TryGetValue(currentCultureInfo, out xslCompiledTransform))
                {
                    return xslCompiledTransform;
                }

                lock (_lock)
                {
                    if (!_xslTransformations.TryGetValue(currentCultureInfo, out xslCompiledTransform))
                    {
                        xslCompiledTransform = BuildCompiledTransform();

                        _xslTransformations.Add(currentCultureInfo, xslCompiledTransform);
                    }
                }
                return xslCompiledTransform;
            }

            private XslCompiledTransform BuildCompiledTransform()
            {
                using (DebugLoggingScope.CompletionTime(this.GetType(), $"Loading and compiling {_xsltFunction.XslFilePath}"))
                {
                    string folderPath = Path.GetDirectoryName(_xsltFunction.XslFilePath);
                    string fileName = Path.GetFileName(_xsltFunction.XslFilePath);

                    IXsltFile xsltFileHandle;

                    try
                    {
                        var xsltFileHandles =
                        (from file in DataFacade.GetData<IXsltFile>()
                            where String.Equals(file.FolderPath, folderPath, StringComparison.OrdinalIgnoreCase)
                                  && String.Equals(file.FileName, fileName, StringComparison.OrdinalIgnoreCase)
                            select file).ToList();

                        Verify.That(xsltFileHandles.Count == 1, "XSLT file path {0} found {1} times. Only one instance was expected.", _xsltFunction.XslFilePath, xsltFileHandles.Count);
                        xsltFileHandle = xsltFileHandles[0];
                    }
                    catch (Exception ex)
                    {
                        Log.LogError("XsltBasedFunctionProvider", ex);
                        throw;
                    }

                    if (!_subscribedToFileChanges)
                    {
                        xsltFileHandle.SubscribeOnChanged(ClearCachedData);
                        _subscribedToFileChanges = true;
                    }

                    var xslCompiledTransform = new XslCompiledTransform();


                    XDocument doc;
                    using (Stream xsltSourceStream = xsltFileHandle.GetReadStream())
                    {
                        using (XmlReader xmlReader = XmlReader.Create(xsltSourceStream))
                        {
                            doc = XDocument.Load(xmlReader);
                        }
                    }

                    ResolveImportIncludePaths(doc);

                    LocalizationParser.Parse(doc);

                    xslCompiledTransform.Load(doc.CreateReader(), XsltSettings.TrustedXslt, new XmlUrlResolver());


                    return xslCompiledTransform;
                }
            }

            private void ClearCachedData(string filePath, FileChangeType changeType)
            {
                lock(_lock)
                {
                    _xslTransformations.Clear();
                }
            }


            public string Name => _xsltFunction.Name;


            public string Namespace => _xsltFunction.Namespace;


            public string Description => _xsltFunction.Description;


            public Type ReturnType
            {
                get
                {
                    switch (this._xsltFunction.OutputXmlSubType)
                    {
                        case "XHTML":
                            return typeof(XhtmlDocument);
                        default:
                            return typeof(XElement);
                    }
                }
            }



            public IEnumerable<ParameterProfile> ParameterProfiles
            {
                get
                {
                    if (_parameterProfiles == null)
                    {
                        lock (_lock)
                        {
                            if (_parameterProfiles == null)
                            {
                                _parameterProfiles = ManagedParameterManager.GetParameterProfiles(_xsltFunction.Id);
                            }
                        }
                    }
                    return _parameterProfiles;
                }
            }


            public EntityToken EntityToken => _xsltFunction.GetDataEntityToken();
        }

    }



    [Assembler(typeof(NonConfigurableFunctionProviderAssembler))]
    internal sealed class XsltBasedFunctionProviderData : FunctionProviderData
    {
    }
}
