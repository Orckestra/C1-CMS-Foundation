using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Xml.Linq;
using System.Xml.XPath;

using Composite.Collections.Generic;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.DynamicTypes.Foundation;
using Composite.Data.Types;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider;
using Composite.StringExtensions;
using Composite.WebClient;

namespace Composite.Spikes.DDZ
{
    public partial class UpdateMediaReferences : System.Web.UI.Page
    {
        private int _alreadyConverted;
        private int _converted;
        private int _brokenLinksCount;
        private HashSet<string> _brokenLinks;
        private Hashtable<string, string> _resolvingTable;

        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void Process(object sender, EventArgs e)
        {
            Process();
        }

        private void Process()
        {
            _resolvingTable = BuildResolvingTable();

            _brokenLinks = new HashSet<string>();

            _converted = 0;
            _alreadyConverted = 0;
            _brokenLinksCount = 0;

            UpdateInterfaces();
            UpdatePlaceholdersContent();
            UpdateMediaFolderWidgetReferences();
            UpdateFormDefinitions();
            WriteLine("Done.");
            WriteLine("");
            WriteLine("Summary");
            if (_alreadyConverted > 0)
            {
                WriteLine("Already converted: " + _alreadyConverted);
            }
            WriteLine("Converted: " + _converted);
            WriteLine("Broken: " + _brokenLinksCount);


            if (_brokenLinks.Count > 0)
            {
                WriteLine(string.Empty);
                WriteLine("Broken links:");

                foreach (string brokenLink in _brokenLinks)
                {
                    WriteLine(brokenLink);
                }
            }
            WriteLine(string.Empty);
        }

        private void UpdateInterfaces()
        {
            WriteLine("Updating interfaces ");
            foreach (Type type in DataFacade.GetAllInterfaces())
            {
                var propertiesToBeUpdated = new List<PropertyInfo>();

                foreach (var property in type.GetProperties())
                {
                    if (property.PropertyType != typeof(string) || !property.CanWrite || !property.CanRead) continue;

                    object[] customAttributes = property.GetCustomAttributes(typeof(ForeignKeyAttribute), false);
                    if (customAttributes.Length > 0)
                    {
                        foreach (ForeignKeyAttribute attr in customAttributes)
                        {
                            if (attr.InterfaceType == typeof(IMediaFile)
                                || attr.InterfaceType == typeof(IImageFile)
                                || attr.InterfaceType == typeof(IMediaFileFolder))
                            {
                                propertiesToBeUpdated.Add(property);
                                break;
                            }
                        }
                    }
                }

                bool hasToBeUpdated = propertiesToBeUpdated.Count > 0;
                if (!hasToBeUpdated) continue;

                // Conversion
                WriteLine("Processing type: " + type.FullName);


                foreach (var dataScopeIdentifier in DataFacade.GetSupportedDataScopes(type))
                {
                    CultureInfo[] cultures = DataLocalizationFacade.IsLocalized(type)
                                                 ? DataLocalizationFacade.ActiveLocalizationCultures.ToArray()
                                                 : new[] { CultureInfo.InvariantCulture };

                    foreach (var cultureInfo in cultures)
                        using (new DataScope(dataScopeIdentifier, cultureInfo))
                        {

                            var toBeUpdated = new List<IData>();
                            foreach (var data in DataFacade.GetData(type))
                            {
                                bool dataItemToBeUpdated = false;

                                foreach (var property in propertiesToBeUpdated)
                                {
                                    var oldValue = property.GetValue(data, new object[0]) as string;
                                    if (oldValue.IsNullOrEmpty()) continue;

                                    string newValue = ProcessReference(oldValue);

                                    if (newValue == oldValue) continue;

                                    dataItemToBeUpdated = true;

                                    property.SetValue(data, newValue, new object[0]);
                                }

                                if (dataItemToBeUpdated)
                                {
                                    toBeUpdated.Add(data as IData);
                                }
                            }

                            Update(toBeUpdated);
                        }
                }
            }
        }

