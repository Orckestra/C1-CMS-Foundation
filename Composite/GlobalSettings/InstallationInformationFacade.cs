using System;
using System.IO;
using System.Xml.Linq;
using Composite.IO;


namespace Composite.GlobalSettings
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
            string filepath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.ConfigurationDirectory), "InstallationInformation.xml");

            if (File.Exists(filepath) == true)
            {
                XDocument doc = XDocument.Load(filepath);

                XAttribute idAttribute = doc.Root.Attribute("installationId");

                _installationId = (Guid)idAttribute;
            }
            else
            {
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

            XDocument doc = new XDocument(
                        new XElement("InstallationInformation",
                            new XAttribute("installationId", _installationId)
                        )
                    );

            doc.Save(filepath);
        }
    }
}
