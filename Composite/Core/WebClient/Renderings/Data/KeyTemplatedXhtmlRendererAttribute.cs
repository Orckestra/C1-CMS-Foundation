using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.Core.Collections.Generic;
using Composite.Data;
using System.Xml.Linq;
using Composite.Data.Types;
using Composite.Core.Logging;
using Composite.Core.Extensions;
using Composite.Core.Xml;
using Composite.Core.WebClient;
using System.Web;

namespace Composite.Core.WebClient.Renderings.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class KeyTemplatedXhtmlRendererAttribute : XhtmlRendererProviderAttribute
    {
        private XhtmlRenderingType _supportedRenderingType;
        private IDataXhtmlRenderer _renderer;

        /// <summary>
        /// Created a XHTML Renderer that uses the specified template to create markup.
        /// The key of the data will be inserted into the specified template where '{id}' is.
        /// If you spcify '{label}' the system will fetch the value of the label field and insert it.
        /// You also can use '{field:__a field name__}' syntax to insert a field value.
        /// Use '~' to create absolute paths.
        /// Example: <example>&lt;a href='~/showProduct.aspx?id={id}'>read more about {label}&lt;/a></example>
        /// </summary>
        public KeyTemplatedXhtmlRendererAttribute(XhtmlRenderingType renderingType, string formatedTemplate)
        {
            this.FormatedTemplate = formatedTemplate;
            _supportedRenderingType = renderingType;
        }

        public string FormatedTemplate
        {
            get;
            private set;
        }

        public override IDataXhtmlRenderer BuildRenderer()
        {
            if (_renderer == null)
            {
                _renderer = new KeyBasedXhtmlRenderer(this.FormatedTemplate);
            }
            return _renderer;
        }

        public override XhtmlRenderingType SupportedRenderingType
        {
            get
            {
                return _supportedRenderingType;
            }
        }


        private class KeyBasedXhtmlRenderer : IDataXhtmlRenderer
        {
            private static readonly string LogTitle = "KeyBasedXhtmlRenderer";

            private readonly string _templateString;

            private readonly List<string> _fieldNames = new List<string>();
            private readonly List<string> _fieldPatterns = new List<string>();
            private readonly bool _labelHasToBeEvaluated;
            private readonly bool _idHasToBeEvaluated;

            private readonly Hashtable<Type, Hashtable<string, PropertyInfo>> _reflectionCache = new Hashtable<Type, Hashtable<string, PropertyInfo>>();

            public KeyBasedXhtmlRenderer(string templateString)
            {
                templateString = templateString.Replace("~", UrlUtils.PublicRootPath);
                templateString = templateString.Replace("{label}", "{0}");
                templateString = templateString.Replace("{id}", "{1}");

                _labelHasToBeEvaluated = templateString.Contains("{0}");
                _idHasToBeEvaluated = templateString.Contains("{1}");

                int stringFormattingIndex = 2;

                while(true)
                {
                    int fieldDefinitionOffset = templateString.IndexOf("{field:");
                    if(fieldDefinitionOffset < 0) break;

                    int closingBraceIndex = templateString.IndexOf("}", fieldDefinitionOffset + 7);
                    Verify.That(closingBraceIndex > 0, "Invalid rendering template.");

                    string fieldName = templateString.Substring(fieldDefinitionOffset + 7, closingBraceIndex - fieldDefinitionOffset - 7);
                    _fieldNames.Add(fieldName);

                    string fieldPattern = templateString.Substring(fieldDefinitionOffset, closingBraceIndex - fieldDefinitionOffset + 1);
                    _fieldPatterns.Add(fieldPattern);

                    templateString = templateString.Replace(fieldPattern, "{" + (stringFormattingIndex++) + "}");
                }

                _templateString = string.Format("<body xmlns='{0}'>{1}</body>", Namespaces.Xhtml, templateString);
            }


            public XhtmlDocument Render(IDataReference dataReferenceToRender)
            {
                if (!dataReferenceToRender.IsSet)
                {
                    return new XhtmlDocument();
                }

                IData dataToRender;

                if(dataReferenceToRender.ReferencedType == typeof(IPage))
                {
                    dataToRender = DataFacade.TryGetDataByUniqueKey<IPage>(dataReferenceToRender.KeyValue);
                    if(dataToRender == null)
                    {
                        return new XhtmlDocument();
                    }
                }
                else
                {
                    dataToRender = dataReferenceToRender.Data;
                }

                string markup = _templateString;
                string labelEncoded = "";
                string keyValue = "";


                if (_labelHasToBeEvaluated)
                {
                    labelEncoded = HttpUtility.HtmlEncode(dataToRender.GetLabel());
                }

                if (_idHasToBeEvaluated)
                {
                    keyValue = dataReferenceToRender.KeyValue.ToString();
                }

                var parameters = new object[2 + _fieldNames.Count];

                parameters[0] = labelEncoded;
                parameters[1] = keyValue;

                // Getting field values
                for(int i=0; i<_fieldNames.Count; i++)
                {
                    Type referenceType = dataReferenceToRender.ReferencedType;

                    var propertiesMap = _reflectionCache.EnsureValue(referenceType,
                        () => new Hashtable<string, PropertyInfo>());

                    string fieldName = _fieldNames[i];

                    PropertyInfo propertyInfo;
                    if(!propertiesMap.TryGetValue(fieldName, out propertyInfo))
                    {
                        lock(propertiesMap)
                        {
                            if(!propertiesMap.TryGetValue(fieldName, out propertyInfo))
                            {
                                Type type = referenceType;

                                while (type != null && type != typeof(object))
                                {
                                    propertyInfo = type.GetProperty(fieldName);
                                    if (propertyInfo != null)
                                    {
                                        propertiesMap.Add(fieldName, propertyInfo);
                                        break;
                                    }

                                    if (type.GetInterfaces().Length > 0)
                                    {
                                        type = type.GetInterfaces()[0];
                                    }
                                }

                                if (propertyInfo == null)
                                {
                                    LoggingService.LogWarning(LogTitle, "Failed to find property '{0}' on type '{1}'"
                                        .FormatWith(fieldName, referenceType.FullName));

                                    propertiesMap.Add(fieldName, null);
                                } 
                            }
                        }
                    }

                    object value = null;

                    if(propertyInfo != null)
                    {
                        value = propertyInfo.GetValue(dataToRender, new object[0]);
                    }

                    value = value == null ? string.Empty : value.ToString();

                    parameters[2 + i] = value;
                }

                string evaluatedMarkup = string.Format(markup, parameters);

                XElement bodyMarkup = XElement.Parse(evaluatedMarkup);

                XhtmlDocument xhtmlDocument = new XhtmlDocument();

                xhtmlDocument.Body.Add(bodyMarkup.Nodes());

                return xhtmlDocument;
            }
        }

    }

}