        private static string NormalizeUrl(string url)
        {
            int questionMarkIndex = url.IndexOf("?");
            if (questionMarkIndex < 1 || questionMarkIndex == url.Length - 1) return url;

            string filePath = url.Substring(0, questionMarkIndex);
            string query = url.Substring(questionMarkIndex + 1, url.Length - questionMarkIndex - 1);

            string[] queryParts = query.Split('=', '&');

            string[] fixedParts = queryParts.Select(part => HttpUtility.UrlEncode(HttpUtility.UrlDecode(part))).ToArray();

            var querySB = new StringBuilder();
            int offset = -1;
            for (int i = 0; i < queryParts.Length; i++ )
            {
                querySB.Append(fixedParts[i]);
                offset += queryParts[i].Length + 1;
                if(offset < query.Length)
                {
                    querySB.Append(query[offset]);
                }
            }

            query = querySB.ToString();

            return filePath + "?" + query;
        }

        private void UpdatePlaceholdersContent()
        {
            WriteLine("Updating placeholder's content ");

            var toBeUpdated = new List<IData>();

            foreach (CultureInfo activeLocale in DataLocalizationFacade.ActiveLocalizationCultures)
                foreach (var dataScopeIdentifier in new[] { DataScopeIdentifier.Public, DataScopeIdentifier.Administrated })
                    using (new DataScope(dataScopeIdentifier, activeLocale))
                    {
                        foreach (IPagePlaceholderContent placeholderContent in DataFacade.GetData<IPagePlaceholderContent>())
                        {
                            string content = placeholderContent.Content;

                            string newContent = UpdateLinks(placeholderContent);

                            if (content != newContent)
                            {
                                placeholderContent.Content = newContent;
                                toBeUpdated.Add(placeholderContent);
                            }
                        }

                        Update(toBeUpdated);
                    }
        }

        string UpdateLinks(IPagePlaceholderContent placeholderContent)
        {
            string content = placeholderContent.Content;

            const string substring = "/ShowMedia.ashx?";

            XElement contentXml;
            try
            {
                contentXml = XElement.Parse("<root>{0}</root>".FormatWith(content));
            }
            catch (Exception)
            {
                string message = "Failed to update placeholder's content, since it doesn't have a valid xml-like structure. PageID: '{0}', PlaceholderId: '{1}'"
                    .FormatWith(placeholderContent.PageId, placeholderContent.PlaceHolderId);
                WriteLine(message);
                return content;
            }

            bool changed = false;

            var imageTags = contentXml.XPathSelectElements("./descendant::*[@src != '' or @href != '']");
            foreach (XElement imgTag in imageTags)
            {
                XAttribute attribute = imgTag.Attributes().Where(attr => attr.Name == "src" || attr.Name == "href").FirstOrDefault();

                if (attribute == null) continue;

                string url = attribute.Value;

                if (url.IndexOf(substring, StringComparison.InvariantCultureIgnoreCase) < 0) continue;

                UrlString urlString = new UrlString(NormalizeUrl(url));

                string mediaPath = urlString.GetQueryParameters()["i"];

                if (mediaPath.IsNullOrEmpty()) continue;

                string newMediaPath = ProcessReference(mediaPath);

                if (newMediaPath == mediaPath) continue;

                changed = true;

                urlString["i"] = newMediaPath;

                attribute.Value = urlString.ToString();
            }

            if (!changed)
            {
                return content;
            }

            return string.Concat(contentXml.Nodes().Select(b => b.ToString()).ToArray());
        }

        private void UpdateMediaFolderWidgetReferences()
        {
            WriteLine("Updating references to Media Widget");

            var toBeUpdated = new List<IData>();
            using (new DataScope(DataScopeIdentifier.Public))
            {
                foreach (IDataFieldDescriptor_FormRenderingProfile renderingProfile in
                    DataFacade.GetData<IDataFieldDescriptor_FormRenderingProfile>())
                {
                    string markup = renderingProfile.WidgetFunctionMarkup;
                    if (!markup.Contains("Composite.Widgets.MediaFileSelector")) continue;

                    XElement widgetFunctionMarkup = XElement.Parse(markup);
                    var parameters =
                        widgetFunctionMarkup.Elements((XNamespace)"http://www.composite.net/ns/function/1.0" + "param");

                    bool changed = false;
                    foreach (XElement parameter in parameters)
                    {
                        XAttribute nameAttr = parameter.Attribute("name");
                        XAttribute valueAttr = parameter.Attribute("value");

                        if (nameAttr == null
                            || valueAttr == null
                            || nameAttr.Value != "MediaFileFolderReference"
                            || valueAttr.Value.IsNullOrEmpty()) continue;

                        string newValue = ProcessReference(valueAttr.Value);
                        if (newValue == valueAttr.Value) continue;

                        valueAttr.Value = newValue;
                        changed = true;
                    }

                    if (!changed) continue;

                    renderingProfile.WidgetFunctionMarkup = widgetFunctionMarkup.ToString();
                    toBeUpdated.Add(renderingProfile);
                }

                Update(toBeUpdated);
            }
        }

