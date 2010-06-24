using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.IO;
using Composite.IO;
using Composite.Xml;
using System.Collections.Generic;
using Composite.Logging;

public partial class Spikes_MAW_AddMissingHelpStringsToForms : System.Web.UI.Page
{
    private const string relativeFormsFilesDirectory = "~/Composite/content/forms/Administrative";
    private const string relativeLocalizationFilesDirectory = "~/Composite/localization";

    private Dictionary<string, XDocument> _localizationFiles = new Dictionary<string, XDocument>();
    private Dictionary<string, XDocument> _formsFiles = new Dictionary<string, XDocument>();

    private List<XName> helpEnabledElementNames = new List<XName> 
    { 
        Namespaces.BindingFormsStdUiControls10 + "TextBox",
        Namespaces.BindingFormsStdUiControls10 + "TextArea",
        Namespaces.BindingFormsStdUiControls10 + "TypeSelector",
        Namespaces.BindingFormsStdUiControls10 + "DateTimeSelector",
        Namespaces.BindingFormsStdUiControls10 + "FileUpload",
        Namespaces.BindingFormsStdUiControls10 + "BoolSelector",
        Namespaces.BindingFormsStdUiControls10 + "KeySelector"
    };

    protected void Page_Load(object sender, EventArgs e)
    {
        XElement visualOut = new XElement("div");

        string formsFilesDirectory = PathUtil.Resolve(relativeFormsFilesDirectory);

        string[] formsFileNames = Directory.GetFiles(formsFilesDirectory, "*.xml");

        foreach (string formsFileName in formsFileNames)
        {
            XDocument formsDocument = GetFormsDocument(Path.GetFileName(formsFileName));

            List<XElement> helpEnabledElements = new List<XElement>();

            foreach (XName elementName in helpEnabledElementNames)
            {
                helpEnabledElements.AddRange(formsDocument.Descendants(elementName));
            }

            foreach (XElement unlozalized in helpEnabledElements.Where(f => f.Attribute("Label") != null && f.Attribute("Label").Value.StartsWith("${") == false))
            {
                visualOut.Add(new XElement("li", new XAttribute("style", "color:red"), "Un-localized thing in " + formsFileName));
            }

            helpEnabledElements.RemoveAll(f => f.Attribute("Help") != null);

            if (helpEnabledElements.Count > 0)
            {
                visualOut.Add(new XElement("h2", Path.GetFileName(formsFileName)));
                //            visualOut.Add(new XElement("textarea", formsDocument.ToString()));

                foreach (XElement missingHelpElement in helpEnabledElements)
                {
                    string labelValue = missingHelpElement.Attribute("Label").Value;
                    if (labelValue.StartsWith("${"))
                    {
                        string[] localizationParts = labelValue.Replace("$", "").Replace("{", "").Replace("}", "").Trim().Split(',');
                        string localizationFileName = string.Format("{0}.en-us.xml", localizationParts[0].Trim());
                        string labelLocalizationKey = localizationParts[1].Trim();

                        XDocument localizationDocument = GetLocalizationDocument(localizationFileName);

                        try
                        {
                            XElement labelStringElement = localizationDocument.Descendants("string").Attributes("key").Where(f => f.Value == labelLocalizationKey).First().Parent;

                            string helpLocalizationKeyShort = labelLocalizationKey.Substring(0, labelLocalizationKey.LastIndexOf('.') + 1) + labelLocalizationKey.Substring(labelLocalizationKey.LastIndexOf('.') + 1).Replace("Label", "Help");
                            string helpLocalizationKeyLong = "${" + localizationParts[0] + ", " + helpLocalizationKeyShort + "}";

                            if (localizationDocument.Root.Attributes("key").Where(f => f.Value == helpLocalizationKeyShort).Any())
                            {
                                visualOut.Add(new XElement("li", new XAttribute("style", "color:red"), "Already found lacalized string for " + helpLocalizationKeyLong));
                            }
                            else
                            {
                                XElement helpStringElement = new XElement("string", new XAttribute("key", helpLocalizationKeyShort), new XAttribute("value", ""));
                                labelStringElement.AddAfterSelf(helpStringElement);
                                visualOut.Add(new XElement("li", helpLocalizationKeyLong));
                            }


                            missingHelpElement.Add(new XAttribute("Help", helpLocalizationKeyLong));
                            visualOut.Add(new XElement("li", missingHelpElement.ToString()));

                        }
                        catch (Exception ex)
                        {
                            visualOut.Add(new XElement("li", new XAttribute("style", "color:red"), "Failed for " + localizationFileName + ", " + labelLocalizationKey + " (" + ex.Message + ")"));
                            //                        visualOut.Add(new XElement("textarea", localizationDocument.ToString()));
                        }
                    }
                    else
                    {
                        visualOut.Add(new XElement("li", new XAttribute("style", "color:red"), "Un-localized label at " + formsFileName));
                    }
                }

            }

        }

        foreach (string formsPath in _formsFiles.Keys)
        {
            XElement ul = new XElement("ul");
            ul.Add(new XElement("li", formsPath));
            visualOut.Add(ul);
        }

        foreach (string localizationPath in _localizationFiles.Keys)
        {
            XElement ul = new XElement("ul");
            ul.Add(new XElement("li", localizationPath));
            visualOut.Add(ul);
        }


        SaveAllChangedFiles();

        this.Controls.Add(new LiteralControl(visualOut.ToString()));


    }



    private XDocument GetLocalizationDocument(string localizationFileName)
    {
        if (_localizationFiles.ContainsKey(localizationFileName) == false)
        {
            string localizationFilesDirectory = PathUtil.Resolve(relativeLocalizationFilesDirectory);
            XDocument doc = XDocument.Load(Path.Combine(localizationFilesDirectory, localizationFileName));

            _localizationFiles.Add(localizationFileName, doc);
        }

        return _localizationFiles[localizationFileName];
    }


    private XDocument GetFormsDocument(string formsFileName)
    {
        if (_formsFiles.ContainsKey(formsFileName) == false)
        {
            string formsFilesDirectory = PathUtil.Resolve(relativeFormsFilesDirectory);
            XDocument doc = XDocument.Load(Path.Combine(formsFilesDirectory, formsFileName));

            _formsFiles.Add(formsFileName, doc);
        }

        return _formsFiles[formsFileName];
    }


    private void SaveAllChangedFiles()
    {
        foreach (string formsPath in _formsFiles.Keys)
        {
            string fullPath = Path.Combine(PathUtil.Resolve(relativeFormsFilesDirectory), formsPath);

            FileInfo file = new FileInfo(fullPath);
            if (file.IsReadOnly == true)
            {
                throw new InvalidOperationException(fullPath + " is read only!");
            }
        }


        foreach (string localizationPath in _localizationFiles.Keys)
        {
            string fullPath = Path.Combine(PathUtil.Resolve(relativeLocalizationFilesDirectory), localizationPath);

            FileInfo file = new FileInfo(fullPath);
            if (file.IsReadOnly == true)
            {
                throw new InvalidOperationException(fullPath + " is read only!");
            }
        }


        foreach (string formsPath in _formsFiles.Keys)
        {
            string fullPath = Path.Combine(PathUtil.Resolve(relativeFormsFilesDirectory), formsPath);
            _formsFiles[formsPath].Save(fullPath);
        }


        foreach (string localizationPath in _localizationFiles.Keys)
        {
            string fullPath = Path.Combine(PathUtil.Resolve(relativeLocalizationFilesDirectory), localizationPath);
            _localizationFiles[localizationPath].Save(fullPath);
        }
    }

}
