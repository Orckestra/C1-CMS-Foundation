using System;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;


namespace Composite.Core.Configuration
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class InstallationInformationFacade
    {
        private static Guid _installationId;

        static InstallationInformationFacade()
        {
            string filepath = System.IO.Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), "InstallationInformation.xml");

            if (File.Exists(filepath) == true)
            {
                XDocument doc = XDocumentUtils.Load(filepath);

                XAttribute idAttribute = doc.Root.Attribute("installationId");

                _installationId = (Guid)idAttribute;
            }
            else
            {
                InitializeNewFile(filepath);
            }
        }



        public static Guid InstallationId
        {
            get 
            {
                return _installationId;
            }
        }



        private static void InitializeNewFile(string filepath)
        {
            _installationId = Guid.NewGuid();

            string directory = System.IO.Path.GetDirectoryName(filepath);
            if (Directory.Exists(directory) == false)
            {
                Directory.CreateDirectory(directory);
            }

            XDocument doc = new XDocument(
                        new XElement("InstallationInformation",
                            new XAttribute("installationId", _installationId)
                        )
                    );

            XDocumentUtils.Save(doc, filepath);
        }
    }
}