        void UpdateFormDefinitions()
        {
            WriteLine("Updating form definitions");

            foreach (Type type in DataFacade.GetAllInterfaces())
            {
                Guid tempGuid;
                if (!type.TryGetImmutableTypeId(out tempGuid)) continue;

                var typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
                string markup = DynamicTypesAlternateFormFacade.GetAlternateFormMarkup(typeDescriptor);

                if (markup == null) continue;

                XElement xml = XElement.Parse(markup);

                bool changed = false;

                var xmlNamespace = (XNamespace)"http://www.composite.net/ns/management/bindingforms/std.function.lib/1.0";
                foreach (XElement element in xml.DescendantsAndSelf(xmlNamespace + "StaticMethodCall"))
                {
                    XAttribute methodAttr = element.Attribute("Method");
                    XAttribute typeAttr = element.Attribute("Type");
                    XAttribute parametersAttr = element.Attribute("Parameters");

                    if (methodAttr == null
                        || typeAttr == null
                        || parametersAttr == null
                        || methodAttr.Value != "GenerateSelectorOptions"
                        || !typeAttr.Value.Contains(typeof(MediaFileSelectorWidgetFunction).FullName)
                        || parametersAttr.Value.IsNullOrEmpty())
                    {
                        continue;
                    }

                    int separatorIndex = parametersAttr.Value.IndexOf("??");
                    if (separatorIndex <= 0)
                    {
                        continue;
                    }

                    string oldMediaPath = parametersAttr.Value.Substring(0, separatorIndex);
                    string newMediaPath = ProcessReference(oldMediaPath);

                    if (newMediaPath == oldMediaPath) continue;

                    changed = true;

                    parametersAttr.Value = newMediaPath + parametersAttr.Value.Substring(separatorIndex);
                }

                if (!changed) continue;

                WriteLine("Updating form markup for type '{0}'".FormatWith(type.FullName));
                DynamicTypesAlternateFormFacade.SetAlternateForm(typeDescriptor, xml.ToString());
            }
        }

        private string ProcessReference(string reference)
        {
            string resolvingKey = reference.Replace("://", ":/").ToLower();

            if (_resolvingTable.ContainsKey(resolvingKey))
            {
                _converted++;
                return _resolvingTable[resolvingKey];
            }

            if (IsAlreadyConverted(reference))
            {
                _alreadyConverted++;
            }
            else
            {
                _brokenLinksCount++;
                if (!_brokenLinks.Contains(reference))
                {
                    _brokenLinks.Add(reference);
                }
            }

            return reference;
        }

        static bool IsAlreadyConverted(string mediaReference)
        {
            int separatorIndex = mediaReference.IndexOf(":");
            if (separatorIndex < 0 || separatorIndex == mediaReference.Length - 1) return false;

            string guid = mediaReference.Substring(separatorIndex + 1);
            return IsValidGuid(guid);
        }

        public static bool IsValidGuid(string value)
        {
            if (value == null)
                throw new ArgumentNullException("value", "Invalid null value supplied");

            return Regex.IsMatch(value, @"^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$", RegexOptions.CultureInvariant);
        }

        private  void WriteLine(string str)
        {
            Response.Write(HttpUtility.HtmlEncode(str));
            Response.Write("<br />");
        }

        private static void Update(ICollection<IData> dataset)
        {
            DataFacade.Update(dataset, true, false);
        }

        static Hashtable<string, string> BuildResolvingTable()
        {
            var resolvingTable = new Hashtable<string, string>();

            foreach (IMediaFile mediaFile in DataFacade.GetData<IMediaFile>())
            {
                resolvingTable.Add(mediaFile.CompositePath.ToLower(), mediaFile.KeyPath);
            }

            foreach (IMediaFileFolder mediaFolder in DataFacade.GetData<IMediaFileFolder>())
            {
                resolvingTable.Add(mediaFolder.CompositePath.ToLower(), mediaFolder.KeyPath);
            }

            return resolvingTable;
        }
    }
}
